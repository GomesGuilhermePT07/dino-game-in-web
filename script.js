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

function jump() {
    isJumping = true;
    let jumpHeight = 0;
    let upInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                jumpHeight -= 5;
                player.style.bottom = jumpHeight + "px";
            }, 20);
        }
        jumpHeight += 5;
        player.style.bottom = jumpHeight + "px";
    }, 20);
}

// Deteção de colisão
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        obstacleRect.left < playerRect.right &&
        obstacleRect.right > playerRect.left &&
        obstacleRect.bottom > playerRect.top
    ) {
        alert("Game Over! Pontuação: " + score);
        score = 0;
        scoreDisplay.textContent = "0";
    }
}

setInterval(() => {
    score++;
    scoreDisplay.textContent = score;
    checkCollision();
}, 100);