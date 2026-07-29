const tabs=document.querySelectorAll(".tab");

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(btn=>btn.classList.remove("active"));

tab.classList.add("active");

renderProducts(tab.dataset.category);

});

});

const grid=document.getElementById("productGrid");

const searchInput = document.getElementById("searchProduct");

function renderProducts(category="ai", customProducts=null){

grid.innerHTML="";

const filtered = customProducts
    ? customProducts
    : products.filter(product=>product.category===category);

let html = "";

filtered.forEach(product=>{

html += `

<a
href="javascript:void(0)"
class="product-card ${product.stock ? "" : "stock-empty"}"
data-product-id="${product.id}"
data-name="${product.name}"
data-category="${product.category}"
data-price="${product.price}"
data-oldprice="${product.oldPrice}"
data-image="${product.image}"
data-stock="${product.stock}"
data-aos="zoom-in"
>

<div class="product-top">

    <span class="badge ${product.stock ? "badge-hot" : "badge-stock"}">
        ${product.stock ? product.badge : "Stock Habis"}
    </span>

    <span class="discount">
        ${product.discount}
    </span>

</div>

<img
src="${product.image}"
class="product-logo">

<span class="product-category">

${product.category.toUpperCase()}

</span>

<h3>

${product.name}

</h3>

<div class="product-meta">

<span>⭐4.9</span>

<span>⚡ Instant</span>

</div>

<div class="price-group">

<del>

Rp${product.oldPrice}

</del>

<h4>

Rp${product.price}

</h4>

</div>

<button
class="product-btn ${product.stock ? "" : "out-stock"}"

${product.stock
? `
data-name="${product.name}"
data-category="${product.category}"
data-price="${product.price}"
data-oldprice="${product.oldPrice}"
data-image="${product.image}"
`
: ""}

>

${product.stock ? "Beli Sekarang" : "Stock Habis"}

</button>

</a>

`;

});

grid.innerHTML = html;

if (typeof AOS !== "undefined") {
    AOS.refresh();
}

}

renderProducts("ai");

searchInput.addEventListener("input",handleSearch);

function handleSearch(){

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    if(keyword===""){

        const active=document.querySelector(".tab.active");

        renderProducts(active.dataset.category);

        return;

    }

    const result = products.filter(product=>

        product.name
        .toLowerCase()
        .includes(keyword)

    );

    if(result.length){

        const category=result[0].category;

        tabs.forEach(tab=>{

            tab.classList.remove("active");

            if(tab.dataset.category===category){

                tab.classList.add("active");

            }

        });

        renderProducts(category,result);

    }else{

        grid.innerHTML=`

        <div class="empty-search">

            <i class="bi bi-search"></i>

            <h3>Produk tidak ditemukan</h3>

            <p>Coba gunakan kata kunci lain.</p>

        </div>

        `;

    }

}



/* ==========================
FAQ
========================== */

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

const btn=item.querySelector(".faq-question");

btn.addEventListener("click",()=>{

faqItems.forEach(faq=>{

if(faq!==item){

faq.classList.remove("active");

}

});

item.classList.toggle("active");

});

});

/* ==========================================
DARK MODE
========================================== */

const html = document.documentElement;

const toggle = document.getElementById("themeToggle");

const logo = document.getElementById("navbarLogo");

const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme){

    html.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    if(theme==="dark"){

        logo.src="assets/img/logo/logo-full-dark.png";

        toggle.innerHTML='<i class="bi bi-sun-fill"></i>';

        themeColor.setAttribute("content","#0F172A");

    }

    else{

        logo.src="assets/img/logo/logo-full.png";

        toggle.innerHTML='<i class="bi bi-moon-stars-fill"></i>';

        themeColor.setAttribute("content","#2563EB");

    }

}

const savedTheme =

localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);

toggle.addEventListener("click",()=>{

const current=

html.getAttribute("data-theme");

applyTheme(

current==="dark"

? "light"

: "dark"

);

});

/* ==========================================
ORDER MODAL
========================================== */

const orderModal =
document.getElementById("orderModal");

const modalLogo =
document.getElementById("modalProductLogo");

const modalName =
document.getElementById("modalProductName");

const modalCategory =
document.querySelector(".modal-category");

const modalPrice =
document.getElementById("modalPrice");

const modalOldPrice =
document.getElementById("modalOldPrice");

const modalSave =
document.getElementById("modalSave");

const closeModal =
document.querySelector(".order-close");

let selectedProduct = null;

/* ==========================================
ORDER FORM VALIDATION
========================================== */

function clearValidation(){

    document
    .querySelectorAll(".input-error")
    .forEach(el=>el.classList.remove("input-error"));

    document
    .querySelectorAll(".error-message")
    .forEach(el=>el.remove());

}

function showError(input,message){

    input.classList.add("input-error");

    const error=document.createElement("small");

    error.className="error-message";

    error.textContent=message;

    input.parentNode.appendChild(error);

}

