//crio uma variavel chamada mario  que vai guardar a img do mario
const mario = document.querySelector('.mario')
//guardando a imagem do pipe em uma variavel
const pipe = document.querySelector('.pipe')



//crio uma função pra definie o pulo do mario
//a funcao sera chamada mais pra frente no codigo
const jump = () => {
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
const loop = setInterval(() => {

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
   }

},10)
