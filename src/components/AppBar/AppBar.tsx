import { AppBar as MuiAppBar, Container, Toolbar } from '@mui/material';
import { useSession } from '@pdg/hooks/useSession';

import { LeftAdornment } from './LeftAdornment';
import { RightAdornment } from './RightAdornment';

export const AppBar = () => {
  const { session, signInWithOAuth, signOut } = useSession();

  const pages: string[] = [];

  return (
    <MuiAppBar color="primary" position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <LeftAdornment pages={pages} />
          <RightAdornment user={session?.user} signIn={signInWithOAuth} signOut={signOut} />
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
