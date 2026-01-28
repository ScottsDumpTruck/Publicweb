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
    { name: "3/8\" Screened Apache Red", price: "$65/ton", density: 1.5, img: "images/38_screened_Apache_red.png" },
    { name: "1/2\" Screened Apache Red", price: "$65/ton", density: 1.5, img: "images/1-2_screened_apache_red.png" },
    { name: "1\" Screened Apache Red", price: "$65/ton", density: 1.2, img: "images/1_screened_apache_red.png" },
    { name: "1-3\" Apache red 'rip rap'", price: "$65/ton", density: 1.5, img: "images/1-3_Apache_red_rip_rap.png" },
    { name: "Apache Red Boulders", price: "$50 - $500 each (Price Depends on Size of Boulder)", density: 1.2, img: "images/Apache_red_boulders.png" },
    { name: "3/8\" Coronado Brown", price: "$70/ton", density: 1.5, img: "images/3-8_Coronado_Brown.png" },
    { name: "1/2\" Coronado Brown", price: "$70/ton", density: 1.2, img: "images/1-2_Corondado_brown.png" },
    { name: "4-12\" Coronado Brown 'Rip Rap'", price: "$70/ton", density: 1.2, img: "images/4-12_Corondado_brown_rip_rap.png" },
    { name: "Coronado Brown Boulders", price: "$25 - $500 each (Price Depends on Size of Boulder)", density: 1.5, img: "images/Corondado_brown_boulders.png" },
    { name: "3/8\" Desert Brown", price: "$65/ton", density: 1.5, img: "images/3-8_Desert_Brown.png" },
    { name: "1/2\" Desert Brown", price: "$75/ton", density: 1.2, img: "images/1-2_Desert_Brown.png" },
    { name: "3/4\" Desert Brown Gravel", price: "$75/ton", density: 1.2, img: "images/Desert_Brown_gravel.png" },
    { name: "1/4\" Minus Desert Brown", price: "$35/ton", density: 1.5, img: "images/Minus_desert_brown.png" },
    { name: "Coronado Brown Boulders", price: "$50 - $500 each (Price Depends on Size of Boulder)", density: 1.5, img: "images/Corondado_brown_boulders.png" },
    { name: "1/2\" White Rock", price: "$80/ton", density: 1.5, img: "images/Whiterock.jpeg" },
    { name: "3/4\" White Rock", price: "$80/ton", density: 1.5, img: "images/Whiterock.jpeg" },
    { name: "4\"- 12\" Rip Rap", price: "$70/ton", density: 1.2, img: "images/riprap.jpeg" },
    { name: "1\"- 3\" River Rock", price: "$80/ton", density: 1.2, img: "images/riverrock.jpeg" },
    { name: "Fill Dirt", price: "$240/15 tons (delivered)", density: 1.2, img: "images/filldirt.jpeg" },
    // Add up to 40 items here...
];

// --- INITIALIZATION ---
window.onload = () => {
    if (document.getElementById('carousel-track')) initCarousel();
    if (document.getElementById('materials-grid')) renderMaterials();
};

// --- ROTATING GALLERY LOGIC ---
let currentIndex = Math.floor(Math.random() * projectAssets.length);
function initCarousel() {
    const rotate = () => {
        const track = document.getElementById('carousel-track');
        const caption = document.getElementById('carousel-caption');
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

// --- VISUAL TILES LOGIC ---
function renderMaterials() {
    const grid = document.getElementById('materials-grid');
    if (!grid) return;

    materialsList.forEach(m => {
        const tile = document.createElement('div');
        tile.className = "material-tile bg-white rounded-xl overflow-hidden shadow-lg border-b-4 border-[#D2B48C]";
        
        tile.innerHTML = `
            <div class="h-48 overflow-hidden cursor-pointer">
                <a href="${m.img}" target="_blank">
                    <img src="${m.img}" alt="${m.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                </a>
            </div>
            <div class="p-4 text-center">
                <h4 class="font-bold text-[#5D4037] uppercase tracking-tight">${m.name}</h4>
                <p class="text-[#D2B48C] font-black mt-1">${m.price}</p>
                <p class="text-[10px] text-gray-400 mt-2 uppercase">Click image to enlarge</p>
            </div>
        `;
        grid.appendChild(tile);
    });
}

// --- CALCULATOR LOGIC ---
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
        area = (parseFloat(document.getElementById('length').value) || 0) * (parseFloat(document.getElementById('width').value) || 0);
    } else {
        area = Math.PI * Math.pow((parseFloat(document.getElementById('radius').value) || 0), 2);
    }

    const tons = (area * (depth / 12) / 27) * density;
    document.getElementById('result-text').innerText = tons.toFixed(2) + " Tons";
    document.getElementById('calc-result').classList.remove('hidden');
}