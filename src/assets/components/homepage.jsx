import {Category, SubCategory} from "./Categorry.js";
import {Product} from "./Product.js";
import {useCartItems, addToCart, deleteFromCart, clearCart,updateCart} from "./Cart.js";
import React, {useState, useEffect, createContext, useContext, useReducer} from "react";
import {Modal, Button, Group, Menu} from "@mantine/core";
import BasicMenu from "./Menu.jsx";
import './styles/homepage.css'
import {BrowserRouter, Routes, Route, NavLink, Link} from 'react-router';
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


const ThemeContext = createContext();
export const category = [
    new Category("Одяг, взуття та прикраси", 1,
        new SubCategory("Жінкам"),
        new SubCategory("Чоловікам"),
        new SubCategory("Дітям"),
        new SubCategory("Жіноче взуття"),
        new SubCategory("Аксесуари")
    ),
    new Category("Спорт і захоплення", 2,
        new SubCategory("Велосипеди"),
        new SubCategory("Намети й аксесуари"),
        new SubCategory("Протеїн"),
        new SubCategory("Ножі"),
        new SubCategory("Термопродукція")
    ),
    new Category("Офіс школа книги", 3,
        new SubCategory("Зошити учнівські"),
        new SubCategory("Папір офісний"),
        new SubCategory("Ручки"),
        new SubCategory("Пенали шкільні"),
        new SubCategory("Шкільні набори та ранці")
    ),
    new Category("Зоотовари", 4,
        new SubCategory("Корм для собак"),
        new SubCategory("Корм для котів"),
        new SubCategory("Аксесуари для акваріумів"),
        new SubCategory("Будки та лежаки"),
        new SubCategory("Іграшки для тварин")
    ),
    new Category("Побутова хімія", 5,
        new SubCategory("Засоби для прання"),
        new SubCategory("Засоби для миття посуду"),
        new SubCategory("Засоби для прибирання"),
        new SubCategory("Освіжувачі повітря"),
        new SubCategory("Гігієна та догляд")
    ),
    new Category("Дача, сад і город", 6,
        new SubCategory("Тримери та мотокоси"),
        new SubCategory("Ланцюгові пили"),
        new SubCategory("Газонокосарки"),
        new SubCategory("Насоси та помпи"),
        new SubCategory("Обприскувачі")
    ),
    new Category("Електроніка", 7,
        new SubCategory("Смартфони"),
        new SubCategory("Телевізори"),
        new SubCategory("Навушники"),
        new SubCategory("Фотоапарати"),
        new SubCategory("Ноутбуки")
    )
];
export const products = [
    new Product("Laptop", 1200, 5, 15, "https://picsum.photos/id/20/600/400"),
    new Product("Headphones", 200, 4, 10, "https://picsum.photos/id/201/600/400"),
    new Product("Smartwatch", 350, 5, 5, "https://picsum.photos/id/251/600/400"),
    new Product("Backpack", 80, 4, 20, "https://picsum.photos/id/367/600/400"),
    new Product("Sneakers", 150, 5, 25, "https://picsum.photos/id/21/600/400"),
    new Product("Tablet", 600, 4, 12, "https://picsum.photos/id/180/600/400"),
    new Product("Camera", 900, 5, 18, "https://picsum.photos/id/367/600/400"),
    new Product("Keyboard", 70, 4, 8, "https://picsum.photos/id/106/600/400"),
    new Product("Monitor", 300, 5, 10, "https://picsum.photos/id/107/600/400"),
    new Product("Drone", 1100, 5, 20, "https://picsum.photos/id/1077/600/400"),

    new Product("Gaming Console", 500, 5, 15, "https://picsum.photos/id/180/600/400"),
    new Product("VR Headset", 700, 4, 10, "https://picsum.photos/id/367/600/400"),
    new Product("Bicycle", 400, 5, 5, "https://picsum.photos/id/1015/600/400"),
    new Product("Scooter", 350, 4, 12, "https://picsum.photos/id/133/600/400"),
    new Product("Office Chair", 250, 5, 20, "https://picsum.photos/id/201/600/400"),
    new Product("Desk", 300, 4, 18, "https://picsum.photos/id/106/600/400"),
    new Product("Lamp", 60, 4, 8, "https://picsum.photos/id/1060/600/400"),
    new Product("Bookshelf", 180, 5, 10, "https://picsum.photos/id/133/600/400"),
    new Product("Sofa", 900, 5, 25, "https://picsum.photos/id/201/600/400"),
    new Product("Bed", 1200, 5, 30, "https://picsum.photos/id/106/600/400"),
    new Product("Watch", 250, 5, 15, "https://picsum.photos/id/251/600/400"),
    new Product("Glasses", 120, 4, 10, "https://picsum.photos/id/367/600/400"),
    new Product("Ring", 500, 5, 20, "https://picsum.photos/id/180/600/400"),
    new Product("Bracelet", 200, 4, 12, "https://picsum.photos/id/201/600/400"),
    new Product("Bag", 180, 5, 8, "https://picsum.photos/id/367/600/400"),
    new Product("Wallet", 90, 4, 5, "https://picsum.photos/id/133/600/400"),
    new Product("Perfume", 130, 5, 10, "https://picsum.photos/id/106/600/400"),
    new Product("Jacket", 220, 4, 15, "https://picsum.photos/id/201/600/400"),
    new Product("Jeans", 100, 5, 20, "https://picsum.photos/id/1060/600/400"),
    new Product("Shoes", 160, 4, 12, "https://picsum.photos/id/21/600/400"),
    new Product("Boots", 180, 5, 18, "https://picsum.photos/id/133/600/400"),
    new Product("Router", 90, 4, 10, "https://picsum.photos/id/180/600/400"),
    new Product("Microphone", 150, 5, 8, "https://picsum.photos/id/201/600/400"),
    new Product("Speaker", 200, 4, 12, "https://picsum.photos/id/367/600/400"),
    new Product("TV", 800, 5, 20, "https://picsum.photos/id/106/600/400"),
    new Product("Projector", 600, 4, 15, "https://picsum.photos/id/1077/600/400"),
    new Product("Tripod", 70, 4, 5, "https://picsum.photos/id/133/600/400"),
    new Product("Power Bank", 50, 5, 10, "https://picsum.photos/id/180/600/400"),
    new Product("Charger", 30, 4, 8, "https://picsum.photos/id/201/600/400"),
    new Product("Cable", 15, 5, 5, "https://picsum.photos/id/367/600/400"),
    new Product("Adapter", 20, 4, 10, "https://picsum.photos/id/106/600/400"),
    new Product("Pen", 5, 5, 0, "https://picsum.photos/id/1060/600/400"),
    new Product("Notebook", 10, 4, 5, "https://picsum.photos/id/21/600/400"),
    new Product("Folder", 8, 4, 2, "https://picsum.photos/id/133/600/400"),
    new Product("Calculator", 25, 5, 5, "https://picsum.photos/id/180/600/400"),
    new Product("Board", 40, 4, 8, "https://picsum.photos/id/201/600/400"),
    new Product("Bin", 30, 4, 10, "https://picsum.photos/id/367/600/400"),
    new Product("Mirror", 70, 5, 12, "https://picsum.photos/id/106/600/400"),
    new Product("Clock", 60, 4, 15, "https://picsum.photos/id/1060/600/400"),
    new Product("Fan", 90, 5, 20, "https://picsum.photos/id/133/600/400"),
    new Product("Heater", 120, 4, 18, "https://picsum.photos/id/180/600/400"),
    new Product("Air Conditioner", 1000, 5, 25, "https://picsum.photos/id/201/600/400"),
    new Product("Vacuum Cleaner", 250, 4, 20, "https://picsum.photos/id/367/600/400")
];
export const iconMap = {
    1: <IconShirt/>,
    2: <IconBike/>,
    3: <IconBook/>,
    4: <IconDog/>,
    5: <IconWashMachine/>,
    6: <IconGardenCart/>,
    7: <IconDeviceMobile/>
};

