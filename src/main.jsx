import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import LoginComponent from './loginScreen.jsx';

const App = () => {
  useEffect(() => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/utk_infastructure.sh'; 
    link.download = 'CAS-HelperFile.sh'; // The filename that will be downloaded

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }, []);

  return <LoginComponent />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
