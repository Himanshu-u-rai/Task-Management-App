// Login page component
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Link as MUILink,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { signIn, resetPassword } from '../store/slices/authSlice';
import { LoadingScreen } from '../components/common/LoadingScreen';
import type { RootState, AppDispatch } from '../store';

// Form validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await dispatch(signIn(data)).unwrap();
      // Keep loading screen visible for navigation
      navigate('/dashboard');
    } catch (error) {
      setIsSubmitting(false);
      // Error is handled by Redux
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) return;
    
    try {
      await dispatch(resetPassword(resetEmail)).unwrap();
      setResetSuccess(true);
      setShowForgotPassword(false);
    } catch (error) {
      // Error is handled by Redux
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In
    console.log('Google Sign-In');
  };

  const handleGitHubSignIn = () => {
    // TODO: Implement GitHub Sign-In
    console.log('GitHub Sign-In');
  };

  return (
    <>
      {/* Full screen loading overlay when signing in */}
      {isSubmitting && (
        <LoadingScreen message="Signing you in..." />
      )}
      
      <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your task management account
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Reset Success Alert */}
          {resetSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset email sent! Check your inbox.
            </Alert>
          )}

          {/* Social Login Buttons */}
          <Box mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{ mb: 1.5, py: 1.5 }}
            >
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={handleGitHubSignIn}
              sx={{ py: 1.5 }}
            >
              Continue with GitHub
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or sign in with email
            </Typography>
          </Divider>

          {/* Login Form */}
          {!showForgotPassword ? (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 3 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mb: 2, py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>

              <Box textAlign="center">
                <MUILink
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => setShowForgotPassword(true)}
                  sx={{ textDecoration: 'none' }}
                >
                  Forgot your password?
                </MUILink>
              </Box>
            </Box>
          ) : (
            /* Forgot Password Form */
            <Box>
              <Typography variant="h6" gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Enter your email address and we'll send you a link to reset your password.
              </Typography>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setShowForgotPassword(false)}
                  sx={{ flex: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleForgotPassword}
                  disabled={!resetEmail || loading}
                  sx={{ flex: 1 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                </Button>
              </Box>
            </Box>
          )}

          {/* Sign Up Link */}
          {!showForgotPassword && (
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <MUILink
                  component={Link}
                  to="/register"
                  sx={{ textDecoration: 'none', fontWeight: 500 }}
                >
                  Sign up here
                </MUILink>
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
    </>
  );
};

export default Login;
