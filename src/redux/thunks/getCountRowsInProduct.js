import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountRowsInProduct = createAsyncThunk(
  "product/getCountRowsInProduct",
  async (data) => {
    const response = await axios.post(
      "http://localhost:3001/api/getCountRowsInProduct",
      data
    );

    if (response.status === 200) {
      return response.data;
    }
  }
);