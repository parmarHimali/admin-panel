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

//interest
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
export const addInterest = createAsyncThunk(
  "interest/addInterest",
  async (detail, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/interest/add_interest`, {
        interestd: detail.interestName,
        color_code: detail.color,
      });
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);
export const editInterests = createAsyncThunk(
  "interest/editInterests",
  async (detail, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/interest/edit_interest`, {
        interest_id: detail.interest_id,
        interestd: detail.interestd,
        color_code: detail.color_code,
      });
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);
export const dltInterest = createAsyncThunk(
  "interest/dltInterest",
  async (iId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/interest/delete_interest`,
        {
          interest_id: iId,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);
export const blockUnblockInterest = createAsyncThunk(
  "interest/blockUnblockInterest",
  async (iId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/interest/block_interest`, {
        interest_id: iId,
      });
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);

//sub interest
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
export const addSubInterests = createAsyncThunk(
  "interest/addSubInterests",
  async (detail, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/interest/addsub_interest`,
        {
          interest_id: detail.addSubId,
          sub_interest: detail.subInterest,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);
export const editSubInterest = createAsyncThunk(
  "interest/editSubInterest",
  async (subEditData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/interest/edit_subinterest`,
        subEditData
      );
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);
export const dltSubInterest = createAsyncThunk(
  "interest/dltSubInterest",
  async (subId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/interest/delete_subinterest`,
        {
          subinterest_id: subId,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);
export const blockUnblockSubInterest = createAsyncThunk(
  "interest/blockUnblockSubInterest",
  async (subID, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/interest/block_sub_interest`,
        {
          subinterest_id: subID,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data?.message);
    }
  }
);

const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
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
    builder.addCase(addSubInterests.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload;
        state.subInterests = state.subInterests.map((subInt) => {
          return subInt._id == data.interest_id
            ? {
                ...subInt,
                sub_interest_data: [...subInt.sub_interest_data, data],
              }
            : subInt;
        });
      }
    });
    builder.addCase(editInterests.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload;
        state.interests = state.interests.map((interest) => {
          return interest._id == data._id
            ? {
                ...interest,
                interest: data.interest,
                color_code: data.color_code,
              }
            : interest;
        });
        state.subInterests = state.subInterests.map((subInt) => {
          return subInt._id == data._id
            ? {
                ...subInt,
                color_code: data.color_code,
                interest: data.interest,
              }
            : subInt;
        });
      }
    });
    builder.addCase(dltSubInterest.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload;
        state.subInterests = state.subInterests.map((subInt) => {
          return subInt._id == data.interest_id
            ? {
                ...subInt,
                sub_interest_data: subInt.sub_interest_data.filter((sub) => {
                  return sub._id != data._id;
                }),
              }
            : subInt;
        });
      }
    });
    builder.addCase(editSubInterest.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload;
        state.subInterests = state.subInterests.map((subInt) => {
          return subInt._id == data.interest_id
            ? {
                ...subInt,
                sub_interest_data: subInt.sub_interest_data.map((sub) => {
                  return sub._id == data._id ? data : sub;
                }),
              }
            : subInt;
        });
      }
    });
    builder.addCase(dltInterest.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.subInterests = state.subInterests.filter((subInt) => {
          return subInt._id != action.payload.data?._id;
        });
      }
    });
    builder.addCase(blockUnblockSubInterest.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload;
        state.subInterests = state.subInterests.map((subInt) => {
          return subInt._id == data.interest_id
            ? {
                ...subInt,
                sub_interest_data: subInt.sub_interest_data.map((sub) => {
                  return sub._id == data._id
                    ? { ...sub, is_block: data.is_block }
                    : sub;
                }),
              }
            : subInt;
        });
      }
    });
    builder.addCase(blockUnblockInterest.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload;
        state.subInterests = state.subInterests.map((subInt) => {
          return subInt._id == data._id
            ? { ...subInt, is_block: data.is_block }
            : subInt;
        });
      }
    });
    builder.addCase(addInterest.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.interests.unshift(action.payload.data);
        state.subInterests.push({
          ...action.payload.data,
          sub_interest_data: [],
        });
      }
    });
  },
});

export default interestSlice.reducer;
export const { setFilteredInterest } = interestSlice.actions;
