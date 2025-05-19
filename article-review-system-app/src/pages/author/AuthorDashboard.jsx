import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Tabs,
    Tab,
    Box,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardContent,
    CardActions,
    Grid,
    Chip,
} from '@mui/material';
import axios from 'axios';
import ProfileTab from '../../components/ProfileTab';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function AuthorDashboard() {
    const [value, setValue] = useState(0);
    const [articles, setArticles] = useState([]);
    const [openNewArticleDialog, setOpenNewArticleDialog] = useState(false);
    const [articleForm, setArticleForm] = useState({
        title: '',
        file: null
    });
    const [error, setError] = useState('');
    const [profile, setProfile] = useState({
        username: '',
        email: '',
    });

    useEffect(() => {
        fetchProfile();
        fetchArticles();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5065/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to fetch profile');
        }
    };

    const fetchArticles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5065/api/articles', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticles(response.data);
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Failed to fetch articles');
        }
    };

    const handleOpenNewArticleDialog = () => {
        setArticleForm({ title: '', file: null });
        setOpenNewArticleDialog(true);
    };

    const handleCloseNewArticleDialog = () => {
        setArticleForm({ title: '', file: null });
        setOpenNewArticleDialog(false);
    };

    const handleFileChange = (event) => {
        setArticleForm({ ...articleForm, file: event.target.files[0] });
    };

    const handleSubmitNewArticle = async () => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', articleForm.title);
            if (articleForm.file) {
                formData.append('file', articleForm.file);
            }

            const response = await axios.post('http://localhost:5065/api/articles', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200 || response.status === 201) {
                handleCloseNewArticleDialog();
                fetchArticles();
            }
        } catch (err) {
            console.error('Error creating article:', err);
            if (err.response?.data) {
                setError(typeof err.response.data === 'string' ?
                    err.response.data :
                    JSON.stringify(err.response.data, null, 2));
            } else {
                setError('Failed to create article. Please try again.');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            case 'revision':
                return 'warning';
            case 'pending':
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} centered>
                    <Tab label="Profile" />
                    <Tab label="My Articles" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <ProfileTab profile={profile} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenNewArticleDialog}
                        >
                            Submit New Article
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {articles.map((article) => (
                            <Grid item xs={12} md={6} key={article.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {article.title}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Submitted: {new Date(article.submissionDate).toLocaleDateString()}
                                        </Typography>
                                        <Box sx={{ mt: 1, mb: 2 }}>
                                            <Chip
                                                label={article.status}
                                                color={getStatusColor(article.status)}
                                            />
                                        </Box>
                                        {article.reviews && article.reviews.length > 0 && (
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                                    Review Comments:
                                                </Typography>
                                                {article.reviews.map((review, index) => (
                                                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                                            Review Date: {new Date(review.reviewDate).toLocaleDateString()}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {review.content}
                                                        </Typography>
                                                        <Chip
                                                            size="small"
                                                            label={review.status}
                                                            color={getStatusColor(review.status)}
                                                            sx={{ mt: 1 }}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </Paper>

            {/* New Article Dialog */}
            <Dialog open={openNewArticleDialog} onClose={handleCloseNewArticleDialog} maxWidth="md" fullWidth>
                <DialogTitle>Submit New Article</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        margin="normal"
                    />
                    <input
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }}>
                            Upload Article File
                        </Button>
                    </label>
                    {articleForm.file && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Selected file: {articleForm.file.name}
                        </Typography>
                    )}
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewArticleDialog}>Cancel</Button>
                    <Button
                        onClick={handleSubmitNewArticle}
                        color="primary"
                        disabled={!articleForm.title || !articleForm.file}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default AuthorDashboard; 