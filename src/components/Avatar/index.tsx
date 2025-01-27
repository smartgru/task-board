import React from 'react';
import { User } from '../../support/api/models';
import { Avatar as MUIAvatar, AvatarProps } from '@mui/material';

interface IProps extends AvatarProps {
  user?: User;
}

const stringToAvatar = (user: User) => {
  const { firstName } = user;
  if (user.profilePictureUrl) {
    return { src: user.profilePictureUrl };
  }
  return { children: firstName.charAt(0) };
};

const Avatar: React.FC<IProps> = ({ user, ...props }) => {
  if (!user) {
    return null;
  }
  return (
    <MUIAvatar
      sx={{ height: 24, width: 24 }}
      {...stringToAvatar(user)}
      {...props}
    />
  );
};

export default Avatar;
