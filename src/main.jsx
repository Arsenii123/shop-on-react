import './index.css'
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import Homepage, {store} from "./assets/components/homepage.jsx";
import '@mantine/core/styles.css'
import {ProductPage} from "./assets/components/categorypage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import OrderPage from "./assets/components/productpage.jsx";
import AccountPage from "./assets/components/accountpage.jsx";
import AdminPage from "./assets/components/adminpanel.jsx";

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
                    <Route path="/account" element={<AccountPage></AccountPage>}/>
                    <Route path="/admin" element={<AdminPage></AdminPage>}/>

                </Routes>
        </BrowserRouter>


        </Provider>
    </MantineProvider>
);
