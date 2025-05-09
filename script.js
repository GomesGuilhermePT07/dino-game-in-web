const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let obstacleLeft = 600; // posição inicial
let obstacleSpeed = 4;

// Lógica de salto com requestAnimationFrame
document.addEventListener("keydown", function(e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (!isJumping) jump();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 0;
    let direction = 1;

    function animateJump() {
        jumpHeight += 5 * direction;
        player.style.bottom = jumpHeight + "px";

        if (jumpHeight >= 100) direction = -1;

        if (jumpHeight <= 0) {
            player.style.bottom = "0px";
            isJumping = false;
            return;
        }

        requestAnimationFrame(animateJump);
    }

    requestAnimationFrame(animateJump);
}

// Loop principal do jogo
function gameLoop() {
    // Mover obstáculo
    obstacleLeft -= obstacleSpeed;
    if (obstacleLeft < -40) {
        obstacleLeft = 600;
        score++;
        scoreDisplay.textContent = score;
    }
    obstacle.style.left = obstacleLeft + "px";

    checkCollision();

    requestAnimationFrame(gameLoop);
}

// Deteção de colisão
function checkCollision() {
    const hitbox = document.getElementById("hitbox");
    const playerRect = hitbox.getBoundingClientRect(); // agora usa a hitbox
    const obstacleRect = obstacle.getBoundingClientRect();

    console.log("Hitbox:", playerRect);
    console.log("Obstacle:", obstacleRect);

    if (
        obstacleRect.left < playerRect.right &&
        obstacleRect.right > playerRect.left &&
        obstacleRect.bottom > playerRect.top &&
        obstacleRect.top < playerRect.bottom
    ) {
        alert("Game Over! Pontuação: " + score);
        score = 0;
        scoreDisplay.textContent = "0";
        obstacleLeft = 600;
    }
}

// Iniciar jogo
gameLoop();