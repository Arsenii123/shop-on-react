import {products} from './homepage.jsx'
import {category} from './homepage.jsx'
import {lighten} from "@mantine/core";
import {IconCheck,IconX} from "@tabler/icons-react";
import {Product} from './Product.js'
import {Category,SubCategory,useCategoryItems,Clears,addToCategory,deleteFromCategory} from './Categorry.js'
import {useEffect, useState,useReducer} from "react";
import {Link} from "react-router-dom";
import './styles/adminpanel.css'
import {useOrderItems,ClearOrders} from "./Orders.js";

const sub=new SubCategory();
function AdminPanel() {
    const p=[];
    const c=[];
    const[name,setName]=useState("");Number()
    const[cat,setCat]=useState("");
    const[discount,setDiscount]=useState(0);
    const[img,setImg]=useState("");
    const[rating,setRating]=useState(0);
    const[price,setPrice]=useState(0);
    const[add,setAdd]=useState(0);
    const[deleteProduct,setDelete]=useState(0);
    const admin=useCategoryItems() || [];
    const[obj,setObj]=useState(new Product());
    const orderArray=useOrderItems() || [];
    const subCategories=[];
    useEffect(()=>{
        const product=new Product(name,price,rating,discount,img);
        sub.name=cat;
        sub.addProduct(product);
        console.log(sub.products);
    },[add])
    useEffect(()=>{
        sub.removeProduct(obj);
    },[deleteProduct])
    console.log(orderArray);

    for (const cat of category) {
        for (const sub of cat.categories) {
            for (const product of sub.products || []) {
               p.push(product)
            }
        }
    }
    for (const cat of category) {
        for (const sub of cat.categories) {
            for (const product of sub.products || []) {
                c.push(sub);
            }
        }
    }
    for(const i  of category){
        for(const  a of i.categories){
            subCategories.push(a);

        }
    }

    return (
        <>
           <header>
               Admin panel
           </header>
            <main>
                <a href="#products">Таблиця пордуктів</a>
                <a href="#orders">Замовлення</a>
                <a href="#categories">Категорії</a>
            </main>
            <section id="products">
                <h2>Id</h2>
                <ol>
                    {products.map((_, i) => (

                        <li key={i}>{i
                        }</li>


                    ))}
                    {
                        p.map((_,i)=>(
                            <li key={i}>{i+products.length}</li>
                            )

                        )
                    }
                    {
                        admin.map((_,i)=>(
                                <li key={i}>{i+products.length+p.length}</li>

                        ))


                    }
                </ol>
               <h2>Назва</h2>
                <ol>
                    {products.map((item,index)=>(
                        <li key={index}>
                            {item.name}
                        </li>
                    ))}
                    {
                        p.map((item,index)=>(
                            <li key={index}>
                                {item.name}
                            </li>
                            )

                        )
                    }
                    {
                        admin.map((item,index)=>(
                            <li key={index}>
                                {item.name}
                            </li>
                        ))
                    }
                    <input type="text" placeholder={'Enter name please...'} value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                </ol>
                <h2>Зоображення</h2>
                <ol>
                    {products.map((item,index)=>(
                        <li key={index}>
                            {item.img}
                        </li>
                    ))}
                    {
                        p.map((item,index)=>(
                            <li key={index}>
                                {item.img}
                            </li>
                            )

                        )
                    }
                                        {
                        admin.map((item,index)=>(
                            <li key={index}>
                                {item.img}
                            </li>
                        ))
                    }
                    <input type="text" placeholder={'Enter img please...'} value={img} onChange={(e)=>{
                        setImg(e.target.value)
                    }}/>

                </ol>
                <h2>Ціна</h2>
                <ol>
                    {products.map((item,index)=>(
                        <li key={index}>
                            {item.price}
                        </li>
                    ))}
                    {
                        p.map((item,index)=>(
                            <li key={index}>
                                {item.price}
                            </li>
                            )

                        )
                    }
                                        {
                        admin.map((item,index)=>(
                            <li key={index}>
                                {item.price}
                            </li>
                        ))
                    }
                    <input type="text" placeholder={'Enter price please...'} value={price} onChange={(e)=>{
                        setPrice(Number(e.target.value));
                    }}/>
                </ol>
                <h2>Знижка</h2>
                <ol>
                    {products.map((item,index)=>(
                        <li key={index}>
                            {item.discount}
                        </li>
                    ))}
                    {
                        p.map((item,index)=>(
                            <li key={index}>
                                {item.discount}
                            </li>
                            )

                        )
                    }
                                        {
                        admin.map((item,index)=>(
                            <li key={index}>
                                {item.discount}
                            </li>
                        ))
                    }
                    <input type="text" placeholder={'Enter discount please...'} value={discount} onChange={(e)=>{
                        setDiscount(Number(e.target.value));
                    }}/>
                </ol>
                <h2>Рейтинг</h2>
                <ol>
                    {products.map((item,index)=>(
                        <li key={index}>
                            {item.rating}
                        </li>
                    ))}
                    {
                        p.map((item,index)=>(
                            <li key={index}>
                                {item.rating}
                            </li>
                            )

                        )
                    }
                                        {
                        admin.map((item,index)=>(
                            <li key={index}>
                                {item.rating}
                            </li>
                        ))
                    }
                    <input type="text" placeholder={'Enter rating please...'} value={rating} onChange={(e)=>{
                        setRating(Number(e.target.value));
                    }}/>
                </ol>
                <h2>Категорія</h2>
                <ol>
                    {products.map((item,index)=>(
                        <li key={index}>
                            example
                        </li>
                    ))}
                    {
                        c.map((item,index)=>(
                            <li key={index}>
                                {item.name}
                            </li>
                            )

                        )
                    }
                                        {
                        admin.map((item,index)=>(
                            <li key={index}>
                                {item.category}
                                <IconX size={18} onClick={()=>{
                                    deleteProduct===0 ?setDelete(1) : setDelete(0);
                                    setObj(new Product(item.name,item.price,item.rating,item.discount,item.img));

                                }} ></IconX>
                            </li>
                        ))
                    }
                    <input type="text" placeholder={'Enter category please...'}

                           value={cat} onChange={(e)=>{
                        setCat(e.target.value)
                    }}
                    />
                    <IconCheck size={18} onClick={()=>{
                        add===0 ?setAdd(1) : setAdd(0);
                    }} ></IconCheck>
                </ol>



            </section>
            <section id='orders'>
                <h2>Id</h2>
                <ol>
                    {orderArray.map((_,index)=>(
                       <li key={index}>{index}</li>

                    ))}
                </ol>
                <h2>Пошта</h2>
                <ol>
                    {
                        orderArray.map((item,index)=>(
                            <li key={index}>{item.email}</li>
                        ))
                    }
                </ol>
                <h2>Пароль</h2>
                <ol>
                    {orderArray.map((item,index)=>(
                        <li key={index}>{item.password}</li>
                    ))}
                </ol>
                <h2>Дата народження</h2>
                <ol>
                    {orderArray.map((item,index)=>(
                        <li key={index}>{item.dob}</li>
                    ))}
                </ol>
                <h2>Адрес</h2>
                <ol>
                    {orderArray.map((item,index)=>(
                        <li key={index}>{item.address}</li>
                    ))}
                </ol>
                <h2>Стать</h2>
                <ol>
                    {orderArray.map((item,index)=>(
                        <li key={index}>{item.state}</li>
                    ))}
                </ol>
                <h2>Місто</h2>
                <ol>
                    {orderArray.map((item,index)=>(
                        <li key={index}>{item.city}</li>
                    ))}
                </ol>
                <h2>Номер Картки</h2>
                <ol>
                    {orderArray.map((item,index)=>(
                        <li key={index}>{item.cardNumber}</li>
                    ))}
                </ol>
                <h2>Назва Продукта</h2>
                <ol>
                    {orderArray.map((item,index)=>(
                        <li key={index}>{item.productName}</li>
                    ))}
                </ol>

            </section>
            <section id="categories">
               <h2>Id</h2>
                <ol>
                    {subCategories.map((_,index)=>(
                        <li key={index}>{index}</li>
                    ))}
                </ol>
                <h2>Назва</h2>
                <ol>
                    {subCategories.map((item,index)=>(
                        <li key={index}>{item.name}</li>
                    ))}
                </ol>
            </section>
            <Link to="/">
                <button className='goTOHomePage'>Homepage</button>
            </Link>

        </>
    )
}
export default AdminPanel;