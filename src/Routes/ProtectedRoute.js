import { Route, Link  } from 'react-router-dom';

export default function ProtectedRoute({component: Component, ...restOfProps}) {    

    const token = localStorage.getItem('_token');

    return (
        <Route
            {...restOfProps}    
            render={(props) => 
                token ? <Component {...props} /> : <Link  to="/" />
            }
        />
    );
}
