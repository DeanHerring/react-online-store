import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (data) => {
    const response = await axios.post(
      "http://localhost:3001/api/getProducts",
      data
    );

    if (response.status === 200) {
      return response.data;
    }
  }
);