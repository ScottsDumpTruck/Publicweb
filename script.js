/* ============================================
   SCOTT DUMP TRUCK & TRACTOR SERVICE
   script.js — Revamped 2026
   ============================================ */

// ===========================================
// 1. DATA CONFIGURATION
// ===========================================
const projectAssets = [
    { type: 'video', src: 'images/vid1.mp4', caption: '' },
    { type: 'video', src: 'images/vid2.mp4', caption: '' },
    { type: 'img', src: 'images/slide1.jpeg', caption: '' },
    { type: 'img', src: 'images/slide2.jpeg', caption: '' },
    { type: 'img', src: 'images/slide3.jpeg', caption: '' },
    { type: 'img', src: 'images/slide4.jpeg', caption: '' },
    { type: 'img', src: 'images/slide5.jpeg', caption: '' },
    { type: 'img', src: 'images/slide6.jpeg', caption: '' },
    { type: 'img', src: 'images/slide7.jpeg', caption: '' }
];

const materialsList = [
    { name: "ABC (Spec/Non-Spec)", category: "Construction Aggregate", price: "$40/ton", pricePerTon: 40, density: 1.5, img: "images/ABC.png" },
    { name: "1/4\" Minus Desert Brown", category: "Construction Aggregate", price: "$35/ton", pricePerTon: 35, density: 1.5, img: "images/Minus_desert_brown.png" },
    { name: "3/8\" Screened Apache Red", category: "Decorative Aggregate", price: "$65/ton", pricePerTon: 65, density: 1.5, img: "images/38_screened_Apache_red.png" },
    { name: "1/2\" Screened Apache Red", category: "Decorative Aggregate", price: "$65/ton", pricePerTon: 65, density: 1.5, img: "images/1-2_screened_apache_red.png" },
    { name: "1\" Screened Apache Red", category: "Decorative Aggregate", price: "$65/ton", pricePerTon: 65, density: 1.2, img: "images/1_screened_apache_red.png" },
    { name: "3/8\" Coronado Brown", category: "Decorative Aggregate", price: "$70/ton", pricePerTon: 70, density: 1.5, img: "images/3-8_Coronado_Brown.png" },
    { name: "1/2\" Coronado Brown", category: "Decorative Aggregate", price: "$70/ton", pricePerTon: 70, density: 1.2, img: "images/1-2_Corondado_brown.png" },
    { name: "1\" Coronado Brown", category: "Decorative Aggregate", price: "$70/ton", pricePerTon: 70, density: 1.2, img: "images/1_coronado_brown.png" },
    { name: "3/8\" Desert Brown", category: "Decorative Aggregate", price: "$65/ton", pricePerTon: 65, density: 1.5, img: "images/3-8_Desert_Brown.png" },
    { name: "1/2\" Desert Brown", category: "Decorative Aggregate", price: "$75/ton", pricePerTon: 75, density: 1.2, img: "images/1-2_Desert_Brown.png" },
    { name: "3/4\" Desert Brown Gravel", category: "Decorative Aggregate", price: "$75/ton", pricePerTon: 75, density: 1.2, img: "images/Desert_Brown_gravel.png" },
    { name: "White Rock", category: "Decorative Aggregate", price: "$80/ton", pricePerTon: 80, density: 1.5, img: "images/Whiterock.jpeg" },
    { name: "Apache Red Boulders", category: "Decorative Aggregate", price: "$50–$500 each", pricePerTon: null, density: 1.2, img: "images/Apache_red_boulders.png" },
    { name: "Coronado Brown Boulders", category: "Decorative Aggregate", price: "$25–$500 each", pricePerTon: null, density: 1.5, img: "images/Corondado_brown_boulders.png" },
    { name: "Mortar Sand", category: "Sand", price: "$55/ton", pricePerTon: 55, density: 1.3, img: "images/Mortarsand.png" },
    { name: "Concrete Sand", category: "Sand", price: "$50/ton", pricePerTon: 50, density: 1.3, img: "images/Concretesand.png" },
    { name: "Fill Dirt", category: "Soil", price: "$20/ton or $240/15 tons", pricePerTon: 20, density: 1.2, img: "images/Fill dirt.png" },
    { name: "River Rock", category: "Salt River Rock", price: "$80/ton", pricePerTon: 80, density: 1.2, img: "images/riverrock.jpeg" },
    { name: "4\"–12\" River Rock", category: "Salt River Rock", price: "$75/ton", pricePerTon: 75, density: 1.2, img: "images/4-12riverrock.png" },
    { name: "1\"–3\" Apache Red Rip Rap", category: "Rip Rap", price: "$65/ton", pricePerTon: 65, density: 1.5, img: "images/1-3_Apache_red_rip_rap.png" },
    { name: "4\"–12\" Coronado Brown Rip Rap", category: "Rip Rap", price: "$70/ton", pricePerTon: 70, density: 1.2, img: "images/4-12_Corondado_brown_rip_rap.png" },
    { name: "General Rip Rap", category: "Rip Rap", price: "$70/ton", pricePerTon: 70, density: 1.2, img: "images/riprap.jpeg" }
];

