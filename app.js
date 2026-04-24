const products = [
  {
    id: 1,
    title: '1950s rhinestone brooch',
    category: 'jewelry',
    categoryLabel: 'Украшения',
    price: 86,
    status: 'В наличии',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
    description: 'Винтажная брошь с прозрачными кристаллами, холодный блеск, хороша для жакета или шелкового платка.'
  },
  {
    id: 2,
    title: 'Wool blazer, deep brown',
    category: 'clothes',
    categoryLabel: 'Одежда',
    price: 142,
    status: 'В наличии',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    description: 'Плотный шерстяной жакет с мягкой линией плеча. Подходит для повседневного и вечернего образа.'
  },
  {
    id: 3,
    title: 'Silk scarf, floral print',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    price: 54,
    status: 'В наличии',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80',
    description: 'Шелковый платок с цветочным мотивом. Легкий блеск, аккуратная кромка, мягкая посадка.'
  },
  {
    id: 4,
    title: 'Vintage gold-tone necklace',
    category: 'jewelry',
    categoryLabel: 'Украшения',
    price: 118,
    status: 'Резерв',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    description: 'Колье теплого золотистого оттенка. Выразительная фактура, хорошо смотрится с черным платьем.'
  },
  {
    id: 5,
    title: 'Leather mini bag',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    price: 96,
    status: 'В наличии',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
    description: 'Маленькая кожаная сумка с жесткой формой. Следы времени сохранены как часть характера вещи.'
  },
  {
    id: 6,
    title: 'Embroidered evening top',
    category: 'clothes',
    categoryLabel: 'Одежда',
    price: 128,
    status: 'В наличии',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    description: 'Вечерний топ с вышивкой и мягким мерцанием. Один экземпляр, состояние хорошее.'
  },
  {
    id: 7,
    title: 'Pearl clip earrings',
    category: 'jewelry',
    categoryLabel: 'Украшения',
    price: 72,
    status: 'В наличии',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    description: 'Клипсы с жемчужным акцентом. Классический размер, подойдут для съемки, свадьбы или ужина.'
  },
  {
    id: 8,
    title: 'Classic trench coat',
    category: 'clothes',
    categoryLabel: 'Одежда',
    price: 164,
    status: 'Продано',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80',
    description: 'Тренч классического кроя, мягкий бежевый тон. В демо отмечен как проданный товар.'
  }
];

let cart = [];
const grid = document.getElementById('catalogGrid');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const selectedItems = document.getElementById('selectedItems');
const whatsappLink = document.getElementById('whatsappLink');
const drawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');

function euro(value) {
  return `€${value}`;
}

function renderProducts(filter = 'all') {
  const list = filter === 'all' ? products : products.filter(item => item.category === filter);
  grid.innerHTML = list.map(product => `
    <article class="product-card">
      <div class="product-image" style="background-image:url('${product.image}')"></div>
      <div class="product-body">
        <div class="product-meta">
          <span>${product.categoryLabel}</span>
          <span>${product.status}</span>
        </div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price">${euro(product.price)}</div>
        <div class="product-actions">
          <button type="button" onclick="addToCart(${product.id})" ${product.status === 'Продано' ? 'disabled' : ''}>В заявку</button>
          <button type="button" onclick="quickMessage(${product.id})">Спросить</button>
        </div>
      </div>
    </article>
  `).join('');
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product || product.status === 'Продано') return;
  if (!cart.some(item => item.id === id)) cart.push(product);
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = cart.length ? cart.map(item => `
    <div class="cart-line">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <strong>${item.title}</strong><br>
        <span>${euro(item.price)}</span>
      </div>
      <button type="button" onclick="removeFromCart(${item.id})">×</button>
    </div>
  `).join('') : '<p>Корзина пуста. Добавьте товар из каталога.</p>';
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = euro(total);
  const text = cart.map(item => `${item.title} — ${euro(item.price)}`).join('\n');
  selectedItems.value = text;
  const waText = encodeURIComponent(`Здравствуйте! Хочу уточнить по товарам:\n${text || 'Пока товар не выбран'}`);
  whatsappLink.href = `https://wa.me/491234567890?text=${waText}`;
}

function quickMessage(id) {
  const product = products.find(item => item.id === id);
  const text = encodeURIComponent(`Здравствуйте! Хочу уточнить по товару: ${product.title}, ${euro(product.price)}`);
  window.open(`https://wa.me/491234567890?text=${text}`, '_blank');
}

function openCart() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-open-cart]').forEach(btn => btn.addEventListener('click', openCart));
document.querySelectorAll('[data-close-cart]').forEach(btn => btn.addEventListener('click', closeCart));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.filter);
  });
});

const photoInput = document.getElementById('photoInput');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const aiNotes = document.getElementById('aiNotes');
const aiResult = document.getElementById('aiResult');

photoInput.addEventListener('change', () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  previewImage.src = URL.createObjectURL(file);
  previewImage.classList.remove('hidden');
});

analyzeBtn.addEventListener('click', () => {
  const notes = aiNotes.value.trim();
  const hasPhoto = photoInput.files && photoInput.files.length > 0;
  if (!hasPhoto && !notes) {
    aiResult.innerHTML = '<strong>Добавьте фото или заметки.</strong><p>Так помощник сможет подготовить описание для витрины.</p>';
    return;
  }
  const tone = notes.toLowerCase();
  let guess = 'винтажный аксессуар или украшение';
  let value = 'средняя ценность для ресейла';
  if (tone.includes('маркиров') || tone.includes('клейм')) {
    guess = 'вещь с маркировкой, которую стоит проверить по бренду или мастерской';
    value = 'потенциально выше средней, если маркировка подтверждается';
  }
  if (tone.includes('пластик') || tone.includes('легк')) {
    value = 'скорее декоративная вещь массового сегмента';
  }
  if (tone.includes('камн') || tone.includes('стекл')) {
    guess = 'украшение с декоративными вставками, вероятно стекло или кристаллы';
  }
  aiResult.innerHTML = `
    <strong>Черновик описания:</strong>
    <p>Похоже на ${guess}. По заметкам: ${notes || 'видимых деталей пока мало'}. Предварительно: ${value}.</p>
    <p><strong>Как поставить в витрину:</strong> укажите материал, вес, состояние застежки, наличие маркировки, дефекты и размер. Не обещайте оригинальность бренда без экспертной проверки.</p>
  `;
});

const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (event) => {
  if (orderForm.action.includes('your-form-id')) {
    event.preventDefault();
    alert('Форма готова, но нужно заменить Formspree endpoint в index.html. После этого заявки будут приходить на email.');
  }
});

renderProducts();
updateCart();
