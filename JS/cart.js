// Load cart from localStorage. Each item: { title, price, image, qty }
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Normalise legacy items that don't have a qty field
cart = cart.map(item => ({ ...item, qty: item.qty || 1 }));

const container = document.getElementById("cart-items");
const totalEl   = document.getElementById("total-price");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p class='empty'>Your cart is empty</p>";
    totalEl.textContent = "Total: $0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">

      <div class="cart-info">
        <h3>${item.title}</h3>
        <p class="cart-price">$${item.price.toFixed(2)} each</p>

        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>

        <p class="item-subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
      </div>

      <div class="cart-item-actions">
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    container.appendChild(div);
  });

  totalEl.textContent = "Total: $" + total.toFixed(2);
}

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty < 1) {
    // Remove item if quantity drops below 1
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

renderCart();