// ===========================================
// 2. GLOBAL STATE
// ===========================================
let currentFilteredList = [];
let lightboxIndex = 0;
let carIndex = 0;
let carouselInterval;

// ===========================================
// 3. INIT
// ===========================================
window.onload = () => {
    if (document.getElementById('carousel-track')) initCarousel();
    if (document.getElementById('mat-select')) populateCalculator();
    initScrollAnimations();

    // Chrome autoplay unlock
    document.body.addEventListener('mousedown', unlockMedia, { once: true });
    document.body.addEventListener('touchstart', unlockMedia, { once: true });
};

function unlockMedia() {
    const vid = document.getElementById('active-vid');
    if (vid && vid.paused && !vid.classList.contains('hidden')) {
        vid.play().catch(() => {});
    }
}

// ===========================================
// 4. CAROUSEL
// ===========================================
function initCarousel() {
    buildCarouselDots();
    renderCarouselItem();
    startCarouselTimer();
}

function buildCarouselDots() {
    const dotsEl = document.getElementById('carousel-dots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    projectAssets.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.onclick = () => { carIndex = i; renderCarouselItem(); startCarouselTimer(); };
        dotsEl.appendChild(dot);
    });
}

function updateCarouselDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === carIndex));
}

function startCarouselTimer() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => moveCarousel(1), 15000);
}

function moveCarousel(step) {
    carIndex = (carIndex + step + projectAssets.length) % projectAssets.length;
    renderCarouselItem();
    startCarouselTimer();
}

function renderCarouselItem() {
    const track = document.getElementById('carousel-track');
    const vid = document.getElementById('active-vid');
    const img = document.getElementById('active-img');
    const overlay = document.getElementById('play-overlay');
    const captionEl = document.getElementById('carousel-caption');
    const asset = projectAssets[carIndex];
    if (!track || !vid || !img) return;

    track.style.opacity = 0;
    setTimeout(() => {
        vid.classList.add('hidden');
        img.classList.add('hidden');
        overlay.classList.add('hidden');

        if (asset.type === 'video') {
            vid.src = asset.src;
            vid.classList.remove('hidden');
            vid.load();
            vid.oncanplay = () => {
                vid.play().catch(() => {
                    overlay.classList.remove('hidden');
                    overlay.onclick = () => { vid.play(); overlay.classList.add('hidden'); };
                });
            };
        } else {
            img.src = asset.src;
            img.classList.remove('hidden');
        }

        if (captionEl) {
            if (asset.caption && asset.caption.trim() !== '') {
                captionEl.innerText = asset.caption;
                captionEl.classList.remove('hidden');
            } else {
                captionEl.classList.add('hidden');
            }
        }
        track.style.opacity = 1;
        updateCarouselDots();
    }, 400);
}

// ===========================================
// 5. GALLERY / MATERIALS
// ===========================================
function filterMaterials(categoryName) {
    const grid = document.getElementById('materials-grid');
    if (!grid) return;
    grid.innerHTML = '';
    document.getElementById('category-title').innerText = categoryName;
    currentFilteredList = materialsList.filter(m => m.category === categoryName);

    currentFilteredList.forEach((m, index) => {
        const tile = document.createElement('div');
        tile.className = 'material-tile bg-white rounded-xl overflow-hidden shadow-lg border-b-4 border-[#D2B48C]';
        tile.innerHTML = `
            <div class="h-48 overflow-hidden cursor-pointer relative" onclick="openLightbox(${index})">
                <img src="${m.img}" alt="${m.name}" loading="lazy" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <span class="bg-white/90 px-3 py-1.5 rounded-full text-xs font-bold text-[#5D4037] uppercase tracking-widest shadow">View ↗</span>
                </div>
            </div>
            <div class="p-4 text-center">
                <h4 class="font-bold text-[#5D4037] uppercase text-sm leading-tight mb-2">${m.name}</h4>
                <p class="text-[#D2B48C] font-black text-base">${m.price}</p>
            </div>
        `;
        grid.appendChild(tile);
    });

    document.getElementById('category-hub').classList.add('hidden');
    document.getElementById('results-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHub() {
    document.getElementById('category-hub').classList.remove('hidden');
    document.getElementById('results-view').classList.add('hidden');
}

function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.remove('hidden');
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(step) {
    lightboxIndex = (lightboxIndex + step + currentFilteredList.length) % currentFilteredList.length;
    updateLightbox();
}

function updateLightbox() {
    const item = currentFilteredList[lightboxIndex];
    document.getElementById('lightbox-img').src = item.img;
    document.getElementById('lightbox-img').alt = item.name;
    document.getElementById('lightbox-name').innerText = item.name;
    document.getElementById('lightbox-price').innerText = item.price;
}

// Close lightbox on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { if (currentFilteredList.length) changeImage(-1); }
    if (e.key === 'ArrowRight') { if (currentFilteredList.length) changeImage(1); }
});

