import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../App";

const initialState = {
  interests: [],
  subInterests: [],
  loadSubInterest: false,
  loadInterest: false,
  filteredInterest: [],
};
export const getSubInterests = createAsyncThunk(
  "interest/getSubInterests",
  async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/interest/getsub_interest`);
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const getInterests = createAsyncThunk(
  "interest/getInterests",
  async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/interest/get_interest`);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    addInterest: (state, action) => {
      state.interests.unshift(action.payload);
      state.subInterests.push({ ...action.payload, sub_interest_data: [] });
    },
    editInterest: (state, action) => {
      state.interests = state.interests.map((interest) => {
        return interest._id == action.payload._id
          ? {
              ...interest,
              interest: action.payload.interest,
              color_code: action.payload.color_code,
            }
          : interest;
      });
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload._id
          ? {
              ...subInt,
              color_code: action.payload.color_code,
              interest: action.payload.interest,
            }
          : subInt;
      });
    },
    deleteInterest: (state, action) => {
      state.subInterests = state.subInterests.filter((subInt) => {
        return subInt._id != action.payload._id;
      });
    },
    blockInterest: (state, action) => {
      console.log(action.payload);

      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload._id
          ? { ...subInt, is_block: action.payload.is_block }
          : subInt;
      });
    },
    addSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: [...subInt.sub_interest_data, action.payload],
            }
          : subInt;
      });
    },
    deleteSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: subInt.sub_interest_data.filter((sub) => {
                return sub._id != action.payload._id;
              }),
            }
          : subInt;
      });
    },
    editSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: subInt.sub_interest_data.map((sub) => {
                return sub._id == action.payload._id ? action.payload : sub;
              }),
            }
          : subInt;
      });
    },
    blockSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: subInt.sub_interest_data.map((sub) => {
                return sub._id == action.payload._id
                  ? { ...sub, is_block: action.payload.is_block }
                  : sub;
              }),
            }
          : subInt;
      });
    },
    setFilteredInterest: (state, action) => {
      state.filteredInterest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubInterests.pending, (state, action) => {
        state.loadSubInterest = true;
      })
      .addCase(getSubInterests.fulfilled, (state, action) => {
        state.loadSubInterest = false;
        state.filteredInterest = action.payload?.data;
        state.subInterests = action.payload?.data;
      })
      .addCase(getSubInterests.rejected, (state, action) => {
        state.loadSubInterest = false;
      });
    builder
      .addCase(getInterests.pending, (state, action) => {
        state.loadInterest = true;
      })
      .addCase(getInterests.fulfilled, (state, action) => {
        state.loadInterest = false;
        state.interests = action.payload.data;
      })
      .addCase(getInterests.rejected, (state, action) => {
        state.loadInterest = false;
      });
  },
});

export default interestSlice.reducer;
export const {
  addInterest,
  deleteInterest,
  editInterest,
  blockInterest,
  addSubInterest,
  deleteSubInterest,
  blockSubInterest,
  setFilteredInterest,
  editSubInterest,
} = interestSlice.actions;
