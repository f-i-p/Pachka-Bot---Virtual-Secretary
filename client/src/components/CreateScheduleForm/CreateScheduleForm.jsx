import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, TextField, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axiosInstance from '../../axiosInstance';

export default function CreateScheduleModal() {
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [formData, setFormData] = useState({
    channelId: '',
    dayOfWeek: 'Monday',
    time: '',
    message: '',
    frequency: 'Daily',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosInstance.get('/channels');
        setChannels(response.data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    fetchChannels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/schedules', formData);
      alert('Schedule created successfully');
      handleClose();
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  return (
    <div>
      <Button variant="contained"  sx={{
    mt: 3,
    backgroundColor: '#ff9900',
    color: '#fff', 
    '&:hover': {
      backgroundColor: '#ff9900',
    },
  }} onClick={handleOpen}>
        Create New Task
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography id="modal-title" component="h2" variant="h5" sx={{ mb: 2 }}>
              Create New Task
            </Typography>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="channel-label">Channel</InputLabel>
              <Select
                labelId="channel-label"
                id="channelId"
                name="channelId"
                value={formData.channelId}
                onChange={handleChange}
                label="Channel"
                required
              >
                {channels.map((channel) => (
                  <MenuItem key={channel.id} value={channel.id}>
                    {channel.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="dayOfWeek-label">Day of Week</InputLabel>
              <Select
                labelId="dayOfWeek-label"
                id="dayOfWeek"
                name="dayOfWeek"
                value={formData.dayOfWeek}
                onChange={handleChange}
                label="Day of Week"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Time"
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
              label="Message"
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
              <InputLabel id="frequency-label">Frequency</InputLabel>
              <Select
                labelId="frequency-label"
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                label="Frequency"
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
              Create Task
            </Button>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}
