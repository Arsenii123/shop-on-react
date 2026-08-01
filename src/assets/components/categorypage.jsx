import {Category, SubCategory} from "./Categorry.js";
import {Product} from "./Product.js";
import {useCartItems, addToCart, deleteFromCart, clearCart, updateCart} from "./Cart.js";
import React, {useState, useEffect, createContext, useContext, useReducer, useRef, use} from "react";
import {Modal, Button, Group, Menu} from "@mantine/core";
import BasicMenu from "./Menu.jsx";
import {category, products, iconMap, change, store, nameSlice} from "./homepage.jsx";
import {InfoCategories} from "./homepage.jsx";
import './styles/categorypage.css'
import {useParams} from 'react-router-dom';
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
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";

function C(props) {
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

function InfiniteScrollLocal(props) {
    const [visibleItems, setVisibleItems] = useState(props.items.slice(0, 10));
    const [page, setPage] = useState(1);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            {threshold: 0.1}
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // вместо API — просто берём ещё кусок массива
        const newItems = props.items.slice(0, page * 10);
        setVisibleItems(newItems);
    }, [page, props.items]);

    return (
        <div className={'listProducts'}>
            {visibleItems.map((item, idx) => (
                <div key={idx}><Products img={item.img} name={item.name} price={item.price}
                                         discount={item.discount} rating={item.rating}></Products>
                </div>
            ))}
            <div ref={loadMoreRef} style={{height: "20px"}}/>
        </div>
    );
}

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
                <Link className="goToOrder" to='/order'>
                    <img src={props.img} alt="photo"/>
                </Link>
                <IconHeart fill={f ? "red" : "grey"} onClick={() => {
                    f ? setF(false) : setF(true)
                }} className="IconHeart"></IconHeart>
            </div>
            <Link className="goToOrder" to='/order'>
                <h4>{props.name}</h4>
            </Link>
            <Link className="goToOrder" to='/order'>
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
            </Link>
            <div className="info">
                <Link className="goToOrder" to='/order'>
                    <div className="amount">
                        {props.discount > 0 ? (<p>{props.price - (props.price * props.discount / 100)}</p>) : null}
                        <p>{props.price}</p>


                    </div>
                </Link>
                <IconShoppingCart size={18} stroke={1.5} onClick={() => {
                    addToCart(new Product(props.name, props.price, props.rating, props.discount, props.img))
                }
                }></IconShoppingCart>
            </div>


        </div>
    )
}

export function ProductPage() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    const {namepath} = useParams();
    const [price, setPrice] = useState(50000);
    const [o, setOpened] = useState(false);
    const cart = useCartItems() || [];
    const [name, setName] = useState("");
    const [rating, setRating] = useState(6);
    const [currentCategory, setCurrentCategory] = useState(null); // лучше null, а не []
    const[search, setSearch] = useState("");
    const [searchedCategory, setSearchedCategory] = useState('');
    const getCategory = useSelector((state) => state.nameCategory?.payload || state.name?.payload || "");
    useEffect(() => {
        let rawName = namepath || getCategory || localStorage.getItem('found') || "";

        if (!rawName) {
            setCurrentCategory(null);
            return;
        }

        const searchName = rawName.trim().toLowerCase();
        console.log(localStorage.getItem('found'))// ← приведи к нижнему регистру

        let foundSubCategory = null;
        if(localStorage.getItem('searchName')!=="" )
        {
            setName(localStorage.getItem('searchName'));
        }

        for (let i = 0; i < category.length; i++) {
            for (let j = 0; j < category[i].categories.length; j++) {
                const subCat = category[i].categories[j];

                if (subCat.name.trim().toLowerCase() === searchName) {   // ← обе стороны в нижнем регистре
                    foundSubCategory = subCat;
                    break;
                }
            }
            if (foundSubCategory) break;
        }

        setCurrentCategory(foundSubCategory);
        localStorage.setItem('searchName',"");
    }, [getCategory, namepath]);
    useEffect(() => {
        cart.map(item => {
            item.isCart = true;
            localStorage.setItem("isCart", String(item.isCart));
        })
    }, [cart])
    useEffect(()=>{
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
    },[search]);
    const productsInCategory = currentCategory?.products || products || [];

// Фильтрация
    const filteredPrice = productsInCategory.filter(product =>
        Math.floor(product.price / 100) <= price / 100
    );

    const filteredName = filteredPrice.filter(product =>
        product.name.toLowerCase().includes(name.toLowerCase())
    );

    const filtered = filteredName.filter(product =>
        product.rating === rating
    );
    useEffect(() => {
        localStorage.setItem('found', String(namepath).trim().toLowerCase());
    }, [namepath])

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
                        <input type="text" placeholder="Я шукаю"  value={search} onChange={(e)=>String(setSearch(e.target.value))}/>
                        <Link className="goToHome" to={`/category/${searchedCategory.trim().toLowerCase()}`} onClick={()=>localStorage.setItem("searchName", search.trim().toLowerCase())}>
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
                <section className={`main-content ${theme}`}>
                    <div className={`filter ${theme}`}>
                        <label htmlFor="pname">Назва( по літерам )</label>
                        <input type="text" name="pname" id="pname" placeholder="Введіть навзу або літеру"
                               value={name} onChange={
                            (e) => {
                                setName(e.target.value);
                            }
                        }/>
                        <label htmlFor="price">Ціна(максимальна) {price}</label>
                        <input type="range" min="100" max="50000" step="100" id="price" name="price" value={price}
                               onChange={
                                   (e) => {
                                       setPrice(Number(e.target.value));

                                   }
                               }/>
                        <label htmlFor="rating">Оцінка</label>
                        <select name="rating" id="rating" value={rating} onChange={(e) => {
                            setRating(Number(e.target.value));
                        }}>
                            <option value="6">all</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <InfiniteScrollLocal items={rating === 6 ? filteredName : filtered}></InfiniteScrollLocal>


                </section>

            </ThemeContext.Provider>
        </>

    )

}