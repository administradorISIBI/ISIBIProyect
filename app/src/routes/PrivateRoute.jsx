import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { setToken, setAuthenticated } from '@store/auth/actions'; 

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   const sessionToken = sessionStorage.getItem('authToken');

  //   if (sessionToken && !token) {
  //     dispatch(setToken(sessionToken));
  //     dispatch(setAuthenticated(true));
  //   }
  // }, [dispatch, token]);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
