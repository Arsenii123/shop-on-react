import BasicMenu from "./Menu.jsx";
import {Button, Menu, Modal} from "@mantine/core";
import {IconApps, IconHome, IconSearch, IconSettings, IconShoppingCart, IconUser, IconX} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {category, change, iconMap, InfoCategories, orders} from "./homepage.jsx";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {clearCart, useCartItems} from "./Cart.js";
import {useForm} from 'react-hook-form';
import './styles/productpage.css'
import './styles/accountpage.css'

const ThemeContext = createContext();
const form = {
    password: '',
    email: ''
}

export function C(props) {
    const [name, setName] = useState(props.name);
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.name === "" || props.name === null) {
            setName("error");
            setShow(false);
        }
    }, [props.name]);
    const currentCategory = category.find(
        cat => cat.name.trim().toLowerCase() === props.name.trim().toLowerCase()
    );


    return (
        <>
            {
                show && <div>
                    <h3>
                        {props.i}
                        {name}
                    </h3>
                    <ul>
                        {currentCategory.categories.map((item, index) => (
                            <Link to={`/category/${item.name.trim().toLowerCase()}`} className="goToProduct" onClick={() => {
                                dispatch(change(item.name))
                                localStorage.setItem('found', item.name.trim().toLowerCase());
                            }} key={index}>
                                <li>
                                    {item.name}
                                </li>
                            </Link>
                        ))}

                    </ul>

                </div>
            }
        </>
    );
}

export function Categories() {
    const {theme} = useContext(ThemeContext);
    return (
        <div className={`div ${theme}`}>


            {category.map((item, index) => (
                <C name={item.name} key={index} i={iconMap[item.img]}/>
            ))}


        </div>
    );
}

