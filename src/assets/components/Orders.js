import { Product } from './Product.js';
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

export class Orders {
    email = "";
    password = "";
    address = "";
    city = "";
    state = "";
    dob = "";
    cardNumber = "";
    product;

    constructor(product) {
        this.product = new Product(
            product.name,
            product.price,
            product.rating,
            product.discount,
            product.img
        );
    }

    prepareOrder(email = null, password = null, city = null, address = null, state = null, dob = null, cardNumber = null) {
        this.email = email;
        this.password = password;
        this.city = city;
        this.address = address;
        this.state = state;
        this.dob = dob;
        this.cardNumber = cardNumber;
    }

    async makeOrder() {
        if (
            this.email &&
            this.password &&
            this.city &&
            this.address &&
            this.state &&
            this.dob &&
            this.cardNumber &&
            this.product
        ) {
            await addToOrder(this.product, this);
        } else {
            console.warn('Не всі поля заповнені', this);
        }
    }
}

const database = new Dexie('OrderList');

// Залишаємо твій індекс + додаємо productName і orderDate
database.version(2).stores({
    items: '++id, productName, orderDate, [email+password+address+city+state+dob+cardNumber]'
});

export function useOrderItems() {
    return useLiveQuery(() => database.items.toArray(), []);
}

export async function addToOrder(product, order) {
    // Виправлена перевірка
    if (!product || !product.name || !order || !order.email) {
        console.warn('addToOrder: некоректні дані', { product, order });
        return;
    }

    try {
        const existing = await database.items
            .where('[email+password+address+city+state+dob+cardNumber+img+price+discount+rating]')
            .equals([
                order.email,
                order.password,
                order.address,
                order.city,
                order.state,
                order.dob,
                order.cardNumber,
                product.img,
                product.price,
                product.discount,
                product.rating
            ])
            .first();

        if (existing) {
            console.log('Таке замовлення вже є');
            return null;
        }


        const id = await database.items.add({
            email: order.email,
            password: order.password,
            address: order.address,
            city: order.city,
            state: order.state,
            dob: order.dob,
            cardNumber: order.cardNumber,
            // додаткові корисні поля
            productName: product.name,

        });

        console.log('Замовлення збережено, id:', id);
        return id;

    } catch (error) {
        console.error('Помилка збереження в Dexie:', error);
        throw error;
    }
}

export async function ClearOrders() {
    await database.items.clear();
}