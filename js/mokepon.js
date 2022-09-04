let playerAtack = "";
let enemyAtack = "";
let petLife = 3;
let enemyLife = 3;

function startGame() {
    let sectionSelectAtack = document.getElementById('select-atack');
    sectionSelectAtack.style.display = 'none';
    let sectionRestart = document.getElementById('restart');
    sectionRestart.style.display = 'none';

    let btnPetPlayer = document.getElementById('btn-pet');
    btnPetPlayer.addEventListener('click', selectPlayerPet);

    let btnFire = document.getElementById('btn-fire');
    btnFire.addEventListener('click', fireAtack);
    let btnWater = document.getElementById('btn-water');
    btnWater.addEventListener('click', waterAtack);
    let btnGround = document.getElementById('btn-ground');
    btnGround.addEventListener('click', groundAtack);

    let btnRestart = document.getElementById('btn-restart');
    btnRestart.addEventListener('click', restartGame);
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

    let sectionSelectAtack = document.getElementById('select-atack');
    sectionSelectAtack.style.display = 'block';

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
    let spanPetLife = document.getElementById('pet-life');
    let spanEnemyLife = document.getElementById('enemy-life');

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
    let messageSection = document.getElementById('messages');
    let paragraph = document.createElement('P');
    paragraph.innerHTML = `Your pet atacked with ${playerAtack}, your enemy's pet atacked with ${enemyAtack} - ${result}`;
    messageSection.appendChild(paragraph);
}

function createFinalMessage(finalResult) {
    let messageSection = document.getElementById('messages');
    let paragraph = document.createElement('P');
    paragraph.innerHTML = finalResult;
    messageSection.appendChild(paragraph);
    disableAtackButtons();
}

function restartGame() {
    location.reload();
}

function disableAtackButtons() {
    let btnFire = document.getElementById('btn-fire');
    btnFire.disabled = true
    let btnWater = document.getElementById('btn-water');
    btnWater.disabled = true
    let btnGround = document.getElementById('btn-ground');
    btnGround.disabled = true

    let sectionRestart = document.getElementById('restart');
    sectionRestart.style.display = 'block';
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}


window.addEventListener('load', startGame)