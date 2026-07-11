import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

const db = new Dexie('CartList');
db.version(1).stores({
    items: '++id, name, price, rating, discount, img, count'
});

export function useCartItems() {
    return useLiveQuery(() => db.items.toArray(), []);
}

export async function addToCart(product) {
    if (!product || !product.name) return;

    const existing = await db.items.where('name').equals(product.name).first();

    if (existing ) {
        if (existing.count < 50) {

        }
        else{
            await db.items.update(existing.id, {
                count: (existing.count || 1)
            });
        }

    } else {
        await db.items.add({
            name: product.name,
            price: Number(product.price),
            rating: Number(product.rating),
            discount: Number(product.discount),
            img: product.img,
            count: 1
        });
    }
}

export async function updateCart(name, newCount) {
    if (!name) return;
    const existing = await db.items.where('name').equals(name).first();
    if (existing) {
        await db.items.update(existing.id, { count: Number(newCount) });
    }
}

export async function deleteFromCart(id) {
    await db.items.delete(id);
}

export async function clearCart() {
    await db.items.clear();
}

export default db;
