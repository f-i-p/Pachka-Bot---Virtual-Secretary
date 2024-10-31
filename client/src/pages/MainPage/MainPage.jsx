import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/schedules');
                setData(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box>
            
            <Box
                display="flex"
                justifyContent="center"
                style={{ padding: '20px' }}
            >
                <Box
                    component={Paper}
                    sx={{ width: '100%', maxWidth: 900, borderRadius: 2 }}
                >
                    <Typography variant="h4" align="center" style={{ margin: '20px', color: '#3f51b5' }}>
                        Дашборд Расписания
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                                <TableCell style={{ fontWeight: 'bold' }}>Channel ID</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Day of Week</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Time</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Message</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Frequency</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.channelId}</TableCell>
                                    <TableCell>{row.dayOfWeek}</TableCell>
                                    <TableCell>{new Date(row.time).toLocaleString()}</TableCell>
                                    <TableCell>{row.message}</TableCell>
                                    <TableCell>{row.frequency}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;