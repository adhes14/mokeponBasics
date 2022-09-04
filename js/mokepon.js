function startGame() {
    let btnPetPlayer = document.getElementById('btn-pet')
    btnPetPlayer.addEventListener('click', selectPlayerPet)
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
}


window.addEventListener('load', startGame)