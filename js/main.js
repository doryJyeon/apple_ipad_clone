import navigations from "/data/navigations.js";

const headerEl = document.querySelector("header");
const basketEl = document.querySelector("header .basket");
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

  // 검색 toggle 
  if(targetId === "searchStarter") {
    toggleSearch(false);
  } else if(targetClass === "search-closer" || targetClass === "shadow") {
    toggleSearch(true);
  }
  
  // video play controll
  if(targetClass === "controller--play" || targetClass === "controller--play--icon") {
    playVideo(true);
  } else if(targetClass === "controller--pause" || targetClass === "controller--pause--icon") {
    playVideo(false);
  }

  // 장바구니 hide
  toggleBasket(true);

});

// 장바구니 toggle
function toggleBasket(show) {
  show ? basketEl.classList.remove("show") : basketEl.classList.add("show");
}

// 검색 toggle
function toggleSearch(show) {
  if(show) {
    headerEl.classList.remove("searching");
    document.documentElement.classList.remove("fixed");
    toggleSearchMenu(show);
  } else {
    headerEl.classList.add("searching");
    document.documentElement.classList.add("fixed");
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
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl);
});
