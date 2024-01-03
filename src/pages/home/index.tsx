import React, { useEffect } from 'react';
import TopBar from './components/TopBar';
import Box from '@mui/material/Box';
import {
  GridRowModesModel,
  GridRowModes,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import DataGridComponent from './components/DataGridComponent';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchData, deleteItem, updateItem, createItem, sortData } from '../../store/dataGridSlice';



export default function HomePage() {
  const dispatch = useAppDispatch();
  const { data, index, loading } = useAppSelector((state) => state.data);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  useEffect(() => {
    // Fetch data when the component mounts
    dispatch(fetchData());
  }, [dispatch]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCreateClick = () => {
    dispatch(createItem({ id: index, name: '', age: '', city: '' }))
    setRowModesModel((oldModel) => ({
      [index]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      ...oldModel,
    }));
  };


  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    dispatch(sortData('id'));
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(deleteItem(id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(updateItem(newRow));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  return (
    <>
      <TopBar />
      <div className="flex items-center justify-center my-10">
        <Box data-testid="data-grid-component">
          <DataGridComponent
            rows={data}
            rowModesModel={rowModesModel}
            handleRowModesModelChange={handleRowModesModelChange}
            handleRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            setRows={handleCreateClick}
            setRowModesModel={setRowModesModel}
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            loading={loading}

          />
        </Box>
      </div>
    </ >
  );
}