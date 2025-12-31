import {
  createSlice,
  createAsyncThunk,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import api from "../api/axios";
import { addToCart as apiAddToCart } from "../service/cart.service";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async ({ product_id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await apiAddToCart(product_id, quantity);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/customer/cart");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2. KEYIN SLICELARNI E'LON QILAMIZ (Chunki reducerlar store uchun kerak)
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: null,
    loading: false,
    error: null,
  },

  reducers: {
    optimisticAdd: (state, action) => {
      if (!state.cart?.data?.items) return;
      const { product_id, quantity } = action.payload;
      const existingItem = state.cart.data.items.find(
        (item) => item.product_id === product_id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.data.items.push({ product_id, quantity });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // API-dan kelgan data-ni cart-ga yozamiz
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCartItem.pending, (state, action) => {
        state.loadingProductId = action.meta.arg.product_id;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loadingProductId = null;
        state.cart = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loadingProductId = null;
        state.error = action.payload;
      });
  },
});

const searchSlice = createSlice({
  name: "search",
  initialState: { query: "" },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

// 3. ENDI PERSIST VA STORE NI SOZLASAK BO'LADI (Chunki slicelar tayyor)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  search: searchSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const { optimisticAdd } = cartSlice.actions;
export const { setSearchQuery } = searchSlice.actions;

export const cartReducer = cartSlice.reducer;
export const searchReducer = searchSlice.reducer;

export default cartReducer;
