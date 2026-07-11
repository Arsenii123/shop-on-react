import {Category, SubCategory} from "./Categorry.js";
import {Product} from "./Product.js";
import {useCartItems, addToCart, deleteFromCart, clearCart,updateCart} from "./Cart.js";
import React, {useState, useEffect, createContext, useContext, useReducer} from "react";
import {Modal, Button, Group, Menu} from "@mantine/core";
import BasicMenu from "./Menu.jsx";
import './styles/homepage.css'
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
const category = [
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
const products = [
    new Product("shirt", 100, 5, 10, "https://content1.rozetka.com.ua/goods/images/big_tile/668103957.jpg"),
    new Product("shirt2", 100, 5, 10, "https://content1.rozetka.com.ua/goods/images/big_tile/668103957.jpg")
]
const iconMap = {
    1: <IconShirt/>,
    2: <IconBike/>,
    3: <IconBook/>,
    4: <IconDog/>,
    5: <IconWashMachine/>,
    6: <IconGardenCart/>,
    7: <IconDeviceMobile/>
};

export function Products(props) {
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

export function C(props) {
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
    const total = (finalPrice * state.count).toFixed(0);

    return (
        <div className="infoincart">
            <img src={props.img} alt="товар"/>
            <div className="iname">
                <h4>{props.name}</h4>
                <p>Продавець: Shop</p>
            </div>
            <div className="amount">
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
                {total} $
            </p>
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
                    <div className="showgroups">
                        {/* Кнопка Каталог з меню */}
                        <Menu shadow="md" width={280} position="bottom-start">
                            <Menu.Target>
                                <Button
                                    leftSection={<IconApps size={24} stroke={1.5}/>}
                                    style={{
                                        backgroundColor: "#f62d1f",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        fontWeight: "600",
                                        borderRadius: "8px"
                                    }}
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
                    <div>
                        <IconSearch size={24} stroke={1.5}/>
                        <input type="text" placeholder="Я шукаю"/>
                        <button>Знайти</button>

                    </div>

                    <IconUser size={18}/>
                    <IconHome size={18}/>
                    <Button onClick={() => setOpened(true)} variant="subtle" p={8}>
                        <IconShoppingCart size={18}/>
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
