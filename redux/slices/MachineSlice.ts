import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type MachineSliceStateType = {
  items: any[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  filterBy: {
    fieldName: string;
    value: string[];
  }[];
  dateFilter: {
    start_date: string | null;
    end_date: string | null;
  };
};

const initialState: MachineSliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: true,
  page: 1,
  rowsPerPage: 20,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  filterBy: [
 
  ],
  dateFilter: {
    start_date: null,
    end_date: null,
  },
};

const MachineSlice: Slice<MachineSliceStateType> = createSlice({
  name: "MachineSlice",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any[] | []>) => {
      state.items = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.page = 1;
    },
    setSortValue: (state, action: PayloadAction<{ field: string; value: "DESC" | "ASC" }>) => {
      state.sortValue = action.payload;
      state.page = 1;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setIsTableLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<{ fieldName: string; value: string[] }[]>) => {
      state.filterBy = action.payload;
      state.page = 1;
    },
    setDateFilter: (state, action: PayloadAction<{ start_date: string; end_date: string }>) => {
      state.dateFilter = action.payload;
    },
  },
});

export const {
  setItems,
  setPage,
  setRowsPerPage,
  setSearchValue,
  setSortValue,
  setTotalItems,
  setIsTableLoading,
  setDateFilter,
  setFilterBy,
} = MachineSlice.actions;
export default MachineSlice.reducer;