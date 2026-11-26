console.log("GAME BERHASIL TERHUBUNG!");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

///const ctx = canvas.getContext("2d");
// Karakter pangeran
const prince = {
    x: 100,
    y: 330,
    width: 32,
    height: 40,
    speed: 4,
    jumpPower: -12,
    velocityY: 0,
    onGround: false
};

// Gravitasi
const gravity = 0.5;

// Tombol yang ditekan
const keys = {};

// Membaca tombol keyboard
document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;

    // Supaya tombol SPACE tidak menggeser halaman
    if (e.code === "Space") {
        e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Membuat pangeran melompat
function jump() {
    if (prince.onGround) {
        prince.velocityY = prince.jumpPower;
        prince.onGround = false;
    }
}

// Menggambar pangeran
function drawPrince() {
    // Kepala
    ctx.fillStyle = "#ffcc99";
    ctx.fillRect(prince.x + 8, prince.y, 18, 16);

    // Rambut
    ctx.fillStyle = "#5b351b";
    ctx.fillRect(prince.x + 7, prince.y, 20, 5);

    // Mahkota
    ctx.fillStyle = "gold";
    ctx.fillRect(prince.x + 10, prince.y - 6, 14, 6);
    ctx.fillRect(prince.x + 10, prince.y - 10, 4, 5);
    ctx.fillRect(prince.x + 16, prince.y - 12, 4, 7);
    ctx.fillRect(prince.x + 22, prince.y - 10, 4, 5);

    // Badan
    ctx.fillStyle = "#2878e8";
    ctx.fillRect(prince.x + 5, prince.y + 16, 24, 18);

    // Jubah
    ctx.fillStyle = "#c62828";
    ctx.fillRect(prince.x, prince.y + 18, 6, 16);

    // Kaki
    ctx.fillStyle = "#4b2c20";
    ctx.fillRect(prince.x + 6, prince.y + 34, 9, 6);
    ctx.fillRect(prince.x + 19, prince.y + 34, 9, 6);

    // Mata
    ctx.fillStyle = "black";
    ctx.fillRect(prince.x + 20, prince.y + 7, 3, 3);
}

// Background
function drawBackground() {
    // Langit
    ctx.fillStyle = "#87ceeb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Matahari
    ctx.fillStyle = "#ffe66d";
    ctx.beginPath();
    ctx.arc(700, 80, 35, 0, Math.PI * 2);
    ctx.fill();

    // Awan
    ctx.fillStyle = "white";
    ctx.fillRect(100, 80, 80, 20);
    ctx.fillRect(120, 60, 40, 40);

    ctx.fillRect(400, 120, 90, 20);
    ctx.fillRect(425, 100, 40, 40);

    // Gunung
    ctx.fillStyle = "#6b9b73";
    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(180, 180);
    ctx.lineTo(350, 350);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 350);
    ctx.lineTo(520, 200);
    ctx.lineTo(750, 350);
    ctx.fill();

    // Tanah
    ctx.fillStyle = "#79502b";
    ctx.fillRect(0, 390, 800, 60);

    // Rumput
    ctx.fillStyle = "#43a047";
    ctx.fillRect(0, 390, 800, 12);
}

// Update gerakan
function update() {
    // Bergerak ke kiri
    if (keys["arrowleft"] || keys["a"]) {
        prince.x -= prince.speed;
    }

    // Bergerak ke kanan
    if (keys["arrowright"] || keys["d"]) {
        prince.x += prince.speed;
    }

    // Melompat
    if (keys[" "] && prince.onGround) {
        jump();
    }

    // Gravitasi
    prince.y += prince.velocityY;
    prince.velocityY += gravity;

    // Menyentuh tanah
    if (prince.y + prince.height >= 390) {
        prince.y = 390 - prince.height;
        prince.velocityY = 0;
        prince.onGround = true;
    }

    // Batas layar
    if (prince.x < 0) {
        prince.x = 0;
    }

    if (prince.x + prince.width > canvas.width) {
        prince.x = canvas.width - prince.width;
    }
}

// Game loop
function gameLoop() {
    drawBackground();
    update();
    drawPrince();

    requestAnimationFrame(gameLoop);
}

// Mulai game
gameLoop();
