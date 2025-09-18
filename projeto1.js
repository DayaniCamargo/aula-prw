//atual animacao
let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change',function(e){
    playerState=e.target.value;
});

//Canvas para animações
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width=600);
const CANVAS_HEIGHT = (canvas.height=600);

//imagem
const playerImage = new Image();
playerImage.src='imagem/shadow_dog.png';
const spriteWidth=575;
const spriteHeight=523;
let gameFrame = 0;
const staggerFrames = 5;


const spriteAnimations = [];

//{name:'caindo',frames:7}

const animationStates = [{name:'idle',frames:7},{name:'pulando',frames:7},{name:'caindo',frames:7},{name:'correndo',frames:9},{name:'atordoado',frames:11},{name:'sentado',frames:5},{name:'girando',frames:7},{name:'latindo',frames:7},{name:'morreu',frames:12},{name:'dano',frames:4}];

animationStates.forEach((state,index)=>{
    let frames = {
        loc:[],
    };
    for(let j = 0; j< state.frames;j++){
        let positionX = j*spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x:positionX,y:positionY});
    }
    spriteAnimations[state.name]=frames;

});

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(
        playerImage,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
    );

    gameFrame++;
    requestAnimationFrame(animate)
}
animate();
