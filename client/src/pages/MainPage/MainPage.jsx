import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    MenuItem,
    Button,
    Select,
    TextField,
} from '@mui/material'
import CreateScheduleModal from '../../components/CreateScheduleForm/CreateScheduleForm'
import EditScheduleModal from '../../components/EditScheduleForm/EditScheduleForm'
import axios from 'axios'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [editData, setEditData] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [channel, setChannel] = useState('') // Webhook URL
    const [message, setMessage] = useState('') // Сообщение
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => {
        fetchSchedules()
    }, [])

    const fetchSchedules = async () => {
        try {
            const response = await axiosInstance.get('/schedules/')
            if (Array.isArray(response.data)) {
                setData(response.data)
            } else {
                console.error('Expected an array but received:', response.data)
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/schedules/${id}`)
            setData(data.filter((row) => row.id !== id))
        } catch (error) {
            console.error('Ошибка при удалении:', error)
        }
    }

    const handleEditOpen = (rowData) => {
        setEditData(rowData)
        setIsEditOpen(true)
    }

    const handleEditClose = () => {
        setIsEditOpen(false)
        setEditData(null)
    }

    const sendUserMessage = async () => {
        if (!channel || !message) {
            setResponseMessage('Channel and message are required.')
            return
        }

        const messageData = {
            message: {
                content: message,
                files: [],
            },
        }

        try {
            const response = await axios.post(channel, messageData)
            setResponseMessage('Сообщение отправлено: ' + response.data)
        } catch (error) {
            setResponseMessage(
                'Ошибка при отправке сообщения: ' + error.message
            )
            console.error('Error sending message:', error)
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            style={{ padding: '20px' }}
        >
            <Box
                component={Paper}
                sx={{
                    width: '100%',
                    maxWidth: 1900,
                    borderRadius: 2,
                    marginRight: '20px',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    style={{ margin: '20px', color: '#ff9900' }}
                >
                    Панель управления расписаниями
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow
                            style={{
                                backgroundColor: '#ff9900',
                                color: '#FFFFFF',
                            }}
                        >
                            <TableCell
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                }}
                            >
                                ID канала
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                }}
                            >
                                День недели
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                }}
                            >
                                Время
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                }}
                            >
                                Сообщение
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                }}
                            >
                                Периодичность
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                }}
                            >
                                Действия
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {row.channelId}
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {row.dayOfWeek}
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {row.time}
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {row.message}
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {row.frequency}
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditOpen(row)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box display="flex" flexDirection="column" sx={{ maxWidth: 300 }}>
                <CreateScheduleModal />
                <Typography variant="h6" style={{ marginTop: 20 }}>
                    Выберите канал и введите сообщение:
                </Typography>
                <Select
                    labelId="webhook-select-label"
                    id="webhook-select"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem
                        value={
                            'https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY'
                        }
                    >
                        Webhook 1
                    </MenuItem>
                    <MenuItem
                        value={
                            'https://api.pachca.com/webhooks/01JBKDPCZQFMXH3EJ498YNVT3F'
                        }
                    >
                        Webhook 2
                    </MenuItem>
                </Select>
                <TextField
                    label="Введите сообщение"
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendUserMessage}
                    sx={{ marginTop: 2 }}
                >
                    Отправить сообщение
                </Button>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginTop: 10 }}
                >
                    {responseMessage}
                </Typography>
            </Box>
            {isEditOpen && (
                <EditScheduleModal
                    open={isEditOpen}
                    onClose={handleEditClose}
                    schedule={editData}
                    onSave={fetchSchedules}
                />
            )}
        </Box>
    )
}

export default Dashboard
