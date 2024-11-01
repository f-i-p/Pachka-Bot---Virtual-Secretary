import React, { useState, useEffect } from 'react'
import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
    Container,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material'
import axiosInstance from '../../axiosInstance'

export default function CreateScheduleModal({ onTaskCreated }) {
    const [open, setOpen] = useState(false)
    const [channels, setChannels] = useState([])
    const [formData, setFormData] = useState({
        channelId: 1,
        webhookUrl: '',
        dayOfWeek: 'Понедельник',
        time: '',
        message: '',
        frequency: 'ежедневно',
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axiosInstance.get('/channels')
                setChannels(response.data)
            } catch (error) {
                console.error('Ошибка при получении каналов:', error)
            }
        }
        fetchChannels()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleWebhookChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            webhookUrl: event.target.value,
        }))
        console.log(`Updated webhookUrl:`, event.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/schedules', formData)
            handleClose()
            onTaskCreated() 
        } catch (error) {
            console.error('Ошибка при создании таска:', error)
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                sx={{
                    mt: 3,
                    backgroundColor: '#ff9900',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#ff9900',
                    },
                }}
                onClick={handleOpen}
            >
                Создать новый таск
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        <Typography
                            id="modal-title"
                            component="h2"
                            variant="h5"
                            sx={{ mb: 2 }}
                        >
                            Создать новый таск
                        </Typography>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="channel-label">
                                Рабочее пространство
                            </InputLabel>
                            <Select
                                labelId="channel-label"
                                id="webhookUrl"
                                name="webhookUrl"
                                value={formData.webhookUrl}
                                onChange={handleWebhookChange}
                                label="Рабочее пространство"
                                required
                            >
                                <MenuItem value="https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY">
                                    Роза
                                </MenuItem>
                                <MenuItem value="https://api.pachca.com/webhooks/01JBKDPCZQFMXH3EJ498YNVT3F">
                                    Клара
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="dayOfWeek-label">
                                День недели
                            </InputLabel>
                            <Select
                                labelId="dayOfWeek-label"
                                id="dayOfWeek"
                                name="dayOfWeek"
                                value={formData.dayOfWeek}
                                onChange={handleChange}
                                label="День недели"
                            >
                                {[
                                    'Понедельник',
                                    'Вторник',
                                    'Среда',
                                    'Четверг',
                                    'Пятница',
                                    'Суббота',
                                    'Воскресенье',
                                ].map((day) => (
                                    <MenuItem key={day} value={day}>
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Время"
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mt: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300,
                            }}
                            required
                        />

                        <TextField
                            label="Сообщение"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ mt: 2 }}
                            required
                        />

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="frequency-label">
                                Периодичность
                            </InputLabel>
                            <Select
                                labelId="frequency-label"
                                id="frequency"
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleChange}
                                label="Периодичность"
                            >
                                <MenuItem value="каждые 5 секунд">
                                    каждые 5 секунд
                                </MenuItem>
                                <MenuItem value="каждые 30 секунд">
                                    каждые 30 секунд
                                </MenuItem>
                                <MenuItem value="каждый час">
                                    каждый час
                                </MenuItem>
                                <MenuItem value="ежедневно">ежедневно</MenuItem>
                                <MenuItem value="ежемесячно">
                                    ежемесячно
                                </MenuItem>
                                <MenuItem value="ежегодно">ежегодно</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                        >
                            Создать таск
                        </Button>
                    </Box>
                </Container>
            </Modal>
        </div>
    )
}