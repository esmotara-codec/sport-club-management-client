
import { useContext } from 'react';
import { Navigate,  useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location.pathname);

    if (loading) {
        return <span className="loading loading-spinner text-accent"></span>
    }

    if (!user) {
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;