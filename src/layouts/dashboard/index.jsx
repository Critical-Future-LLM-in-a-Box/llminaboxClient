import React, { useState } from "react";
import {
  Grid,
  MenuItem,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@mui/material";

import MDBox from "@/components/MDBox";
import MDButton from "@/components/MDButton";
import MDInput from "@/components/MDInput";
import MDAvatar from "@/components/MDAvatar";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [voice, setVoice] = useState("Google US English");
  const [avatar, setAvatar] = useState(null);
  const [assistants, setAssistants] = useState([]);

  const handleCreateAssistant = () => {
    const newAssistant = { name, description, voice, avatar };
    setAssistants([...assistants, newAssistant]);
    setName("");
    setDescription("");
    setVoice("Google US English");
    setAvatar(null);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <Grid
          container
          spacing={3}
          alignItems="center"
        >
          {/* Name and Description */}
          <Grid
            item
            xs={12}
            md={8}
          >
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 3,
                  gap: 3
                }}
              >
                <MDBox>
                  <MDInput
                    label="Assistant Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter assistant name"
                    fullWidth
                  />
                </MDBox>

                <MDBox>
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

                <MDBox>
                  <MDInput
                    label="Voice Name"
                    select
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    fullWidth
                    placeholder="Select voice name"
                    sx={{ "& div": { padding: "16px" } }}
                  >
                    <MenuItem value="Google US English">
                      Google US English
                    </MenuItem>
                  </MDInput>
                </MDBox>
              </CardContent>
            </Card>
          </Grid>

          {/* Avatar Upload Section */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <MDBox
                  mb={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <MDBox
          mt={4}
          display="flex"
          justifyContent="center"
        >
          <MDButton
            color="success"
            size="large"
            onClick={handleCreateAssistant}
          >
            Create Assistant
          </MDButton>
        </MDBox>

        {/* List of Created Assistants */}
        <MDBox mt={4}>
          <Card>
            <CardContent>
              <MDBox mb={2}>
                <h3>Created Assistants</h3>
              </MDBox>

              <List>
                {assistants.map((assistant, index) => (
                  <ListItem key={index}>
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
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