// ===========================================
// 6. CALCULATOR
// ===========================================
function populateCalculator() {
    const select = document.getElementById('mat-select');
    if (!select) return;
    select.innerHTML = '';

    // Group by category
    const categories = [...new Set(materialsList.map(m => m.category))];
    categories.forEach(cat => {
        const group = document.createElement('optgroup');
        group.label = cat;
        materialsList.filter(m => m.category === cat).forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.density;
            opt.dataset.price = m.pricePerTon || '';
            opt.dataset.name = m.name;
            opt.innerText = m.name;
            group.appendChild(opt);
        });
        select.appendChild(group);
    });
}

function toggleInputs() {
    const shape = document.getElementById('shape').value;
    document.getElementById('rect-inputs').classList.toggle('hidden', shape !== 'rect');
    document.getElementById('circle-inputs').classList.toggle('hidden', shape !== 'circle');
    document.getElementById('triangle-inputs').classList.toggle('hidden', shape !== 'triangle');
}

function runMath() {
    const shape = document.getElementById('shape').value;
    const depth = parseFloat(document.getElementById('depth').value) || 0;
    const matSelect = document.getElementById('mat-select');
    const density = parseFloat(matSelect.value);
    const waste = parseFloat(document.getElementById('waste-factor').value) || 1;
    const pricePerTon = parseFloat(matSelect.selectedOptions[0].dataset.price) || null;
    const matName = matSelect.selectedOptions[0].dataset.name || '';
    let area = 0;

    if (shape === 'rect') {
        area = (parseFloat(document.getElementById('length').value) || 0) *
               (parseFloat(document.getElementById('width').value) || 0);
    } else if (shape === 'circle') {
        const r = parseFloat(document.getElementById('radius').value) || 0;
        area = Math.PI * r * r;
    } else if (shape === 'triangle') {
        area = ((parseFloat(document.getElementById('base').value) || 0) *
                (parseFloat(document.getElementById('height').value) || 0)) / 2;
    }

    if (area === 0 || depth === 0) {
        alert('Please enter all dimensions before calculating.');
        return;
    }

    const tons = (area * (depth / 12) / 27) * density * waste;

    // Show result
    document.getElementById('result-text').innerText = tons.toFixed(2);
    document.getElementById('calc-result-placeholder').classList.add('hidden');
    document.getElementById('calc-result').classList.remove('hidden');
    document.getElementById('calc-result').style.display = 'flex';

    // Price estimate
    const priceEl = document.getElementById('price-estimate');
    if (pricePerTon) {
        const low = (tons * pricePerTon).toFixed(0);
        const high = (tons * pricePerTon * 1.1).toFixed(0);
        priceEl.innerHTML = `
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Estimated Material Cost</p>
            <p class="text-2xl font-black text-[#5D4037]">$${parseInt(low).toLocaleString()} – $${parseInt(high).toLocaleString()}</p>
            <p class="text-[10px] text-gray-400 mt-1">Based on ${matName} at ${pricePerTon}/ton. Excludes delivery & tax.</p>
        `;
    } else {
        priceEl.innerHTML = `<p class="text-xs text-gray-400 text-center">Contact us for pricing on <strong>${matName}</strong>.</p>`;
    }

    // Delivery note
    const deliveryEl = document.getElementById('delivery-note');
    if (tons >= 10) {
        deliveryEl.innerHTML = '<span class="text-green-600 font-bold">✓ Your order qualifies for FREE delivery!</span>';
    } else {
        deliveryEl.innerHTML = `You need <strong>${tons.toFixed(2)} tons</strong>. Orders under 10 tons have a distance-based delivery fee. <a href="index.html#quote" class="text-[#D2B48C] font-bold underline">Call for pricing.</a>`;
    }
}

