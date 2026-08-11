import {Category, SubCategory, useCategoryItems, Clears} from "./Categorry.js";
import {Product} from "./Product.js";
import {useCartItems, addToCart, deleteFromCart, clearCart, updateCart} from "./Cart.js";
import React, {useState, useEffect, createContext, useContext, useReducer} from "react";
import {Modal, Button, Group, Menu} from "@mantine/core";
import BasicMenu from "./Menu.jsx";
import {BrowserRouter, Routes, Route, NavLink, Link} from 'react-router-dom';
import {category, change, iconMap, InfoCategories, orders, products} from "./homepage.jsx";
import {
    IconApps, IconSearch, IconHome, IconShoppingCart, IconUser, IconShirt,
    IconBike,
    IconBook,
    IconDog,
    IconWashMachine,
    IconGardenCart,
    IconDeviceMobile,
    IconSettings,
    IconHeart,
    IconStar,
    IconX,
    IconPlus,
    IconMinus
} from '@tabler/icons-react';
import './styles/contacts.css'
import {useSelector, useDispatch, Provider} from 'react-redux'
import {configureStore, createSlice} from '@reduxjs/toolkit'
const ThemeContext = createContext();
function C(props) {
    const [name, setName] = useState(props.name);
    const [show, setShow] = useState(true);
    const dispatch = useDispatch() // отримуємо функцію для відправки дій

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

                            <Link to={`/category/${item.name.trim().toLowerCase()}`} className="goToProduct"
                                  onClick={() => {
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

function Categories() {
    const {theme} = useContext(ThemeContext);
    return (
        <div className={`div ${theme}`}>


            {category.map((item, index) => (
                <C name={item.name} key={index} i={iconMap[item.img]}/>
            ))}


        </div>
    );
}


export default function Contacts() {
    const [o, setOpened] = useState(false);
    const cart = useCartItems() || [];
    const [search, setSearch] = useState("");
    const [searchedCategory, setSearchedCategory] = useState('');
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

// Применяем тему СРАЗУ при монтировании + при каждом изменении
    useEffect(() => {
        const root = document.getElementById('root');
        const body = document.body;

        if (root) {
            root.style.backgroundColor = theme === 'dark' ? '#121212' : '#ffffff';
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
        }

        if (body) {
            body.style.backgroundColor = theme === 'dark' ? '#121212' : '#ffffff';
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };


    useEffect(() => {
        cart.map(item => {
            item.isCart = true;
            localStorage.setItem("isCart", String(item.isCart));
        })
    }, [cart])
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
    return(
        <>
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                <header className={`header ${theme}`}></header>
                <main className={`main ${theme}`}>
                    <BasicMenu></BasicMenu>
                    <div>
                        {/* Кнопка Каталог з меню */}
                        <Menu shadow="md" width={280} position="bottom-start" className={`menuC ${theme}`}>
                            <Menu.Target>
                                <Button
                                    variant="filled"
                                    color="red"
                                    leftSection={<IconApps size={24} stroke={1.5}/>}
                                    className="showgroups"
                                >
                                    Каталог
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown className="catalog-dropdown">   {/* ← додай цей клас */}
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
                <section className={`contacts${theme}`}>
                    <div className={`contacts__container${theme}`}>
                        <h1 className={`contacts__title${theme}`}>Контакти</h1>
                        <p className={`contacts__subtitle${theme}`}>
                            Ми завжди на зв’язку і готові допомогти з будь-яким питанням
                        </p>

                        <div className={`contacts__info${theme}`}>
                            <div className={`contacts__item${theme}`}>
                                <div className={`contacts__icon${theme}`}>📞</div>
                                <div>
                                    <h3 className={`contacts__item-title${theme}`}>Телефон</h3>
                                    <a href="tel:+380441234567" className={`contacts__link${theme}`}>
                                        +38 (044) 123-45-67
                                    </a>
                                    <p className={`contacts__text${theme}`}>
                                        Пн–Пт: 9:00 – 20:00<br />
                                        Сб–Нд: 10:00 – 18:00
                                    </p>
                                </div>
                            </div>

                            <div className={`contacts__item${theme}`}>
                                <div className={`contacts__icon${theme}`}>✉️</div>
                                <div>
                                    <h3 className={`contacts__item-title${theme}`}>Email</h3>
                                    <a href="mailto:info@myonlineshop.com" className={`contacts__link${theme}`}>
                                        info@myonlineshop.com
                                    </a>
                                    <p className={`contacts__text${theme}`}>Відповідаємо протягом 24 годин</p>
                                </div>
                            </div>

                            <div className={`contacts__item${theme}`}>
                                <div className={`contacts__icon${theme}`}>📍</div>
                                <div>
                                    <h3 className={`contacts__item-title${theme}`}>Адреса</h3>
                                    <p className={`contacts__text${theme}`}>
                                        м. Київ, вул. Хрещатик, 22<br />
                                        (офіс і пункт видачі)
                                    </p>
                                </div>
                            </div>

                            <div className={`contacts__item${theme}`}>
                                <div className={`contacts__icon${theme}`}>💬</div>
                                <div>
                                    <h3 className={`contacts__item-title${theme}`}>Месенджери</h3>
                                    <div className={`contacts__messengers${theme}`}>
                                        <a href="#" className={`contacts__messenger${theme}`}>Telegram</a>
                                        <a href="#" className={`contacts__messenger${theme}`}>Viber</a>
                                        <a href="#" className={`contacts__messenger${theme}`}>WhatsApp</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className={`footer ${theme}`}>

                </footer>
            </ThemeContext.Provider>


        </>
    )
}