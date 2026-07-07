import {Category, SubCategory} from "./Categorry.js";
import {Product} from "./Product.js";
import React, {useState, useEffect, createContext, useContext} from "react";
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
    IconStar
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
    new Product("shirt",100,3,10,"https://content1.rozetka.com.ua/goods/images/big_tile/668103957.jpg")
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
export function Products(props){
    const {theme} = useContext(ThemeContext);
    const [f,setF]=useState(false);
    const r=[];
    for(let i=0; i<props.rating; i++){
        r.push(1)
    }
    return(
        <div className={`card ${theme}`}>
            <div className={"iLove"}>
                <img src={props.img} alt="photo"/>
                <IconHeart fill={f? "red" : "grey"} onClick={()=>{f ? setF(false) : setF(true)}} className="IconHeart"></IconHeart>
            </div>
            <h4>{props.name}</h4>
            <div className="stars">
                {
                    r.map((item,index)=>{
                            if(item===1){
                                return(
                                    <IconStar key={index} fill="yellow"></IconStar>
                                );
                            }
                            else {
                                return(
                                    <IconStar key={index} ></IconStar>
                                );
                            }
                        }

                    )
                }
            </div>
            <div className="info">
                <div className="amount">
                    <p>{props.price}</p>
                    {props.discount>0 ? (<p>{props.discount}</p>): null}

                </div>
                <IconShoppingCart size={18} stroke={1.5}></IconShoppingCart>
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

function Homepage() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            <ThemeContext.Provider value={{theme,toggleTheme}}>
                <header className={`header ${theme}`}></header>
                <main className={`main ${theme}`}>
                    <BasicMenu></BasicMenu>
                    <button>
                        <IconApps size={24} stroke={1.5}/>
                        Каталог
                    </button>
                    <div>
                        <IconSearch size={24} stroke={1.5}/>
                        <input type="text" placeholder="Я шукаю"/>
                        <button>Знайти</button>

                    </div>

                    <IconUser size={18}/>
                    <IconHome size={18}/>
                    <IconShoppingCart size={18}/>
                    <ThemeContext.Consumer>
                        {({ toggleTheme }) => (
                            <IconSettings size={18} onClick={toggleTheme}  />
                        )}
                    </ThemeContext.Consumer>


                </main>
                <section  className={`app ${theme}`}>
                    <div>
                        <Categories/>
                    </div>
                    <div>
                        {
                            products.map((item, index) => (
                                <div key={index}><Products img={item.img} name={item.name} price={item.price} discount={item.discount} rating={item.rating}></Products></div>

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
