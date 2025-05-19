import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import axios from 'axios';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function AdminDashboard() {
    const [value, setValue] = useState(0);
    const [users, setUsers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        username: '',
        role: '',
    });

    useEffect(() => {
        fetchUsers();
        fetchArticles();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5065/api/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchArticles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5065/api/articles', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCreateUser = async () => {
        try {
            setError('');
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5065/api/users',
                newUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
            setOpenCreateDialog(false);
            setNewUser({ email: '', password: '', username: '', role: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
            if (error.response?.data) {
                setError(typeof error.response.data === 'string' ? error.response.data : error.response.data.message || 'Failed to create user');
            } else {
                setError('Failed to create user. Please try again.');
            }
        }
    };

    const handleEditUser = async () => {
        try {
            setError('');
            const token = localStorage.getItem('token');

            // Store the old user data in case we need to restore it
            const oldUserData = {
                username: selectedUser.username,
                email: selectedUser.email,
                password: 'defaultPassword123!',
                role: selectedUser.role
            };

            try {
                // Delete the old user first
                await axios.delete(
                    `http://localhost:5065/api/users/${selectedUser.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                // Create new user with updated role
                await axios.post(
                    'http://localhost:5065/api/users',
                    {
                        ...oldUserData,
                        role: selectedUser.role
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                setOpenEditDialog(false);
                setSelectedUser(null);
                fetchUsers();
            } catch (error) {
                // If creating new user fails, try to restore the old user
                try {
                    await axios.post(
                        'http://localhost:5065/api/users',
                        oldUserData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                        }
                    );
                } catch (restoreError) {
                    console.error('Failed to restore user:', restoreError);
                    setError('Critical error: Failed to update user and restore old data. Please refresh the page.');
                    return;
                }
                throw error; // Re-throw the original error
            }
        } catch (error) {
            console.error('Error updating user:', error);
            if (error.response?.data) {
                setError(typeof error.response.data === 'string' ? error.response.data : error.response.data.message || 'Failed to update user');
            } else {
                setError('Failed to update user. Please try again.');
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5065/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleToggleBlockUser = async (userId, isBlocked) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5065/api/users/${userId}/block`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchUsers();
        } catch (error) {
            console.error('Error toggling user block status:', error);
        }
    };

    const handleDeleteArticle = async (articleId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5065/api/articles/${articleId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handleOpenEditDialog = (user) => {
        setSelectedUser({ ...user });
        setOpenEditDialog(true);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Tabs value={value} onChange={handleTabChange} centered>
                    <Tab label="Users" />
                    <Tab label="Articles" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <Box sx={{ mb: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenCreateDialog(true)}
                        >
                            Create User
                        </Button>
                    </Box>
                    <List>
                        {users.map((user) => (
                            <ListItem key={user.id}>
                                <ListItemText
                                    primary={user.username}
                                    secondary={`Email: ${user.email} | Role: ${user.role}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => handleOpenEditDialog(user)}
                                        sx={{ mr: 1 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="block"
                                        onClick={() => handleToggleBlockUser(user.id, user.isBlocked)}
                                        sx={{ mr: 1 }}
                                    >
                                        <BlockIcon color={user.isBlocked ? 'error' : 'disabled'} />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <List>
                        {articles.map((article) => (
                            <ListItem key={article.id}>
                                <ListItemText
                                    primary={article.title}
                                    secondary={`Author: ${article.authorName} | Status: ${article.status} | Submitted: ${new Date(
                                        article.submissionDate
                                    ).toLocaleDateString()}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteArticle(article.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>
            </Paper>

            {/* Create User Dialog */}
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                <DialogTitle>Create New User</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            label="Role"
                        >
                            <MenuItem value="Author">Author</MenuItem>
                            <MenuItem value="Reviewer">Reviewer</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateUser} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Username"
                        value={selectedUser?.username || ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                        margin="normal"
                        disabled
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={selectedUser?.email || ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        margin="normal"
                        disabled
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={selectedUser?.role || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                            label="Role"
                        >
                            <MenuItem value="Author">Author</MenuItem>
                            <MenuItem value="Reviewer">Reviewer</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                        Note: This will create a new user with the same username and email but with a different role.
                        The old user account will be automatically deleted.
                    </Typography>
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleEditUser} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default AdminDashboard; 