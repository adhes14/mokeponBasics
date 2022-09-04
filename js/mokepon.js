let playerAtack = "";
let enemyAtack = "";

function startGame() {
    let btnPetPlayer = document.getElementById('btn-pet');
    btnPetPlayer.addEventListener('click', selectPlayerPet);

    let btnFire = document.getElementById('btn-fire');
    btnFire.addEventListener('click', fireAtack);
    let btnWater = document.getElementById('btn-water');
    btnWater.addEventListener('click', waterAtack);
    let btnGround = document.getElementById('btn-ground');
    btnGround.addEventListener('click', groundAtack);
}

function selectPlayerPet() {
    let pet = "";
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let inputLangostelvis = document.getElementById('langostelvis');
    let inputTucapalma = document.getElementById('tucapalma');
    let inputPydos = document.getElementById('pydos');
    let spanPlayerPet = document.getElementById('player-pet');

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
    let spanEnemyPet = document.getElementById('enemy-pet');

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
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}


window.addEventListener('load', startGame)