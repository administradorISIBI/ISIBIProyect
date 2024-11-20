import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const BackPath = () => {
    const location = useLocation();

    useEffect(() => {
        return () => {
          //console.log('Última ubicación:', location.pathname);
        };
    }, [location.pathname]);

    return null;
};
