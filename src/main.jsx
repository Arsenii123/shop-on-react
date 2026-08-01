import './index.css'
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import Homepage, {store} from "./assets/components/homepage.jsx";
import '@mantine/core/styles.css'
import {ProductPage} from "./assets/components/categorypage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import OrderPage from "./assets/components/productpage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(

    <MantineProvider>

        <Provider store={store}>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/category/:namepath" element={
                        <ProductPage/>
                    } />
                    <Route path="/order" element={
                        <OrderPage></OrderPage>
                    } />
                </Routes>
        </BrowserRouter>

        </Provider>
    </MantineProvider>
);
