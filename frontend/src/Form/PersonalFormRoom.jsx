import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import '../css/personalFormRoom.css';

const PersonalFormRoom = () => {
  const { mutate } = useSWRConfig();
  const [formData, setFormData] = useState({
    roomCode: '',
    name: '',
    skill: '',
    partner: '',
    isStaying: '', // Initialize with an empty string
    preference: '',
  });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { roomCode, name, skill, isStaying, preference } = formData;
    if (!roomCode || !name || !skill || !isStaying || !preference) {
      alert('Please fill in the required fields.');
      return;
    }
    try {
      const response = await fetch('/api/player/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isStaying: isStaying === 'Yes', // Convert to boolean if needed by backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      console.log('Form data submitted successfully:', data);
      setFeedback(data.message);

      // Revalidate the data in RoomParent
      mutate(`/api/room/all/${roomCode}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle the error appropriately
    }
  };

  return (
    <Box id="formContainer" sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Personal Form Room
      </Typography>
      <form onSubmit={handleSubmit} id="responseForm">
        <FormControl fullWidth margin="normal">
          <TextField
            label="Room Code"
            variant="outlined"
            name="roomCode"
            value={formData.roomCode}
            onChange={handleChange}
            required
            helperText={'Your room-runner should have given you this code.'}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            helperText="If with a partner, list each other in the partner section exactly (case insensitive)."
          />
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Skill Level*</FormLabel>
          <RadioGroup name="skill" value={formData.skill} onChange={handleChange} className="radioGroup">
            <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
            <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
            <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
          </RadioGroup>
          <FormHelperText> You will be generally placed with people around your skill, if possible. Completely Subjective. </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Partner"
            variant="outlined"
            name="partner"
            value={formData.partner}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Can you stay (basically) the whole round?*</FormLabel>
          <RadioGroup name="isStaying" value={formData.isStaying} onChange={handleChange} className="radioGroup">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText> WARNING: if not, you will be placed as a judge. </FormHelperText>
        </FormControl>
        <br />

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Debate or Judge Preference</FormLabel>
          <RadioGroup name="preference" value={formData.preference} onChange={handleChange} className="radioGroup">
            <FormControlLabel value="Debate" control={<Radio />} label="Debate" />
            <FormControlLabel value="Judge" control={<Radio />} label="Judge" />
            <FormControlLabel value="Either" control={<Radio />} label="Either" />
          </RadioGroup>
          <FormHelperText> No guarantees, just preferences! </FormHelperText>
        </FormControl>

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      <div>
        <p>{feedback}</p>
      </div>
    </Box>
  );
};

export default PersonalFormRoom;
