import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, getCookieValue } from "./../App";
import { toast } from "react-toastify";

const initialState = {
  postDetails: {},
  postLoading: false,
};

export const get_post_details = createAsyncThunk(
  "post/get_post_details",
  async (post_id) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/get_post_details`,
        {
          post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      if (data.success) {
        return data.data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }
);
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_post_details.fulfilled, (state, action) => {
        state.postDetails = action.payload;
        state.postLoading = false;
      })
      .addCase(get_post_details.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(get_post_details.rejected, (state) => {
        state.postLoading = false;
      });
  },
});

export default postSlice.reducer;
