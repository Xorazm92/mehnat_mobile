import { createSlice } from "@reduxjs/toolkit";

export interface DownloadItem {
  id: string;
  materialId: string;
  title: string;
  status: "pending" | "downloading" | "completed" | "failed";
  progress: number;
}

interface DownloadState {
  downloads: DownloadItem[];
  isLoading: boolean;
}

const initialState: DownloadState = {
  downloads: [],
  isLoading: false,
};

const downloadSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {
    addDownload: (state, action) => {
      state.downloads.push(action.payload);
    },
  },
});

export const { addDownload } = downloadSlice.actions;
export default downloadSlice.reducer;
