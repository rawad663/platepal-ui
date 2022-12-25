import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';

type Props = {
  user?: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const RightAdornment = ({ user, signIn, signOut }: Props) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const settings = [
    { item: 'Profile', onClick: () => {} },
    { item: 'Account', onClick: () => {} },
    { item: 'Logout', onClick: signOut },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        {user ? (
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        ) : (
          <Button variant="text" color="secondary" onClick={signIn}>
            Sign In
          </Button>
        )}
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ item, onClick }) => (
          <MenuItem
            key={item}
            onClick={() => {
              handleCloseUserMenu();
              onClick();
            }}
          >
            <Typography textAlign="center">{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
