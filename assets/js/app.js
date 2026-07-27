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
href="#"
class="product-card ${product.stock ? "" : "stock-empty"}"
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

<button class="product-btn ${product.stock ? "" : "out-stock"}">

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

localStorage.getItem("theme") || "light";

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
