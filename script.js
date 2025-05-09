const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;

// Lógica de salto
document.addEventListener("keydown", function(e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (!isJumping) jump();
    }
});