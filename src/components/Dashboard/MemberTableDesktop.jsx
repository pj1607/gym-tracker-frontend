import React from 'react';
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Button,
  IconButton,
    keyframes,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { dummydata } from '../../data/dummy';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UndoIcon from '@mui/icons-material/Undo';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import InputBase from '@mui/material/InputBase';


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MemberTableDesktop = () => {
  const [data, setData] = React.useState(dummydata);
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [previousStates, setPreviousStates] = React.useState({});

  // Automatically update unpaid status if one month passed since lastPaidDate
  React.useEffect(() => {
    const updated = data.map((member) => {
      if (member.status === 'Paid' && member.lastPaidDate) {
        const paidDate = new Date(member.lastPaidDate);
        const now = new Date();
        const monthDiff =
          (now.getFullYear() - paidDate.getFullYear()) * 12 +
          (now.getMonth() - paidDate.getMonth());

        if (monthDiff >= 1) {
          return {
            ...member,
            status: 'Unpaid',
            unpaidFor: monthDiff,
          };
        }
      }
      return member;
    });

    setData(updated);
  }, []);

  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredRows = data
  .filter((member) =>
    filterStatus === 'All' ? true : member.status === filterStatus
  )
  .filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleMarkAsPaid = (id) => {
    const prevData = data.find((member) => member.id === id);

    setPreviousStates((prev) => ({
      ...prev,
      [id]: prevData,
    }));

    const updatedData = data.map((member) =>
      member.id === id
        ? {
            ...member,
            status: 'Paid',
            lastPaidDate: dayjs().format('DD-MM-YYYY'),
            unpaidFor: 0,
          }
        : member
    );
    setData(updatedData);
  };

  const handleUndoMarkAsPaid = (id) => {
    if (previousStates[id]) {
      const restored = previousStates[id];
      const updatedData = data.map((member) =>
        member.id === id ? restored : member
      );
      setData(updatedData);

      setPreviousStates((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const handleDeleteMember = (id) => {
    const updatedData = data.filter((member) => member.id !== id);
    setData(updatedData);
  };

  const columns = [
    { field: 'id', headerName: 'Roll No.', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    { field: 'phone', headerName: 'Contact Details', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row: { status } }) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          py="5px"
          px="10px" 
          
          fontWeight="bold"
          color="#fff"
          sx={{
            backgroundColor: status === 'Paid' ? '' : '#8B0000',
          }}
        >
          {status === 'Paid' ? (
            <DoneIcon sx={{ mr: 1 }} />
          ) : (
            <ClearIcon sx={{ mr: 1 }} />
          )}
          {status}
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          {row.status === 'Unpaid' ? (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleMarkAsPaid(row.id)}
              startIcon={<CurrencyRupeeIcon />}
              sx={{
                backgroundColor: '#4caf50',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Mark as Paid
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => handleUndoMarkAsPaid(row.id)}
              startIcon={<UndoIcon/>}
              sx={{
                color: 'white',
                borderColor: '#fbc02d',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#8B0000',
                  color: 'white',
                },
              }}
            >
              Undo
            </Button>
          )}
        </Box>
      ),
    },
    { field: 'lastPaidDate', headerName: 'Last Paid', flex: 1 },
    { field: 'unpaidFor', headerName: 'Unpaid (Months)', flex: 1 },
    {
      field: 'delete',
      headerName: 'Delete Member',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <Button
          onClick={() => handleDeleteMember(row.id)}
          sx={{
            '&:hover': {
              backgroundColor: '#8B0000',
              color: 'white',
            },
          }}
        >
          <DeleteForeverIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        m: '40px 0 0 0',
        height: '60vh',
        padding: 2,
        animation: `${fadeIn} 0.3s ease-out`,
      }}
    ><Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mb={2}
  flexWrap="wrap"
  gap={2}
>
  <Box display="flex" alignItems="center" gap={2}>
    <Typography variant="body1" fontWeight={500} color="white">
      Filter by Status:
    </Typography>
    <Select
      value={filterStatus}
      onChange={handleFilterChange}
      size="small"
      sx={{
        backgroundColor: '#b8aeae',
        color: 'black',
        borderRadius: 1,
        fontWeight: 500,
        minWidth: 120,
        '& .MuiSelect-icon': { color: 'black' },
      }}
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Paid">Paid</MenuItem>
      <MenuItem value="Unpaid">Unpaid</MenuItem>
    </Select>
  </Box>

  {/*Search Bar */}
<Box display="flex" backgroundColor="#b8aeae" borderRadius="3px" px={1} alignItems="center">
        <InputBase sx={{ ml: 1, flex: 1 }} type="text"
      placeholder="Search by name or phone"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </Box>
</Box>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableColumnResize={true}
        sortingOrder={[]}
        disableSelectionOnClick
        sx={{
          height: '500px',
          background: 'linear-gradient(to right, #000000, #1a1a1a)',
          color: 'white',
          border: 'none',
          fontSize: '14px',
          borderRadius: '20px',

          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            border: 'none',
          },
          '& .name-column--cell': {
            color: 'red',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: '#787474',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#2c2c2c',
            transform: 'scale(1.01)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            transition: 'all 250ms cubic-bezier(0.2, 0.8, 0.25, 1)',
            zIndex: 1,
            cursor: 'pointer',
            borderRadius: '10px',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#1a1a1a',
            color: 'white',
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: '#1a1a1a',
          },
          '& .MuiDataGrid-footerContainer': {
            color: 'white',
            background: 'linear-gradient(to right, #000000, #1a1a1a)',
            border: 'none',
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
          },
          '& .MuiTablePagination-root': {
            color: 'white',
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
            fill: 'white',
          },
        }}
      />
    </Box>
  );
};

export default MemberTableDesktop;
