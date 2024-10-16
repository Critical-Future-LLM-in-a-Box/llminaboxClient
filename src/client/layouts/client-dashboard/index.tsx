import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box
} from "@mui/material";

interface MessageHistory {
  text: string;
  timestamp: string;
}

interface Assistant {
  name: string;
  description: string;
  voice: string;
  avatar: string | null;
  messageHistory: MessageHistory[];
}

export default function Dashboard() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Dummy data for message history
  const dummyMessageHistory: MessageHistory[] = [
    {
      text: "Hello, how can I assist you today?",
      timestamp: "2024-10-01 10:00"
    },
    { text: "Please provide more details.", timestamp: "2024-10-01 10:05" },
    { text: "Thank you! Have a great day!", timestamp: "2024-10-01 10:10" }
  ];

  // Add dummy data for assistants
  useEffect(() => {
    const dummyData: Assistant[] = [
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

  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, []);

  return (
    <Box p={3}>
      {/* Assistants List */}
      <Box>
        <Card sx={{ maxHeight: "500px", overflowY: "auto" }}>
          <CardContent>
            <Box mb={2}>
              <Typography variant="h5">Created Assistants</Typography>
            </Box>

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
      </Box>
    </Box>
  );
}
