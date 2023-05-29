import { useState } from "react";
import styles from "../styles/mainShop.css";
import Item from "./items-comp/item";
import AddItemModal from "./modals-comp/addItemModal";

function MainShop() {
  const [show, setShow] = useState(false);

  const openAddItemModal = (event) => {
    setShow(true);
  };

  return (
    <>
      <div className="shop-wrapper">
        <div className="shop-search-wrapper">
          <input type="text" placeholder="Search" />
        </div>
        <div className="shop-main-wrapper">
          <div className="shop-sidebar">
            <div className="shop-sidebar-item">
              <span>Sort by</span>
              <span>^</span>
            </div>
            <div className="shop-sidebar-item">
              <span>Sort by</span>
              <span>^</span>
            </div>
          </div>
          <div className="shop-items-wrapper" onClick={openAddItemModal}>
            <Item
              name={"Top gun plane"}
              description={
                "ovo jes aosigdj osaigjdgsdsga gsadg ads gdas glia; j;dg s"
              }
              price={"55"}
              image={
                "https://m.media-amazon.com/images/I/71Cxh1kebjL._AC_UY1000_.jpg"
              }
            />
            <Item />
            <Item />

            <Item />
            <Item />
          </div>
        </div>
      </div>
      {show && (
        <AddItemModal
          setShow={setShow}
          name={"Lotr rings"}
          description={
            "ovo je neki dsajgid sajgl dhasgj; hsad;ghdsa;gj hadsljgh ldsjahg iudsah guiosadh guhadsn guhasd "
          }
          image={
            "https://m.media-amazon.com/images/I/71Cxh1kebjL._AC_UY1000_.jpg"
          }
          price={14.2}
        />
      )}
    </>
  );
}

export default MainShop;
