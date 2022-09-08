const sectionSelectAtack = document.getElementById('select-atack');
const sectionRestart = document.getElementById('restart');
const btnPetPlayer = document.getElementById('btn-pet');
const btnRestart = document.getElementById('btn-restart');
const spanPlayerPet = document.getElementById('player-pet');
const spanEnemyPet = document.getElementById('enemy-pet');
const spanPetLife = document.getElementById('pet-life');
const spanEnemyLife = document.getElementById('enemy-life');
const resultP = document.getElementById('result');
const playerAtackDiv = document.getElementById('player-atack');
const enemyAtackDiv = document.getElementById('enemy-atack');
const cardsContainer = document.getElementById('cards-container');
const sectionSelectPet = document.getElementById('select-pet');
const atackButtons = document.getElementById('atack-buttons');
const atackButtonsContainer = document.getElementById('atack-buttons-container');
const mapSection = document.getElementById('map-section');
const map = document.getElementById('map');

let pet;
let enemy;
let playerAtack = [];
let enemyAtack = [];
let mokeponOptions;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let btnFire;
let btnWater;
let btnGround;
let mokepones = [];
let buttons = [];
let playerAtackIndex;
let enemyAtackIndex;
let playerVictories = 0;
let enemyVictories = 0;
let canvas = map.getContext("2d");
let interval;
let mapBackground = new Image();
mapBackground.src = './assets/mokemap.webp';

const maxMapwidth = 350;
let mapWidth = window.innerWidth - 20;
if (mapWidth > maxMapwidth) {
    mapWidth = maxMapwidth;
}
let mapHeight = mapWidth * 600 / 800;
map.width = mapWidth;
map.height = mapHeight;

class Mokepon {
    constructor(name, picture, life, mapPicture) {
        this.name = name;
        this.life = life;
        this.picture = picture;
        this.atacks = [];
        this.width = 40;
        this.height = 40;
        this.x = random(0, map.width - this.width);
        this.y = random(0, map.height - this.height);
        this.mapPicture = new Image();
        this.mapPicture.src = mapPicture;
        this.speedX = 0;
        this.speedY = 0;
    }

    drawMokepon() {
        canvas.drawImage(
            this.mapPicture,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 4, './assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3, './assets/ratigueya.png');

let hipodogeEnemy = new Mokepon('Hipodoge', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/hipodoge.png');
let capipepoEnemy = new Mokepon('Capipepo', './assets/mokepons_mokepon_hipodoge_attack.webp', 4, './assets/capipepo.png');
let ratigueyaEnemy = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3, './assets/ratigueya.png');

mokepones.push(hipodoge, capipepo, ratigueya);

hipodoge.atacks.push(
    { name: '💧', id: 'btn-water'},
    { name: '💧', id: 'btn-water'},
    { name: '💧', id: 'btn-water'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🌱', id: 'btn-ground'},
);
hipodogeEnemy.atacks = hipodoge.atacks;

capipepo.atacks.push(
    { name: '💧', id: 'btn-water'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🌱', id: 'btn-ground'},
);
capipepoEnemy.atacks = capipepo.atacks;

ratigueya.atacks.push(
    { name: '💧', id: 'btn-water'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🌱', id: 'btn-ground'},
    { name: '🌱', id: 'btn-ground'},
    { name: '🌱', id: 'btn-ground'},
);
ratigueyaEnemy.atacks = ratigueya.atacks;



function startGame() {
    sectionSelectAtack.style.display = 'none';
    sectionRestart.style.display = 'none';
    mapSection.style.display = 'none';

    mokepones.forEach((mokepon) => {
        mokeponOptions = `
            <input type="radio" name="pet" id=${mokepon.name}>
            <label class="mokepon-card" for=${mokepon.name}>
                <p>${mokepon.name}</p>
                <img src=${mokepon.picture} alt=${mokepon.name}>
            </label>
        `
        cardsContainer.innerHTML += mokeponOptions;
    })

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');

    btnPetPlayer.addEventListener('click', selectPlayerPet);

    btnRestart.addEventListener('click', restartGame);
}

function selectPlayerPet() {

    if (inputHipodoge.checked) {
        pet = hipodoge;
    } else if (inputCapipepo.checked) {
        pet = capipepo;
    } else if (inputRatigueya.checked) {
        pet = ratigueya;
    } else {
        alert('you must select a pet');
        return;
    }

    spanPlayerPet.innerHTML = pet.name;

    showAtacks(pet.atacks);

    sectionSelectPet.style.display = 'none';
    mapSection.style.display = 'flex';
    startMap();
}

function showAtacks(atacks) {
    let atackButton;
    atacks.forEach( (atack) => {
        atackButton = `
            <button class="atack-button" id=${atack.id}>${atack.name}</button>
        `
        atackButtonsContainer.innerHTML += atackButton;
    });

    btnFire = document.getElementById('btn-fire');
    btnWater = document.getElementById('btn-water');
    btnGround = document.getElementById('btn-ground');

    buttons = document.querySelectorAll('.atack-button');
}

function atackSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            playerAtack.push(e.target.textContent);
            button.style.background = '#112f58';
            button.disabled = true;
            setEnemyAtack();
        })
    });
    
}

function selectEnemyPet(enemyOption) {
    enemy = enemyOption;
    spanEnemyPet.innerHTML = enemy.name;
    atackSequence();
}

function drawCanvas() {
    pet.x += pet.speedX;
    pet.y += pet.speedY;
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )
    pet.drawMokepon();
    hipodogeEnemy.drawMokepon();
    capipepoEnemy.drawMokepon();
    ratigueyaEnemy.drawMokepon();
    if (pet.speedX !== 0 || pet.speedY !== 0) {
        checkCrash(hipodogeEnemy);
        checkCrash(capipepoEnemy);
        checkCrash(ratigueyaEnemy);
    }
}

