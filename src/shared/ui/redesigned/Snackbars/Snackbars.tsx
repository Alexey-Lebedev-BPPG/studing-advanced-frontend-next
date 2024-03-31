'use client';

import { memo } from 'react';
import './snackbars.css';
import { toast, ToastContainer } from 'react-toastify';
import { Icon } from '../Icon';
import { HStack } from '../Stack';
import CloseSVG from '@/shared/assets/icons/circle-up.svg';

type SnackbarTypeT = 'success' | 'error' | 'info' | 'warning';

export const showSnackbar = (text: string, type: SnackbarTypeT) =>
  type &&
  toast[`${type}`](
    <HStack align='center' className='snackbar'>
      <p>{text}</p>
    </HStack>,
  );

export const SnackbarsContainer = memo(() => (
  <ToastContainer
    hideProgressBar
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    position='bottom-right'
    autoClose={3000}
    newestOnTop={false}
    rtl={false}
    theme='colored'
    icon={false}
    closeButton={<Icon Svg={CloseSVG} />}
  />
));
