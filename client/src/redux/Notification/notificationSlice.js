import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Shared Axios instance
const API_BASE_URL = "https://privetschool-backend.ohbjmh.easypanel.host";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----------------------------
// Fetch notifications for a specific user (including forall)
// ----------------------------
export const fetchUserNotifications = createAsyncThunk(
  "notifications/fetchUserNotifications",
  async (userId) => {
    const res = await axiosInstance.get(`/notifications/user/${userId}`);
    // Map read status for this user
    const data = res.data.map((notif) => ({
      ...notif,
      read: notif.readBy?.includes(userId) || false,
    }));
    return { notifications: data, userId };
  }
);

// ----------------------------
// Create a new notification
// ----------------------------
export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (data) => {
    const res = await axiosInstance.post("/notifications", data);
    return res.data;
  }
);

// ----------------------------
// Mark one notification as read
// ----------------------------
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async ({ notificationId, userId }) => {
    const res = await axiosInstance.put(`/notifications/${notificationId}/read/${userId}`);
    const updated = { ...res.data, read: res.data.readBy?.includes(userId) || false };
    return { updated, userId };
  }
);

// ----------------------------
// Mark all notifications as read for a user
// ----------------------------
export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (userId) => {
    const res = await axiosInstance.put(`/notifications/user/${userId}/read-all`);
    const data = res.data.map((notif) => ({
      ...notif,
      read: true,
    }));
    return { notifications: data, userId };
  }
);

// ----------------------------
// Slice
// ----------------------------
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    userNotifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    currentUserId: null, // store current user id
  },
  reducers: {
    clearUnreadCount(state) {
      state.unreadCount = 0;
    },
    setCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user notifications
      .addCase(fetchUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.userNotifications = action.payload.notifications;
        state.currentUserId = action.payload.userId;
        state.unreadCount = action.payload.notifications.filter((n) => !n.read).length;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create notification
      .addCase(createNotification.fulfilled, (state, action) => {
        state.userNotifications.unshift({
          ...action.payload,
          read: action.payload.readBy?.includes(state.currentUserId) || false,
        });
        if (!action.payload.readBy?.includes(state.currentUserId)) {
          state.unreadCount += 1;
        }
      })

      // Mark one notification as read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const { updated } = action.payload;
        const index = state.userNotifications.findIndex((n) => n._id === updated._id);
        if (index !== -1) state.userNotifications[index] = updated;
        state.unreadCount = state.userNotifications.filter((n) => !n.read).length;
      })

      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        state.userNotifications = action.payload.notifications;
        state.unreadCount = 0;
      });
  },
});

export const { clearUnreadCount, setCurrentUserId } = notificationSlice.actions;
export default notificationSlice.reducer;
