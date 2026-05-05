let timer;
let timeLeft;
let isRunning = false;
let isCommandMode = false;
let currentPhase = 1;

let poiTime = 0;
let isPOI = false;

const display = document.getElementById('display');
const pauseBtn = document.getElementById('pauseBtn');
const cmdBtn = document.getElementById('cmdBtn');


function updateDisplay(timeToRender) {
    let minutes = Math.floor(timeToRender / 60);
    let seconds = timeToRender % 60;
    display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (!isPOI && timeToRender <= 10 && timeToRender > 0) {
        display.classList.add('critical');
    } else {
        display.classList.remove('critical');
    }
}


function getPhaseTime(phaseNum) {
    const m = parseInt(document.getElementById(`m${phaseNum}`).value) || 0;
    const s = parseInt(document.getElementById(`s${phaseNum}`).value) || 0;
    return (m * 60) + s;
}


function toggleCommand() {
    isCommandMode = !isCommandMode;
    cmdBtn.innerText = isCommandMode ? "CMD: ON" : "CMD: OFF";
    cmdBtn.classList.toggle('active');
}


function startTimerLogic() {
    clearInterval(timer);
    isRunning = true;
    pauseBtn.innerText = "PAUSE";

    timer = setInterval(() => {
        if (isPOI) {
            poiTime--;
            updateDisplay(poiTime);
            
            if (poiTime <= 0) {
                isPOI = false;
                display.classList.remove('poi-active');
                updateDisplay(timeLeft);
                if (timeLeft <= 0) stopTimerAction();
            }
        } else {
            timeLeft--;
            updateDisplay(timeLeft);

            if (timeLeft <= 0) {
                if (isCommandMode && currentPhase < 3) {
                    currentPhase++;
                    let nextTime = getPhaseTime(currentPhase);
                    if (nextTime > 0) {
                        timeLeft = nextTime;
                        updateDisplay(timeLeft);
                    } else {
                        stopTimerAction();
                    }
                } else {
                    stopTimerAction();
                }
            }
        }
    }, 1000);
}


function startTimer() {
    if (isPOI) {
        isPOI = false;
        display.classList.remove('poi-active');
        updateDisplay(timeLeft);
        return;
    }

    if (isRunning) return;

    if (!timeLeft || timeLeft <= 0) {
        currentPhase = 1;
        timeLeft = getPhaseTime(currentPhase);
    }

    if (timeLeft <= 0) return alert("Isi waktu Fase 1 terlebih dahulu!");
    
    startTimerLogic();
}

function triggerPOI() {
    poiTime = 30; 
    isPOI = true;
    display.classList.add('poi-active');
    updateDisplay(poiTime);

    if (!isRunning) {
        startTimerLogic();
    }
}

function stopTimerAction() {
    clearInterval(timer);
    isRunning = false;
    display.classList.remove('critical');
    setTimeout(() => { 
        alert("WAKTU HABIS!"); 
    }, 100);
}


function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        pauseBtn.innerText = "RESUME";
    } else if (timeLeft > 0 || poiTime > 0) {
        startTimerLogic();
    }
}


function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPOI = false;
    timeLeft = 0;
    poiTime = 0;
    currentPhase = 1;
    display.innerText = "00:00";
    display.classList.remove('critical', 'poi-active');
    pauseBtn.innerText = "PAUSE";
}
