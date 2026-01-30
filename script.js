// --- DATA CONFIGURATION ---
const projectAssets = [
    { type: 'img', src: 'images/slide1.jpeg', caption: '' },
    { type: 'img', src: 'images/slide2.jpeg', caption: '' },
    { type: 'img', src: 'images/slide3.jpeg', caption: '' },
    { type: 'img', src: 'images/slide4.jpeg', caption: '' },
    { type: 'img', src: 'images/slide5.jpeg', caption: '' },
    { type: 'img', src: 'images/slide6.jpeg', caption: '' },
    { type: 'img', src: 'images/slide7.jpeg', caption: '' },
    { type: 'img', src: 'images/38_screened_Apache_red.png', caption: '' },
    { type: 'img', src: 'images/Apache_red_boulders.png', caption: '' }
];

const materialsList = [
    // --- Construction Aggregate ---
    { name: "ABC Non-Spec", category: "Construction Aggregate", price: "$35/ton", density: 1.5, img: "images/abc-nonspec.jpg" },
    { name: "ABC Spec", category: "Construction Aggregate", price: "$40/ton", density: 1.5, img: "images/abc-spec.jpg" },

    // --- Decorative Aggregate ---
    { name: "Apache Red (All Sizes)", category: "Decorative Aggregate", price: "$65/ton", density: 1.5, img: "images/38_screened_Apache_red.png" },
    { name: "Coronado Brown (All Sizes)", category: "Decorative Aggregate", price: "$70/ton", density: 1.5, img: "images/3-8_Coronado_Brown.png" },

    // --- Sand ---
    { name: "Mortar Sand", category: "Sand", price: "$45/ton", density: 1.3, img: "images/mortar-sand.jpg" },
    { name: "Concrete Sand", category: "Sand", price: "$45/ton", density: 1.3, img: "images/concrete-sand.jpg" },

    // --- Soil ---
    { name: "Fill Dirt", category: "Soil", price: "$240/15 tons (delivered)", density: 1.2, img: "images/filldirt.jpeg" },

    // --- Salt River Rock ---
    { name: "1\" - 3\" River Rock", category: "Salt River Rock", price: "$80/ton", density: 1.2, img: "images/riverrock.jpeg" },
    { name: "6\" - 12\" River Rock", category: "Salt River Rock", price: "$85/ton", density: 1.2, img: "images/riverrock6-12.jpg" },
    { name: "12\" - 24\" River Rock", category: "Salt River Rock", price: "$90/ton", density: 1.2, img: "images/riverrock12-24.jpg" },

    // --- Rip Rap ---
    { name: "1\" - 3\" Coronado Brown Rip Rap", category: "Rip Rap", price: "$65/ton", density: 1.5, img: "images/1-3_Apache_red_rip_rap.png" },
    { name: "4\" - 12\" Coronado Brown Rip Rap", category: "Rip Rap", price: "$70/ton", density: 1.2, img: "images/4-12_Corondado_brown_rip_rap.png" },
    { name: "12\" - 24\" Coronado Brown Rip Rap", category: "Rip Rap", price: "$75/ton", density: 1.2, img: "images/12-24_cb_riprap.jpg" }
];

// --- INITIALIZATION ---
window.onload = () => {
    if (document.getElementById('carousel-track')) initCarousel();
    if (document.getElementById('mat-select')) populateCalculator();
};

// --- ROTATING GALLERY LOGIC ---
let currentIndex = Math.floor(Math.random() * projectAssets.length);
function initCarousel() {
    const rotate = () => {
        const track = document.getElementById('carousel-track');
        const caption = document.getElementById('carousel-caption');
        if (!track || !caption) return;

        const item = projectAssets[currentIndex];
        track.style.opacity = 0;
        setTimeout(() => {
            track.innerHTML = item.type === 'img' 
                ? `<img src="${item.src}" class="w-full h-full object-cover">`
                : `<video src="${item.src}" class="w-full h-full object-cover" autoplay muted loop></video>`;
            caption.innerText = item.caption;
            track.style.opacity = 1;
            currentIndex = (currentIndex + 1) % projectAssets.length;
        }, 800);
    };
    rotate();
    setInterval(rotate, 5000);
}

// --- CATEGORY HUB & FILTER LOGIC ---
function filterMaterials(categoryName) {
    const hub = document.getElementById('category-hub');
    const results = document.getElementById('results-view');
    const grid = document.getElementById('materials-grid');
    const title = document.getElementById('category-title');

    if (!hub || !results || !grid) return;

    // Reset grid and set dynamic title
    grid.innerHTML = '';
    if (title) title.innerText = categoryName;

    // Filter items based on the hub tile clicked
    const filtered = materialsList.filter(m => m.category === categoryName);

    filtered.forEach(m => {
        const tile = document.createElement('div');
        tile.className = "material-tile bg-white rounded-xl overflow-hidden shadow-lg border-b-4 border-[#D2B48C]";
        
        tile.innerHTML = `
            <div class="h-48 overflow-hidden cursor-pointer">
                <a href="${m.img}" target="_blank">
                    <img src="${m.img}" alt="${m.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                </a>
            </div>
            <div class="p-4 text-center">
                <h4 class="font-bold text-[#5D4037] uppercase tracking-tight text-sm">${m.name}</h4>
                <p class="text-[#D2B48C] font-black mt-1">${m.price}</p>
                <p class="text-[10px] text-gray-400 mt-2 uppercase">Tap image to zoom</p>
            </div>
        `;
        grid.appendChild(tile);
    });

    // View Switching Logic
    hub.classList.add('hidden');
    results.classList.remove('hidden');
    window.scrollTo(0,0);
}

function showHub() {
    document.getElementById('category-hub').classList.remove('hidden');
    document.getElementById('results-view').classList.add('hidden');
}

// --- CALCULATOR LOGIC ---
function populateCalculator() {
    const select = document.getElementById('mat-select');
    if (!select) return;
    
    select.innerHTML = ''; 
    materialsList.forEach(m => {
        // Exclude specific per-item boulders from volume math
        if (!m.name.includes("Boulders")) {
            const opt = document.createElement('option');
            opt.value = m.density;
            opt.innerText = m.name;
            select.appendChild(opt);
        }
    });
}

function toggleInputs() {
    const isCircle = document.getElementById('shape').value === 'circle';
    document.getElementById('rect-inputs').classList.toggle('hidden', isCircle);
    document.getElementById('circle-inputs').classList.toggle('hidden', !isCircle);
}

function runMath() {
    const shape = document.getElementById('shape').value;
    const depth = parseFloat(document.getElementById('depth').value) || 0;
    const density = parseFloat(document.getElementById('mat-select').value);
    let area = 0;

    if (shape === 'rect') {
        const length = parseFloat(document.getElementById('length').value) || 0;
        const width = parseFloat(document.getElementById('width').value) || 0;
        area = length * width;
    } else {
        const radius = parseFloat(document.getElementById('radius').value) || 0;
        area = Math.PI * Math.pow(radius, 2);
    }

    // Standard Tonnage Formula: (Area * (Depth/12) / 27) * Density
    const tons = (area * (depth / 12) / 27) * density;
    const resultDisplay = document.getElementById('result-text');
    
    if (resultDisplay) {
        resultDisplay.innerText = tons.toFixed(2) + " Tons";
        document.getElementById('calc-result').classList.remove('hidden');
    }
}