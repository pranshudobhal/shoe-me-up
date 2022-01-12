import { Navigate, Route, useLocation } from 'react-router';
import { useAuth } from './context';

export function PrivateRoute({ path, ...props }) {
  const location = useLocation();
  const { token } = useAuth();

  return token ? <Route path={path} {...props} /> : <Navigate state={{ from: location.pathname }} replace to="/login" />;
}
