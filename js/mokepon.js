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
        pet = "no one";
    }

    alert("Pet selected: " + pet);
}


window.addEventListener('load', startGame)