// ===========================================
// 7. CHATBOT
// ===========================================
const chatResponses = [
    {
        patterns: ['location', 'address', 'where', 'find you', 'directions', 'davis'],
        response: "📍 We're located at **4869 N. Davis Avenue, Tucson, AZ**. We're open to the public — homeowners and contractors welcome! <a href='https://maps.google.com/?q=4869+N+Davis+Ave+Tucson+AZ' target='_blank' class='text-[#D2B48C] font-bold underline'>Get Directions →</a>"
    },
    {
        patterns: ['hours', 'open', 'close', 'schedule', 'when'],
        response: "🕐 Our general hours are Monday–Saturday, 7 AM to 5 PM. Hours may vary — give us a call to confirm before your visit!"
    },
    {
        patterns: ['delivery', 'deliver', 'free delivery', 'shipping'],
        response: "🚛 **Free delivery on orders of 10 tons or more!** For orders under 10 tons, delivery fees vary by distance. Use our <a href='calculator.html' class='text-[#D2B48C] font-bold underline'>Tonnage Calculator</a> to estimate your needs, then <a href='index.html#quote' class='text-[#D2B48C] font-bold underline'>request a quote</a>."
    },
    {
        patterns: ['minimum', 'smallest', 'min order', 'how little', 'small order'],
        response: "There's no minimum order — we serve projects of all sizes! Just note that orders under 10 tons have a distance-based delivery fee. You can also pick up from our yard at 4869 N. Davis Ave."
    },
    {
        patterns: ['quote', 'price', 'cost', 'estimate', 'how much'],
        response: "💰 Use our <a href='calculator.html' class='text-[#D2B48C] font-bold underline'>Tonnage Calculator</a> to estimate materials needed, then fill out our <a href='index.html#quote' class='text-[#D2B48C] font-bold underline'>Quick Quote form</a>. We'll get back to you fast with exact pricing!"
    },
    {
        patterns: ['material', 'carry', 'sell', 'stock', 'what do you have'],
        response: "🪨 We carry 6 categories of materials: **Construction Aggregate** (ABC), **Decorative Aggregate** (Apache Red, Coronado Brown, Desert Brown, White Rock, Boulders), **Sand** (Mortar & Concrete), **Soil** (Fill Dirt), **Salt River Rock**, and **Rip Rap**. <a href='materials.html' class='text-[#D2B48C] font-bold underline'>Browse all materials →</a>"
    },
    {
        patterns: ['abc', 'base course', 'spec', 'non-spec'],
        response: "🏗️ **ABC (Aggregate Base Course)** is a crushed rock blend used for driveways, road bases, and building pads. It compacts well and provides excellent drainage. We carry both Spec and Non-Spec grades starting at **$40/ton**."
    },
    {
        patterns: ['apache red', 'apache'],
        response: "🔴 Apache Red is a popular Tucson decorative rock with warm red/rust tones. We carry multiple sizes: 3/8\", 1/2\", 1\" screened, plus Rip Rap and Boulders. Pricing from **$65/ton**. <a href='materials.html' class='text-[#D2B48C] font-bold underline'>View all Apache Red →</a>"
    },
    {
        patterns: ['coronado', 'coronado brown'],
        response: "🟤 Coronado Brown has rich tan/brown tones and is a classic Tucson landscape rock. Available in 3/8\", 1/2\", 1\" screened, plus Boulders and Rip Rap. Starting at **$70/ton**."
    },
    {
        patterns: ['river rock', 'salt river'],
        response: "🌊 Salt River Rock is smooth, rounded, natural river rock. We carry standard River Rock and 4\"–12\" River Rock, both at **$75–$80/ton**. Great for landscaping and drainage."
    },
    {
        patterns: ['fill dirt', 'dirt', 'soil'],
        response: "🌱 Fill Dirt is available at **$20/ton or $240 for 15 tons**. Great for grading, leveling, and filling low areas."
    },
    {
        patterns: ['sand', 'mortar', 'concrete sand'],
        response: "🏖️ We carry Mortar Sand ($55/ton) and Concrete Sand ($50/ton). Both are excellent quality for construction and landscaping projects."
    },
    {
        patterns: ['tractor', 'grading', 'grade', 'pad', 'level', 'driveway'],
        response: "🚜 We offer professional **tractor and grading services** for driveways, house pads, and land preparation across the Tucson area. <a href='index.html#quote' class='text-[#D2B48C] font-bold underline'>Request a quote</a> and describe your project!"
    },
    {
        patterns: ['depth', 'how deep', 'how thick', 'inches'],
        response: "📏 General guidelines: **Driveways/Paths** → 3–4 inches. **Landscape cover** → 2–3 inches. **Drainage/Rip Rap** → 4–6 inches. **Boulders** → variable. Our <a href='calculator.html' class='text-[#D2B48C] font-bold underline'>Calculator</a> handles the math once you have your depth!"
    },
    {
        patterns: ['rip rap', 'riprap', 'erosion', 'drainage'],
        response: "🏔️ Rip Rap is oversized crushed rock used for erosion control, drainage channels, and slope protection. We carry Apache Red Rip Rap (1\"–3\") at $65/ton, and Coronado Brown Rip Rap (4\"–12\") and General Rip Rap at $70/ton."
    },
    {
        patterns: ['phone', 'call', 'contact', 'number', 'reach'],
        response: "📞 Give us a call at <a href='tel:+15200000000' class='text-[#D2B48C] font-bold underline'>(520) 000-0000</a> or fill out our <a href='index.html#quote' class='text-[#D2B48C] font-bold underline'>Quote Form</a> and we'll get back to you quickly!"
    },
    {
        patterns: ['boulder', 'boulders'],
        response: "🪨 We carry Apache Red Boulders ($50–$500 each) and Coronado Brown Boulders ($25–$500 each). Pricing depends on size. Visit our yard to select the perfect boulder for your project or call for details!"
    },
    {
        patterns: ['calculator', 'how many tons', 'tonnage', 'calculate'],
        response: "📐 Use our free <a href='calculator.html' class='text-[#D2B48C] font-bold underline'>Tonnage Calculator</a>! Enter your area shape, dimensions, desired depth, and material — it'll give you an instant estimate including an optional waste factor."
    },
    {
        patterns: ['hello', 'hi', 'hey', 'howdy', 'good morning', 'good afternoon'],
        response: "Hey there! 👋 Welcome to Scott Dump Truck & Tractor Service. What can I help you with today? Ask about materials, pricing, delivery, or our location!"
    },
    {
        patterns: ['thank', 'thanks', 'appreciate'],
        response: "You're welcome! 😊 Don't hesitate to ask if you have any other questions. We're happy to help!"
    }
];

