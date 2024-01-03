import React from 'react';
import TopBar from './components/TopBar';
import Box from '@mui/material/Box';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Api from '../../api/dataGrid.json';
import DataGridComponent from './components/DataGridComponent';


const initialRows: GridRowsProp = Api;


export default function HomePage() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  return (
    <>
      <TopBar />
      <div className="flex items-center justify-center my-10">
        <Box>
          <DataGridComponent
            rows={rows}
            rowModesModel={rowModesModel}
            handleRowModesModelChange={handleRowModesModelChange}
            handleRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            setRows={setRows}
            setRowModesModel={setRowModesModel}
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            loading={false}

          />
        </Box>
      </div>
    </ >
  );
}