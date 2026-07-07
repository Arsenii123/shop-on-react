class Product {
    isFavourite = false;
    isCart = false;
  constructor(name="",price=0,rating=0,discount=0,img='') {
      this.name=name;
      this.price=price;
      this.discount=discount;
      this.img=img;
      this.rating=rating;
  }
  editProduct(name=this.name,price=this.price,discount=this.discount,img=this.img) {
      this.img=img;
      this.name=name;
      this.price=price;
      this.discount=discount;
    }
}
export  {Product};