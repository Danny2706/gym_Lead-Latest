const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
  getContactStats,
  exportContacts,
} = require("../controller/contactController");
const authMiddleware = require("../middleware/authMiddleware");


const { body } = require("express-validator");

/* ===============================
   PUBLIC ROUTE (Landing Page)
================================ */
router.post(
  "/contact",
  [
    body("firstName").trim().notEmpty().isLength({ max: 100 }),
    body("lastName").trim().notEmpty().isLength({ max: 100 }),
    body("email").trim().notEmpty().isEmail().normalizeEmail(),
    body("phone")
      .optional({ checkFalsy: true })
      .matches(/^[0-9\-\(\)\s]+$/)
      .withMessage("Invalid phone number"),
    body("message").trim().notEmpty().isLength({ max: 1000 }),
  ],
  createContact,
);

/* ===============================
   DASHBOARD ROUTES
================================ */
router.get("/contacts", authMiddleware, getContacts);
router.put("/contacts/:id",authMiddleware, updateContactStatus);
router.delete("/contacts/:id",authMiddleware, deleteContact);
router.get("/contacts/stats",authMiddleware, getContactStats);
router.get("/contacts/export",authMiddleware, exportContacts);

module.exports = router;
