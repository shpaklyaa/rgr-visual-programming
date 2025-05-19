import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!userRole || userRole.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.oneOf(['author', 'reviewer', 'admin']).isRequired,
};

export default ProtectedRoute; 