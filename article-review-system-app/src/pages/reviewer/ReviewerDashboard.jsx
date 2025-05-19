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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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

function ReviewerDashboard() {
    const [value, setValue] = useState(0);
    const [articles, setArticles] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        comments: '',
        status: ''
    });
    const [error, setError] = useState('');
    const [profile, setProfile] = useState({
        username: '',
        email: '',
    });

    useEffect(() => {
        fetchProfile();
        fetchArticles();
        fetchMyReviews();
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
            const response = await axios.get('http://localhost:5065/api/reviews/available-articles', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticles(response.data);
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Failed to fetch articles');
        }
    };

    const fetchMyReviews = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5065/api/reviews', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyReviews(response.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Failed to fetch reviews');
        }
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenReviewDialog = (article) => {
        setSelectedArticle(article);
        setOpenReviewDialog(true);
    };

    const handleCloseReviewDialog = () => {
        setSelectedArticle(null);
        setOpenReviewDialog(false);
        setReviewForm({ comments: '', status: '' });
    };

    const handleSubmitReview = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5065/api/reviews`, {
                articleId: selectedArticle.id,
                content: reviewForm.comments,
                status: reviewForm.status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            handleCloseReviewDialog();
            fetchArticles();
            fetchMyReviews();
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Failed to submit review');
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
            default:
                return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} centered>
                    <Tab label="Profile" />
                    <Tab label="Available Articles" />
                    <Tab label="My Reviews" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <ProfileTab profile={profile} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Grid container spacing={3}>
                        {articles.map((article) => (
                            <Grid item xs={12} md={6} key={article.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {article.title}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Author: {article.authorName}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Submitted: {new Date(article.submissionDate).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpenReviewDialog(article)}
                                        >
                                            Review Article
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <List>
                        {myReviews.map((review) => (
                            <ListItem key={review.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ width: '100%', mb: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {review.articleTitle}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Author: {review.authorName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Review Date: {new Date(review.reviewDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
                                        Your Review: {review.content}
                                    </Typography>
                                    <Chip
                                        label={review.status}
                                        color={getStatusColor(review.status)}
                                        sx={{ mt: 1 }}
                                    />
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>
            </Paper>

            <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog} maxWidth="md" fullWidth>
                <DialogTitle>Review Article</DialogTitle>
                <DialogContent>
                    {selectedArticle && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                {selectedArticle.title}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Author: {selectedArticle.authorName}
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Review Comments"
                                value={reviewForm.comments}
                                onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={reviewForm.status}
                                    onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                                    label="Status"
                                >
                                    <MenuItem value="accepted">Accept</MenuItem>
                                    <MenuItem value="rejected">Reject</MenuItem>
                                    <MenuItem value="revision">Revision Required</MenuItem>
                                </Select>
                            </FormControl>
                            {error && (
                                <Typography color="error" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReviewDialog}>Cancel</Button>
                    <Button
                        onClick={handleSubmitReview}
                        color="primary"
                        disabled={!reviewForm.comments || !reviewForm.status}
                    >
                        Submit Review
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ReviewerDashboard; 