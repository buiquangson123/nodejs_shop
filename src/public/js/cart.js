const cart = $(".header__cart-wrap");
const displayCart = $(".header__cart-list");
const iconCart = $(".header__cart-icon");

const qualityNotify = $(".header__cart-quality");
const headerList = $(".header__cart-header");
const ListAdd = $(".header__cart-list-add");
const footerList = $(".footer__cart-footer");

iconCart.onmouseover = function (e) {
  let objectItem = JSON.parse(localStorage.getItem("CART_STORAGE")) || {};
  if (objectItem.length > 0) {
    displayCart.classList.remove("header__cart-list--no-cart");
    headerList.style.display = "block";
    ListAdd.style.display = "block";
    footerList.style.display = "flex";
    qualityNotify.style.display = "block";

    footerList.querySelector(".footer__cart-footer-amount").innerHTML =
      localStorage.getItem("amountCart").concat(" Thêm vào giỏ hàng");
    const listCart = displayCart.querySelector(".header__cart-list-add");
    while (ListAdd.firstChild) {
      ListAdd.firstChild.remove();
    }
    objectItem = JSON.parse(localStorage.getItem("CART_STORAGE"));
    objectItem.map((item, index) => {
      const itemCart = document.createElement("div");
      itemCart.classList.add("header__cart-item");
      itemCart.setAttribute("id", item.id);
      itemCart.innerHTML = `
      <a href="" class="header__cart-item-link">
      <img class="header__cart-item-img" src="./img/product/sp${item.id}/${item.img}" alt="Ảnh sản phẩm">
                                <div class="header__cart-item-msg">
                                    <span class="header__cart-title">${item.name}</span>
                                </div>
                                <div class="header__cart-item-cost">
                                    <p class="header__cart-des">${item.price}</p>
                                    <p class="header__cart-des">x ${item.amountCart}</p>
                                    <div class="header__cart-item-delete index-${item.size}-${item.color}" id=${item.id}>
                                    <span class="header__cart-dele-active">Xóa</span>
                                    </div>
                                    </div>
                                    
                            </a>
                                            
                            `;
      listCart.appendChild(itemCart);
    });
  } else {
    displayCart.classList.add("header__cart-list--no-cart");
    headerList.style.display = "none";
    ListAdd.style.display = "none";
    footerList.style.display = "none";
    qualityNotify.style.display = "none";
  }
};

iconCart.onmouseout = function (e) {
  const listItemCart = $$(".header__cart-item");
  for (let item of listItemCart) {
    item.onmouseover = function (e) {
      item.style.background = "#f1f1f1";
      let deleteItem = e.target.closest(".header__cart-item-delete");
      if (deleteItem) {
        deleteItem.style.background = "var(--orange-color)";
        deleteItem.querySelector("span").style.color = "var(--white-color)";

        const listCart = displayCart.querySelector(".header__cart-list-add");
        deleteItem.addEventListener("click", async (event) => {
          let id = await event.target
            .closest(".header__cart-item-delete")
            .getAttribute("id")
            .split("-")
            .pop();

          let index = await event.target
            .closest(".header__cart-item-delete")
            .getAttribute("class")
            .split("-")
            .splice(3, 2);

          if (listCart.childNodes.length > 0) {
            let localCart = await JSON.parse(
              localStorage.getItem("CART_STORAGE")
            );
            let check = await localCart.findIndex(
              (item) =>
                item.id == id && item.size == index[0] && item.color == index[1]
            );
            console.log(">>>check index: ", check);
            listCart.removeChild(listCart.childNodes[check]);
          }

          // set amount when delete item on cart
          let itemProduct = JSON.parse(localStorage.getItem("ITEM_PRODUCT"));
          itemProduct.product.amount =
            itemProduct.product.amount +
            JSON.parse(localStorage.getItem("amount"));
          localStorage.setItem("ITEM_PRODUCT", JSON.stringify(itemProduct));

          // update hiển thị lại số lượng sản phẩm
          if (document.querySelector(".product-amount-stock")) {
            document.querySelector(".product-amount-stock").innerHTML =
              itemProduct.product.amount + " Sản phẩm có sẵn";
          }

          // update amount cart on noti bell
          let amount = parseInt(localStorage.getItem("amountCart"));
          let newAmount = amount - 1;
          localStorage.setItem("amountCart", newAmount);
          amountCart.innerHTML = localStorage.getItem("amountCart");
          if (localStorage.getItem("amountCart") == 0) {
            displayCart.classList.add("header__cart-list--no-cart");
            headerList.style.display = "none";
            ListAdd.style.display = "none";
            footerList.style.display = "none";
            qualityNotify.style.display = "none";
            amountCart.style.display = "none";
            localStorage.removeItem("CART_STORAGE");
            localStorage.removeItem("amountCart");
          }

          if (localStorage.getItem("amountCart")) {
            footerList.querySelector(".footer__cart-footer-amount").innerHTML =
              localStorage.getItem("amountCart").concat(" Thêm vào giỏ hàng");
          }

          // update new cart when delete item
          if (JSON.parse(localStorage.getItem("CART_STORAGE")) !== null) {
            let newCart = JSON.parse(
              localStorage.getItem("CART_STORAGE")
            ).filter(
              (el) =>
                el.id != id ||
                (el.id == id && el.size != index[0] && el.color != index[1]) ||
                (el.id == id && el.size == index[0] && el.color != index[1]) ||
                (el.id == id && el.size != index[0] && el.color == index[1])
            );
            console.log(">>>check newCart", newCart);
            localStorage.setItem("CART_STORAGE", JSON.stringify(newCart));
          }

          // update file json
          fetch("https://data-shop.herokuapp.com/product" + "/" + id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: itemProduct.product.amount,
            }),
          });

          event.preventDefault();
        });
      } else {
        item.querySelector(".header__cart-item-delete").style.background =
          "var(--white-color)";
        item.querySelector(".header__cart-dele-active").style.color =
          "var(--black-color)";
      }
    };

    item.onmouseout = function (e) {
      item.style.background = "var(--white-color)";
    };
  }
};
