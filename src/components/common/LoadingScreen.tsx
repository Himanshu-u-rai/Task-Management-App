import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Fade,
  LinearProgress,
} from '@mui/material';
import { keyframes } from '@mui/system';

// Animation for the loading dots
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
  showProgress?: boolean;
  fullScreen?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  submessage,
  showProgress = false,
  fullScreen = false,
}) => {
  const containerProps = fullScreen
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'background.default',
      }
    : {
        height: '100%',
        minHeight: 400,
      };

  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          ...containerProps,
        }}
      >
        {/* Animated Loading Spinner */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: 'primary.main',
              animationDuration: '1.5s',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={25}
              size={60}
              thickness={4}
              sx={{
                color: 'primary.light',
                opacity: 0.3,
                transform: 'rotate(-90deg)',
              }}
            />
          </Box>
        </Box>

        {/* Loading Message */}
        <Typography
          variant="h6"
          fontWeight="medium"
          sx={{
            mb: 1,
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>

        {/* Sub-message */}
        {submessage && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              mb: 3,
              maxWidth: 300,
            }}
          >
            {submessage}
          </Typography>
        )}

        {/* Animated Dots */}
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            mb: showProgress ? 3 : 0,
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                animation: `${bounce} 1.4s infinite ease-in-out`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </Box>

        {/* Progress Bar */}
        {showProgress && (
          <Box sx={{ width: 300, mt: 2 }}>
            <LinearProgress
              variant="indeterminate"
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Fade>
  );
};

// Smaller loading component for inline use
export const InlineLoader: React.FC<{ size?: number; message?: string }> = ({
  size = 24,
  message,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 2,
      }}
    >
      <CircularProgress size={size} thickness={4} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

// Page transition component
export const PageTransition: React.FC<{
  children: React.ReactNode;
  loading?: boolean;
  loadingMessage?: string;
}> = ({ children, loading = false, loadingMessage = 'Loading page...' }) => {
  if (loading) {
    return <LoadingScreen message={loadingMessage} fullScreen />;
  }

  return (
    <Fade in timeout={500}>
      <Box>{children}</Box>
    </Fade>
  );
};
