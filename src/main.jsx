import './index.css'
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import Homepage, {store} from "./assets/components/homepage.jsx";
import '@mantine/core/styles.css'
import {ProductPage} from "./assets/components/productspage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(

    <MantineProvider>
        <Provider store={store}>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/product/:namepath" element={
                        <ProductPage/>
                    } />
                </Routes>
        </BrowserRouter>
        </Provider>
    </MantineProvider>
);
