import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Select,
  InputBase,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { dummydata } from '../../data/dummy';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UndoIcon from '@mui/icons-material/Undo';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

const MemberTableMobile = () => {
  const [data, setData] = React.useState(dummydata);
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [previousStates, setPreviousStates] = React.useState({});

  React.useEffect(() => {
    const updated = data.map((member) => {
      if (member.status === 'Paid' && member.lastPaidDate) {
        const paidDate = dayjs(member.lastPaidDate, 'DD-MM-YYYY');
        const now = dayjs();
        const monthsDiff = now.diff(paidDate, 'month');
        if (monthsDiff >= 1) {
          return { ...member, status: 'Unpaid', unpaidFor: monthsDiff };
        }
      }
      return member;
    });
    setData(updated);
  }, []);

  const handleMarkAsPaid = (id) => {
    const original = data.find((m) => m.id === id);
    setPreviousStates((prev) => ({ ...prev, [id]: original }));
    const updated = data.map((m) =>
      m.id === id
        ? {
            ...m,
            status: 'Paid',
            lastPaidDate: dayjs().format('DD-MM-YYYY'),
            unpaidFor: 0,
          }
        : m
    );
    setData(updated);
  };

  const handleUndo = (id) => {
    if (previousStates[id]) {
      const restored = previousStates[id];
      const updated = data.map((m) => (m.id === id ? restored : m));
      setData(updated);
      const newStates = { ...previousStates };
      delete newStates[id];
      setPreviousStates(newStates);
    }
  };

  const handleDelete = (id) => {
    const updated = data.filter((m) => m.id !== id);
    setData(updated);
  };

  const filteredRows = data
    .filter((m) => (filterStatus === 'All' ? true : m.status === filterStatus))
    .filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Box p={2}>
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" mb={3}>
        <Typography color="white">Filter by Status:</Typography>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{ backgroundColor: '#b8aeae', minWidth: 120 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Unpaid">Unpaid</MenuItem>
        </Select>

        <Box
          display="flex"
          backgroundColor="#b8aeae"
          borderRadius="3px"
          px={1}
          alignItems="center"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {filteredRows.map((row) => (
          <Card key={row.id} sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
            <CardContent>
              <Typography fontWeight="bold">{row.id} -  {row.name}</Typography>
              <Typography variant="body2">📞 {row.phone}</Typography>
              <Typography variant="body2">
                💰 Status:{' '}
                {row.status === 'Paid' ? (
                  <DoneIcon fontSize="small" sx={{ color: 'green' }} />
                ) : (
                  <ClearIcon fontSize="small" sx={{ color: 'red' }} />
                )}{' '}
                {row.status}
              </Typography>
              <Typography variant="body2">
                📅 Last Paid: {row.lastPaidDate || 'N/A'}
              </Typography>
              <Typography variant="body2">
                ❌ Unpaid For: {row.unpaidFor} month(s)
              </Typography>

              <Divider sx={{ my: 1, backgroundColor: '#555' }} />

              <Box display="flex" gap={1} flexWrap="wrap">
                {row.status === 'Unpaid' ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleMarkAsPaid(row.id)}
                    startIcon={<CurrencyRupeeIcon />}
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                  >
                    Mark as Paid
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() => handleUndo(row.id)}
                    startIcon={<UndoIcon />}
                    sx={{ color: 'white'}}
                  >
                    Undo
                  </Button>
                )}

                <Button
                  size="small"
                  onClick={() => handleDelete(row.id)}
                  startIcon={<DeleteForeverIcon />}
                  sx={{
                    color: 'white',
                  }}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MemberTableMobile;