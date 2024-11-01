import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CreateScheduleModal from "../../components/CreateScheduleForm/CreateScheduleForm";
import EditScheduleModal from "../../components/EditScheduleForm/EditScheduleForm"; 

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axiosInstance.get("/schedules/");
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/schedules/${id}`);
      setData(data.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const handleEditOpen = (rowData) => {
    setEditData(rowData);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditData(null);
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-evenly" style={{ padding: "20px" }}>
      <Box component={Paper} sx={{ width: "100%", maxWidth: 1900, borderRadius: 2, marginRight: "20px" }}>
        <Typography variant="h4" align="center" style={{ margin: "20px", color: "#ff9900" }}>
          Панель управления расписаниями
        </Typography>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ff9900", color: "#FFFFFF" }}>
              <TableCell style={{ fontWeight: "bold", textAlign:"center", color: "#FFFFFF" }}>ID канала</TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign:"center", color: "#FFFFFF" }}>День недели</TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign:"center", color: "#FFFFFF" }}>Время</TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign:"center", color: "#FFFFFF" }}>Сообщение</TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign:"center", color: "#FFFFFF" }}>Периодичность</TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign:"center", color: "#FFFFFF" }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{ textAlign:"center" }}>{row.channelId}</TableCell>
                <TableCell style={{ textAlign:"center" }}>{row.dayOfWeek}</TableCell>
                <TableCell style={{ textAlign:"center" }}>{row.time}</TableCell>
                <TableCell style={{ textAlign:"center" }}>{row.message}</TableCell>
                <TableCell style={{ textAlign:"center" }}>{row.frequency}</TableCell>
                <TableCell style={{ textAlign:"center" }}>
                  <Button variant="contained" color="primary" onClick={() => handleEditOpen(row)} sx={{ marginRight: 1 }}>
                    Редактировать
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box display="flex" flexDirection="column">
        <CreateScheduleModal onTaskCreated={fetchSchedules} />
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
  );
};

export default Dashboard;