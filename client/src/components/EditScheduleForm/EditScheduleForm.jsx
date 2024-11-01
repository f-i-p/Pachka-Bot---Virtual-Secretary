import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import axiosInstance from "../../axiosInstance";

const EditScheduleModal = ({ open, onClose, schedule, onSave }) => {
  const [channels, setChannels] = useState([]);
  const [formData, setFormData] = useState({
    channelId: 1,
    webhookUrl: "",
    dayOfWeek: "",
    time: "",
    message: "",
    frequency: "",
  });

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosInstance.get("/channels");
        setChannels(response.data);
      } catch (error) {
        console.error("Ошибка при получении каналов:", error);
      }
    };
    fetchChannels();
  }, []);

  useEffect(() => {
    if (schedule) {
      setFormData({
        channelId: schedule.channelId || 1,
        webhookUrl: schedule.webhookUrl || "",
        dayOfWeek: schedule.dayOfWeek || "Понедельник",
        time: schedule.time || "",
        message: schedule.message || "",
        frequency: schedule.frequency || "ежедневно",
      });
    }
  }, [schedule]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/schedules/${schedule.id}`, formData);
      onSave();
      onClose();
    } catch (error) {
      console.error("Ошибка при редактировании расписания:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="sm"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Редактировать расписание
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>

          <FormControl disabled fullWidth sx={{ mb: 2 }}>
            <InputLabel id="webhookUrl-label">Рабочее пространство</InputLabel>
            <Select
              labelId="webhookUrl-label"
              id="webhookUrl"
              name="webhookUrl"
              value={formData.webhookUrl}
              onChange={handleChange}
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

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="dayOfWeek-label">День недели</InputLabel>
            <Select
              labelId="dayOfWeek-label"
              id="dayOfWeek"
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleChange}
              label="День недели"
            >
              {[
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
                "Воскресенье",
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
            required
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="frequency-label">Периодичность</InputLabel>
            <Select
              labelId="frequency-label"
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              label="Периодичность"
            >
              <MenuItem value="каждые 5 секунд">каждые 5 секунд</MenuItem>
              <MenuItem value="каждые 30 секунд">каждые 30 секунд</MenuItem>
              <MenuItem value="каждый час">каждый час</MenuItem>
              <MenuItem value="ежедневно">ежедневно</MenuItem>
              <MenuItem value="ежемесячно">ежемесячно</MenuItem>
              <MenuItem value="ежегодно">ежегодно</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Сохранить
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default EditScheduleModal;