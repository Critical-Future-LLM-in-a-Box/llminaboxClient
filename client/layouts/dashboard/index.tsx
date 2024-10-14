import React, { useState, useEffect } from "react";
import {
  Grid,
  MenuItem,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box
} from "@mui/material";
import { Edit, Delete, Message } from "@mui/icons-material";

import MDBox from "@/client/components/MDBox";
import MDButton from "@/client/components/MDButton";
import MDInput from "@/client/components/MDInput";
import MDAvatar from "@/client/components/MDAvatar";

import DashboardLayout from "@/client/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/client/examples/Navbars/DashboardNavbar";
import Footer from "@/client/examples/Footer";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [voice, setVoice] = useState("Google US English");
  const [avatar, setAvatar] = useState(null);
  const [assistants, setAssistants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);

  // Dummy data for message history
  const dummyMessageHistory = [
    {
      text: "Hello, how can I assist you today?",
      timestamp: "2024-10-01 10:00"
    },
    { text: "Please provide more details.", timestamp: "2024-10-01 10:05" },
    { text: "Thank you! Have a great day!", timestamp: "2024-10-01 10:10" }
  ];

  // Add dummy data for assistants
  useEffect(() => {
    const dummyData = [
      {
        name: "Assistant 1",
        description: "This is the first assistant",
        voice: "Google US English",
        avatar: "https://via.placeholder.com/80",
        messageHistory: dummyMessageHistory
      },
      {
        name: "Assistant 2",
        description: "This is the second assistant",
        voice: "Google UK English",
        avatar: "https://via.placeholder.com/80",
        messageHistory: dummyMessageHistory
      },
      {
        name: "Assistant 3",
        description: "This is the third assistant",
        voice: "Google US English",
        avatar: "https://via.placeholder.com/80",
        messageHistory: dummyMessageHistory
      }
    ];

    setAssistants(dummyData);
  }, []);

  const handleCreateOrUpdateAssistant = () => {
    const newAssistant = {
      name,
      description,
      voice,
      avatar,
      messageHistory: dummyMessageHistory
    };

    if (isEditing) {
      const updatedAssistants = assistants.map((assistant, index) =>
        index === currentIndex ? newAssistant : assistant
      );
      setAssistants(updatedAssistants);
    } else {
      setAssistants([...assistants, newAssistant]);
    }

    setOpen(false);
    resetForm();
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditAssistant = (index) => {
    const assistant = assistants[index];
    setName(assistant.name);
    setDescription(assistant.description);
    setVoice(assistant.voice);
    setAvatar(assistant.avatar);
    setCurrentIndex(index);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteAssistant = (index) => {
    const updatedAssistants = assistants.filter((_, i) => i !== index);
    setAssistants(updatedAssistants);
  };

  const handleShowMessages = (index) => {
    const assistant = assistants[index];
    setMessageHistory(assistant.messageHistory);
    setOpenMessages(true);
  };

  const handleClickOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenMessages(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setVoice("Google US English");
    setAvatar(null);
    setIsEditing(false);
    setCurrentIndex(null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <MDButton
          color="info"
          onClick={handleClickOpen}
        >
          Create New Assistant
        </MDButton>

        {/* Assistants List */}
        <MDBox mt={4}>
          <Card sx={{ maxHeight: "500px", overflowY: "auto" }}>
            <CardContent>
              <MDBox mb={2}>
                <Typography variant="h5">Created Assistants</Typography>
              </MDBox>

              <List>
                {assistants.map((assistant, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          onClick={() => handleShowMessages(index)}
                        >
                          <Message />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleEditAssistant(index)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteAssistant(index)}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={assistant.name}
                        src={assistant.avatar || ""}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={assistant.name}
                      secondary={`${assistant.description} | Voice: ${assistant.voice}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </MDBox>

        {/* Create / Edit Assistant Modal */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {isEditing ? "Edit Assistant" : "Create Assistant"}
          </DialogTitle>
          <DialogContent>
            <MDBox mb={2}>
              <MDInput
                label="Assistant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter assistant name"
                fullWidth
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                label="Assistant Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                fullWidth
                multiline
                rows={4}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                label="Voice Name"
                select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                fullWidth
              >
                <MenuItem value="Google US English">Google US English</MenuItem>
                <MenuItem value="Google UK English">Google UK English</MenuItem>
              </MDInput>
            </MDBox>

            <MDBox
              mb={2}
              display="flex"
              justifyContent="center"
            >
              {avatar ? (
                <MDAvatar
                  alt="Assistant Avatar"
                  src={avatar}
                  sx={{ width: 80, height: 80 }}
                />
              ) : (
                <Avatar sx={{ width: 80, height: 80 }}>A</Avatar>
              )}
            </MDBox>

            <MDButton
              component="label"
              color="info"
              variant="contained"
            >
              Upload Avatar
              <input
                accept="image/*"
                type="file"
                hidden
                onChange={handleAvatarUpload}
              />
            </MDButton>
          </DialogContent>
          <DialogActions>
            <MDButton
              onClick={handleClose}
              color="secondary"
            >
              Cancel
            </MDButton>
            <MDButton
              onClick={handleCreateOrUpdateAssistant}
              color="success"
            >
              {isEditing ? "Update" : "Create"}
            </MDButton>
          </DialogActions>
        </Dialog>

        {/* Message History Modal */}
        <Dialog
          open={openMessages}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Message History</DialogTitle>
          <DialogContent>
            {messageHistory.map((message, index) => (
              <Box
                key={index}
                mb={2}
              >
                <Typography variant="body1">{message.text}</Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                >
                  {message.timestamp}
                </Typography>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <MDButton
              onClick={handleClose}
              color="secondary"
            >
              Close
            </MDButton>
          </DialogActions>
        </Dialog>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
