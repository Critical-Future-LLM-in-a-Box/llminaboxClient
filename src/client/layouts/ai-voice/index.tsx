import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";

const AIVoice = () => {
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");

  // Sample list of assistants (replace with dynamic data as needed)
  const assistants = [
    { id: "assistant1", name: "Assistant 1" },
    { id: "assistant2", name: "Assistant 2" },
    { id: "assistant3", name: "Assistant 3" }
  ];

  // Sample list of voices with audio file paths for preview (replace with real files)
  const voices = [
    {
      label: "Voice 1 - Calm",
      value: "voice1",
      previewUrl: "/audio/voice1.mp3"
    },
    {
      label: "Voice 2 - Friendly",
      value: "voice2",
      previewUrl: "/audio/voice2.mp3"
    },
    {
      label: "Voice 3 - Assertive",
      value: "voice3",
      previewUrl: "/audio/voice3.mp3"
    }
  ];

  const handleAssistantChange = (event: SelectChangeEvent<string>) => {
    setSelectedAssistant(event.target.value as string);
    setSelectedVoice(""); // Reset voice when switching assistants
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVoice(event.target.value);
  };

  // Play audio preview for selected voice
  const handlePreview = () => {
    const voice = voices.find((v) => v.value === selectedVoice);
    if (voice) {
      const audio = new Audio(voice.previewUrl);
      audio.play();
    }
  };

  const handleSave = () => {
    // Save functionality, e.g., send selected voice to an API
    console.log("Selected Assistant:", selectedAssistant);
    console.log("Selected Voice:", selectedVoice);
  };

  return (
    <Box p={3}>
      {/* Assistant Selector */}
      <FormControl
        fullWidth
        sx={{ mb: 3 }}
      >
        <InputLabel>Select AI Assistant</InputLabel>
        <Select
          value={selectedAssistant}
          onChange={handleAssistantChange}
          label="Select AI Assistant"
        >
          {assistants.map((assistant) => (
            <MenuItem
              key={assistant.id}
              value={assistant.id}
            >
              {assistant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant="h4"
        mb={2}
      >
        AI Voice
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        Choose a voice for your AI assistant. Select and preview available
        voices below.
      </Typography>

      <FormControl
        component="fieldset"
        fullWidth
      >
        <FormLabel component="legend">Available Voices</FormLabel>
        <RadioGroup
          value={selectedVoice}
          onChange={handleVoiceChange}
        >
          <Grid
            container
            spacing={2}
            sx={{ mt: 1 }}
          >
            {voices.map((voice) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={voice.value}
              >
                <FormControlLabel
                  value={voice.value}
                  control={<Radio />}
                  label={voice.label}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>

      {/* Preview and Save Buttons */}
      <Box
        mt={3}
        display="flex"
        gap={2}
      >
        <Button
          variant="outlined"
          onClick={handlePreview}
          disabled={!selectedVoice}
        >
          Preview Voice
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!selectedAssistant || !selectedVoice} // Disable if no assistant or voice selected
        >
          Save Selected Voice
        </Button>
      </Box>
    </Box>
  );
};

export default AIVoice;
