import {Product} from './Product.js';
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
        .where('name')
        .equals(product.name)
        .and(prod =>
            prod.img === product.img &&
            prod.price === product.price &&
            prod.discount === product.discount &&
            prod.rating === product.rating
        )
        .first();





    if (existing) {
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


export async function deleteFromCategory(product) {
    const existing = await database.items
        .where('name')
        .equals(product.name)
        .and(prod =>
            prod.img === product.img &&
            prod.price === product.price &&
            prod.discount === product.discount &&
            prod.rating === product.rating
        )
        .first();



    if (existing) {
        await database.items.delete(existing.id);
    }


}
export async function Clears(){
    await database.items.clear();
}



export {SubCategory,Category};