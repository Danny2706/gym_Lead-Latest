import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchContacts,
  deleteContact,
  updateContactStatus,
  sendContactForm,
} from "../service/contactApi";

/* ===============================
   TYPES
================================ */

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string; // ✅ interest removed
  status: "new" | "contacted" | "qualified" | "converted";
  created_at: string;
}

interface ContactState {
  loading: boolean;
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
  success: string | null;
  error: string | null;
}

/* ===============================
   INITIAL STATE
================================ */

const initialState: ContactState = {
  loading: false,
  leads: [],
  total: 0,
  page: 1,
  totalPages: 1,
  success: null,
  error: null,
};

/* ===============================
   PUBLIC FORM SUBMIT
================================ */

export const submitContact = createAsyncThunk(
  "contact/submit",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await sendContactForm(data);
      return res.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  },
);

export const getContacts = createAsyncThunk(
  "contact/getAll",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetchContacts({ page, limit });
      return res.data;
    } catch {
      return rejectWithValue("Failed to load contacts");
    }
  },
);

export const removeContact = createAsyncThunk(
  "contact/delete",
  async (id: string) => {
    await deleteContact(id);
    return id;
  },
);

export const changeStatus = createAsyncThunk(
  "contact/updateStatus",
  async ({ id, status }: { id: string; status: string }) => {
    await updateContactStatus(id, status);
    return { id, status };
  },
);

/* ===============================
   SLICE
================================ */

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ================= SUBMIT =================
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ================= GET (PAGINATION) =================
      .addCase(getContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;

        state.leads = action.payload?.data ?? [];

        const pagination = action.payload?.pagination;

        state.total = pagination?.total ?? 0;
        state.page = pagination?.currentPage ?? 1;
        state.totalPages = pagination?.totalPages ?? 1;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ================= DELETE =================
      .addCase(removeContact.fulfilled, (state, action) => {
        state.leads = state.leads.filter((lead) => lead.id !== action.payload);

        // adjust total after delete
        state.total = Math.max(state.total - 1, 0);
        state.totalPages = Math.max(Math.ceil(state.total / 10), 1);
      })

      // ================= STATUS UPDATE =================
      .addCase(changeStatus.fulfilled, (state, action) => {
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.id,
        );

        if (index !== -1) {
          state.leads[index].status = action.payload.status as any;
        }
      });
  },
});

export const { resetMessages } = contactSlice.actions;
export default contactSlice.reducer;
