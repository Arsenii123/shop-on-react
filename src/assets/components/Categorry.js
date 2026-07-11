import {Product} from './Product.js';
import {IconApps}  from '@tabler/icons-react';
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
    constructor(name,img) {
       super(name,img);
    }
    addProduct(product){
        if(product instanceof Product){
            this.products.push(product);
        }
    }
    removeProduct(product){
        if(product instanceof Product){
            const index = this.products.indexOf(product);
            this.categories.splice(index, 1);
        }
    }
}

export {SubCategory,Category};