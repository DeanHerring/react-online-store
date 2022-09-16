import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPaginatedProducts = createAsyncThunk(
  "product/getPaginatedProducts",
  async (data) => {
    const response = await axios.post(
      "http://localhost:3001/api/getPaginatedProducts",
      data
    );

    if (response.status === 200) {
      return response.data;
    }
  }
);