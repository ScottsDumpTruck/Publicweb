// --- 1. DATA CONFIGURATION: GALLERY ---
// Matches the lowercase 'images' folder on your GitHub repository
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

// --- 2. DATA CONFIGURATION: MATERIALS ---
const materialsList = [
    { name: "ABC (Spec/Non-Spec)", category: "Construction Aggregate", price: "$40/ton", density: 1.5, img: "images/ABC.png" },
    { name: "1/4\" Minus Desert Brown", category: "Construction Aggregate", price: "$35/ton", density: 1.5, img: "images/Minus_desert_brown.png" },
    { name: "3/8\" Screened Apache Red", category: "Decorative Aggregate", price: "$65/ton", density: 1.5, img: "images/38_screened_Apache_red.png" },
    { name: "1/2\" Screened Apache Red", category: "Decorative Aggregate", price: "$65/ton", density: 1.5, img: "images/1-2_screened_apache_red.png" },
    { name: "1\" Screened Apache Red", category: "Decorative Aggregate", price: "$65/ton", density: 1.2, img: "images/1_screened_apache_red.png" },
    { name: "3/8\" Coronado Brown", category: "Decorative Aggregate", price: "$70/ton", density: 1.5, img: "images/3-8_Coronado_Brown.png" },
    { name: "1/2\" Coronado Brown", category: "Decorative Aggregate", price: "$70/ton", density: 1.2, img: "images/1-2_Corondado_brown.png" },
    { name: "1\" Coronado Brown", category: "Decorative Aggregate", price: "$70/ton", density: 1.2, img: "images/1_coronado_brown.png" },
    { name: "3/8\" Desert Brown", category: "Decorative Aggregate", price: "$65/ton", density: 1.5, img: "images/3-8_Desert_Brown.png" },
    { name: "1/2\" Desert Brown", category: "Decorative Aggregate", price: "$75/ton", density: 1.2, img: "images/1-2_Desert_Brown.png" },
    { name: "3/4\" Desert Brown Gravel", category: "Decorative Aggregate", price: "$75/ton", density: 1.2, img: "images/Desert_Brown_gravel.png" },
    { name: "White Rock", category: "Decorative Aggregate", price: "$80/ton", density: 1.5, img: "images/Whiterock.jpeg" },
    { name: "Apache Red Boulders", category: "Decorative Aggregate", price: "$50 - $500 each", density: 1.2, img: "images/Apache_red_boulders.png" },
    { name: "Coronado Brown Boulders", category: "Decorative Aggregate", price: "$25 - $500 each", density: 1.5, img: "images/Corondado_brown_boulders.png" },
    { name: "Mortar Sand", category: "Sand", price: "$55/ton", density: 1.3, img: "images/Mortarsand.png" },
    { name: "Concrete Sand", category: "Sand", price: "$50/ton", density: 1.3, img: "images/Concretesand.png" },
    { name: "Fill Dirt", category: "Soil", price: "$20.00/ton or $240.00/15 tons", density: 1.2, img: "images/Fill dirt.png" },
    { name: "River Rock", category: "Salt River Rock", price: "$80/ton", density: 1.2, img: "images/riverrock.jpeg" },
    { name: "4\" - 12\" River Rock", category: "Salt River Rock", price: "$75/ton", density: 1.2, img: "images/4-12riverrock.png" },
    { name: "1\" - 3\" Apache Red Rip Rap", category: "Rip Rap", price: "$65/ton", density: 1.5, img: "images/1-3_Apache_red_rip_rap.png" },
    { name: "4\" - 12\" Coronado Brown Rip Rap", category: "Rip Rap", price: "$70/ton", density: 1.2, img: "images/4-12_Corondado_brown_rip_rap.png" },
    { name: "General Rip Rap", category: "Rip Rap", price: "$70/ton", density: 1.2, img: "images/riprap.jpeg" }
];

// --- 3. LOGIC & STATE ---
let currentFilteredList = [];
let lightboxIndex = 0;
let carIndex = 0; 
let carouselInterval;

window.onload = () => {
    if (document.getElementById('carousel-track')) initCarousel();
    if (document.getElementById('mat-select')) populateCalculator();

    // Chrome Global Gesture Unlock
    document.body.addEventListener('click', () => {
        const vid = document.getElementById('active-vid');
        if (vid && vid.paused) {
            vid.play().catch(e => console.log("User interaction required to play video.", e));
        }
    }, { once: true });
};

/** * CAROUSEL LOGIC */
function initCarousel() {
    renderCarouselItem();
    startCarouselTimer();
}

function startCarouselTimer() {
    clearInterval(carouselInterval);
    // Rotating every 15s to allow for video load time
    carouselInterval = setInterval(() => moveCarousel(1), 15000); 
}

