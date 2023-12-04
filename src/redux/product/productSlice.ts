import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "process";

interface ProductState {
  loading: boolean;
  data:
    | [
        {
          ID: number;
          name: string;
          category: string;
          start_date: string;
          end_date: number;
          create_at: string;
          updated_at: string;
          menu_id: string;
        }
      ]
    | null;
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  data: null,
  error: "",
};

export const getProducts = createAsyncThunk("product", async () => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      // "Access-Control-Allow-Origin": "*",
    },
  };
  return await axios.get("http://localhost:8000/menus", axiosConfig);
});

const productSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.data;
      }
    );
    builder.addCase(
      getProducts.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
      }
    );
  },
});

export default productSlice.reducer;
