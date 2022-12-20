export const styles = {
  root: {
    '& .MuiStepLabel-root .Mui-completed': {
      color: 'secondary.dark', // circle color (COMPLETED)
    },
    '& .MuiStepLabel-label.Mui-completed': {
      color: 'grey.500', // Just text label (COMPLETED)
    },
    '& .MuiStepLabel-root .Mui-active': {
      color: 'secondary.main', // circle color (ACTIVE)
    },
    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
      color: 'common.white', // Just text label (ACTIVE)
    },
    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
      fill: 'black', // circle's number (ACTIVE)
    },
  },
};
