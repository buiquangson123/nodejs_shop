const detailPro = document.querySelector(".detailPro");
const proItem = JSON.parse(localStorage.getItem("ITEM_PRODUCT"));
const pro = proItem.product;

document.title = pro.name;

localStorage.setItem("amount", 1);

const CART_STORAGE = "CART_PRODUCT";
const listCart = JSON.parse(localStorage.getItem(CART_STORAGE)) || [];
console.log(listCart);

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
                            <p class="product-new">${pro.price_current}</p>
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
                                <p>${
                                  pro.amount ? pro.amount : 0
                                } sản phẩm có sẵn</p>
                            </div>

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
  const reviewPro = document.createElement("div");
  reviewPro.classList.add("row");
  reviewPro.classList.add("sm-gutter");
  reviewPro.classList.add("body-review");
  reviewPro.innerHTML = `
            <div class="col l-10">
                <div class="product-review">
                    <div class="name-review">Đánh giá sản phẩm</div>
                    <div class="rate-review">
                        <div>
                            <p>5 trên 5</p>
                            <div class="product-rate product-separate">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <div class="btn-review">
                            <button>Tất cả</button>
                            <button>5 sao (3)</button>
                            <button>4 sao</button>
                            <button>3 sao</button>
                            <button>2 sao</button>
                            <button>1 sao</button>
                            <button>Có bình luận</button>
                            <button>Có hình ảnh/video</button>
                        </div>
                    </div>
                    <div class="cmt-review">
                    
                    </div>
                </div>
            </div>
            `;
  bodyDetail.appendChild(headingProduct);
  bodyDetail.appendChild(bodyProductShow);
  bodyDetail.appendChild(bodyShop);
  bodyDetail.appendChild(detailDesPro);
  bodyDetail.appendChild(reviewPro);

  //   setTimeout(() => {
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
            .querySelector(`.list-slide-product .slide-${indexImgOverlay}`)
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
            .querySelector(`.list-slide-product .slide-${indexImgOverlay}`)
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
    if (valueAmount >= 2) {
      valueAmount -= 1;
      textAmount.value = valueAmount;
      document.querySelector(".product-amount").classList.remove("pr-noti");
    }
    localStorage.setItem("amount", textAmount.value);
  };

  btnNextAmount.onclick = function () {
    if (valueAmount < parseInt(pro.amount)) {
      valueAmount += 1;
      textAmount.value = valueAmount;
    }
    if (valueAmount == parseInt(pro.amount)) {
      document.querySelector(".product-amount").classList.add("pr-noti");
    }
    localStorage.setItem("amount", textAmount.value);
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
          document.querySelector(".product-amount").classList.add("pr-noti");
        } else if (parseInt(textAmount.value) > parseInt(pro.amount)) {
          this.value = parseInt(pro.amount);
          document.querySelector(".product-amount").classList.add("pr-noti");
        } else {
          document.querySelector(".product-amount").classList.remove("pr-noti");
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

    localStorage.setItem("amount", textAmount.value);
  });

  textAmount.addEventListener("blur", function () {
    if (!this.value) {
      this.value = 1;
      valueAmount = parseInt(this.value);
    }
  });
  //   console.log(listCart);

  const btnAddCart = document.querySelector(".product-add-cart");
  btnAddCart.addEventListener("click", (e) => {
    // const btnAdd = e.target.closest(".product-add-cart");
    // const idItemAddCart = btnAdd.getAttribute("class").split("").pop();
    const amountAdd = localStorage.getItem("amount");
    const item = {};
    item.name = pro.name;
    item.img = pro.img[0];
    item.price = pro.price_current;
    item.feeTransport = 10000;
    item.amountCart = amountAdd;
    item.size = 0;
    item.color = 0;
    listCart.push(item);
    localStorage.setItem("CART_STORAGE", JSON.stringify(listCart));
  });
}, 1500);
