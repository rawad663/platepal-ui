import { Box, SwipeableDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ClientProfileForm, Props as ClientProfileProps } from './ClientProfileForm';

const drawerBleeding = 56;

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: '50%',
  right: 0,
}));

type Props = ClientProfileProps & {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const ClientProfileFormMobile = ({ open, onClose, onOpen, setIsLoading, setMealPlan, isLoading }: Props) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen
      ModalProps={{
        keepMounted: true,
      }}
      sx={{ position: 'relative' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
        }}
      >
        <Puller />
      </Box>

      <ClientProfileForm
        sx={{
          maxHeight: '90vh',
          overflow: 'scroll',
          px: 2,
          pt: 4,
        }}
        isLoading={isLoading}
        setMealPlan={setMealPlan}
        setIsLoading={setIsLoading}
        onSubmit={onClose}
      />
    </SwipeableDrawer>
  );
};
