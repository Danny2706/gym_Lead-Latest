import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchContacts,
  deleteContact,
  updateContactStatus,
  sendContactForm,
} from "../service/contactApi";

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted";
  created_at: string;
}

interface ContactState {
  loading: boolean;
  leads: Lead[];
  total: number;
  totalPages: number;
  page: number;
  success: string | null;
  error: string | null;
}

const initialState: ContactState = {
  loading: false,
  leads: [],
  total: 0,
  totalPages: 1,
  page: 1,
  success: null,
  error: null,
};

// Submit Contact
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

// Fetch Contacts
export const getContacts = createAsyncThunk(
  "contact/getAll",
  async (params?: { page?: number; search?: string }, { rejectWithValue }) => {
    try {
      const res = await fetchContacts(params);
      return res.data;
    } catch {
      return rejectWithValue("Failed to load contacts");
    }
  },
);

// Delete Contact
export const removeContact = createAsyncThunk(
  "contact/delete",
  async (id: string) => {
    await deleteContact(id);
    return id;
  },
);

// Update Status
export const changeStatus = createAsyncThunk(
  "contact/updateStatus",
  async ({ id, status }: { id: string; status: string }) => {
    await updateContactStatus(id, status);
    return { id, status }; // optimistic update
  },
);

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

      // Submit
      .addCase(submitContact.pending, (s) => {
        s.loading = true;
      })
      .addCase(submitContact.fulfilled, (s, a) => {
        s.loading = false;
        s.success = a.payload;
      })
      .addCase(submitContact.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // Get
      .addCase(getContacts.pending, (s) => {
        s.loading = true;
      })
      .addCase(getContacts.fulfilled, (s, a) => {
        s.loading = false;

        if (Array.isArray(a.payload)) {
          s.leads = a.payload;
          s.total = a.payload.length;
          s.totalPages = 1;
        } else {
          s.leads = a.payload?.data ?? [];
          s.total = a.payload?.total ?? s.leads.length;
          s.page = a.payload?.page ?? 1;
          s.totalPages = a.payload?.totalPages ?? 1;
        }
      })
      .addCase(getContacts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // Delete
      .addCase(removeContact.fulfilled, (s, a) => {
        s.leads = s.leads.filter((l) => l.id !== a.payload);
      })

      // Optimistic Status Update
      .addCase(changeStatus.fulfilled, (s, a) => {
        const index = s.leads.findIndex((l) => l.id === a.payload.id);
        if (index !== -1) {
          s.leads[index].status = a.payload.status as any;
        }
      });
  },
});

export const { resetMessages } = contactSlice.actions;
export default contactSlice.reducer;
