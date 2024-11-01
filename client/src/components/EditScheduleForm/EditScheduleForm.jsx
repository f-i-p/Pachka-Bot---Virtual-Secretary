import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Typography, TextField, Container } from "@mui/material";
import axiosInstance from "../../axiosInstance";

const EditScheduleModal = ({ open, onClose, schedule, onSave }) => {
  const [formData, setFormData] = useState({
    channelId: "",
    dayOfWeek: "",
    time: "",
    message: "",
    frequency: "",
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        channelId: schedule.channelId || "",
        dayOfWeek: schedule.dayOfWeek || "",
        time: schedule.time || "",
        message: schedule.message || "",
        frequency: schedule.frequency || "",
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
      <Container maxWidth="sm" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Редактировать расписание
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {/* <TextField label="ID канала" name="channelId" value={formData.channelId} disabled fullWidth sx={{ mb: 2 }} required /> */}
          <TextField label="День недели" name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Время" name="time" type="time" value={formData.time} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Сообщение" name="message" value={formData.message} onChange={handleChange} multiline rows={4} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Периодичность" name="frequency" value={formData.frequency} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Сохранить
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default EditScheduleModal;