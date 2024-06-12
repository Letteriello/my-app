// src/components/Tasks.js
import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    setTasks([...tasks, task]);
    setTask('');
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Manage Tasks
        </Typography>
        <TextField
          fullWidth
          label="New Task"
          margin="normal"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAddTask}>
          Add Task
        </Button>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Tasks;
