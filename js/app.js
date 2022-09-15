const cardsContainer = document.querySelector("#cards-container");
const cartItemsContainer = document.querySelector("#cart-items-container");
const cartTotal = document.querySelector("#cartTotal");
const deleteCartBtn = document.querySelector("#delete-cart");
const loadingSpinner = document.querySelector(".spinner-container");
const errorText = document.querySelector(".menu-error");
let products = [];
let cart = {};

// data fecht //

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
});

const fetchData = async () => {
    await fetch("https://6313ca7efc9dc45cb4e63edf.mockapi.io/api/v1/products")
    .then((response) => response.json())
    .then((json) => {
        loadingSpinner.style.display = "block"
        setTimeout(() => {
            loadingSpinner.style.display = "none"
            let products = json
            createCards(products)
            addToCart(products)
        }, 8000)
    })
    .catch((error) => dataError())
}

// error catch //

const dataError = () => {
    loadingSpinner.style.display = "block"
    setTimeout(() => {
    loadingSpinner.style.display = "none"
    }, 4000)
    setTimeout(() => {
    errorText.style.display = "block"
    }, 4000)
}

// generate product cards and modals //

const createCards = (products) => {
    const cardsTemplate = document.querySelector("#cards-template").content
    const cardsFragment = document.createDocumentFragment()

    products.forEach(product => {
        cardsTemplate.querySelector(".menu-card").setAttribute("data-bs-target", `#${product.name}`)
        cardsTemplate.querySelector(".menu-card-title").textContent = product.name
        cardsTemplate.querySelector(".menu-card-p").textContent = product.description
        cardsTemplate.querySelector(".menu-card-img").setAttribute("src", product.img)
        cardsTemplate.querySelector(".menu-card-img").setAttribute("alt", product.alt)
        cardsTemplate.querySelector(".modal").setAttribute("id", product.name)
        cardsTemplate.querySelector(".modal").setAttribute("aria-labelledby", `${product.name}Label`)
        cardsTemplate.querySelector(".modals-img").setAttribute("src", product.img)
        cardsTemplate.querySelector(".modals-img").setAttribute("alt", product.alt)
        cardsTemplate.querySelector(".modals-title").textContent = product.name
        cardsTemplate.querySelector(".modals-p").textContent = product.description
        cardsTemplate.querySelector("p span").textContent = product.price
        cardsTemplate.querySelector(".modals-check").dataset.id = product.id
        
        const cardsClone = cardsTemplate.cloneNode(true)
        cardsFragment.appendChild(cardsClone)
    })

    cardsContainer.appendChild(cardsFragment)
    buyCartBtn.disabled = true
    deleteCartBtn.disabled = true
}

// add to cart buttons //

const addToCart = (products) => {
    const btns = document.querySelectorAll(".modals-check")
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
        const product = products.find(prod => prod.id === Number(btn.dataset.id))
        product.amount = 1
        cart.hasOwnProperty(product.id) ? product.amount = cart[product.id].amount + 1 : null
        cart[product.id] = {...product}
        refreshCart()
        cartBtn.classList.add("buy")
        htmlBody.classList.contains("dark") ? (cartBtn.classList.remove("dark"), cartBtn.classList.add("buy")) : null
        setTimeout(() => {
            Swal.fire({
                customClass: {
                title: "title-swal-products"},
                width: "fit-content",
                position: "top",
                background: "#e8cc41",
                color: "#191919",
                toast: true,
                title: "¡PRODUCTO AGREGADO! &#10004;",
                showConfirmButton: false,
                timer: 1250,
                allowEscapeKey: false,
                stopKeydownPropagation: true
                })
            }, 300)
        })
    })
}

// cart items rendering //

const refreshCart = () => {
    cartItemsContainer.innerHTML = ""

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = `<p class="cart-item-container-p">carrito vacío<br>¡Comienza a comprar!</p>`
        cartTotal.innerText = 0
        cartBtn.classList.remove("buy")
        htmlBody.classList.contains("dark") ? (cartBtn.classList.remove("buy"), cartBtn.classList.add("dark")) : null
        cart = {}
        return
    }

    const cartItemTemplate = document.querySelector("#cart-item-template").content
    const cartItemFragment = document.createDocumentFragment()
    const cartProducts = Object.values(cart)

    cartProducts.forEach(product => {
        cartItemTemplate.querySelector(".cart-item-img").setAttribute("src", product.img)
        cartItemTemplate.querySelector("img").setAttribute("alt", product.alt)
        cartItemTemplate.querySelector(".cart-item-title").textContent = product.name
        cartItemTemplate.querySelector(".cart-item-amount").textContent = product.amount
        cartItemTemplate.querySelector("p span").textContent = product.amount * product.price
        cartItemTemplate.querySelector(".cart-item-plus").dataset.id = product.id
        cartItemTemplate.querySelector(".cart-item-minus").dataset.id = product.id
        cartItemTemplate.querySelector(".cart-item-delete").dataset.id = product.id

        const cartItemClone = cartItemTemplate.cloneNode(true)
        cartItemFragment.appendChild(cartItemClone)
    })

    cartItemsContainer.appendChild(cartItemFragment)

    cartControllers()
    cartItemControllers()
}

// cart buttons //

const cartControllers = () => {
    const itemsTotal = Object.values(cart).reduce((acc, {amount, price}) => acc + amount * price, 0)
    cartTotal.innerText = itemsTotal
    buyCartBtn.disabled = false

    deleteCartBtn.addEventListener("click", () => {
        cart = {}
        refreshCart()
        buyCartBtn.disabled = true
        cartBtn.classList.remove("buy")
        htmlBody.classList.contains("dark") ? (cartBtn.classList.remove("buy"), cartBtn.classList.add("dark")) : null
    })
    buyCartBtn.addEventListener("click", () => {
        cart = {}
        refreshCart()
        cartItemsContainer.innerHTML = `<p class="cart-item-container-p">¡Gracias por tu compra!</p>`
        buyCartBtn.disabled = true
        cartBtn.classList.remove("buy")
        htmlBody.classList.contains("dark") ? (cartBtn.classList.remove("buy"), cartBtn.classList.add("dark")) : null
        setTimeout(() => {
        Swal.fire({
            customClass: {
            title: "title-swal"},
            icon: "success",
            iconColor: "rgba(255, 255, 255, 0.8)",
            background: "#d61a28",
            color: '#fff',
            title: "¡Gracias por tu compra! En breve va a llegar tu pedido.",
            imageUrl: "./images/logo-nav.svg",
            imageAlt: "logo pizza palace",
            imageWidth: "8rem",
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: true
            })
        }, 400)
    })
}

// cart items buttons //

const cartItemControllers = () => {
    const addBtns = document.querySelectorAll(".cart-item-container .cart-item-plus")
    const removeBtns = document.querySelectorAll(".cart-item-container .cart-item-minus")
    const deleteBtns = document.querySelectorAll(".cart-item-container .cart-item-delete")

    addBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const product = cart[btn.dataset.id]
            product.amount ++
            cart[btn.dataset.id] = {...product}
            refreshCart()
        })
    })
    removeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const product = cart[btn.dataset.id]
            product.amount --
            product.amount === 0 ? (delete cart[btn.dataset.id], buyCartBtn.disabled = true)
            : cart[btn.dataset.id] = {...product}
            refreshCart()
        })        
    })
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const product = cart[btn.dataset.id]
            product.amount = 0
            delete cart[btn.dataset.id]
            buyCartBtn.disabled = true
            cart.length === 0 ? cartBtn.classList.remove("buy") : null
            refreshCart()
        })        
    })
}