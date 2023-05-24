import styles from "../../styles/modals.css";
function AddItemModal({ setShow, name, description, price, image }) {
  const setChanger = (event) => {
    setShow(false);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="modal-wrapper" onClick={setChanger}>
        <div className="modal-container" onClick={stopPropagation}>
          <div
            className="modal-photo"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="modal-info-wrapper">
            <div className="modal-info-main">
              <span className="modal-info-header">{name}</span>
              <span className="modal-info-description">{description}</span>
              <span className="modal-info-price">${price}</span>
            </div>
            <div className="modal-info-buttons">
              <div className="button add-to-cart-btn">
                <span>PURCHASE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItemModal;
