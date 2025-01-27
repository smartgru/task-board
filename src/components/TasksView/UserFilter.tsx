import React, { useState } from 'react';
import { AvatarGroup } from '@mui/material';

import { User } from '../../support/api/models';
import Avatar from '../Avatar';

interface IProps {
  users?: User[];
  selectedUser?: User | null;
  onSelect: (user: User | null) => void;
}

const UserFilter: React.FC<IProps> = ({ users, selectedUser, onSelect }) => {
  const [showSurplus, setShowSurplus] = useState(false);

  const handleClick = (user: User) => {
    if (user.id === selectedUser?.id) {
      onSelect(null);
    } else {
      onSelect(user);
    }
  };
  return (
    <AvatarGroup
      max={showSurplus ? users?.length : 5}
      slotProps={{
        surplus: {
          sx: { width: 32, height: 32 },
          onClick: () => setShowSurplus(!showSurplus),
        },
      }}
    >
      {users?.map((user) => (
        <Avatar
          key={user.id}
          sx={{
            height: 32,
            width: 32,
            '&.MuiAvatar-root': {
              borderColor:
                user.id === selectedUser?.id ? 'primary.main' : '#fff',
            },
          }}
          user={user}
          onClick={() => handleClick(user)}
        />
      ))}
    </AvatarGroup>
  );
};

export default UserFilter;
