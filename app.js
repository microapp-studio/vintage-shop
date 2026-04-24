const products = [
  {
    id: 1,
    title: "Vintage Levi's 501 denim",
    category: "clothing",
    price: 92,
    description: "Classic straight-leg denim with natural fading and a clean 90s silhouette.",
    tags: ["90s", "denim", "unisex"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Gold-tone floral brooch",
    category: "jewelry",
    price: 48,
    description: "Statement brooch with textured petals, suitable for coats, scarves and bags.",
    tags: ["brooch", "gold tone", "gift"],
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Archive leather shoulder bag",
    category: "accessories",
    price: 135,
    description: "Compact leather bag with structured shape, soft patina and everyday size.",
    tags: ["leather", "bag", "archive"],
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Silk patterned scarf",
    category: "accessories",
    price: 64,
    description: "Light silk scarf with a warm vintage print and multiple styling options.",
    tags: ["silk", "print", "accessory"],
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Pearl clip earrings",
    category: "jewelry",
    price: 52,
    description: "Elegant clip earrings with faux pearl finish and evening-wear character.",
    tags: ["earrings", "pearl", "evening"],
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Wool blazer",
    category: "clothing",
    price: 118,
    description: "Soft wool blazer with clean shoulders and understated old-money mood.",
    tags: ["wool", "tailoring", "classic"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop"
  }
];

let cart = [];
let currentFilter = "all";

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartCountTop = document.getElementById("cartCountTop");
const cartCountBottom = document.getElementById("cartCountBottom");
const selectedItemsInput = document.getElementById("selectedItemsInput");
const whatsappLink = document.getElementById("whatsappLink");

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts() {
  const visibleProducts = currentFilter === "all"
    ? products
    : products.filter(product => product.category === currentFilter);

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.title}" loading="lazy">
      <div class="product-body">
        <div class="product-meta">
          <h3 class="product-title">${product.title}</h3>
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <p class="product-description">${product.description}</p>
        <div class="product-tags">
          ${product.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>
        <button class="add-btn" data-id="${product.id}">Add to request</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.id));
    });
  });
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  document.getElementById("order").scrollIntoView({ behavior: "smooth", block: "start" });
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountTop.textContent = count;
  cartCountBottom.textContent = count;

  cartEmpty.style.display = cart.length ? "none" : "block";

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>${formatPrice(item.price)} × ${item.quantity}</p>
      </div>
      <button class="remove-btn" data-id="${item.id}" aria-label="Remove ${item.title}">Remove</button>
    </div>
  `).join("");

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => removeFromCart(Number(button.dataset.id)));
  });

  const selectedText = cart.length
    ? cart.map(item => `${item.title} — ${formatPrice(item.price)} × ${item.quantity}`).join("; ")
    : "No items selected";

  selectedItemsInput.value = selectedText;

  const message = encodeURIComponent(`Hi! I want to ask about these items: ${selectedText}`);
  whatsappLink.href = `https://wa.me/15551234567?text=${message}`;
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderProducts();
  });
});

document.getElementById("clearCartBtn").addEventListener("click", clearCart);

document.getElementById("openCartTop").addEventListener("click", () => {
  document.getElementById("order").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) {
    alert("Please add at least one item to your request bag.");
    return;
  }

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");

  alert(`Thank you, ${name}. Demo request prepared for ${email}. Connect Formspree or backend to send real orders.`);
});

const photoInput = document.getElementById("photoInput");
const previewImage = document.getElementById("previewImage");
const analyzeBtn = document.getElementById("analyzeBtn");
const aiResult = document.getElementById("aiResult");
const scanNotes = document.getElementById("scanNotes");

photoInput.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  previewImage.src = imageUrl;
  previewImage.style.display = "block";
});

analyzeBtn.addEventListener("click", () => {
  const notes = scanNotes.value.trim();

  const baseDescription = notes
    ? `Based on the photo and notes, this item can be listed as a vintage-inspired piece with visible character: ${notes}.`
    : "Based on the uploaded photo, this item can be listed as a vintage-inspired accessory or garment with visible character and resale appeal.";

  aiResult.innerHTML = `
    <strong>Draft listing</strong>
    <p>${baseDescription}</p>
    <p><strong>Value note:</strong> Use a cautious price range until the maker's mark, material, condition and market comparisons are checked.</p>
    <p><strong>Authenticity note:</strong> This demo does not confirm brand authenticity. A real version should connect to a vision API and include human review for high-value items.</p>
  `;
});

renderProducts();
updateCart();
