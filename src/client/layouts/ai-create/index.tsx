import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const CreateAI = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submit functionality, such as sending the form data to an API.
    console.log({
      name,
      description
    });
  };

  return (
    <Box
      p={3}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        mb={2}
      >
        Create AI Assistant
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        Complete the form below to create a customized AI assistant.
      </Typography>

      <Grid
        container
        spacing={2}
      >
        {/* Assistant Name */}
        <Grid
          item
          xs={12}
        >
          <TextField
            label="Assistant Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>

        {/* Description */}
        <Grid
          item
          xs={12}
        >
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        {/* Submit Button */}
        <Grid
          item
          xs={12}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Create Assistant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateAI;
