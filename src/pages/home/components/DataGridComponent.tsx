import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';



interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 1;
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon className='bg-blue-400 text-white rounded-full mr-1 ' />} onClick={handleClick}>
        Add
      </Button>
    </GridToolbarContainer>
  );
}

interface MyGridProps {
  rows: GridRowsProp;
  rowModesModel: GridRowModesModel;
  handleRowModesModelChange: (newRowModesModel: GridRowModesModel) => void;
  handleRowEditStop: GridEventListener<'rowEditStop'>;
  processRowUpdate: (newRow: GridRowModel) => GridRowModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  handleSaveClick: (id: GridRowId) => any;
  handleCancelClick: (id: GridRowId) => any;
  handleDeleteClick: (id: GridRowId) => any;
  handleEditClick: (id: GridRowId) => any;
  loading: boolean;
}

export default function DataGridComponent(props: MyGridProps) {
  const {
    rows,
    rowModesModel,
    handleRowModesModelChange,
    handleRowEditStop,
    processRowUpdate,
    setRows,
    setRowModesModel,
    handleEditClick,
    handleDeleteClick,
    handleSaveClick,
    handleCancelClick,
    loading
  } = props;




  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, editable: false, align: 'center', headerClassName: 'bg-blue-100 text-base ' },
    { field: 'name', headerName: 'Name', width: 220, editable: true, align: 'center', headerClassName: 'bg-blue-100 text-base' },
    { field: 'age', headerName: 'Age', width: 100, editable: true, align: 'center', headerClassName: 'bg-blue-100 text-base' },
    { field: 'city', headerName: 'City', width: 220, editable: true, align: 'center', headerClassName: 'bg-blue-100 text-base' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      headerClassName: 'bg-blue-100 text-base',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon className='text-green-600' />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon className='text-gray-900' />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon className='text-blue-800' />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon className='text-red-600' />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      loading={loading}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 8,
          },
        },
        sorting: {
          sortModel: [{ field: 'id', sort: 'asc' }],
        },
      }}
      getRowHeight={() => {
        return 60;
      }}
      getRowClassName={(params) => {
        return (params.id as number) % 2 === 0 ? "bg-neutral-50" : "";
      }}
      sx={{
        boxShadow: 0,
        border: 0,
        '.MuiDataGrid-iconButtonContainer': {
          visibility: 'visible',
        },
        '.MuiDataGrid-sortIcon': {
          opacity: 'inherit !important',
        },
        '.MuiDataGrid-columnHeaderTitleContainer': {
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
        }
      }}
      disableColumnMenu
      pageSizeOptions={[8, 16, 24, 32]}
    />
  );
}