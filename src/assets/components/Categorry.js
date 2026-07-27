import {Product} from './Product.js';
import {IconApps}  from '@tabler/icons-react';
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
class Category {
    categories=[];
    constructor(name="none",img=0,...args){
        this.name = name;
        this.img = img;
        for(let i of args){
            if(i!==null){
               this.categories.push(i);
            }

        }
    }
    addCategory(category){
        if(category instanceof SubCategory){
            this.categories.push(category);
        }
    }
    removeCategory(category){
        if(category instanceof SubCategory){
            const index = this.categories.indexOf(category);
            this.categories.splice(index, 1);
        }
    }


}
class SubCategory extends Category {
    products=[];
    constructor(name,...args) {
       super(name);
        for(let i of args){
            if(i!==null){
                this.products.push(i);
            }

        }
        for(let i of this.products){
            addToCategory(i,this.name);
        }
    }
    addProduct(product){
        if(product instanceof Product){
            this.products.push(product);
            addToCategory(product,this.name);
        }
    }
    removeProduct(product){
        if(product instanceof Product){
            const index = this.products.indexOf(product);
            this.categories.splice(index, 1);
            deleteFromCategory(product);
        }
    }
}

const database = new Dexie('CategoryList');
database.version(1).stores({
    items: '++id, name, price, rating, discount, img, category'
});

export function useCategoryItems() {
    return useLiveQuery(() => database.items.toArray(), []);
}

export async function addToCategory(product,name) {
    if (!product || !product.name) return;

    const existing = await database.items
        .filter(a =>
            a.name === product.name &&
            a.price === product.price &&
            a.discount === product.discount &&
            a.img === product.img &&
            a.rating === product.rating
        );


    if (existing[0] ) {
        return null;

    } else {
        await database.items.add({
            name: product.name,
            price: Number(product.price),
            rating: Number(product.rating),
            discount: Number(product.discount),
            img: product.img,
            count: 1,
            category: name
        });
    }
}
//-дописать
export async function updateCategory(product) {
    if (!product) return;
    const existing = await database.items.where('name').equals(name).first();
    if (existing) {
        await database.items.update(existing.id, { count: Number(newCount) });
    }
}

export async function deleteFromCategory(product) {
    const existing = await database.items
        .filter(i =>
            i.name === product.name &&
            i.price === product.price &&
            i.discount === product.discount &&
            i.img === product.img &&
            i.rating === product.rating
        )

    if (existing) {
        await database.items.delete(existing[0].id);
    }


}




export {SubCategory,Category};