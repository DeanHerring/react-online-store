import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (data) => {
    const response = await axios.post(
      "http://localhost:3001/api/getProductById",
      data
    );

    if (response.status === 200) {
      return response.data;
    }
  }
);