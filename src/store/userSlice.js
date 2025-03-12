import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, getCookieValue } from "../App";
import { toast } from "react-toastify";

const initialState = {
  usersList: [],
  filteredUsersList: [],
  loadingUsers: false,
  totalUsers: null,

  userDetails: {},
  loadingUserDetails: false,

  loadingDetails: false,
  connectionDetail: [],
  opportunities: [
    // {
    //   _id: "6772348869db297b1657fb55",
    //   user_id: "65eb4aefddf0d0012c8571d4",
    //   position_title: "Hhux",
    //   company_name: "Gxhx",
    //   industry_id: "6756bdbf897e5d94930d37a7",
    //   position_id: "6756bc0f897e5d94930d35fc",
    //   stage_id: "6752ec6ccf62492cc28a23c2",
    //   pay_type_id: "6752ec9bcf62492cc28a23d0",
    //   pay_amount: 22,
    //   overview: "Yydhdxhx",
    //   position_status: "Active",
    //   is_deleted: false,
    //   createdAt: "2024-12-30T05:50:00.997Z",
    //   industry: "Technology",
    //   industry_color_code: "#EACA45",
    //   position: "Business Partner",
    //   position_color_code: "#53A6FF",
    //   stage: "Startup Stage",
    //   stage_color_code: "#46FF4B",
    //   pay_type: "Commission",
    //   pay_type_color_code: "#ffffff",
    // },
  ],
  reported_by_others: [],
  blocked_by_others: [],
  reported_by_me: [],
};

export const getUsersList = createAsyncThunk(
  "users/getUsersList",
  async (detail) => {
    const admin_token = getCookieValue("admin_token");
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/user_list`,
        {
          page: String(detail?.page),
          limit: String(detail?.rowsPerPage),
          search: detail.search,
          sortOrder: detail.sortOrder,
          sortBy: detail.sortBy,
        },
        {
          headers: {
            Authorization: `Bearer ${admin_token}`,
          },
        }
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "users/getUserDetail",
  async (user_id) => {
    const admin_token = getCookieValue("admin_token");
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/get_user_details`,
        {
          user_id,
        },
        {
          headers: { Authorization: `Bearer ${admin_token}` },
        }
      );
      console.log(data);

      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const handleDeleteUser = createAsyncThunk(
  "users/handleDeleteUser",
  async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/delete_user`,
        {
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        return userId;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }
);

export const handleBlockUser = createAsyncThunk(
  "users/handleBlockUser",
  async (details) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/block_user`,
        {
          user_id: details.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
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

export const getConnectionDetails = createAsyncThunk(
  "users/getConnectionDetails",
  async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/admin_connection_list`,
        {
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      console.log(data);
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
export const get_reported_by_others = createAsyncThunk(
  "users/get_reported_by_others",
  async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/user_reported_by_others_list`,
        {
          user_id: userId,
          page: String(1),
          limit: String(20),
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      console.log(data);
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
export const get_reported_by_me = createAsyncThunk(
  "users/get_reported_by_me",
  async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/user_reported_others_list`,
        {
          user_id: userId,
          page: String(1),
          limit: String(20),
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      console.log(data);
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
export const get_blocked_by_others = createAsyncThunk(
  "users/get_blocked_by_others",
  async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/user_block_by_others_list`,
        {
          user_id: userId,
          page: String(1),
          limit: String(20),
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        console.log(data);
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
export const getOpportunities = createAsyncThunk(
  "users/getOpportunities",
  async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/opportunity/user_wise_opportunity_list`,
        {
          other_user_id: userId,
          page: String(1),
          limit: String(20),
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("admin_token")}`,
          },
        }
      );
      console.log(data);
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilteredUsers: (state, action) => {
      state.filteredUsersList = action.payload;
    },
    deleteUser: (state, action) => {
      state.usersList = state.usersList.filter((user) => {
        return user._id != action.payload._id;
      });
      state.filteredUsersList = state.filteredUsersList.filter((user) => {
        return user._id != action.payload._id;
      });
    },
    blockUser: (state, action) => {
      state.usersList = state.usersList.map((user) => {
        return user._id == action.payload._id
          ? { ...user, is_block: action.payload.is_block }
          : user;
      });
      state.filteredUsersList = state.filteredUsersList.map((user) => {
        return user._id == action.payload._id
          ? { ...user, is_block: action.payload.is_block }
          : user;
      });
    },
    addUser: (state, action) => {
      state.usersList = [action.payload, ...state.usersList];
      state.filteredUsersList = [action.payload, ...state.filteredUsersList];
    },
    removeSelectedUser: (state, action) => {
      state.userDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.loadingUsers = true;
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.usersList = action.payload?.data;
        state.filteredUsersList = action.payload?.data;
        state.totalUsers = action.payload?.total_number_of_data;
      })
      .addCase(getUsersList.rejected, (state) => {
        state.loadingUsers = false;
      });
    builder
      .addCase(getUserDetail.pending, (state) => {
        state.loadingUserDetails = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.userDetails = action.payload?.data;
        state.loadingUserDetails = false;
      })
      .addCase(getUserDetail.rejected, (state) => {
        state.loadingUserDetails = false;
      });
    builder.addCase(handleBlockUser.fulfilled, (state, action) => {
      state.usersList = state.usersList.map((user) => {
        return user._id == action.payload._id
          ? { ...user, is_block: action.payload.is_block }
          : user;
      });
      state.filteredUsersList = state.filteredUsersList.map((user) => {
        return user._id == action.payload._id
          ? { ...user, is_block: action.payload.is_block }
          : user;
      });
      if (Object.keys(state.userDetails).length != 0) {
        state.userDetails = {
          ...state.userDetails,
          is_block: action.payload.is_block,
        };
      }
    });
    builder.addCase(handleDeleteUser.fulfilled, (state, action) => {
      state.usersList = state.usersList?.filter((user) => {
        return user._id != action.payload;
      });
      state.filteredUsersList = state.filteredUsersList?.filter((user) => {
        return user._id != action.payload;
      });
    });
    builder
      .addCase(getConnectionDetails.fulfilled, (state, action) => {
        state.connectionDetail = action.payload;
        state.loadingDetails = false;
      })
      .addCase(getConnectionDetails.pending, (state) => {
        state.loadingDetails = true;
      })
      .addCase(getConnectionDetails.rejected, (state) => {
        state.loadingDetails = false;
      });
    builder.addCase(getOpportunities.fulfilled, (state, action) => {
      state.opportunities = action.payload;
    });
    builder.addCase(get_blocked_by_others.fulfilled, (state, action) => {
      state.blocked_by_others = action.payload;
    });
    builder.addCase(get_reported_by_me.fulfilled, (state, action) => {
      state.reported_by_me = action.payload;
    });
    builder.addCase(get_reported_by_others.fulfilled, (state, action) => {
      state.reported_by_others = action.payload;
    });
  },
});

export const {
  setFilteredUsers,
  deleteUser,
  blockUser,
  addUser,
  removeSelectedUser,
} = userSlice.actions;
export default userSlice.reducer;
