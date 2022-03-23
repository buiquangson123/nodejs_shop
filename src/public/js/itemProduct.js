const isMall = $(".home-product-item__mall span");
if (isMall) {
  isMall.innerHTML = "Mall";
}
const CART_STORAGE = "CART_STORAGE";
let listCart = JSON.parse(localStorage.getItem(CART_STORAGE)) || [];

const url = "https://data-shop.herokuapp.com/product";
const KEY_STORAGE = "ITEM_PRODUCT";
const config = JSON.parse(localStorage.getItem(KEY_STORAGE)) || {};

function setConfig(key, value) {
  config[key] = value;
  localStorage.setItem(KEY_STORAGE, JSON.stringify(config));
}

const amountCart = $(".header__cart-quality");
amountCart.innerHTML = localStorage.getItem("amountCart") || 0;
let amount;
if (amountCart.innerHTML == 0) {
  amount = 0;
  amountCart.style.display = "none";
} else {
  amount = parseInt(amountCart.innerText);
}

const bodyProduct = $(".home-product .row.sm-gutter");
const heightLabel = $(".home-product-item__label-noti");
fetch(url)
  .then((res) => res.json())
  .then((datas) => {
    setTimeout(() => {
      document.querySelector(".main-overlay").style.display = "none";
      document.getElementsByTagName("html")[0].style.overflowY = "scroll";
    }, 2000);
    var htmls = datas.map((pro) => {
      const elItemPro = document.createElement("div");
      elItemPro.classList.add("col", "l-2-4", "m-4", "c-6");
      elItemPro.innerHTML = `<a id=${pro.id}  onClick="productItem(${
        pro.id
      })" class="home-product-item__link">
                    <div class="home-product-item">
                        <div class="home-product-item__img" style="background-image: url(./img/product/sp${
                          pro.id
                        }/${pro.img[0]})">
                        </div>
                        <div class="home-product-item__img-xtra" style="background-image: url(./img/product/${
                          pro.img_deli
                        })"></div>
                        <h4 class="home-product-item__name">
                            ${pro.name}
                        </h4>
                        ${
                          pro.label_content || pro.label_deal
                            ? `
                            <div class="home-product-item__label-noti">
                                ${
                                  pro.label_content
                                    ? `<svg class="_2DRZW _2xFcL" viewBox="-0.5 -0.5 4 16">
                                        <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" stroke-width="1" transform="" stroke="currentColor" fill="#f69113"></path>
                                    </svg>
                                    <div class="home-product-item__label-content">${pro.label_content}</div>
                                    <svg class="_2DRZW _2xFcL" viewBox="-0.5 -0.5 4 16">
                                        <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" stroke-width="1" transform="rotate(180) translate(-3 -15)" stroke="currentColor" fill="#f69113"></path>
                                    </svg>`
                                    : ""
                                }
                                ${
                                  pro.label_deal
                                    ? `<div class="home-product-item__label-deal">${pro.label_deal}</div>`
                                    : ""
                                }
                            </div> `
                            : `<div class="home-product-item__label-noti"></div>`
                        }

                        <div class="home-product-item__price">
                            ${
                              pro.price_old
                                ? `<span class="home-product-item__price-old">${pro.price_old}</span>`
                                : ""
                            }
                            <span class="home-product-item__price-current">${
                              pro.price_current
                            }</span>

                            ${
                              pro.free
                                ? `<svg height="12" viewBox="0 0 20 12" width="20" class="home-product-item__shipping">
                                <g fill="none" fill-rule="evenodd" transform="">
                                    <rect fill="#00bfa5" fill-rule="evenodd" height="9" rx="1" width="12" x="4"></rect>
                                    <rect height="8" rx="1" stroke="#00bfa5" width="11" x="4.5" y=".5"></rect>
                                    <rect fill="#00bfa5" fill-rule="evenodd" height="7" rx="1" width="7" x="13" y="2"></rect>
                                    <rect height="6" rx="1" stroke="#00bfa5" width="6" x="13.5" y="2.5"></rect>
                                    <circle cx="8" cy="10" fill="#00bfa5" r="2"></circle>
                                    <circle cx="15" cy="10" fill="#00bfa5" r="2"></circle>
                                    <path
                                        d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z"
                                        fill="#fff"
                                    ></path>
                                    <path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path>
                                    <path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path>
                                    <circle cx="8" cy="10" fill="#047565" r="1"></circle>
                                    <circle cx="15" cy="10" fill="#047565" r="1"></circle>
                                </g>
                            </svg>`
                                : ""
                            }
                        </div>
                        <div class="home-product-item__action">
                            <span class="home-product-item__like">
                                <svg class="home-product-item__like-icon" height="16" viewBox="0 0 16 16" width="16" version="1.1">
                                    <path
                                        d="m7.251221 4.2145388c-.549143-.4552525-1.2488781-.7145388-1.951221-.7145388-1.5719593 0-2.8 1.2269253-2.8 2.7970027 0 .5878515.158291 1.1598348.483492 1.7618948.6414654 1.1875754 1.5644044 2.1358244 4.4829309 4.7799304l.5348542.4864596.5326254-.4807607c2.9306205-2.660747 3.8471674-3.6039919 4.486777-4.7931984.3223805-.5993922.4793205-1.1689848.4793205-1.7543257 0-1.5700774-1.2280407-2.7970027-2.8-2.7970027-.7029148 0-1.4032175.2597087-1.9497845.7133288l-.0367779.0309601c-.1203966.1029087-.2318185.2143106-.3329071.3329122l-.3805305.4464557-.3805305-.4464557c-.1010886-.1186016-.2125105-.2300035-.3301434-.3305672z"
                                        fill="none"
                                        stroke="#000"
                                        stroke-opacity=".54"
                                    ></path>
                                </svg>
                                <i class="home-product-item__like-icon-active fas fa-heart"></i>
                            </span>
            
                            <div class="home-product-item__rating">
                                <i class="start-active fas fa-star"></i>
                                <i class="start-active fas fa-star"></i>
                                <i class="start-active fas fa-star"></i>
                                <i class="start-active fas fa-star"></i>
                                <i class="start-active fas fa-star"></i>
                            </div>
            
                            <span class="home-product-item__sold">${
                              pro.item_sold
                            }</span>
                        </div>
            
                        <div class="home-product-item__origin">
                            <span class="home-product-item__brand"></span>
                            <span class="home-product-item__origin-name">${
                              pro.origin
                            }</span>
                        </div>
                        
                        ${
                          pro.des
                            ? pro.des === "Yêu thích"
                              ? `<div class="home-product-item__favourite">
                                <i class="fas fa-check"></i>
                                <span>
                                    ${pro.des}
                                </span>
                                </div>
                                `
                              : `<div class="home-product-item__mall">
                                <i class="fas fa-check"></i>
                                <span>
                                    ${pro.des}
                                </span>
                                </div>`
                            : ""
                        }
                        
            
                        ${
                          pro.sellOff_percent && pro.sellOff_label
                            ? `
                            <div class="home-product-item__sell-off">
                                <span class="home-product-item__sell-off-percent">${pro.sellOff_percent}</span>
                                <span class="home-product-item__sell-off-label">${pro.sellOff_label}</span>
                            </div>
                            `
                            : ""
                        }
            
                        <div class="home-product-item__search-add">Tìm sản phẩm tương tự</div>
                    </div>
                </a>`;
      bodyProduct.appendChild(elItemPro);
    });
  });

