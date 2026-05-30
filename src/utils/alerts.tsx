import { toast } from 'react-toastify';

import { Typography } from '@mui/material';

export const showSuccessMessage = ({ message }: { message: string }) => {
  toast(
    <Typography fontWeight={600} fontSize={16} color="#232833">
      {message}
    </Typography>,
    {
      type: 'success',
      closeOnClick: true,
      // closeButton: <Iconify icon="ei:close-o" />,
      // icon: () => <Iconify icon="ei:check" />,
    }
  );
};

export const showErrorMessage = ({ message }: { message: string }) => {
  toast(
    <Typography fontWeight={600} fontSize={16} color="#232833">
      {message}
    </Typography>,
    {
      type: 'error',
      closeOnClick: true,
      // closeButton: <Iconify icon="ei:close-o" />,
      // icon: () => <Iconify icon="ei:close-o" />,
    }
  );
};
