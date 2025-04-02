import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ReactNode, FC } from 'react';
import Login from './Login';


const ProtectedRoute: FC<RouteProps &{ children: ReactNode }> = ({ children }) => {  // <-- Типизация
    const { token } = useAuth();

    if (token === null) {
        return <Login />;
    }
    console.log(token)
    if (token === null) {
      return <Navigate to="/login" replace />;
    }

    return  children ;  // <-- неявное преобразование в React.ReactNode
};

export default ProtectedRoute;