function moveCarousel(step) {
    carIndex = (carIndex + step + projectAssets.length) % projectAssets.length;
    renderCarouselItem();
    startCarouselTimer(); 
}

function renderCarouselItem() {
    const track = document.getElementById('carousel-track');
    const captionEl = document.getElementById('carousel-caption');
    const asset = projectAssets[carIndex];
    if (!track) return;

    track.style.opacity = 0;
    
    setTimeout(() => {
        track.innerHTML = ''; 

        if (asset.type === 'video') {
            // Timestamp forces Chrome to treat the source as fresh
            const videoUrl = asset.src + '?v=' + Date.now();
            
            track.innerHTML = `
                <div class="relative w-full h-full bg-black">
                    <video id="active-vid" autoplay muted loop playsinline preload="auto" class="w-full h-full object-cover">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                    <div id="play-overlay" class="absolute inset-0 flex items-center justify-center bg-black/40 hidden cursor-pointer z-20">
                        <div class="bg-white/90 p-4 rounded-full text-black font-extrabold shadow-lg">▶ CLICK TO VIEW</div>
                    </div>
                </div>`;
            
            const vid = document.getElementById('active-vid');
            const overlay = document.getElementById('play-overlay');

            // Force Chrome to reload the media stream
            if (vid) {
                vid.load();
                const playPromise = vid.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        overlay.classList.remove('hidden');
                        overlay.onclick = () => {
                            vid.play();
                            overlay.classList.add('hidden');
                        };
                    });
                }
            }
        } else {
            track.innerHTML = `<img src="${asset.src}" class="w-full h-full object-cover">`;
        }

        // Auto-Hide Caption logic
        if (captionEl) {
            if (asset.caption && asset.caption.trim() !== "") {
                captionEl.innerText = asset.caption;
                captionEl.classList.remove('hidden');
            } else {
                captionEl.innerText = "";
                captionEl.classList.add('hidden');
            }
        }
        
        track.style.opacity = 1;
    }, 500);
}

// --- MATERIALS & CALCULATOR LOGIC ---
function filterMaterials(categoryName) {
    const hub = document.getElementById('category-hub');
    const results = document.getElementById('results-view');
    const grid = document.getElementById('materials-grid');
    const title = document.getElementById('category-title');

    grid.innerHTML = '';
    title.innerText = categoryName;
    currentFilteredList = materialsList.filter(m => m.category === categoryName);

    currentFilteredList.forEach((m, index) => {
        const tile = document.createElement('div');
        tile.className = "material-tile bg-white rounded-xl overflow-hidden shadow-lg border-b-4 border-[#D2B48C]";
        tile.innerHTML = `
            <div class="h-48 overflow-hidden cursor-pointer" onclick="openLightbox(${index})">
                <img src="${m.img}" alt="${m.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
            </div>
            <div class="p-4 text-center">
                <h4 class="font-bold text-[#5D4037] uppercase text-sm">${m.name}</h4>
                <p class="text-[#D2B48C] font-black mt-1">${m.price}</p>
            </div>
        `;
        grid.appendChild(tile);
    });

    hub.classList.add('hidden');
    results.classList.remove('hidden');
    window.scrollTo(0,0);
}

function showHub() {
    document.getElementById('category-hub').classList.remove('hidden');
    document.getElementById('results-view').classList.add('hidden');
}

function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function changeImage(step) {
    lightboxIndex = (lightboxIndex + step + currentFilteredList.length) % currentFilteredList.length;
    updateLightbox();
}

function updateLightbox() {
    const item = currentFilteredList[lightboxIndex];
    const img = document.getElementById('lightbox-img');
    if (img) img.src = item.img;
    document.getElementById('lightbox-name').innerText = item.name;
    document.getElementById('lightbox-price').innerText = item.price;
}

function populateCalculator() {
    const select = document.getElementById('mat-select');
    if (!select) return;
    select.innerHTML = ''; 
    materialsList.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.density;
        opt.innerText = m.name;
        select.appendChild(opt);
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
    const density = parseFloat(document.getElementById('mat-select').value);
    const waste = parseFloat(document.getElementById('waste-factor').value) || 1;
    let area = 0;

    if (shape === 'rect') {
        area = (parseFloat(document.getElementById('length').value) || 0) * (parseFloat(document.getElementById('width').value) || 0);
    } else if (shape === 'circle') {
        area = Math.PI * Math.pow((parseFloat(document.getElementById('radius').value) || 0), 2);
    } else if (shape === 'triangle') {
        area = ((parseFloat(document.getElementById('base').value) || 0) * (parseFloat(document.getElementById('height').value) || 0)) / 2;
    }

    const tons = (area * (depth / 12) / 27) * density * waste;
    document.getElementById('result-text').innerText = tons.toFixed(2) + " Tons";
    document.getElementById('calc-result').classList.remove('hidden');
}