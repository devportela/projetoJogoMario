//crio uma variavel chamada mario  que vai guardar a img do mario
const mario = document.querySelector('.mario')
//guardando a imagem do pipe em uma variavel
const pipe = document.querySelector('.pipe')
const startBtn = document.querySelector('#start-btn');
const gameOverMsg = document.querySelector('#game-over');
const themeSong = document.querySelector('#theme-song');
const gameOverSound = document.querySelector('#gameover-sound');
const restartBtn = document.querySelector('#restart-btn'); // botão "Jogar Novamente"

let gameStarted = false;
let loop; // loop do jogo, vai ser reiniciado quando necessário


//crio uma função pra definie o pulo do mario
//a funcao sera chamada mais pra frente no codigo
const jump = () => {
    if (!gameStarted) return; // evita pular antes de iniciar
    mario.classList.add('jump');
    //add a classe ao metodo jump do mario
    //é usado para aplicar estilos,como animações que fazem o mario "jumpar"
    setTimeout(() =>{
    mario.classList.remove('jump');
    //temporizador de 500 milisegundos ou 0,5 segundos
    //esse codigo é uma funcao de seta que remove a animação de "jumpar" do elemento mario

},500)
};
//ao clicar em alguma tecla,chamo a função de "jumpar" do mario
document.addEventListener('keydown',jump)


// Função para iniciar o loop do jogo
function startLoop() {
    loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft
        const marioPosition = +getComputedStyle(mario).bottom.replace('px',"")

        if(pipePosition <= 120 && pipePosition > 0  && marioPosition < 110){
            pipe.style.animation = 'none'
            pipe.style.left =  `${pipePosition}px`

            mario.style.animation = 'none'
            mario.style.bottom = `${marioPosition}px`

            mario.src = './img/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            clearInterval(loop)
            showGameOver();
        }

    },10)
}


// Função para iniciar o jogo
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  themeSong.currentTime = 0;
  themeSong.play();
  gameStarted = true;

  // adiciona animações apenas quando o jogo começar
  pipe.style.animation = 'pipe-animation 1.5s infinite linear';
  const clouds = document.querySelector('.clouds');
  clouds.style.animation = 'clouds-animation 10s infinite linear';

  startLoop(); // inicia o loop do jogo
});

// Mostrar mensagem de Game Over e tocar som
function showGameOver() {
  themeSong.pause();
  gameOverSound.play();
  gameOverMsg.classList.remove('hidden');

  // congela a nuvem exatamente onde está
  const clouds = document.querySelector('.clouds');
  const cloudRight = parseFloat(getComputedStyle(clouds).right);
  clouds.style.animation = 'none';
  clouds.style.right = `${cloudRight}px`;
}


// botão "Jogar Novamente" funcional
restartBtn.addEventListener('click', () => {
  // esconde a mensagem de game over
  gameOverMsg.classList.add('hidden');

  // reseta o mario
  mario.src = './img/mario.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '0px';
  mario.style.bottom = '0';

  // reseta o cano
  pipe.style.animation = 'pipe-animation 1.5s infinite linear';
  pipe.style.left = '';

  // reseta as nuvens
  const clouds = document.querySelector('.clouds');
  clouds.style.animation = 'clouds-animation 10s infinite linear';

  // reseta sons
  gameOverSound.pause();
  gameOverSound.currentTime = 0;

  // garante que Mario pode pular imediatamente
  gameStarted = true;

  // limpa o loop antigo e inicia novamente
  loop && clearInterval(loop);
  startLoop();
});
