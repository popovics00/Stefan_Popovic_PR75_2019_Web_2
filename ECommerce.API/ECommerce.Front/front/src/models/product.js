
class CreateEditProduct {
  constructor(Name, Price, Stock, Address, Description, Image, Categories) {
    this.Name = Name;
    this.Price = Price;
    this.Stock = Stock;
    this.Address = Address;
    this.Description = Description;
    this.Image = Image;
    this.Categories = Categories;
    }
}



export default class ProductDataIn {
  constructor(category, categoryId, description, id, images, name, lastUpdateTime, isDeleted, price, stock) {
    this.category = category;
    this.categoryId = categoryId;
    this.description = description;
    this.id = id;
    this.images = images;
    this.name = name;
    this.lastUpdateTime = lastUpdateTime;
    this.isDeleted = isDeleted;
    this.price = price;
    this.stock = stock;
  }
}
