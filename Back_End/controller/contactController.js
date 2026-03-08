const pool = require("../config/db");
const { validationResult } = require("express-validator");
const axios = require("axios");
const { Parser } = require("json2csv");

/* ======================================================
   CREATE CONTACT (Public - Landing Page)
====================================================== */
const createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, phone, message, recaptchaToken } =
      req.body;

    // 🔥 Skip reCAPTCHA in development mode
    if (process.env.NODE_ENV === "production") {
      if (!recaptchaToken) {
        return res.status(400).json({ message: "reCAPTCHA token is missing" });
      }

      const secretKey = process.env.RECAPTCHA_SECRET;

      const response = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,

        {
          params: {
            secret: secretKey,
            response: recaptchaToken,
          },
        },
      );

      if (!response.data.success) {
        return res.status(400).json({
          message: "Failed reCAPTCHA verification",
        });
      }
    }

    const newContact = await pool.query(
      `INSERT INTO contacts 
       (first_name, last_name, email, phone, message) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [firstName, lastName, email, phone, message],
    );

    res.status(201).json({
      message: "Message sent successfully",
      data: newContact.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   GET CONTACTS (Dashboard)
   Supports:
   - status filter
   - search
   - pagination
====================================================== */
const getContacts = async (req, res) => {
  try {
    let { status, search, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    let conditions = [];
    let values = [];

    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      conditions.push(
        `(first_name ILIKE $${values.length} 
          OR last_name ILIKE $${values.length} 
          OR email ILIKE $${values.length})`
      );
    }

    let baseQuery = "FROM contacts";

    if (conditions.length > 0) {
      baseQuery += " WHERE " + conditions.join(" AND ");
    }

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) ${baseQuery}`,
      values
    );

    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    // Get paginated data
    const dataQuery = `
      SELECT * ${baseQuery}
      ORDER BY created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

    const result = await pool.query(dataQuery, [
      ...values,
      limit,
      offset,
    ]);

    res.json({
      data: result.rows,
      pagination: {
        total,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/* ======================================================
   UPDATE CONTACT STATUS
====================================================== */
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const result = await pool.query(
      "UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   DELETE CONTACT
====================================================== */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   CONTACT STATS (Dashboard Analytics)
====================================================== */
const getContactStats = async (req, res) => {
  try {
    const total = await pool.query("SELECT COUNT(*) FROM contacts");

    const byStatus = await pool.query(
      "SELECT status, COUNT(*) FROM contacts GROUP BY status",
    );

    const monthly = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM') as month,
        COUNT(*) 
      FROM contacts
      GROUP BY month
      ORDER BY month DESC
      LIMIT 6
    `);

    res.json({
      total: parseInt(total.rows[0].count),
      byStatus: byStatus.rows,
      monthly: monthly.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   EXPORT CSV
====================================================== */
const exportContacts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC",
    );

    const fields = [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "message",
      "status",
      "created_at",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(result.rows);

    res.header("Content-Type", "text/csv");
    res.attachment("contacts.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
  getContactStats,
  exportContacts,
};
