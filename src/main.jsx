import './index.css'
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import Homepage from "./assets/components/homepage.jsx";
import '@mantine/core/styles.css'
import {ProductPage} from "./assets/components/productspage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router';


ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/products" element={<ProductPage/>} />
                </Routes>
        </BrowserRouter>

    </MantineProvider>
);
