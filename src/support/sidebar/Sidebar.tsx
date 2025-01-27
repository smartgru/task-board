import React from 'react';
import { StyledNavbarLink } from './wrappers.ts';

/**
 * Sidebar
 */
export const Sidebar: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(0,0,0,.3)',
      padding: '1em',
      gap: '1em',
    }}
  >
    <h1>Transcend Task Management</h1>
    <StyledNavbarLink href="/" current={window.location.pathname === '/'}>
      <i className="fa fa-list-check" />
      <span>Tasks</span>
    </StyledNavbarLink>
    <StyledNavbarLink
      href="/users"
      current={window.location.pathname === '/users'}
    >
      <i className="fa fa-user" />
      <span>Users</span>
    </StyledNavbarLink>
  </div>
);
