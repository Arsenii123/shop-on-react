import {Category, SubCategory, useCategoryItems, Clears} from "./Categorry.js";
import {Product} from "./Product.js";
import {useCartItems, addToCart, deleteFromCart, clearCart, updateCart} from "./Cart.js";
import React, {useState, useEffect, createContext, useContext, useReducer} from "react";
import {Modal, Button, Group, Menu} from "@mantine/core";
import BasicMenu from "./Menu.jsx";
import './styles/homepage.css'
import {BrowserRouter, Routes, Route, NavLink, Link} from 'react-router-dom';
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
import {useSelector, useDispatch, Provider} from 'react-redux'
import {configureStore, createSlice} from '@reduxjs/toolkit'

const ThemeContext = createContext();
export const nameSlice = createSlice({
    name: 'name', // ім'я слайса, використовується для генерації типів дій
    initialState: {nameCategory: ""}, // початковий стан лічильника
    reducers: {
        // функція-редьюсер для дії increment
        change: (state, newState) => {
            state.nameCategory = newState
        },
        clear: (state) => {
            state.nameCategory = ""
        },
    },
});
export const {change, clear} = nameSlice.actions
// навіщо витягувати? основна причина - чистота коду і читабельність
// написати далі по коду dispatch(increment()) буде простіше, ніж dispatch(counterSlice.actions.increment())
// і одразу зрозуміло, що викликається дія increment

