import { AppBar as MuiAppBar, Container, Divider, Toolbar } from '@mui/material';

import { useSession } from '@/hooks/useSession';

import { LeftAdornment } from './LeftAdornment';
import { RightAdornment } from './RightAdornment';

export const AppBar = () => {
  const { session, signInWithOAuth, signOut } = useSession();

  const pages: string[] = [];

  return (
    <MuiAppBar elevation={0} sx={{ backgroundColor: 'common.white' }} position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <LeftAdornment pages={pages} />
          <RightAdornment user={session?.user} signIn={signInWithOAuth} signOut={signOut} />
        </Toolbar>
      </Container>
      <Divider sx={{ backgroundColor: 'primary.light' }} />
    </MuiAppBar>
  );
};
