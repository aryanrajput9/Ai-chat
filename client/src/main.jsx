
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { Provider } from 'react-redux';
import store from './app/store';
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')).render(

  <Provider store={store}>

    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="dark"
    />
  </Provider>

)
