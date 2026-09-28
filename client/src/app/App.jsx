
import { RouterProvider } from 'react-router-dom';
import './app.css'
import AppRoute from './AppRoute';
import AuthInitializer from './AuthInitializer ';
function App() {



  return (
    <AuthInitializer>
      <RouterProvider router={AppRoute} />
    </AuthInitializer>
  )
}

export default App