function getBotResponse(input) {
    const lower = input.toLowerCase();
    for (const entry of chatResponses) {
        if (entry.patterns.some(p => lower.includes(p))) {
            return entry.response;
        }
    }
    return "That's a great question! I might not have the exact answer, but you can <a href='index.html#quote' class='text-[#D2B48C] font-bold underline'>send us a message</a> or call <a href='tel:+15200000000' class='text-[#D2B48C] font-bold underline'>(520) 000-0000</a> and we'll be happy to help! 🤙";
}

function toggleChat() {
    const win = document.getElementById('chat-window');
    const iconOpen = document.getElementById('chat-icon-open');
    const iconClose = document.getElementById('chat-icon-close');
    const isHidden = win.classList.contains('hidden');

    win.classList.toggle('hidden', !isHidden);
    win.style.display = isHidden ? 'flex' : 'none';
    iconOpen.classList.toggle('hidden', isHidden);
    iconClose.classList.toggle('hidden', !isHidden);

    if (isHidden) {
        setTimeout(() => document.getElementById('chat-input')?.focus(), 100);
    }
}

function sendChat() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addChatMessage(msg, 'user');
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        addChatMessage(getBotResponse(msg), 'bot');
    }, 800 + Math.random() * 400);
}

function handleQuickReply(text) {
    addChatMessage(text, 'user');
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        addChatMessage(getBotResponse(text), 'bot');
    }, 700);
}

function addChatMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const el = document.createElement('div');
    el.className = sender === 'bot' ? 'bot-bubble' : 'user-bubble';
    el.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const el = document.createElement('div');
    el.id = 'typing-indicator';
    el.className = 'typing-indicator';
    el.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    document.getElementById('typing-indicator')?.remove();
}

// ===========================================
// 8. SCROLL ANIMATIONS
// ===========================================
function initScrollAnimations() {
    const targets = document.querySelectorAll('.service-card, .stat-card, .category-card, .material-preview-card');
    targets.forEach(el => el.classList.add('fade-in-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}