function Products(props) {
    const {theme} = useContext(ThemeContext);
    const [f, setF] = useState(false);
    const r = [];
    for (let i = 0; i < props.rating; i++) {
        r.push(1)
    }
    return (
        <div className={`card ${theme}`}>
            <div className={"iLove"}>
                <img src={props.img} alt="photo"/>
                <IconHeart fill={f ? "red" : "grey"} onClick={() => {
                    f ? setF(false) : setF(true)
                }} className="IconHeart"></IconHeart>
            </div>
            <h4>{props.name}</h4>
            <div className="stars">
                {
                    r.map((item, index) => {
                            if (item === 1) {
                                return (
                                    <IconStar key={index} fill="yellow"></IconStar>
                                );
                            } else {
                                return (
                                    <IconStar key={index}></IconStar>
                                );
                            }
                        }
                    )
                }
            </div>
            <div className="info">
                <div className="amount">
                    {props.discount > 0 ? (<p>{props.price - (props.price * props.discount / 100)}</p>) : null}
                    <p>{props.price}</p>


                </div>
                <IconShoppingCart size={18} stroke={1.5} onClick={() => {
                    addToCart(new Product(props.name, props.price, props.rating, props.discount, props.img))
                }
                }></IconShoppingCart>
            </div>


        </div>
    )
}

