import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Mock API endpoint to fetch user credentials
import Api from '../api/userCredentials.json';
import { showNotification } from '../components/notification';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface FetchArgs {
  username: string | null;
  password: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk to fetch user credentials
export const fetchUserCredentials = createAsyncThunk(
  'auth/fetchUserCredentials',
  ({
    password,
    username,
    authLogin,
    navigate,
  }: FetchArgs & {
    authLogin: () => void;
    navigate: (path: string) => void;
  }) => {
    const response = Api;
    const { username: storedUsername, password: storedPassword } =
      response.userCredential;
    return {
      isAuthenticated:
        password === storedPassword && username === storedUsername,
    };
  }
);

// Create authSlice with reducer and actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: state => {
      state.isAuthenticated = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserCredentials.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCredentials.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.loading = false;
        if (isAuthenticated) {
          state.isAuthenticated = true;
          showNotification('Login successful!', 'success');
          action.meta.arg.authLogin();
          setTimeout(() => {
            action.meta.arg.navigate('/home');
          }, 500);
        } else {
          state.error = 'Invalid username or password';
          showNotification('Invalid username or password', 'warning');
        }
      })
      .addCase(fetchUserCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setAuthenticated, setError } = authSlice.actions;
export default authSlice.reducer;
