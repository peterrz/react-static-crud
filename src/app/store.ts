import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import dataReducer from '../store/dataGridSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