function C(props) {
    const [name, setName] = useState(props.name);
    const [show, setShow] = useState(true);

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
                            <li key={index}>
                                {item.name}
                            </li>
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



export function InfoCategories(props) {
    const initialState = {
        count: Number(props.count) || 1,
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'INCREMENT':
                return { count: state.count + 1};
            case 'DECREMENT':
                return { count: state.count - 1};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // Оновлення бази при зміні кількості
    useEffect(() => {
        updateCart(props.name, state.count);
    }, [state.count, props.name]);

    const price = Number(props.price) || 0;
    const discount = Number(props.discount) || 0;
    const finalPrice = price - (price * discount / 100);
    const total = (finalPrice * state.count).toFixed(0)+'$';

    return (


        <div className="infoincart">
            <img src={props.img} alt="товар"/>
            <div className="iname">
                <h4>{props.name}</h4>
                <p>Продавець: Shop</p>
            </div>
            <div className="a">
                <IconMinus
                    size={24}
                    stroke={1.5}
                    onClick={() => (state.count>1 ? dispatch({ type: 'DECREMENT' }) : 0)}
                    color={state.count > 1 ? 'red' : 'grey'}
                    style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: "18px", fontWeight: "600", minWidth: "30px", textAlign: "center" }}>
                    {state.count}
                </span>
                <IconPlus
                    size={24}
                    stroke={1.5}
                    onClick={() => (state.count<50 ? dispatch({ type: 'INCREMENT' }) : 0)}
                    color={state.count < 50 ? 'red' : 'grey'}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <p style={{ fontWeight: "700", fontSize: "17px" }}>
                {total}
            </p>
            <IconX style={{cursor:'pointer'}} onClick={()=>{deleteFromCart(props.name)}}></IconX>
        </div>


    );
}

function Homepage() {
    const [theme, setTheme] = useState('light');
    const [o, setOpened] = useState(false);
    const cart = useCartItems() || [];
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    useEffect(() => {
        cart.map(item => {
            item.isCart = true;
            localStorage.setItem("isCart", String(item.isCart));
        })
    }, [cart])
    return (
        <>
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                <header className={`header ${theme}`}></header>
                <main className={`main ${theme}`}>
                    <BasicMenu></BasicMenu>
                    <div >
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
                        <input type="text" placeholder="Я шукаю"/>
                        <button>Знайти</button>

                    </div>

                    <IconUser size={18}/>
                    <IconHome size={18}/>
                    <Button onClick={() => setOpened(true)}
                             className="CartButton">
                        <IconShoppingCart size={24} stroke={1.5}/>
                    </Button>
                    <Modal
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
                            <div key={index}>
                                <InfoCategories
                                    name={item.name}
                                    price={item.price}
                                    discount={item.discount}
                                    img={item.img}
                                    count={item.count || 1}
                                />
                            </div>
                        ))}
                        <button className="makemodalorder">Зробити замовлення</button>

                    </Modal>
                    <ThemeContext.Consumer>
                        {({toggleTheme}) => (
                            <IconSettings size={18} onClick={toggleTheme}/>
                        )}
                    </ThemeContext.Consumer>


                </main>
                <section className={`app ${theme}`}>
                    <div>
                        <Categories/>
                    </div>
                    <div>
                        {
                            products.map((item, index) => (
                                <div key={index}><Products img={item.img} name={item.name} price={item.price}
                                                           discount={item.discount} rating={item.rating}></Products>
                                </div>

                            ))
                        }
                    </div>
                </section>
                <footer className={`footer ${theme}`}>

                </footer>
            </ThemeContext.Provider>


        </>

    )
}

export default Homepage;