function validateOrderForm(){

    clearValidation();

    let valid=true;

    const name=document.getElementById("customerName");

    const email=document.getElementById("customerEmail");

    const phone=document.getElementById("customerPhone");

    const note=document.getElementById("customerNote");



    if(name.value.trim()===""){

        showError(name,"Nama lengkap wajib diisi.");

        valid=false;

    }



    if(email.value.trim()===""){

        showError(email,"Email wajib diisi.");

        valid=false;

    }else{

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email.value.trim())){

            showError(email,"Format email tidak valid.");

            valid=false;

        }

    }



    if(phone.value.trim()===""){

        showError(phone,"Nomor WhatsApp wajib diisi.");

        valid=false;

    }else{

        const number=phone.value.replace(/\D/g,"");

        const regex=/^(08|628)[0-9]{8,13}$/;

        if(!regex.test(number)){

            showError(phone,"Nomor WhatsApp tidak valid.");

            valid=false;

        }

    }



    if(note.value.trim()===""){

        showError(note,"Catatan wajib diisi.");

        valid=false;

    }



    return valid;

}

function generateWhatsAppMessage(){

    const name =
        document.getElementById("customerName").value.trim();

    const email =
        document.getElementById("customerEmail").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const note =
        document.getElementById("customerNote").value.trim();

    return `Halo Admin UNLOCKD+ 👋

Saya ingin melakukan pemesanan.

━━━━━━━━━━━━━━

📦 Produk :
${selectedProduct.name}

💰 Harga :
Rp${selectedProduct.price}

━━━━━━━━━━━━━━

👤 Nama :
${name}

📧 Email :
${email}

📱 WhatsApp :
${phone}

📝 Catatan :
${note}

━━━━━━━━━━━━━━

Mohon informasi untuk proses selanjutnya.

Terima kasih 🙏`;

}

function redirectToWhatsApp(){

    const adminNumber = "6281717893400";

    const message = generateWhatsAppMessage();

    const url =
`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

    window.open(url,"_blank");

}

function redirectStockWhatsApp(product){

    const adminNumber = "6281717893400";

    const message = `Halo Admin UNLOCKD+ 👋

Saya tertarik dengan produk berikut:

📦 ${product.name}

Namun saat saya cek statusnya masih *Stock Habis*.

Mohon kabari saya jika produk ini sudah tersedia kembali.

Terima kasih 🙏`;

    const url =
`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

    window.open(url,"_blank");

}

function openOrderModal(product){

    selectedProduct = product;

    modalLogo.src=product.image;

    modalName.textContent=product.name;

    modalCategory.textContent=
        product.category.toUpperCase();

    modalPrice.textContent=
        "Rp"+product.price;

    modalOldPrice.textContent=
        "Rp"+product.oldPrice;

    modalSave.textContent =
`Hemat ${product.discount.replace("-", "")}`;

    clearValidation();

document.querySelector(".order-form").reset();

    orderModal.classList.add("active");

    document.body.style.overflow="hidden";

    document.getElementById("customerName").focus();

}

function closeOrderModal(){

    orderModal.classList.remove("active");

    document.body.style.overflow="";

}

closeModal.addEventListener(

"click",

closeOrderModal

);

document
.querySelector(".order-overlay")

.addEventListener(

"click",

closeOrderModal

);

/* ==========================================
PRODUCT CARD CLICK
========================================== */

grid.addEventListener("click", (e) => {

    const card = e.target.closest(".product-card");

    if (!card) return;

    e.preventDefault();

    if(card.dataset.stock==="false"){

    redirectStockWhatsApp({

        name:card.dataset.name

    });

    return;

}

    openOrderModal({

    name: card.dataset.name,

    category: card.dataset.category,

    price: card.dataset.price,

    oldPrice: card.dataset.oldprice,

    image: card.dataset.image,

    discount: card.querySelector(".discount").textContent

});

});

/* ==========================================
ORDER SUBMIT
========================================== */

document
.querySelector(".order-submit")
.addEventListener("click",()=>{

    if(!validateOrderForm()){

        return;

    }

    redirectToWhatsApp();

closeOrderModal();

});

/* ==========================================
REMOVE ERROR WHEN TYPING
========================================== */

[
"customerName",
"customerEmail",
"customerPhone",
"customerNote"

].forEach(id=>{

const input=document.getElementById(id);

input.addEventListener("input",()=>{

input.classList.remove("input-error");

const error=input.parentNode.querySelector(".error-message");

if(error){

error.remove();

}

});

});

const phoneInput=document.getElementById("customerPhone");

phoneInput.addEventListener("input",()=>{

phoneInput.value=phoneInput.value.replace(/[^\d]/g,"");

});

document.addEventListener("keydown",(e)=>{

    if(

        e.key==="Escape"

        &&

        orderModal.classList.contains("active")

    ){

        closeOrderModal();

    }

});
