import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Mock API endpoint to fetch data
import Api from '../api/dataGrid.json';
import { showNotification } from '../components/notification';

interface Person {
  id: number;
  name: string;
  age: number;
  city: string;
}

interface dataState {
  index: number;
  data: Person[];
  loading: boolean;
  error: string | null;
}

const initialState: dataState = {
  index: 0,
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    // Simulating an asynchronous API call using a delay
    const response = await new Promise<Person[]>(resolve => {
      setTimeout(() => {
        resolve(Api);
      }, 1000);
    });
    return response;
  } catch (error) {
    throw new Error('Error fetching data');
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    deleteItem: (state, action) => {
      const findIndex = state.data.findIndex(
        item => item.id === action.payload
      );
      if (findIndex !== -1) {
        state.data = state.data.filter(item => item.id !== action.payload);
        state.index -= 1;
      } else {
        // show a user-friendly notification
        showNotification(
          `Item with id ${action.payload} not found for deletion.`,
          'error'
        );
      }
    },
    updateItem: (state, action) => {
      const findIndex = state.data.findIndex(
        item => item.id === action.payload
      );
      if (findIndex !== -1) {
        state.data = state.data.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        //show a user-friendly notification
        showNotification(
          `Item with id ${action.payload} not found for update.`,
          'error'
        );
      }
    },
    createItem: (state, action) => {
      state.data = [action.payload, ...state.data];
      state.index += 1;
    },
    sortData: (state, action) => {
      const type = action.payload;
      let sortedData;

      switch (type) {
        case 'id':
          sortedData = [...state.data].sort((a, b) => a.id - b.id);
          break;
        case 'name':
          sortedData = [...state.data].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case 'city':
          sortedData = [...state.data].sort((a, b) =>
            a.city.localeCompare(b.city)
          );
          break;
        case 'age':
          sortedData = [...state.data].sort((a, b) => a.age - b.age);
          break;
        default:
          sortedData = state.data;
      }
      state.data = sortedData;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.index = action.payload.length + 1;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        showNotification('something went wrong!', 'error');
      });
  },
});

export const { deleteItem, updateItem, createItem, sortData } =
  dataSlice.actions;
export default dataSlice.reducer;