function AccountPage() {
    const [o, setOpened] = useState(false);
    const cart = useCartItems() || [];
    const [quantity, setQuantity] = useState(1);
    const [search, setSearch] = useState("");
    const [searchedCategory, setSearchedCategory] = useState('');
    const email=localStorage.getItem("email") || '';
    const password=localStorage.getItem("password") || '';
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const root = document.getElementById("root");
    if (theme === "light") {
        root.style.backgroundColor = "white";
    }
    else{
        root.style.backgroundColor = "black";
    }
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        const root = document.getElementById("root");
        if (theme === "light") {
            root.style.backgroundColor = "black";
            localStorage.setItem("theme",'dark');
        }
        else{
            root.style.backgroundColor = "white";
            localStorage.setItem("theme",'light');
        }
    };
    useEffect(() => {
        cart.map(item => {
            item.isCart = true;
            localStorage.setItem("isCart", String(item.isCart));
        })
    }, [cart])
    useEffect(() => {
        const n = search.trim().toLowerCase();
        let foundCategory = "error";

        for (const cat of category) {
            for (const sub of cat.categories) {
                for (const product of sub.products || []) {
                    if (product.name.trim().toLowerCase().includes(n)) {
                        foundCategory = sub.name.trim().toLowerCase();
                        break;
                    }
                }
            }
        }


        localStorage.setItem("found", foundCategory.trim().toLowerCase());

        setSearchedCategory(foundCategory);
    }, [search]);
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({
        defaultValues: form,
        mode: 'onChange'
    });
    const onSubmit = async (data) => {

        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'quantity') {
                    value.forEach(lang => formData.append('quantity', lang));
                } else {
                    formData.append(key, value);
                }
            });
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    e: data.email,
                    p: data.password
                }), // перетворення даних форми в JSON-рядок
            });
            if (response.ok) {
                console.log('статус відповіді:', response.status);
                console.log('надійслані дані:', data);
                localStorage.setItem('email',data.email);
                localStorage.setItem('password',data.password);
                alert('Дані успішно надіслано!');
                reset(form);
            } else {
                throw new Error('Помилка сервера: ' + response.status);
            }
            // повернення успішного результату з даними
        } catch (error) {
            console.error('Помилка API:', error);
            return {success: false, error: error.message};
        }
    }
    const handleReset = () => {
        reset(form);
    };
    return (
        <>
            <ThemeContext.Provider value={{theme, toggleTheme}}>

                <header className={`header ${theme}`}></header>
                <main className={`main ${theme}`}>
                    <BasicMenu></BasicMenu>
                    <div>
                        {/* Кнопка Каталог з меню */}
                        <Menu shadow="md" width={280} position="bottom-start">
                            <Menu.Target>
                                <Button
                                    variant="filled"
                                    color="red"
                                    leftSection={<IconApps size={24} stroke={1.5}/>
                                    }
                                    className="showgroups"
                                >
                                    Каталог
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Категорії</Menu.Label>
                                <Categories/>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                    <div className="search-container">
                        <IconSearch size={24} stroke={1.5}/>
                        <input type="text" placeholder="Я шукаю" value={search}
                               onChange={(e) => String(setSearch(e.target.value))}/>
                        <Link className="goToHome" to={`/category/${searchedCategory.trim().toLowerCase()}`}
                              onClick={() => localStorage.setItem("searchName", search.trim().toLowerCase())}>
                            <button>Знайти</button>
                        </Link>


                    </div>

                    <IconUser size={18}/>
                    <Link to="/" className="goToHome">
                        <IconHome size={18}/>
                    </Link>
                    <Button onClick={() => setOpened(true)}
                            className="CartButton">
                        <IconShoppingCart size={24} stroke={1.5}/>
                    </Button>
                    <Modal className={`window${theme}`}
                           opened={o}
                           onClose={() => setOpened(false)}
                           title="Кошик"
                           centered
                           overlayProps={{
                               opacity: 0.4, // затемнення
                               blur: 2       // легке розмиття фону
                           }}
                           withCloseButton={false} // прибираємо стандартний хрестик
                    >
                        <Button
                            variant="subtle"
                            color="gray"
                            onClick={() => setOpened(false)}
                            leftSection={<IconX size={20}/>}
                        >

                        </Button>
                        {cart.map((item, index) => (
                            <div key={index} className={`pWindow${theme}`}>
                                <InfoCategories
                                    name={item.name}
                                    price={item.price}
                                    discount={item.discount}
                                    img={item.img}
                                    count={item.count || 1}
                                />
                            </div>
                        ))}
                        <Link to="/order">
                            <button className="makemodalorder" onClick={
                                ()=>{
                                    for(let i of cart) {
                                        orders.push(i);
                                    }
                                    clearCart();
                                    cart.clear();
                                }

                            }>Зробити замовлення</button>
                        </Link>


                    </Modal>
                    <ThemeContext.Consumer>
                        {({toggleTheme}) => (
                            <IconSettings size={18} onClick={toggleTheme}/>
                        )}
                    </ThemeContext.Consumer>


                </main>
                <section className={`form${theme}`}>
                    {email && password !== '' ? (
                        <>

                        <h2 className={`orderName${theme}`}>Аккаунт</h2>
                        <div className={`accountInfo${theme}`}>
                            <p>Email:{email}</p>
                            <p>Password:{password}</p>
                            <button className="change" onClick={()=>{
                                localStorage.setItem('email', '');
                                localStorage.setItem('password', '');
                                handleReset();
                            }}>Change account</button>
                            {email==="admin@gmail.com" && password==="admin123" ? (
                                <Link to="/admin">
                                    <button className="Admin">Admin panel</button>
                                </Link>
                            ): (null)}
                        </div>
                        </>
                    ) : (
                        <>
                        <h2 className={`orderName${theme}`}>Реєстрація</h2>
                        <form onSubmit={handleSubmit(onSubmit)} id="makeOrder">
                    <label htmlFor="email">Email:</label>
                    <input className={`inputs${theme}`}

                           type="email"
                           id="email"
                           name="email"
                           placeholder="Print your email address..."
                           {...register('email', {
                               required: 'Пошта обов\'язкова',
                               pattern: {
                                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                   message: 'Некоректний формат електронної пошти'
                               }
                           })}

                    />
                    {errors.email && <p className="incorrect">{errors.email.message}</p>}
                    <label htmlFor="password">Password:</label>
                    <input className={`inputs${theme}`}
                           type="password"
                           id="password"
                           name="password"
                           placeholder="Enter your password..."
                           {...register('password', {
                               required: 'Пароль обов’язковий',
                               minLength: {value: 6, message: 'Пароль має містити мінімум 6 символів'},
                               pattern: {
                                   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                                   message: 'Пароль має містити літери та цифри'
                               }
                           })}

                    />
                    {errors.password && <p className="incorrect">{errors.password.message}</p>}
                    <input type="submit" value="Submit" id="isOrder" disabled={isSubmitting}/>
                    <input type="reset" value="Reset" id="isOrder" onClick={handleReset}/>

                </form>
                        </>)}

                </section>
            </ThemeContext.Provider>
        </>

    )

}

export default AccountPage;