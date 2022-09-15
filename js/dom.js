const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation-menu");
const buyCartBtn = document.querySelector(".cart-check");
const carousel = document.querySelector(".header-carousel");
const btnRight = document.querySelector(".header-carousel-btn-right");
const btnLeft = document.querySelector(".header-carousel-btn-left");
const slider = document.querySelector(".contact-slider");
let carouselItem = document.querySelectorAll(".header-carousel-item");
let carouselItemLast = carouselItem[carouselItem.length -1];
let sliderItem = document.querySelectorAll(".contact-slider-item");
let sliderItemLast = sliderItem[sliderItem.length -1];
const fadeLeft = document.querySelector(".fade-in-left");
const fadeRight = document.querySelector(".fade-in-right");
const options = {threshold: 0, rootMargin: "-150px"};
const navDarkBtn = document.querySelector(".navigation-dark");
const navLightBtn = document.querySelector(".navigation-light");
const htmlBody = document.querySelector("body");
const aboutImgL = document.querySelector(".about-container-img");
const aboutImgS = document.querySelector(".about-img");
const menuImg = document.querySelector(".menu-img");
const contactImgL = document.querySelector(".contact-container-img");
const contactImgS = document.querySelector(".contact-img");
const nav = document.querySelector(".navigation");
const navMenuDark = document.querySelector(".navigation-menu");
const cartBtn = document.querySelector(".cart-link");
const cartContainer = document.querySelector(".offcanvas");
const cartTitle = document.querySelector(".cart-title");
const cartCloseBtn = document.querySelector(".cart-close");
const cartDeleteBtn = document.querySelector(".cart-delete");
const cartItemsWrapper = document.querySelector(".cart-item-container");
const footer = document.querySelector(".footer");
const navLinks = document.querySelectorAll(".navigation-link");
const colorModeItems = [htmlBody, aboutImgL, aboutImgS, menuImg, contactImgL, contactImgS, nav, navMenuDark,
cartContainer, cartCloseBtn, cartTitle, cartDeleteBtn, cartItemsWrapper, footer];

// responsive menu //
  
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
});

document.querySelectorAll(".navigation-link").forEach(e => e.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
}));

document.querySelector(".navigation-logo").addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
});

buyCartBtn.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
});

// carousel //

carousel.insertAdjacentElement("afterbegin", carouselItemLast)

const next = () => {
    let carouselItemFirst = document.querySelectorAll(".header-carousel-item")[0]
    carousel.style.marginLeft = "-200%"
    carousel.style.transition = "all 1s"
    setTimeout(() => {
        carousel.style.transition = "none"
        carousel.insertAdjacentElement("beforeend", carouselItemFirst)
        carousel.style.marginLeft = "-100%"
    }, 1500)
}

const prev = () => {
    let carouselItem = document.querySelectorAll(".header-carousel-item")
    let carouselItemLast = carouselItem[carouselItem.length -1]
    carousel.style.marginLeft = "0"
    carousel.style.transition = "all 1s"
    setTimeout(() => {
        carousel.style.transition = "none"
        carousel.insertAdjacentElement("afterbegin", carouselItemLast)
        carousel.style.marginLeft = "-100%"
    }, 1500)
}

btnRight.addEventListener("click", next);
btnLeft.addEventListener("click", prev);

// slider //

slider.insertAdjacentElement("afterbegin", sliderItemLast)

const nextSlide = () => {
    let sliderItemFirst = document.querySelectorAll(".contact-slider-item")[0]
    slider.style.marginLeft = "-200%"
    slider.style.transition = "all 1s"
    setTimeout(() => {
        slider.style.transition = "none"
        slider.insertAdjacentElement("beforeend", sliderItemFirst)
        slider.style.marginLeft = "-100%"
    }, 3000)
}

setInterval((nextSlide), 6000);

// animations //

const fadeLeftOnScroll = new IntersectionObserver((entries, fadeLeftOnScroll) => {
    entries.forEach(entry => {
        !entry.isIntersecting ? null : (entry.target.classList.toggle("appear"),
        fadeLeftOnScroll.unobserve(entry.target))
    })
}, options);

const fadeRightOnScroll = new IntersectionObserver((entries, fadeRightOnScroll) => {
    entries.forEach(entry => {
        !entry.isIntersecting ? null : (entry.target.classList.toggle("appear"),
        fadeRightOnScroll.unobserve(entry.target))
    })
}, options);

fadeLeftOnScroll.observe(fadeLeft);
fadeRightOnScroll.observe(fadeRight);

// color mode //

const darkMode = () => {
    navDarkBtn.addEventListener("click", () => {
        colorModeItems.forEach(item => {
        item.classList.add("dark")
        })
        navLinks.forEach(link => {
        link.classList.add("dark")  
        })
        cartBtn.classList.contains("buy") ? null : cartBtn.classList.add("dark")
        localStorage.setItem("mode", "dark")
    })
}

const lightMode = () => {
    navLightBtn.addEventListener("click", () => {
        colorModeItems.forEach(item => {
        item.classList.remove("dark")    
        })
        navLinks.forEach(link => {
        link.classList.remove("dark")  
        })
        cartBtn.classList.remove("dark")
        localStorage.setItem("mode", "light")
    })
}

const saveMode = () => {
    localStorage.getItem("mode") === ("dark") ? 
    (colorModeItems.forEach(item => {
        item.classList.add("dark")
    }),
    navLinks.forEach(link => {
        link.classList.add("dark")}),
        cartBtn.classList.add("dark"))
    :   (colorModeItems.forEach(item => {
            item.classList.remove("dark")}),
        navLinks.forEach(link => {
            link.classList.remove("dark")}),
            cartBtn.classList.remove("dark"))
}

darkMode();
lightMode();
saveMode();