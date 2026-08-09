import {Menu, Button, Modal} from "@mantine/core";
import React, {useState,useEffect} from "react";
import {IconHome, IconShoppingCart, IconUser, IconInfoCircle, IconMenu2, IconX} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {InfoCategories, orders} from "./homepage.jsx";
import {clearCart, useCartItems} from "./Cart.js";



function Cart({isOpened}){
    const cart = useCartItems() || [];
    const [o, setOpened] = useState(false);
    const theme = localStorage.getItem('theme');

    useEffect(() => {
        setOpened(isOpened);
    }, [isOpened]);

    return (
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
    );
}
export default function BasicMenu() {
    const [cartOpened, setCartOpened] = useState(false);
    const menu = [
        { option: <Link to="/" style={{textDecoration: "none",color:"black"}}> <p>Головна</p> </Link>, icon: <Link to="/" style={{textDecoration: "none",color:"black"}}><IconHome size={20} /></Link>, action: () => {} },
        { option: "Кошик", icon: <IconShoppingCart size={20} />, action: () =>{
             setCartOpened(true);
            }},
        { option: <Link to="/account" style={{textDecoration: "none",color:"black"}}> <p>Аккаунти</p> </Link>, icon: <IconUser size={20} /> , action: () => {} },
        {
            option: "Інфо",
            icon: <IconInfoCircle size={20} />,
            info: [
                { name: "Про нас", action: () => {} },
                { name: "Контакти", action: () => {} },
            ]
        }
    ];
    return (
        <>
        <Menu
            shadow="md"
            width={340}
            position="bottom-start"
        >
            <Menu.Target>
                <Button className="m-button" >
                    <IconMenu2 size={28} stroke={1.8} />
                </Button>
            </Menu.Target>

            <Menu.Dropdown style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                padding: "6px 0",
                width: "340px"

            }}>

                {menu.map((item, index) => {
                    if (Array.isArray(item.info)) {
                        return (
                            <React.Fragment key={index}>
                                <Menu.Item style={{ padding: "14px 20px", fontWeight: "600", color: "#111" }}>
                                    {item.option}
                                </Menu.Item>
                                {item.info.map((sub, subIndex) => (
                                    <Menu.Item
                                        key={subIndex}
                                        onClick={sub.action}
                                        style={{ padding: "12px 20px 12px 50px", color: "#444" }}
                                    >
                                        {sub.name}
                                    </Menu.Item>
                                ))}
                            </React.Fragment>
                        );
                    }
                    return (
                        <Menu.Item
                            key={index}
                            leftSection={item.icon}
                            onClick={item.action}
                            style={{ padding: "14px 20px", color: "#222" }}
                        >
                            {item.option}
                        </Menu.Item>
                    );
                })}
            </Menu.Dropdown>
        </Menu>
    <Cart isOpened={cartOpened} />
        </>
    );
}
