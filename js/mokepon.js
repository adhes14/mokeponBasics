const sectionSelectAtack = document.getElementById('select-atack');
const sectionRestart = document.getElementById('restart');
const btnPetPlayer = document.getElementById('btn-pet');
const btnFire = document.getElementById('btn-fire');
const btnWater = document.getElementById('btn-water');
const btnGround = document.getElementById('btn-ground');
const btnRestart = document.getElementById('btn-restart');
const inputHipodoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const inputLangostelvis = document.getElementById('langostelvis');
const inputTucapalma = document.getElementById('tucapalma');
const inputPydos = document.getElementById('pydos');
const spanPlayerPet = document.getElementById('player-pet');
const spanEnemyPet = document.getElementById('enemy-pet');
const spanPetLife = document.getElementById('pet-life');
const spanEnemyLife = document.getElementById('enemy-life');
const resultP = document.getElementById('result');
const playerAtackDiv = document.getElementById('player-atack');
const enemyAtackDiv = document.getElementById('enemy-atack');

let playerAtack = "";
let enemyAtack = "";
let petLife = 3;
let enemyLife = 3;

class Mokepon {
    constructor(name, picture, life) {
        this.name = name;
        this.life = life;
        this.picture = picture;
    }
}

let Hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_capipepo_attack.webp', 5);
let Capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_hipodoge_attack.webp', 5);
let Ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5);
let Langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_capipepo_attack.webp', 5);
let Tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_hipodoge_attack.webp', 5);
let Pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_ratigueya_attack.webp', 5);

function startGame() {
    sectionSelectAtack.style.display = 'none';
    sectionRestart.style.display = 'none';

    btnPetPlayer.addEventListener('click', selectPlayerPet);

    btnFire.addEventListener('click', fireAtack);
    btnWater.addEventListener('click', waterAtack);
    btnGround.addEventListener('click', groundAtack);

    btnRestart.addEventListener('click', restartGame);
}

function selectPlayerPet() {
    let pet = "";

    if (inputHipodoge.checked) {
        pet = "Hipodoge";
    } else if (inputCapipepo.checked) {
        pet = "Capipepo";
    } else if (inputRatigueya.checked) {
        pet = "Ratigueya";
    } else if (inputLangostelvis.checked) {
        pet = "Langostelvis";
    } else if (inputTucapalma.checked) {
        pet = "Tucapalma";
    } else if (inputPydos.checked) {
        pet = "Pydos";
    } else {
        alert('you must select a pet');
        return;
    }

    spanPlayerPet.innerHTML = pet;

    selectEnemyPet();
}

function selectEnemyPet() {
    let randomPetNumber = random(1, 6);

    switch (randomPetNumber) {
        case 1:
            spanEnemyPet.innerHTML = "Hipodoge";
            break;
        case 2:
            spanEnemyPet.innerHTML = "Capipepo";
            break;
        case 3:
            spanEnemyPet.innerHTML = "Ratigueya";
            break;
        case 4:
            spanEnemyPet.innerHTML = "Langostelvis";
            break;
        case 5:
            spanEnemyPet.innerHTML = "Tucapalma";
            break;
        case 6:
            spanEnemyPet.innerHTML = "Pydos";
            break;
        default:
            alert("There was an error selecting enemy's pet");
            break;
    }

    let sectionSelectAtack = document.getElementById('select-atack');
    sectionSelectAtack.style.display = 'flex';

    let sectionSelectPet = document.getElementById('select-pet');
    sectionSelectPet.style.display = 'none';
}

function fireAtack() {
    playerAtack = "FIRE";
    setEnemyAtack();
}

function waterAtack() {
    playerAtack = "WATER";
    setEnemyAtack();
}

function groundAtack() {
    playerAtack = "GROUND";
    setEnemyAtack();
}

function setEnemyAtack() {
    let randonEnemyAtack = random(1, 3);

    switch (randonEnemyAtack) {
        case 1:
            enemyAtack = "FIRE"
            break;
        case 2:
            enemyAtack = "WATER"
            break;
        case 3:
            enemyAtack = "GROUND"
            break;
    
        default:
            alert("There was an error setting enemy's atack")
            break;
    }

    combat();
}

function combat() {

    if (playerAtack == enemyAtack) {
        createMessage("IT'S A TIE 😕");
    } else if (playerAtack == "FIRE" && enemyAtack == "GROUND") {
        createMessage("YOU WON 🎉");
        enemyLife--;
    } else if (playerAtack == "WATER" && enemyAtack == "FIRE") {
        createMessage("YOU WON 🎉");
        enemyLife--;
    } else if (playerAtack == "GROUND" && enemyAtack == "WATER") {
        createMessage("YOU WON 🎉");
        enemyLife--;
    } else {
        createMessage("YOU LOSE 😢");
        petLife--;
    }

    spanPetLife.innerHTML = petLife;
    spanEnemyLife.innerHTML = enemyLife;

    checkLifes();
}

function checkLifes() {
    if (enemyLife == 0) {
        createFinalMessage("YOU WON! CONGRATULATIONS 🎉🎉🎉");
    } else if (petLife == 0) {
        createFinalMessage("YOU LOSE! 😢😢😢");
    }
}

function createMessage(result) {
    let playerAtackP = document.createElement('P');
    let enemyAtackP = document.createElement('P');

    resultP.innerHTML = result;
    playerAtackP.innerHTML = playerAtack;
    enemyAtackP.innerHTML = enemyAtack;

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