import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const API = "https://paste-app-4hoa.onrender.com/api/paste";


// CREATE
export const createPaste = createAsyncThunk(
  "paste/create",
  async (data) => {
    const res = await axios.post(API, data);
    toast.success("Created successfully")
    return res.data;
  }
);

// FETCH ALL
export const viewPaste = createAsyncThunk(
  "paste/fetch",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

// DELETE
export const deletePaste = createAsyncThunk(
  "paste/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    toast.success("Deleted successfully")
    return id;
  }
);

// UPDATE
export const updatePaste = createAsyncThunk(
  "paste/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API}/${id}`, data);
    toast.success("Updated successfully")
    return res.data;
  }
);

const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewPaste.fulfilled, (state, action) => {
        state.pastes = action.payload;
      })
      .addCase(createPaste.fulfilled, (state, action) => {
        state.pastes.unshift(action.payload);
      })
      .addCase(deletePaste.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter(
          (paste) => paste._id !== action.payload
        );
      })
      .addCase(updatePaste.fulfilled, (state, action) => {
        const index = state.pastes.findIndex(
          (p) => p._id === action.payload._id
        );
        state.pastes[index] = action.payload;
      });
  },
});

export default pasteSlice.reducer;