import { Menu, Button } from "@mantine/core";
import React from "react";
import { IconHome, IconShoppingCart, IconUser, IconInfoCircle, IconMenu2 } from "@tabler/icons-react";

const menu = [
    { option: "Головна", icon: <IconHome size={20} />, action: () => {} },
    { option: "Кошик", icon: <IconShoppingCart size={20} />, action: () => {} },
    { option: "Аккаунти", icon: <IconUser size={20} />, action: () => {} },
    {
        option: "Інфо",
        icon: <IconInfoCircle size={20} />,
        info: [
            { name: "Про нас", action: () => {} },
            { name: "Контакти", action: () => {} },
        ]
    }
];

export default function BasicMenu() {
    return (
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
    );
}