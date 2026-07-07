import './index.css'
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import Homepage from "./assets/components/homepage.jsx";
import '@mantine/core/styles.css'



ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider>
        <Homepage></Homepage>

    </MantineProvider>
);
