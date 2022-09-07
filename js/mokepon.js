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
let enemyAtacks;
let playerAtackIndex;
let enemyAtackIndex;
let playerVictories = 0;
let enemyVictories = 0;

class Mokepon {
    constructor(name, picture, life) {
        this.name = name;
        this.life = life;
        this.picture = picture;
        this.atacks = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_capipepo_attack.webp', 5);
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_hipodoge_attack.webp', 4);
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3);

mokepones.push(hipodoge, capipepo, ratigueya);

hipodoge.atacks.push(
    { name: '💧', id: 'btn-water'},
    { name: '💧', id: 'btn-water'},
    { name: '💧', id: 'btn-water'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🌱', id: 'btn-ground'},
);

capipepo.atacks.push(
    { name: '💧', id: 'btn-water'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🌱', id: 'btn-ground'},
);

ratigueya.atacks.push(
    { name: '💧', id: 'btn-water'},
    { name: '🔥', id: 'btn-fire'},
    { name: '🌱', id: 'btn-ground'},
    { name: '🌱', id: 'btn-ground'},
    { name: '🌱', id: 'btn-ground'},
);



function startGame() {
    sectionSelectAtack.style.display = 'none';
    sectionRestart.style.display = 'none';

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
    let pet;

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
    selectEnemyPet();
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

function selectEnemyPet() {
    let randomPetNumber = random(0, mokepones.length - 1);

    spanEnemyPet.innerHTML = mokepones[randomPetNumber].name;
    enemyAtacks = mokepones[randomPetNumber].atacks;
    atackSequence();

    sectionSelectAtack.style.display = 'flex';
    sectionSelectPet.style.display = 'none';
}

function setEnemyAtack() {
    let randonEnemyAtack = random(0, enemyAtacks.length - 1);
    enemyAtack.push(enemyAtacks[randonEnemyAtack].name);

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


window.addEventListener('load', startGame)