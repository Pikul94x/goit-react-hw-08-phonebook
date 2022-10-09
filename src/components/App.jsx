import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoutes/PrivateRoutes';
import PublicRoute from 'routes/PublicRoutes/PublicRoutes';
import { authSelectors } from 'redux/auth';
import { authOperations } from 'redux/auth';
import Loader from './Loader/Loader';
import Header from './Header/Header';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.isFetchingCurrentUser
  );
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {!isFetchingCurrentUser && (
        <>
          <Header />
          <Suspense fallback={<Loader color={'#3f51b5'} size={32} />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <HomePage />
                  </PublicRoute>
                }
              />
              <Route
                path="register"
                element={
                  <PublicRoute redirectTo="/contacts" restricted>
                    <RegistrationPage />
                  </PublicRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute redirectTo="/contacts" restricted>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="contacts"
                element={
                  <PrivateRoute>
                    <ContactsPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
};