function moveUp() {
    pet.speedY = -5
}

function moveDown() {
    pet.speedY = 5
}

function moveLeft() {
    pet.speedX = -5;
}

function moveRight() {
    pet.speedX = 5;
}

function stop() {
    pet.speedX = 0;
    pet.speedY = 0;
}

function setEnemyAtack() {
    let randonEnemyAtack = random(0, enemy.atacks.length - 1);
    enemyAtack.push(enemy.atacks[randonEnemyAtack].name);
    startFight();
}

function startFight() {
    if (playerAtack.length === 5) {
        combat();
    }
}

function combat() {

    for (let index = 0; index < playerAtack.length; index++) {
        if (playerAtack[index] === enemyAtack[index]) {
        } else if (playerAtack[index] == '🔥' && enemyAtack[index] == '🌱') {
            playerVictories++
        } else if (playerAtack[index] == '🌱' && enemyAtack[index] == '💧') {
            playerVictories++
        } else if (playerAtack[index] == '💧' && enemyAtack[index] == '🔥') {
            playerVictories++
        } else {
            enemyVictories++
        }
        createMessage(index);
    }

    spanPetLife.innerHTML = playerVictories;
    spanEnemyLife.innerHTML = enemyVictories;

    checkLifes();
}

function checkLifes() {
    if (playerVictories > enemyVictories) {
        createFinalMessage("YOU WON! CONGRATULATIONS 🎉🎉🎉");
    } else if (enemyVictories > playerVictories) {
        createFinalMessage("YOU LOSE! 😢😢😢");
    } else {
        createFinalMessage("IT'S IS A TIE!");
    }
}

function createMessage(index) {
    let playerAtackP = document.createElement('P');
    let enemyAtackP = document.createElement('P');

    playerAtackP.innerHTML = playerAtack[index];
    enemyAtackP.innerHTML = enemyAtack[index];

    playerAtackDiv.appendChild(playerAtackP);
    enemyAtackDiv.appendChild(enemyAtackP);

    // let paragraph = document.createElement('P');
    // paragraph.innerHTML = `Your pet atacked with ${playerAtack}, your enemy's pet atacked with ${enemyAtack} - ${result}`;
    // messageSection.appendChild(paragraph);
}

function createFinalMessage(finalResult) {
    let resultP = document.getElementById('result');
    resultP.innerHTML = finalResult;
    disableAtackButtons();
}

function restartGame() {
    location.reload();
}

function disableAtackButtons() {
    btnFire.disabled = true
    btnWater.disabled = true
    btnGround.disabled = true
    
    sectionRestart.style.display = 'block';
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}

function keyPresed(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            break;
    }
}

function startMap() {
    interval = setInterval(drawCanvas, 50);
    window.addEventListener('keydown', keyPresed);
    window.addEventListener('keyup', stop);
}

function checkCrash(enemyOption) {
    const upEnemy = enemyOption.y;
    const downEnemy = enemyOption.y + enemyOption.height;
    const rightEnemy = enemyOption.x + enemyOption.width;
    const leftEnemy = enemyOption.x;
    const upPet = pet.y;
    const downPet = pet.y + pet.height;
    const rightPet = pet.x + pet.width;
    const leftPet = pet.x;
    
    if (
        downPet < upEnemy ||
        upPet > downEnemy ||
        rightPet < leftEnemy ||
        leftPet > rightEnemy
    ) {
        return;
    }

    stop();
    clearInterval(interval); //without this code next function calls many times
    selectEnemyPet(enemyOption);
    // alert('There is a collision')
    sectionSelectAtack.style.display = 'flex';
    mapSection.style.display = 'none';
}

window.addEventListener('load', startGame)