// створюємо сховище Redux з редьюсером із слайса
export const store = configureStore({
    reducer: nameSlice.reducer, // підключаємо редюсер до сховища
})
export const category = [
    new Category("Одяг, взуття та прикраси", 1,
        new SubCategory("Жінкам",
            new Product("Сукня літня квіткова", 850, 5, 23, "https://picsum.photos/id/20/600/400"),
            new Product("Блузка шовкова", 650, 4, 18, "https://picsum.photos/id/21/600/400"),
            new Product("Джинси жіночі slim", 950, 5, 35, "https://picsum.photos/id/22/600/400"),
            new Product("Костюм офісний", 1450, 5, 12, "https://picsum.photos/id/23/600/400"),
            new Product("Світшот oversize", 720, 4, 28, "https://picsum.photos/id/24/600/400"),
            new Product("Спідниця міді", 680, 4, 15, "https://picsum.photos/id/25/600/400"),
            new Product("Пальто демісезонне", 1890, 5, 8, "https://picsum.photos/id/26/600/400"),
            new Product("Топ базовий", 450, 4, 45, "https://picsum.photos/id/27/600/400"),
            new Product("Кардиган в'язаний", 890, 5, 22, "https://picsum.photos/id/28/600/400"),
            new Product("Легінси спортивні", 590, 4, 30, "https://picsum.photos/id/29/600/400"),
            new Product("Плаття вечірнє", 1250, 5, 10, "https://picsum.photos/id/30/600/400"),
            new Product("Куртка джинсова", 980, 4, 19, "https://picsum.photos/id/31/600/400"),
            new Product("Шорти жіночі", 520, 4, 27, "https://picsum.photos/id/32/600/400"),
            new Product("Худі з капюшоном", 780, 5, 24, "https://picsum.photos/id/33/600/400"),
            new Product("Сарафан літній", 670, 4, 16, "https://picsum.photos/id/34/600/400")
        ),
        new SubCategory("Чоловікам",
            new Product("Футболка базова", 420, 5, 50, "https://picsum.photos/id/40/600/400"),
            new Product("Джинси класичні", 890, 5, 32, "https://picsum.photos/id/41/600/400"),
            new Product("Сорочка Oxford", 750, 4, 25, "https://picsum.photos/id/42/600/400"),
            new Product("Худі чоловіче", 920, 5, 20, "https://picsum.photos/id/43/600/400"),
            new Product("Куртка бомбер", 1350, 5, 14, "https://picsum.photos/id/44/600/400"),
            new Product("Штани чінос", 680, 4, 28, "https://picsum.photos/id/45/600/400"),
            new Product("Поло класичне", 580, 5, 35, "https://picsum.photos/id/46/600/400"),
            new Product("Світшот", 650, 4, 22, "https://picsum.photos/id/47/600/400"),
            new Product("Костюм чоловічий", 2450, 5, 7, "https://picsum.photos/id/48/600/400"),
            new Product("Шорти спортивні", 480, 4, 40, "https://picsum.photos/id/49/600/400"),
            new Product("Пальто чоловіче", 2190, 5, 9, "https://picsum.photos/id/50/600/400"),
            new Product("Джинсова куртка", 1050, 5, 18, "https://picsum.photos/id/51/600/400"),
            new Product("Термобілизна", 720, 4, 26, "https://picsum.photos/id/52/600/400"),
            new Product("Светр в'язаний", 890, 5, 15, "https://picsum.photos/id/53/600/400"),
            new Product("Брюки класичні", 820, 4, 21, "https://picsum.photos/id/54/600/400")
        ),
        new SubCategory("Дітям",
            new Product("Футболка дитяча", 280, 5, 45, "https://picsum.photos/id/60/600/400"),
            new Product("Джинси для хлопчика", 620, 5, 30, "https://picsum.photos/id/61/600/400"),
            new Product("Сукня для дівчинки", 550, 5, 25, "https://picsum.photos/id/62/600/400"),
            new Product("Куртка зимова", 980, 5, 12, "https://picsum.photos/id/63/600/400"),
            new Product("Шорти дитячі", 320, 4, 38, "https://picsum.photos/id/64/600/400"),
            new Product("Худі з принтом", 520, 5, 27, "https://picsum.photos/id/65/600/400"),
            new Product("Легінси для дівчат", 350, 4, 33, "https://picsum.photos/id/66/600/400"),
            new Product("Костюм спортивний", 680, 5, 19, "https://picsum.photos/id/67/600/400"),
            new Product("Пальто демі", 850, 5, 14, "https://picsum.photos/id/68/600/400"),
            new Product("Піжама дитяча", 420, 5, 40, "https://picsum.photos/id/69/600/400"),
            new Product("Шапка + шарф комплект", 390, 4, 29, "https://picsum.photos/id/70/600/400"),
            new Product("Светр з оленями", 480, 5, 22, "https://picsum.photos/id/71/600/400"),
            new Product("Плаття шкільне", 570, 5, 18, "https://picsum.photos/id/72/600/400"),
            new Product("Кросівки дитячі", 650, 5, 24, "https://picsum.photos/id/73/600/400")
        ),
        new SubCategory("Жіноче взуття",
            new Product("Кросівки білі", 890, 5, 22, "https://picsum.photos/id/80/600/400"),
            new Product("Черевики осінні", 1150, 4, 15, "https://picsum.photos/id/81/600/400"),
            new Product("Балетки класичні", 650, 4, 28, "https://picsum.photos/id/82/600/400"),
            new Product("Чоботи високі", 1450, 5, 11, "https://picsum.photos/id/83/600/400"),
            new Product("Сандалі літні", 720, 4, 35, "https://picsum.photos/id/84/600/400"),
            new Product("Туфлі на підборах", 980, 5, 19, "https://picsum.photos/id/85/600/400"),
            new Product("Кеди текстильні", 580, 4, 30, "https://picsum.photos/id/86/600/400"),
            new Product("Лофери", 850, 5, 24, "https://picsum.photos/id/87/600/400"),
            new Product("Ботильйони", 1250, 5, 13, "https://picsum.photos/id/88/600/400"),
            new Product("Сліпони", 620, 4, 27, "https://picsum.photos/id/89/600/400"),
            new Product("Уггі зимові", 1390, 5, 9, "https://picsum.photos/id/90/600/400"),
            new Product("Мокасини", 680, 4, 21, "https://picsum.photos/id/91/600/400")
        ),
        new SubCategory("Аксесуари",
            new Product("Сумка шоппер", 520, 5, 40, "https://picsum.photos/id/100/600/400"),
            new Product("Сережки срібні", 320, 5, 25, "https://picsum.photos/id/101/600/400"),
            new Product("Шарф шовковий", 450, 4, 18, "https://picsum.photos/id/102/600/400"),
            new Product("Годинник наручний", 1250, 4, 12, "https://picsum.photos/id/103/600/400"),
            new Product("Ремінь шкіряний", 380, 5, 30, "https://picsum.photos/id/104/600/400"),
            new Product("Окуляри сонцезахисні", 680, 4, 22, "https://picsum.photos/id/105/600/400"),
            new Product("Капелюх фетровий", 590, 5, 15, "https://picsum.photos/id/106/600/400"),
            new Product("Гаманець", 420, 4, 28, "https://picsum.photos/id/107/600/400"),
            new Product("Браслет", 280, 5, 35, "https://picsum.photos/id/108/600/400"),
            new Product("Шапка в'язана", 350, 4, 45, "https://picsum.photos/id/109/600/400"),
            new Product("Рюкзак міський", 890, 5, 19, "https://picsum.photos/id/110/600/400"),
            new Product("Краватка", 290, 4, 33, "https://picsum.photos/id/111/600/400"),
            new Product("Парасоля", 420, 4, 26, "https://picsum.photos/id/112/600/400")
        )
    ),
    new Category("Спорт і захоплення", 2,
        new SubCategory("Велосипеди",
            new Product("Велосипед гірський 26\"", 12500, 5, 8, "https://picsum.photos/id/120/600/400"),
            new Product("Велосипед міський", 9800, 4, 12, "https://picsum.photos/id/121/600/400"),
            new Product("Шосейний велосипед", 18500, 5, 5, "https://picsum.photos/id/122/600/400"),
            new Product("Електровелосипед", 24500, 5, 7, "https://picsum.photos/id/123/600/400"),
            new Product("Велосипед для дітей", 4200, 4, 15, "https://picsum.photos/id/124/600/400"),
            new Product("BMX велосипед", 6800, 5, 9, "https://picsum.photos/id/125/600/400"),
            new Product("Гірський велосипед 29\"", 15200, 5, 11, "https://picsum.photos/id/126/600/400"),
            new Product("Складний велосипед", 8900, 4, 14, "https://picsum.photos/id/127/600/400"),
            new Product("Велосипед фікс", 7500, 4, 10, "https://picsum.photos/id/128/600/400")
        ),
        new SubCategory("Намети й аксесуари",
            new Product("Намет 2-місний", 2850, 5, 18, "https://picsum.photos/id/130/600/400"),
            new Product("Намет 4-місний", 4500, 5, 12, "https://picsum.photos/id/131/600/400"),
            new Product("Спальний мішок", 1250, 4, 25, "https://picsum.photos/id/132/600/400"),
            new Product("Килимок туристичний", 680, 4, 30, "https://picsum.photos/id/133/600/400"),
            new Product("Рюкзак туристичний 60л", 1850, 5, 16, "https://picsum.photos/id/134/600/400"),
            new Product("Фонарик налобний", 420, 4, 35, "https://picsum.photos/id/135/600/400"),
            new Product("Термос 1л", 580, 5, 22, "https://picsum.photos/id/136/600/400"),
            new Product("Палатка швидкозбірна", 3200, 5, 9, "https://picsum.photos/id/137/600/400"),
            new Product("Газова плитка", 950, 4, 19, "https://picsum.photos/id/138/600/400"),
            new Product("Матрац надувний", 780, 4, 27, "https://picsum.photos/id/139/600/400")
        ),
        new SubCategory("Протеїн",
            new Product("Протеїн сироватковий 1кг", 980, 5, 40, "https://picsum.photos/id/140/600/400"),
            new Product("Казеїн протеїн", 1150, 4, 25, "https://picsum.photos/id/141/600/400"),
            new Product("Гейнер 2кг", 1350, 4, 18, "https://picsum.photos/id/142/600/400"),
            new Product("Ізолят протеїну", 1450, 5, 22, "https://picsum.photos/id/143/600/400"),
            new Product("Веганський протеїн", 1250, 4, 15, "https://picsum.photos/id/144/600/400"),
            new Product("BCAA амінокислоти", 680, 5, 30, "https://picsum.photos/id/145/600/400"),
            new Product("Креатин моногідрат", 520, 5, 35, "https://picsum.photos/id/146/600/400")
        ),
        new SubCategory("Ножі",

            new Product("Ніж мисливський", 1250, 4, 20, "https://picsum.photos/id/150/600/400"),
            new Product("Мультитул", 980, 5, 25, "https://picsum.photos/id/151/600/400"),
            new Product("Кухонний набір ножів", 1850, 5, 12, "https://picsum.photos/id/152/600/400"),
            new Product("Складний ніж", 650, 4, 30, "https://picsum.photos/id/153/600/400"),
            new Product("Тактичний ніж", 1450, 5, 15, "https://picsum.photos/id/154/600/400")
        ),
        new SubCategory("Термопродукція",

            new Product("Термокружка 0.5л", 420, 5, 45, "https://picsum.photos/id/160/600/400"),
            new Product("Термос 1.5л", 780, 5, 28, "https://picsum.photos/id/161/600/400"),
            new Product("Термобілизна комплект", 1250, 4, 19, "https://picsum.photos/id/162/600/400"),
            new Product("Термосумка", 950, 4, 22, "https://picsum.photos/id/163/600/400"),
            new Product("Термоконтейнер", 680, 5, 30, "https://picsum.photos/id/164/600/400")
        )
    ),
    new Category("Офіс школа книги", 3,
        new SubCategory("Зошити учнівські",

            new Product("Зошит 12 аркушів", 35, 5, 100, "https://picsum.photos/id/170/600/400"),
            new Product("Зошит 24 аркуші", 55, 5, 85, "https://picsum.photos/id/171/600/400"),
            new Product("Зошит у клітинку A4", 75, 4, 60, "https://picsum.photos/id/172/600/400"),
            new Product("Зошит у лінію", 45, 4, 90, "https://picsum.photos/id/173/600/400"),
            new Product("Комплект зошитів 10 шт", 320, 5, 40, "https://picsum.photos/id/174/600/400")
        ),
        new SubCategory("Папір офісний",

            new Product("Папір А4 500 арк.", 280, 5, 55, "https://picsum.photos/id/180/600/400"),
            new Product("Папір А3 250 арк.", 420, 4, 30, "https://picsum.photos/id/181/600/400"),
            new Product("Кольоровий папір", 180, 4, 45, "https://picsum.photos/id/182/600/400")
        ),
        new SubCategory("Ручки",

            new Product("Ручка кулькова синя", 25, 4, 120, "https://picsum.photos/id/190/600/400"),
            new Product("Набір ручок 12 шт", 220, 5, 50, "https://picsum.photos/id/191/600/400"),
            new Product("Ручка гелева", 45, 5, 80, "https://picsum.photos/id/192/600/400"),
            new Product("Маркер перманентний", 65, 4, 70, "https://picsum.photos/id/193/600/400")
        ),
        new SubCategory("Пенали шкільні",

            new Product("Пенал одинарний", 120, 4, 35, "https://picsum.photos/id/200/600/400"),
            new Product("Пенал двосторонній", 180, 5, 28, "https://picsum.photos/id/201/600/400"),
            new Product("Пенал з наповненням", 450, 5, 22, "https://picsum.photos/id/202/600/400")
        ),
        new SubCategory("Шкільні набори та ранці",

            new Product("Ранець шкільний", 1250, 5, 15, "https://picsum.photos/id/210/600/400"),
            new Product("Набір шкільний", 890, 4, 20, "https://picsum.photos/id/211/600/400"),
            new Product("Портфель", 980, 4, 18,
                "https://picsum.photos/id/212/600/400")
        )
    ),
    new Category("Зоотовари", 4,
        new SubCategory("Корм для собак",
            new Product("Корм сухий для собак 10кг", 1250, 5, 25, "https://picsum.photos/id/220/600/400"),
            new Product("Вологий корм для собак", 85, 4, 60, "https://picsum.photos/id/221/600/400"),
            new Product("Корм для цуценят", 980, 5, 20, "https://picsum.photos/id/222/600/400")
        ),
        new SubCategory("Корм для котів",
            new Product("Сухий корм для котів 5кг", 780, 4, 30, "https://picsum.photos/id/230/600/400"),
            new Product("Консерви для котів", 65, 5, 55, "https://picsum.photos/id/231/600/400"),
            new Product("Корм для стерилізованих", 850, 4, 22, "https://picsum.photos/id/232/600/400")
        ),
        new SubCategory("Аксесуари для акваріумів",
            new Product("Фільтр акваріумний", 1250, 5, 18, "https://picsum.photos/id/240/600/400"),
            new Product("Грунт для акваріума", 420, 4, 35, "https://picsum.photos/id/241/600/400"),
            new Product("Підсвітка LED", 980, 5, 15, "https://picsum.photos/id/242/600/400")
        ),
        new SubCategory("Будки та лежаки",
            new Product("Лежак для кота", 680, 4, 25, "https://picsum.photos/id/250/600/400"),
            new Product("Будка для собаки", 2450, 5, 12, "https://picsum.photos/id/251/600/400"),
            new Product("Матрац для тварин", 520, 4, 30, "https://picsum.photos/id/252/600/400")
        ),
        new SubCategory("Іграшки для тварин",
            new Product("М'яч для собак", 120, 5, 50, "https://picsum.photos/id/260/600/400"),
            new Product("Мишка для кота", 85, 4, 60, "https://picsum.photos/id/261/600/400"),
            new Product("Канат для гризуна", 150, 4, 40, "https://picsum.photos/id/262/600/400")
        )
    ),
    new Category("Побутова хімія", 5,
        new SubCategory("Засоби для прання",
            new Product("Порошок пральний 3кг", 320, 5, 40, "https://picsum.photos/id/270/600/400"),
            new Product("Гель для прання", 280, 4, 35, "https://picsum.photos/id/271/600/400"),
            new Product("Кондиціонер для білизни", 180, 4, 50, "https://picsum.photos/id/272/600/400")
        ),
        new SubCategory("Засоби для миття посуду",
            new Product("Засіб для миття посуду 500мл", 95, 5, 80, "https://picsum.photos/id/280/600/400"),
            new Product("Таблетки для ПММ", 420, 4, 45, "https://picsum.photos/id/281/600/400")
        ),
        new SubCategory("Засоби для прибирання",
            new Product("Засіб для підлоги", 150, 4, 55, "https://picsum.photos/id/290/600/400"),
            new Product("Універсальний очищувач", 220, 4, 40, "https://picsum.photos/id/291/600/400"),
            new Product("Засіб для скла", 130, 5, 60, "https://picsum.photos/id/292/600/400")
        ),
        new SubCategory("Освіжувачі повітря",
            new Product("Освіжувач спрей", 180, 4, 50, "https://picsum.photos/id/300/600/400"),
            new Product("Автоматичний освіжувач", 450, 5, 25, "https://picsum.photos/id/301/600/400")
        ),
        new SubCategory("Гігієна та догляд",
            new Product("Мило рідке", 120, 5, 70, "https://picsum.photos/id/310/600/400"),
            new Product("Шампунь 400мл", 220, 5, 45, "https://picsum.photos/id/311/600/400"),
            new Product("Гель для душу", 180, 4, 55, "https://picsum.photos/id/312/600/400")
        )
    ),
    new Category("Дача, сад і город", 6,
        new SubCategory("Тримери та мотокоси",
            new Product("Тример електричний", 1850, 4, 15, "https://picsum.photos/id/320/600/400"),
            new Product("Мотокоса бензинова", 4250, 5, 10, "https://picsum.photos/id/321/600/400")
        ),
        new SubCategory("Ланцюгові пили",
            new Product("Пила ланцюгова 2.5кВт", 3850, 5, 12, "https://picsum.photos/id/330/600/400"),
            new Product("Міні-пила акумуляторна", 2450, 4, 18, "https://picsum.photos/id/331/600/400")
        ),
        new SubCategory("Газонокосарки",
            new Product("Газонокосарка електрична", 3250, 4, 14, "https://picsum.photos/id/340/600/400"),
            new Product("Газонокосарка бензинова", 6800, 5, 9, "https://picsum.photos/id/341/600/400")
        ),
        new SubCategory("Насоси та помпи",
            new Product("Насос дренажний", 1850, 4, 20, "https://picsum.photos/id/350/600/400"),
            new Product("Насос поверхневий", 2450, 5, 13, "https://picsum.photos/id/351/600/400")
        ),
        new SubCategory("Обприскувачі",
            new Product("Обприскувач ручний", 420, 4, 35, "https://picsum.photos/id/360/600/400"),
            new Product("Обприскувач акумуляторний", 1250, 5, 22, "https://picsum.photos/id/361/600/400")
        )
    ),
    new Category("Електроніка", 7,
        new SubCategory("Смартфони",
            new Product("Samsung Galaxy A55", 14500, 5, 18, "https://picsum.photos/id/370/600/400"),
            new Product("iPhone 14", 28900, 5, 12, "https://picsum.photos/id/371/600/400"),
            new Product("Xiaomi Redmi Note 13", 8500, 4, 25, "https://picsum.photos/id/372/600/400")
        ),
        new SubCategory("Телевізори",
            new Product("Телевізор 43\" Smart", 12500, 4, 15, "https://picsum.photos/id/380/600/400"),
            new Product("Телевізор 55\" 4K", 18900, 5, 10, "https://picsum.photos/id/381/600/400")
        ),
        new SubCategory("Навушники",
            new Product("AirPods Pro", 7800, 5, 20, "https://picsum.photos/id/390/600/400"),
            new Product("Навушники Sony WH-1000XM5", 14500, 5, 14, "https://picsum.photos/id/391/600/400"),
            new Product("Bluetooth навушники", 1250, 4, 35, "https://picsum.photos/id/392/600/400")
        ),
        new SubCategory("Фотоапарати",
            new Product("Камера Canon EOS", 24500, 5, 8, "https://picsum.photos/id/400/600/400"),
            new Product("Милка Sony ZV-1", 18500, 4, 12, "https://picsum.photos/id/401/600/400")
        ),
        new SubCategory("Ноутбуки",
            new Product("Ноутбук Lenovo IdeaPad", 18500, 4, 15, "https://picsum.photos/id/410/600/400"),
            new Product("MacBook Air M2", 48900, 5, 9, "https://picsum.photos/id/411/600/400"),
            new Product("Asus VivoBook", 14500, 5, 18, "https://picsum.photos/id/412/600/400")
        )
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
export const orders=[];
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
                <Link className="goToOrder" to='/order'>
                    <img src={props.img} alt="photo" />
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


export function InfoCategories(props) {
    const initialState = {
        count: Number(props.count) || 1,
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'INCREMENT':
                return {count: state.count + 1};
            case 'DECREMENT':
                return {count: state.count - 1};
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
    const total = (finalPrice * state.count).toFixed(0) + '$';

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
                    onClick={() => (state.count > 1 ? dispatch({type: 'DECREMENT'}) : 0)}
                    color={state.count > 1 ? 'red' : 'grey'}
                    style={{cursor: 'pointer'}}
                />
                <span style={{fontSize: "18px", fontWeight: "600", minWidth: "30px", textAlign: "center"}}>
                    {state.count}
                </span>
                <IconPlus
                    size={24}
                    stroke={1.5}
                    onClick={() => (state.count < 50 ? dispatch({type: 'INCREMENT'}) : 0)}
                    color={state.count < 50 ? 'red' : 'grey'}
                    style={{cursor: 'pointer'}}
                />
            </div>
            <p style={{fontWeight: "700", fontSize: "17px"}}>
                {total}
            </p>
            <IconX style={{cursor: 'pointer'}} onClick={() => {
                deleteFromCart(props.name)
            }}></IconX>
        </div>


    );
}


function Homepage() {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const [o, setOpened] = useState(false);
    const cart = useCartItems() || [];
    const [search, setSearch] = useState("");
    const [searchedCategory, setSearchedCategory] = useState('');
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
    return (
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
                    <Link to="/account" className="goToHome">
                        <IconUser size={18}/>
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
                <section className={`app ${theme}`}>
                    <div>
                        <Categories/>

                    </div>
                    <div>
                        {
                            products.map((item, index) => (
                                <div key={index} onClick={()=>{
                                    orders.push(new Product(item.name,item.price,item.rating,item.discount,item.img));
                                }}><Products img={item.img} name={item.name} price={item.price}
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
