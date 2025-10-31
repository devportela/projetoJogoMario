const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startBtn = document.querySelector('#start-btn');
const gameOverMsg = document.querySelector('#game-over');
const themeSong = document.querySelector('#theme-song');
const gameOverSound = document.querySelector('#gameover-sound');
const restartBtn = document.querySelector('#restart-btn'); // botão "Jogar Novamente"
const scoreDisplay = document.querySelector('#score'); // 🟢 novo placar
const finalScoreDisplay = document.querySelector('#final-score'); // 🟢 mostra pontuação final

let gameStarted = false;
let loop; // loop do jogo, vai ser reiniciado quando necessário
let score = 0; // 🟢 contador de pontos

//crio uma função pra definir o pulo do mario
//a funcao sera chamada mais pra frente no código
const jump = () => {
    if (!gameStarted) return; // evita pular antes de iniciar
    mario.classList.add('jump');
    //add a classe ao metodo jump do mario
    //é usado para aplicar estilos,como animações que fazem o mario "jumpar"
    setTimeout(() => {
        mario.classList.remove('jump');
        //temporizador de 500 milisegundos ou 0,5 segundos
        //esse código é uma função de seta que remove a animação de "jumpar" do elemento mario
    }, 500)
};

//ao clicar em alguma tecla,chamo a função de "jumpar" do mario
document.addEventListener('keydown', jump)

function startLoop() { //starta o loop
    loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft
        const marioPosition = +getComputedStyle(mario).bottom.replace('px', "")

        // Verifica colisão
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 110) {
            pipe.style.animation = 'none'
            pipe.style.left = `${pipePosition}px`

            mario.style.animation = 'none'
            mario.style.bottom = `${marioPosition}px`

            mario.src = './img/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            clearInterval(loop)
            showGameOver();
        }

        if (pipePosition < 0 && gameStarted) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            pipe.style.right = '0'; // reseta o cano
        }

    }, 10)
}

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    themeSong.currentTime = 0;
    themeSong.play();
    gameStarted = true;

    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    const clouds = document.querySelector('.clouds');
    clouds.style.animation = 'clouds-animation 10s infinite linear';

    score = 0; // 🟢 Reseta o score
    scoreDisplay.textContent = `Score: ${score}`;

    startLoop();
});

function showGameOver() {
    themeSong.pause();
    gameOverSound.play();
    gameOverMsg.classList.remove('hidden');

    finalScoreDisplay.textContent = `Sua pontuação: ${score}`;
    const clouds = document.querySelector('.clouds');
    const cloudRight = parseFloat(getComputedStyle(clouds).right);
    clouds.style.animation = 'none';
    clouds.style.right = `${cloudRight}px`;
}

restartBtn.addEventListener('click', () => {
    location.reload();
});
