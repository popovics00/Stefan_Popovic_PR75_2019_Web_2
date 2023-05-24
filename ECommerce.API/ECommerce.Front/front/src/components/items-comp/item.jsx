function Item({ name, description, price, image }) {
  return (
    <>
      <div className="shop-item">
        <div className="item-photo-wrapper">
          <div
            className="item-photo"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
        <span className="item-name">{name}</span>
        <span className="item-description">{description}</span>
        <span className="item-price">${price}</span>
      </div>
    </>
  );
}

export default Item;
