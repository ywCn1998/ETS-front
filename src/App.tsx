import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const App = () => <Suspense fallback={<CircularProgress />}><RouterProvider router={router} /></Suspense>;
export default App;         