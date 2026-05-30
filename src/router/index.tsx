
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '@src/providers/themeProvider';
import AuthLayout from '@src/providers/authProvider';


// ------------------------------------------- Auth
const LoginPage = lazy(() => import("@src/components/pages/auth/login"));


// ------------------------------------------- Pages
const Dashboard = lazy(() => import("@src/ifc/pages/dashboard"));
const RoomsPage = lazy(() => import("@src/ifc/pages/rooms"));






const ErrorBoundary = () => {
    // const error: any = useRouteError();
    return (
        <div>
            <div>خطا رخ داده است</div>
            {/* {error} */}
        </div>
    );
};

const NotFound = () => {
    return (
        <div>صفحه مورد نظر یافت نشد!</div>
    );
};

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            {
                path: 'dashboard',
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'rooms', element: <RoomsPage /> },
                ],
            },
        ],
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: 'login', element: <LoginPage /> },
        ],
    },

    { path: '*', element: <NotFound /> },
];



export const router = createBrowserRouter(routes);
