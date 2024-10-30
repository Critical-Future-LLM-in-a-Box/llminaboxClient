import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";

const AIFace = () => {
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [avatarType, setAvatarType] = useState("static");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  // Sample list of assistants (replace with dynamic data as needed)
  const assistants = [
    { id: "assistant1", name: "Assistant 1" },
    { id: "assistant2", name: "Assistant 2" },
    { id: "assistant3", name: "Assistant 3" }
  ];

  // List of sample avatars (replace with actual images as needed)
  const staticAvatars = [
    "/avatars/static1.png",
    "/avatars/static2.png",
    "/avatars/static3.png"
  ];

  const interactiveAvatars = [
    "/avatars/interactive1.gif",
    "/avatars/interactive2.gif",
    "/avatars/interactive3.gif"
  ];

  const handleAssistantChange = (event: SelectChangeEvent<string>) => {
    setSelectedAssistant(event.target.value as string);
    setSelectedAvatar(null); // Clear selected avatar when switching assistants
  };

  const handleAvatarTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    if (newType) {
      setAvatarType(newType);
      setSelectedAvatar(null); // Clear selection on type change
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleSave = () => {
    // Save functionality (e.g., send selected avatar to an API)
    console.log("Selected Assistant:", selectedAssistant);
    console.log("Selected Avatar:", selectedAvatar);
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
        AI Face
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        Choose an avatar for your AI assistant. Select either a static or
        dynamic avatar below.
      </Typography>

      {/* Toggle for selecting Static or Interactive avatars */}
      <ToggleButtonGroup
        value={avatarType}
        exclusive
        onChange={handleAvatarTypeChange}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="static">Static Avatars</ToggleButton>
        <ToggleButton value="interactive">Interactive Avatars</ToggleButton>
      </ToggleButtonGroup>

      {/* Avatar selection grid */}
      <Grid
        container
        spacing={2}
      >
        {(avatarType === "static" ? staticAvatars : interactiveAvatars).map(
          (avatar, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={index}
            >
              <Box
                onClick={() => handleAvatarSelect(avatar)}
                sx={{
                  cursor: "pointer",
                  border:
                    selectedAvatar === avatar
                      ? "2px solid primary.main"
                      : "2px solid transparent",
                  borderRadius: "50%",
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Avatar
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
            </Grid>
          )
        )}
      </Grid>

      {/* Save Button */}
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!selectedAssistant || !selectedAvatar} // Disable if no assistant or avatar selected
        >
          Save Selected Avatar
        </Button>
      </Box>
    </Box>
  );
};

export default AIFace;
