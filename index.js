let CardsBox = document.getElementById("cardDiv");
let data;

fetchData('Men');


document.getElementById('Men').addEventListener('click', () => fetchData('Men'));
document.getElementById('Women').addEventListener('click', () => fetchData('Women'));
document.getElementById('Kids').addEventListener('click', () => fetchData('Kids'));

async function fetchData(category) {
    const options = {
        method: "GET"
    };

    try {
        const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json", options);
        data = await response.json();

       

        const categoryProducts = data.categories.find(cat => cat.category_name === category)?.category_products || [];


        
        createCards(categoryProducts);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createCards(products) {
    
    CardsBox.innerHTML = '';

 
    products.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const badgeClass= product.badge_text!==null?"badge":"hide-class";
 
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class=${badgeClass}>${product.badge_text}</div>
            <h3>${product.title.length>11?product.title.slice(0,12)+"..":product.title} &#x2022; ${product.vendor}</h3>
            <div class="price">
            <p>Rs ${product.price}</p>
            <p class="striked-price"> ${product.compare_at_price}</p>
            <p class="discount">${Math.ceil(((product.compare_at_price-product.price)/product.compare_at_price)*100)}% OFF</p>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        CardsBox.appendChild(card);
    });
}
