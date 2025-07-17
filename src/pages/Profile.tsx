// Profile page
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          User profile settings and preferences will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
