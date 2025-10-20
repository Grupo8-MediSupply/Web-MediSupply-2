import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Roles } from '../../constants/auth';

/**
 * Component that conditionally renders children based on user role
 * @param {Object} props - Component props
 * @param {Array|String} props.roles - Role(s) allowed to see the content
 * @param {boolean} props.inclusive - If true, user must have ALL roles; if false, ANY role is enough
 * @param {React.ReactNode} props.children - Content to show for authorized users
 * @param {React.ReactNode} props.fallback - Content to show for unauthorized users
 * @returns {React.ReactNode} - The appropriate content based on user role
 */
const RoleBasedComponent = ({ roles, inclusive = false, children, fallback = null }) => {
  const { user } = useSelector(state => state.auth);
  
  // If no user or no role, show fallback
  if (!user || !user.role) {
    return fallback;
  }
  
  // Convert roles to array if it's a string
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  
  // Check if user has the required role(s)
  const hasAccess = inclusive
    ? allowedRoles.every(role => user.role === role)
    : allowedRoles.includes(user.role);
  
  return hasAccess ? children : fallback;
};

RoleBasedComponent.propTypes = {
  roles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  inclusive: PropTypes.bool,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node
};

export default RoleBasedComponent;