async function productItem(id) {
  window.scroll(0, 0);
  document.querySelector(".main-overlay").style.display = "block";
  await fetch(url + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (proItem) => {
      setConfig("product", proItem);
      document.querySelector(".main-shop").style.display = "none";
      document.querySelector(".grid.wide.product-detail").style.display =
        "block";

      const pro = proItem;

      document.title = pro.name;

      localStorage.setItem("amount", 1);

      setTimeout(() => {
        document.querySelector(".main-overlay").style.display = "none";
        document.getElementsByTagName("html")[0].style.overflowY = "scroll";

        const imgSlider = [];
        for (let itemImg = 0; itemImg < pro.img.length; itemImg++) {
          if (itemImg === 0) {
            imgSlider.push(`
                    <div class="slide-pro-item slide-${itemImg} active">
                        <img class="slide-pro-item-img" src="./img/product/sp${pro.id}/${pro.img[itemImg]}" alt="ảnh slide pro">
                    </div>
                `);
          } else {
            imgSlider.push(`
                    <div class="slide-pro-item slide-${itemImg}">
                        <img class="slide-pro-item-img" src="./img/product/sp${pro.id}/${pro.img[itemImg]}" alt="ảnh slide pro">
                    </div>
                `);
          }
        }

        const sizePro = [];
        for (let sizeItem = 0; sizeItem < pro.size.length; sizeItem++) {
          sizePro.push(`<button class="btn-size btn-${sizeItem}">
                            ${pro.size[sizeItem]}
                            <div class="product-btn-check">
                            <i class="fas fa-check"></i>
                            </div>
                        </button>
                        `);
        }

        const colorPro = [];
        for (let colorItem = 0; colorItem < pro.color.length; colorItem++) {
          colorPro.push(`<button class="btn-color btn-${colorItem}">
                            ${pro.color[colorItem]}
                            <div class="product-btn-check">
                                <i class="fas fa-check"></i>
                            </div>
                          </button>
                        `);
        }

        const bodyDetail = document.querySelector(".grid.wide.product-detail");
        const headingProduct = document.createElement("div");
        headingProduct.classList.add("heading-product");
        headingProduct.innerHTML = `
                        <a href="http://localhost:3000">Shopee</a>
                                            
                        <i class="heading-product-icon fas fa-chevron-right"></i>
        
                        <p class="heading-product-name">${pro.name}</p>
                    `;

        const bodyProductShow = document.createElement("div");
        bodyProductShow.classList.add("body-product");
        bodyProductShow.innerHTML = `
                        <div class="product-slider">
                            <div class="detail-product-img" style="background-image: url(./img/product/sp${
                              pro.id
                            }/${pro.img[0]});"></div>
                            <div class="slide-product-detail">
                                <div class="slides-product">
                                    ${imgSlider.join(" ")}
                                </div>
        
                                ${
                                  pro.img.length > 5
                                    ? `
                                    <button class="btn-prev-detail">
                                        <svg enable-background="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0">
                                            <polygon fill="#FFFFFF" points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon>
                                        </svg>
                                    </button>
                                    <button class="btn-next-detail">
                                        <svg enable-background="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0">
                                            <polygon fill="#FFFFFF" points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon>
                                        </svg>
                                    </button>
                                `
                                    : ""
                                }
                            </div>
                            <div class="product-share">
                                <div class="product-share-network product-separate">
                                    <span>Chia sẻ: </span>
                                    <span>
                                        <i class="share-mes fab fa-facebook-messenger"></i>
                                        <i class="share-fb fab fa-facebook"></i>
                                        <i class="share-tw fab fa-twitter"></i>
                                    </span>
                                </div>
                                <span class="product-share-heart">
                                    <svg width="24" height="20" class="_1Jj7iG"><path d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z" stroke="#FF424F" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path></svg>
                                    <span class="product-like-index">Đã thích (${
                                      pro.liked
                                    }k)</span>
                                </span>
                            </div>
                        </div>
        
                        <div class="detail-product">
                            <div class="detail-product-infor">
                            
                                <div class="product-name">
                                    ${
                                      pro.des
                                        ? pro.des === "Yêu thích"
                                          ? `<span class="product-des">${pro.des}</span>`
                                          : `<span class="product-des product-des-mall">${pro.des}</span>`
                                        : ""
                                    }
                                    ${pro.name}
                                </div>
                                <div class="product-infor-comment">
                                    <div class="product-rate product-separate">
                                        <span class="product-rate-index">${
                                          pro.rate
                                        }</span>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div class="product-valid product-separate">
                                        ${
                                          pro.comment != 0
                                            ? `
                                            <p class="product-valid-amount">${pro.comment}k</p>
                                            <p>Đánh giá</p>
                                        `
                                            : `
                                            <p>Chưa có đánh giá</p>
                                        `
                                        }
                                    </div>
                                    <div class="product-sold">
                                        <p class="product-sold-amount">${
                                          pro.item_sold.split(" ")[2]
                                        }</p>
                                        <p>Đã bán</p>
                                    </div>
                                </div>
        
                                <div class="product-price">
                                    ${
                                      pro.price_old
                                        ? `<p class="product-old">${pro.price_old}</p>`
                                        : ""
                                    }    
                                    <p class="product-new">${
                                      pro.price_current
                                    }</p>
                                    ${
                                      pro.sellOff_percent && pro.sellOff_label
                                        ? `<p class="product-label-off">${pro.sellOff_label} ${pro.sellOff_percent}</p>`
                                        : ""
                                    }
                                </div>
        
                                <div class="product-list-infor">
                                        
                                    ${
                                      pro.label_content
                                        ? `
                                        <div class="product-discount">
                                            <p>Mã giảm giá của shop</p>
                                            <div class="home-product-item__label-noti">
                                                <svg class="_2DRZW _2xFcL" viewBox="-0.5 -0.5 4 16">
                                                    <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" stroke-width="1" transform="" stroke="currentColor" fill="#f69113"></path>
                                                </svg>
                                                <div class="home-product-item__label-content">${pro.label_content}</div>
                                                <svg class="_2DRZW _2xFcL" viewBox="-0.5 -0.5 4 16">
                                                    <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" stroke-width="1" transform="rotate(180) translate(-3 -15)" stroke="currentColor" fill="#f69113"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        `
                                        : ""
                                    }
        
        
                                    <div class="product-deli">
                                        <p>Vận chuyển</p>
                                        <div class="product-deli-detail">
                                            <div class="product-deli-address">
                                                <div class="product-deli-add_icon">
                                                    <i class="fas fa-truck"></i>
                                                    <p>Vận chuyển tới</p>
                                                </div>
                                                <select class="add-deli" id="add-deli">
                                                    <option value="volvo">Hà Nội</option>
                                                    <option value="saab">Hải Dương</option>
                                                    <option value="opel">Hải Phòng</option>
                                                    <option value="audi">Hồ Chí Minh</option>
                                                </select>
                                            </div>
                                            <div class="product-deli-fee">
                                                <p>Phí vận chuyển</p>
                                                <p>đ10.000</p>
                                            </div>
                                        </div>
                                    </div>
        
                                    <!-- add class product-btn--selected -->
                                    ${
                                      pro.size
                                        ? `
                                        <div class="product-size">
                                            <p>Size</p>
                                            <div class="product-btn-size">
                                                ${sizePro.join(" ")}
                                            </div>
                                        </div>
                                    `
                                        : ""
                                    }
                                    <div class="noti-product-size" style="display: none;"></div>
        
                                    <!-- add class product-btn--selected -->
                                    ${
                                      pro.color
                                        ? `
                                        <div class="product-color">
                                            <p>Color</p>
                                            <div class="product-btn-color">
                                                ${colorPro.join(" ")}
                                            </div>
                                        </div>
                                    `
                                        : ""
                                    }
                                    <div class="noti-product-color" style="display: none;"></div>
        
                                    <div class="product-amount">
                                        <p>Số lượng</p>
                                        <div class="product-amount-btn">
                                            <button class="btn-minus">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <input class="text-amount" type="text" value="1">
                                            <button class="btn-plus">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <p class="product-amount-stock">${
                                          pro.amount ? pro.amount : 0
                                        } sản phẩm có sẵn</p>
                                    </div>

                                    <div class="noti-amount" style="display: none;"></div>
        
                                    <div class="product-action">
                                        <div class="product-add-cart">
                                            <i class="fas fa-shopping-cart"></i>
                                            <p>Thêm vào giỏ hàng</p>
                                        </div>
                                        <div class="product-buy">
                                            <p>Mua ngay</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="protect-product">
                                <img class="protect-img" src="./img/app/protect.png" alt="protect">
                                <p>Shopee đảm bảo</p>
                                <p>3 Ngày trả hàng / Hoàn tiền </p>
                            </div>
                        </div>
        
                    `;
        const bodyShop = document.createElement("div");
        bodyShop.classList.add("body-shop");
        bodyShop.innerHTML = `
                        <div class="shop-heading">
                            <div class="logo-shop">
                                <img src="./img/logo_shop.png" class="logo-shop-img" title="ảnh shop">
                            </div>
                            <div class="content-shop">
                                <p class="name-shop">vhpginseng</p>
                                <p class="live-shop">Online 10 phút trước</p>
                                <div class="btn-shop">
                                    <button class="shop-mes">
                                        <svg viewBox="0 0 16 16">
                                            <g fill-rule="evenodd">
                                                <path fill="#ee4d2d" d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z">
                                                </path>
                                            </g>
                                        </svg>
                                        <span>Chat ngay</span>
                                    </button>
                                    <button class="shop-show">
                                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" stroke-width="0">
                                            <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z">
                                            </path>
                                        </svg>
                                        <span>Xem shop</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="shop-infor">
                            <div class="infor-detail">
                                Đánh giá 
                                <span>1.9k</span>       
                            </div>
                            <div class="infor-detail">
                                Tỉ lệ phản hồi  
                                <span>79%</span>      
                            </div>
                            <div class="infor-detail">
                                Tham gia
                                <span>28 tháng trước</span>      
                            </div>
                            <div class="infor-detail">
                                Sản phẩm
                                <span>181</span>      
                            </div>
                            <div class="infor-detail">
                                Thời gian phản hồi
                                <span>Trong vài giờ</span>      
                            </div>
                            <div class="infor-detail">
                                Người theo dõi
                                <span>2.2k</span>      
                            </div>
                        </div>
                    `;
        const detailDesPro = document.createElement("div");
        detailDesPro.classList.add("row");
        detailDesPro.classList.add("sm-gutter");
        detailDesPro.classList.add("body-des");
        detailDesPro.innerHTML = `
                    <div class="col l-10">
                        <div class="product-des-detail">
                            <div class="product-detail">
                                <div class="name-detail">Chi tiết sản phẩm</div>
                                <div class="content-detail">
                                    <div class="detail-item">
                                        <label>Danh mục</label>
                                        <div class="detail-item-link">
                                            <a href="http://localhost:3000">Shopee</a>
                                            <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0">
                                                <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                                                </path>
                                            </svg>
                                            <span>Bàn học trẻ em chống gù chống cận</span>
                                        </div>
                                    </div>
                                    <div class="detail-item">
                                        <label>Thương hiệu</label>
                                        <div>EM COSMETICS</div>
                                    </div>
                                    <div class="detail-item">
                                        <label>Xuất xứ</label>
                                        <div>Mỹ</div>
                                    </div>
                                    <div class="detail-item">
                                        <label>Kho hàng</label>
                                        <div>123</div>
                                    </div>
                                    <div class="detail-item">
                                        <label>Gửi từ</label>
                                        <div>Quận Hà Đông</div>
                                    </div>
                                </div>
                            </div>
                            <div class="body-product-des">
                                <div class="name-des">Mô tả sản phẩm</div>
                                <div class="content-des">
                                    <span>
                                        Tên sản phẩm: Bao Da Chìa Khóa cho Hyundai Accent phiên bản 2021
                                        </br>
                                        Chất liệu : Da bò thật </br>
                                        Được sản xuất thủ công bằng tay </br>
                                        Bao da chìa khóa giúp bảo vệ chìa khóa của bạn chống va đập , chống trầy sước </br>
                                        Bảo hành 2 năm về da </br>
                                        Địa chỉ : Hà Đông - Hà Nội </br>
                                        #baodachiakhoaoto #baodachiakhoaxemay #baodachiakhoasmartkey #baodabaovechiakhoa #baodachiakhoahyundai </br>
                                        #baodabaovechiakhoa #opbaovechiakhoa #bocchiakhoa #baodachiakhoaaccent2021 </br>
                                        #accent21 #phukienoto #dochoioto #phukienxehoi #dochoixehoi #phukienxehyundaiaccent #dochoixeaccent #hyundaiaccent #baodachiakhoaaccent2021
                                    </span>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col l-2"> 
                        <div class="product-sell">
                        </div>
                    </div>
                    `;

        bodyDetail.appendChild(headingProduct);
        bodyDetail.appendChild(bodyProductShow);
        bodyDetail.appendChild(bodyShop);
        bodyDetail.appendChild(detailDesPro);

        const slideListImg = document.querySelectorAll(".slide-pro-item");
        for (let imgItem in pro.img) {
          slideListImg[imgItem].addEventListener("mouseover", function () {
            document
              .querySelector(".slide-pro-item.active")
              .classList.remove("active");
            document.querySelector(`.slide-${imgItem}`).classList.add("active");
            document.querySelector(
              ".detail-product-img"
            ).style.backgroundImage = `url(./img/product/sp${pro.id}/${pro.img[imgItem]})`;
          });

          slideListImg[imgItem].onclick = async function () {
            document.getElementsByTagName("html")[0].style.overflowY = "hidden";
            const main = $(".modal__body");
            if (main) {
              $(".modal").style.display = "flex";
              document.body.style.overflowY = "hidden";
              const body = document.createElement("div");
              body.classList.add("slide-form");
              body.innerHTML = `
                            <div class="img-container">
                                <div class="img-active" style="background-image: url(./img/product/sp${
                                  pro.id
                                }/${pro.img[imgItem]});"></div>
                                <div class="btn-overlay">
                                    <button class="btn-prev-overlay">
                                        <svg enable-background="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0">
                                            <polygon fill="#FFFFFF" points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon>
                                        </svg>
                                    </button>
                                    <button class="btn-next-overlay">
                                        <svg enable-background="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0">
                                            <polygon fill="#FFFFFF" points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon>
                                        </svg>
                                    </button>
                                </div>
                            </div>
        
                            <div class="list-slide-img">
                                <p class="slide-content">${pro.name}</p>
                                <div class="list-slide-product">
                                    ${imgSlider.join(" ")}
                                </div>
                            </div>
                        `;
              main.appendChild(body);
            }
            document
              .querySelector(".list-slide-product .slide-pro-item.active")
              .classList.remove("active");
            document
              .querySelector(`.list-slide-product .slide-${imgItem}`)
              .classList.add("active");

            const btnOverLayPrev = document.querySelector(".btn-prev-overlay");
            const btnOverLayNext = document.querySelector(".btn-next-overlay");
            let indexImgOverlay = parseInt(imgItem);

            const listImg = document.querySelectorAll(
              ".list-slide-product .slide-pro-item"
            );
            for (let item in pro.img) {
              listImg[item].onclick = function () {
                document
                  .querySelector(".list-slide-product .slide-pro-item.active")
                  .classList.remove("active");
                document
                  .querySelector(`.list-slide-product .slide-${item}`)
                  .classList.add("active");
                document.querySelector(
                  ".img-active"
                ).style.backgroundImage = `url(./img/product/sp${pro.id}/${pro.img[item]}`;
                return (indexImgOverlay = parseInt(item));
              };
            }

            if (btnOverLayPrev && btnOverLayNext) {
              btnOverLayNext.onclick = function () {
                if (indexImgOverlay === pro.img.length - 1) {
                  indexImgOverlay = -1;
                }
                indexImgOverlay++;
                document
                  .querySelector(".list-slide-product .slide-pro-item.active")
                  .classList.remove("active");
                document
                  .querySelector(
                    `.list-slide-product .slide-${indexImgOverlay}`
                  )
                  .classList.add("active");
                document.querySelector(
                  ".img-active"
                ).style.backgroundImage = `url(./img/product/sp${pro.id}/${pro.img[indexImgOverlay]}`;
              };

              btnOverLayPrev.onclick = function () {
                if (indexImgOverlay === 0) {
                  indexImgOverlay = pro.img.length;
                }
                indexImgOverlay--;
                document
                  .querySelector(".list-slide-product .slide-pro-item.active")
                  .classList.remove("active");
                document
                  .querySelector(
                    `.list-slide-product .slide-${indexImgOverlay}`
                  )
                  .classList.add("active");
                document.querySelector(
                  ".img-active"
                ).style.backgroundImage = `url(./img/product/sp${pro.id}/${pro.img[indexImgOverlay]}`;
              };
            }
          };
        }

        const widthItemImg =
          document.querySelectorAll(".slide-pro-item")[0].offsetWidth;
        console.log(widthItemImg);
        const btnSlidePrev = document.querySelector(".btn-prev-detail");
        const btnSlideNext = document.querySelector(".btn-next-detail");
        let positionImg = 0;
        let indexImg = 0;
        if (btnSlidePrev && btnSlideNext) {
          btnSlideNext.onclick = function () {
            if (indexImg + 5 != pro.img.length) {
              positionImg = positionImg - (widthItemImg + 10);
              document.querySelector(
                ".slides-product"
              ).style = `transform: translateX(${positionImg}px)`;
              indexImg++;
            }
          };

          btnSlidePrev.onclick = function () {
            if (indexImg >= 1) {
              positionImg = positionImg + (widthItemImg + 10);
              document.querySelector(
                ".slides-product"
              ).style = `transform: translateX(${positionImg}px)`;
              indexImg--;
            }
          };
        }

        const btnSize = document.querySelectorAll(".btn-size");
        for (let item in pro.size) {
          btnSize[item].onclick = function () {
            document.querySelector(".noti-product-size").style.display = "none";
            const itemPrev = document.querySelector(
              ".btn-size.product-btn--selected"
            );
            if (itemPrev) {
              itemPrev.classList.remove("product-btn--selected");
              document
                .querySelector(`.btn-size.btn-${item}`)
                .classList.add("product-btn--selected");
            } else {
              document
                .querySelector(`.btn-size.btn-${item}`)
                .classList.add("product-btn--selected");
            }
          };
        }

        const btnColor = document.querySelectorAll(".btn-color");
        for (let item in pro.color) {
          btnColor[item].onclick = function () {
            document.querySelector(".noti-product-color").style.display =
              "none";
            const itemPrev = document.querySelector(
              ".btn-color.product-btn--selected"
            );
            if (itemPrev) {
              itemPrev.classList.remove("product-btn--selected");
              document
                .querySelector(`.btn-color.btn-${item}`)
                .classList.add("product-btn--selected");
            } else {
              document
                .querySelector(`.btn-color.btn-${item}`)
                .classList.add("product-btn--selected");
            }
          };
        }

        const btnPrevAmount = document.querySelector(".btn-minus");
        const btnNextAmount = document.querySelector(".btn-plus");
        const textAmount = document.querySelector(".text-amount");
        let valueAmount = parseInt(textAmount.value);

        btnPrevAmount.onclick = function () {
          if (pro.amount != 0) {
            if (valueAmount >= 2) {
              valueAmount -= 1;
              textAmount.value = valueAmount;
              document
                .querySelector(".product-amount")
                .classList.remove("pr-noti");
            }
            localStorage.setItem("amount", textAmount.value);
          } else {
            document.querySelector(".product-amount-stock").style.color = "red";
          }
        };

        btnNextAmount.onclick = function () {
          if (pro.amount != 0) {
            if (valueAmount < parseInt(pro.amount)) {
              valueAmount += 1;
              textAmount.value = valueAmount;
            }
            if (valueAmount == parseInt(pro.amount)) {
              document
                .querySelector(".product-amount")
                .classList.add("pr-noti");
            }
            localStorage.setItem("amount", textAmount.value);
          } else {
            document.querySelector(".product-amount-stock").style.color = "red";
          }
        };

        textAmount.addEventListener("keyup", function (e) {
          console.log(">>>check value: ", textAmount.value);
          if (parseInt(textAmount.value) > parseInt(pro.amount)) {
            this.value = parseInt(pro.amount);
            document.querySelector(".product-amount").classList.add("pr-noti");
            valueAmount = parseInt(textAmount.value);
          }

          if (parseInt(textAmount.value) === 0) {
            this.value = 1;
            valueAmount = parseInt(this.value);
          }

          // keycode 8: xóa
          if (
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            e.keyCode == 8 ||
            (e.keyCode >= 96 && e.keyCode <= 105)
          ) {
            textAmount.addEventListener("input", function (e) {
              if (parseInt(textAmount.value) == parseInt(pro.amount)) {
                document
                  .querySelector(".product-amount")
                  .classList.add("pr-noti");
              } else if (parseInt(textAmount.value) > parseInt(pro.amount)) {
                this.value = parseInt(pro.amount);
                document
                  .querySelector(".product-amount")
                  .classList.add("pr-noti");
              } else {
                document
                  .querySelector(".product-amount")
                  .classList.remove("pr-noti");
              }

              if (parseInt(textAmount.value) < 0) {
                this.value = 1;
                valueAmount = parseInt(this.value);
              }

              valueAmount = parseInt(textAmount.value);
            });
          } else if ((e.keyCode = 13)) {
            this.value = textAmount.value;
            valueAmount = parseInt(this.value);
          } else {
            this.value = 1;
            valueAmount = parseInt(this.value);
          }

          localStorage.setItem("amount", valueAmount);
        });

        textAmount.addEventListener("blur", function () {
          if (!this.value) {
            this.value = 1;
            valueAmount = parseInt(this.value);
          }
        });

        let isCheck;
        async function checkItemAddCart(id, size, color, amount) {
          let cartLocal = await JSON.parse(
            localStorage.getItem("CART_STORAGE")
          );
          if (cartLocal) {
            let count;
            let checkItem = cartLocal.find((value, index) => {
              count = index;
              if (value.id == id && value.color == color && value.size == size)
                return value;
              return null;
            });
            if (checkItem) {
              let oldAmount = await cartLocal[count].amountCart;
              let currentAmount = await parseInt(
                document
                  .querySelector(".product-amount-stock")
                  .innerText.split(" ")
                  .shift()
              );

              cartLocal[count].amountCart = await amount;
              document.querySelector(".product-amount-stock").innerHTML =
                currentAmount +
                parseInt(oldAmount) -
                parseInt(amount) +
                " Sản phẩm có sẵn";

              localStorage.setItem("CART_STORAGE", JSON.stringify(cartLocal));

              const isSize = document.querySelector(
                ".product-btn-size .product-btn--selected"
              );
              const isColor = document.querySelector(
                ".product-btn-color .product-btn--selected"
              );
              if (isSize && isColor) {
                isSize.classList.remove("product-btn--selected");
                isColor.classList.remove("product-btn--selected");
              }

              fetch(url + "/" + id, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount:
                    currentAmount + parseInt(oldAmount) - parseInt(amount),
                }),
              });
              valueAmount = 1;
              document.querySelector(".text-amount").value = 1;
              localStorage.setItem("amount", 1);
              return (isCheck = 1);
            } else {
              return (isCheck = 0);
            }
          } else {
            return (isCheck = 0);
          }
        }

        function toast({
          title = "",
          type = "",
          message = "",
          duration = 3000,
        }) {
          const main = document.getElementById("toast");
          if (main) {
            const toast = document.createElement("div");

            const autoRemove = setTimeout(function () {
              main.removeChild(toast);
            }, duration + 1000);

            toast.onclick = function (e) {
              if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
              }
            };

            const icons = {
              success: "fas fa-check-circle",
              infor: "fas fa-info-circle",
              warn: "fas fa-exclamation-triangle",
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .5s, fadeOut linear 1s ${delay}s forwards`;
            toast.innerHTML = `
                  <div class="toast__icon">
                      <i class="${icon}"></i>
                  </div>
                  <div class="toast__body">
                      <h3 class="toast__title">${title}</h3>
                      <p class="toast__msg">${message}</p>
                  </div>
                  <div class="toast__close">
                      <i class="fas fa-times"></i>
                  </div>
              `;
            main.appendChild(toast);
          }
        }

        function btnSuccess() {
          toast({
            title: "Thành công",
            type: "success",
            message: "Bạn đã thêm vào giỏ hàng thành công!",
          });
        }
        function btnWarning() {
          toast({
            title: "Cảnh báo",
            type: "warn",
            message: "Bạn cần chọn đầy đủ thông tin sản phẩm!",
          });
        }

        const btnAddCart = document.querySelector(".product-add-cart");
        let count = null;
        btnAddCart.addEventListener("click", async (e) => {
          const checkSize = document.querySelector(
            ".product-btn-size .product-btn--selected"
          );
          const checkColor = document.querySelector(
            ".product-btn-color .product-btn--selected"
          );

          console.log(localStorage.getItem("amount"));

          if (parseInt(textAmount.value) > 0) {
            document.querySelector(".noti-amount").style.display = "block";
            document.querySelector(".noti-amount").innerHTML =
              "Bạn chưa nhập số lượng!";
          } else {
            document.querySelector(".noti-product-size").style.display = "none";
          }

          let amountAdd = localStorage.getItem("amount") || 0;
          if (
            checkSize &&
            checkColor &&
            pro.amount > 0 &&
            parseInt(amountAdd) > 0 &&
            parseInt(textAmount.value) > 0
          ) {
            document.getElementById("toast").style.top =
              window.scrollY + 30 + "px";
            btnSuccess();
            await checkItemAddCart(
              pro.id,
              checkSize.innerText,
              checkColor.innerText,
              amountAdd
            );
            if (isCheck == 0) {
              count = pro.id;
              const item = {};
              item.id = pro.id;
              item.name = pro.name;
              item.img = pro.img[0];
              item.price = pro.price_current;
              item.feeTransport = 10000;
              item.amountCart = amountAdd;
              item.size = checkSize.innerText;
              item.color = checkColor.innerText;
              listCart.push(item);
              checkSize.classList.remove("product-btn--selected");
              checkColor.classList.remove("product-btn--selected");

              let amountCurrent = config.product.amount;

              config.product.amount = amountCurrent - amountAdd;
              localStorage.setItem("ITEM_PRODUCT", JSON.stringify(config));

              if (amountCurrent - amountAdd != 0) {
                document.querySelector(".product-amount-stock").innerHTML =
                  amountCurrent - amountAdd + " Sản phẩm có sẵn";
              } else {
                document.querySelector(".product-amount-stock").innerHTML =
                  "Sản phẩm tạm hết hàng";
              }

              amount++;
              amountCart.innerHTML = amount;
              amountCart.style.display = "block";
              localStorage.setItem("CART_STORAGE", JSON.stringify(listCart));
              localStorage.setItem("amountCart", amount);

              valueAmount = 1;
              document.querySelector(".text-amount").value = 1;
              if (document.querySelector(".pr-noti")) {
                document.querySelector(".pr-noti").classList.remove("pr-noti");
              }

              fetch(url + "/" + pro.id, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount: config.product.amount,
                }),
              });
              localStorage.setItem("amount", 1);
            }
          } else if (!checkColor || !checkSize || (!checkColor && !checkSize)) {
            document.getElementById("toast").style.top =
              window.scrollY + 30 + "px";
            btnWarning();
            if (!checkSize) {
              document.querySelector(".noti-product-size").style.display =
                "block";
              document.querySelector(".noti-product-size").innerHTML =
                "Bạn chưa chọn size!";
            } else if (!checkColor) {
              document.querySelector(".noti-product-color").style.display =
                "block";
              document.querySelector(".noti-product-color").innerHTML =
                "Bạn chưa chọn color!";
            } else {
              document.querySelector(".noti-product-size").style.display =
                "block";
              document.querySelector(".noti-product-size").innerHTML =
                "Bạn chưa chọn size!";
              document.querySelector(".noti-product-color").style.display =
                "block";
              document.querySelector(".noti-product-color").innerHTML =
                "Bạn chưa chọn color!";
            }
          } else if (pro.amount == 0) {
            document.querySelector(".product-amount-stock").style.color = "red";
          }
        });
      }, 1500);
    })
    .catch((error) => {
      console.log(error);
    });
}
