import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Paper,
    Grid,
    Divider,
} from '@mui/material';

function ProfileTab({ profile }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', p: 3 }}>
            <Paper elevation={3} sx={{ maxWidth: 800, width: '100%', p: 4 }}>
                <Grid container spacing={4}>
                    {/* Profile Header */}
                    <Grid item xs={12} container spacing={3} alignItems="center">
                        <Grid item>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    bgcolor: 'primary.main',
                                    fontSize: '3rem',
                                    border: '4px solid #fff',
                                    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                                }}
                            >
                                {profile.username?.[0]?.toUpperCase() || 'U'}
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {profile.username}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                                {profile.email}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Role: {localStorage.getItem('userRole')}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    {/* About Section */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            About Me
                        </Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            Welcome to my profile! I am a passionate contributor to the Article Review System.
                            Here you can find my articles and reviews, helping to maintain high-quality academic standards.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default ProfileTab; 