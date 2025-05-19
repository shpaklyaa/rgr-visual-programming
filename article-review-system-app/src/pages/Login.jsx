import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log('Attempting login with:', { email: emailOrUsername });

            const response = await axios.post('http://localhost:5065/api/auth/login', {
                email: emailOrUsername,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Server response:', response.data);

            if (!response.data || !response.data.token || !response.data.user) {
                setError('Invalid response from server');
                return;
            }

            const { token, user } = response.data;
            const { role } = user;

            if (!role) {
                setError('No role received from server');
                return;
            }

            console.log('Received role:', role);

            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);

            console.log('Navigating to role:', role.toLowerCase());

            switch (role.toLowerCase()) {
                case 'author':
                    navigate('/author', { replace: true });
                    break;
                case 'reviewer':
                    navigate('/reviewer', { replace: true });
                    break;
                case 'admin':
                    navigate('/admin', { replace: true });
                    break;
                default:
                    setError(`Invalid user role: ${role}`);
                    break;
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                console.error('Error response:', err.response.data);
                setError(err.response.data || 'Invalid email/username or password');
            } else if (err.request) {
                setError('No response from server. Please try again.');
            } else {
                setError('Error during login. Please try again.');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="emailOrUsername"
                            label="Email or Username"
                            name="emailOrUsername"
                            autoComplete="email"
                            autoFocus
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login; 