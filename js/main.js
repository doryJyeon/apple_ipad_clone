import ipads from "/data/ipads.js";
import navigations from "/data/navigations.js";

const headerEl = document.querySelector("header");
const basketEl = document.querySelector("header .basket");
const navEl = document.querySelector("nav");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchDelayEls = [...document.querySelectorAll(".search-wrap li")];
const searchInputEl = document.querySelector("header .search input");
const video = document.querySelector(".stage video");

// footer year
document.querySelector("span.this-year").textContent = new Date().getFullYear();

window.addEventListener("click", (e) => {
  event.stopPropagation();
  const targetId = e.target.id;
  const targetClass = e.target.classList[0];

  // 장바구니 toggle
  if(targetId === "basketStarter") {
    return toggleBasket(basketEl.classList.contains("show"));
  }

  // 장바구니 hide
  toggleBasket(true);

  // mobile header toggle
  if(targetClass === "menu-s") {
    toggleHeader(headerEl.classList.contains("menuing"));
  }

  // 검색 toggle 
  if(targetId === "searchStarter") {
    toggleSearch(false);
  } else if(targetClass === "search-closer" || targetClass === "shadow") {
    toggleSearch(true);
  }

  // mobile 검색 cancel
  if(targetClass === "m-search") {
    toggleSearchCancel(false);
  } else if(targetClass === "search-canceler") {
    toggleSearchCancel(true);
  }

  // mobile nav
  if(targetClass === "menu-toggler") {
    navEl.classList.contains("menuing") ? navEl.classList.remove("menuing") : navEl.classList.add("menuing");
  } else if(targetClass === "shadow") {
    navEl.classList.remove("menuing");
  }

  
  // video play controll
  if(targetClass === "controller--play" || targetClass === "controller--play--icon") {
    playVideo(true);
  } else if(targetClass === "controller--pause" || targetClass === "controller--pause--icon") {
    playVideo(false);
  }

});

// window size변경
window.addEventListener("resize",() => {
  window.innerWidth <= 740 ? headerEl.classList.remove("searching") : headerEl.classList.remove("searching--mobile");
});

// 장바구니 toggle
function toggleBasket(show) {
  show ? basketEl.classList.remove("show") : basketEl.classList.add("show");
}

// mobile header toggle
function toggleHeader(show) {
  if(show) {
    headerEl.classList.remove("menuing");
    playScroll(true);
    searchInputEl.value = "";
  } else {
    headerEl.classList.add("menuing");
    playScroll(false);
  }
}

// 검색 toggle
function toggleSearch(show) {
  if(show) {
    headerEl.classList.remove("searching");
    playScroll(true);
    toggleSearchMenu(show);
  } else {
    headerEl.classList.add("searching");
    playScroll(false);
    toggleSearchMenu(show);
  }
}

// 검색 toggle Delay
function toggleSearchMenu(show) {
  if(show) {
    headerMenuEls.reverse().forEach((el, index) => {
      el.style.transitionDelay = index * 0.4 / headerMenuEls.length + "s";
    });
    searchDelayEls.reverse().forEach((el, index) => {
      el.style.transitionDelay = index * 0.4 / searchDelayEls.length + "s";
    });
    searchDelayEls.reverse();
    searchInputEl.value = "";
  } else {
    headerMenuEls.reverse().forEach((el, index) => {
      el.style.transitionDelay = index * 0.4 / headerMenuEls.length + "s";
    });
    searchDelayEls.forEach((el, index) => {
      el.style.transitionDelay = index * 0.4 / searchDelayEls.length + "s";
    });
    // input focus
    setTimeout(() => {
      searchInputEl.focus();
    }, 600);
  }
}

// mobile 검색 cancel
function toggleSearchCancel(cancel) {
  cancel ? headerEl.classList.remove("searching--mobile") : headerEl.classList.add("searching--mobile");
}

// scroll controll
function playScroll(scroll) {
  scroll? document.documentElement.classList.remove("fixed") : document.documentElement.classList.add("fixed");
}

// video play controll
function playVideo(play) {
  if(play) {
    video.play();
    document.querySelector(".stage .controller--play").classList.add("hide");
    document.querySelector(".stage .controller--pause").classList.remove("hide");
  } else {
    video.pause();
    document.querySelector(".stage .controller--play").classList.remove("hide");
    document.querySelector(".stage .controller--pause").classList.add("hide");
  }
}

// 요소의 가시성 관찰
// icon show
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(!entry.isIntersecting) {
      return entry.target.classList.remove("show");
    }
    entry.target.classList.add("show");
  });
});
const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => {
  io.observe(el);
});


// ---------- get Data
// iPad 
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color}"></li>`;
  }); 

  // HTML
  itemEl.innerHTML = `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩ ${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// navigations
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");
  
  let mapList = "";
  nav.maps.forEach((list) => {
    mapList += `<li><a href="${list.url}">${list.name}</a></li>`;
  }); 

  // HTML
  mapEl.innerHTML = `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl);
});

// mobile footer navigation map
const footerMapEls = document.querySelectorAll("footer .navigations .map");
footerMapEls.forEach((el) => {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", () => {
    el.classList.toggle("active");
  });
});