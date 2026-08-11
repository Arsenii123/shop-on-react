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
import './styles/about.css'
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


export default function About() {
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
                <section className={`aboutUs${theme}`}>
                    <div className={`aboutUs__container${theme}`}>
                        <h1 className={`aboutUs__title${theme}`}>Про нас</h1>

                        <div className={`aboutUs__block${theme}`}>
                            <h2 className={`aboutUs__subtitle${theme}`}>Маленькі мрії та зручний шопінг</h2>
                            <p className={`aboutUs__text${theme}`}>
                                Ми — сучасний онлайн-магазин, створений для того, щоб зробити покупки
                                максимально простими, швидкими та приємними. У нас ви знайдете все
                                необхідне для повсякденного життя: стильний одяг і взуття, сучасну
                                електроніку, товари для спорту та активного відпочинку, все для дому,
                                саду та офісу.
                            </p>
                            <p className={`aboutUs__text${theme}`}>
                                Ми віримо, що хороші речі мають бути доступними, а процес їх пошуку —
                                зручним. Саме тому ми зібрали широкий асортимент якісних товарів
                                в одному місці.
                            </p>
                        </div>

                        <div className={`aboutUs__block${theme}`}>
                            <h2 className={`aboutUs__subtitle${theme}`}>Наша мета — бути корисними</h2>
                            <p className={`aboutUs__text${theme}`}>
                                Речі існують для того, щоб робити життя комфортнішим. Тому ми
                                приділяємо особливу увагу не тільки асортименту, а й зручності
                                користування сайтом, швидкості доставки та якості обслуговування.
                            </p>
                            <p className={`aboutUs__text${theme}`}>
                                Наш магазин — це місце, де можна швидко знайти потрібне без зайвих
                                пошуків і компромісів. Ми прагнемо стати справжнім помічником у
                                вирішенні повсякденних задач.
                            </p>
                        </div>

                        <div className={`aboutUs__block${theme}`}>
                            <h2 className={`aboutUs__subtitle${theme}`}>Що ми пропонуємо</h2>
                            <p className={`aboutUs__text${theme}`}>Ми допомагаємо:</p>
                            <ul className={`aboutUs__list${theme}`}>
                                <li>обрати стильний і зручний одяг та взуття;</li>
                                <li>підібрати сучасну техніку та гаджети;</li>
                                <li>знайти все необхідне для спорту та активного способу життя;</li>
                                <li>облаштувати сад, город і заміський будинок;</li>
                                <li>створити затишок і порядок у домі за допомогою побутової хімії та товарів для дому.</li>
                            </ul>
                        </div>

                        {/* Покращена статистика */}
                        <div className={`aboutUs__stats${theme}`}>
                            <div className={`stat${theme}`}>
                                <span className={`stat__number${theme}`}>1000+</span>
                                <span className={`stat__label${theme}`}>товарів у каталозі</span>
                            </div>

                            <div className={`stat${theme}`}>
                                <span className={`stat__number${theme}`}>6</span>
                                <span className={`stat__label${theme}`}>категорій</span>
                            </div>

                            <div className={`stat${theme}`}>
                                <span className={`stat__number${theme}`}>Швидка</span>
                                <span className={`stat__label${theme}`}>доставка по Україні</span>
                            </div>

                            <div className={`stat${theme}`}>
                                <span className={`stat__number${theme}`}>Зручна</span>
                                <span className={`stat__label${theme}`}>оплата</span>
                            </div>
                        </div>
                        <div className={`aboutUs__block${theme}`}>
                            <h2 className={`aboutUs__subtitle${theme}`}>Зручна доставка та оплата</h2>
                            <p className={`aboutUs__text${theme}`}>
                                Ми розуміємо, наскільки важливо отримати замовлення швидко і без
                                зайвих турбот. Тому пропонуємо зручні способи доставки та кілька
                                варіантів оплати. Ви можете обрати той спосіб, який підходить саме вам.
                            </p>
                        </div>

                        <div className={`aboutUs__block${theme}`}>
                            <h2 className={`aboutUs__subtitle${theme}`}>Далі — більше</h2>
                            <p className={`aboutUs__text${theme}`}>
                                Ми постійно працюємо над розширенням асортименту, покращенням сервісу
                                та зручності сайту. Наша мета — щоб кожна покупка приносила задоволення,
                                а повертатися до нас хотілося знову і знову.
                            </p>
                            <p className={`aboutUs__text${theme}`}>
                                Дякуємо, що обираєте наш магазин. Ми раді бути частиною вашого
                                комфортного життя.
                            </p>
                        </div>
                    </div>
                </section>
                <footer className={`footer ${theme}`}>

                </footer>
            </ThemeContext.Provider>


        </>
    )
}