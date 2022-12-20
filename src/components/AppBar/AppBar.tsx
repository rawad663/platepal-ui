import * as React from 'react';
import { AppBar as MuiAppBar, Toolbar, Container } from '@mui/material';

import { LeftAdornment } from './LeftAdornment';
import { RightAdornment } from './RightAdornment';
import { useSession } from '@pdg/hooks/useSession';

export const AppBar = () => {
  const { session, signInWithOAuth, signOut } = useSession();

  const pages = ['Products', 'Pricing', 'Blog'];

  return (
    <MuiAppBar color="primary" position="static" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LeftAdornment pages={pages} />
          <RightAdornment user={session?.user} signIn={signInWithOAuth} signOut={signOut} />
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
