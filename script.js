let timer;
let timeLeft;
const display = document.getElementById('display');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    display.innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 10 && timeLeft > 0) {
        display.classList.add('critical');
    } else {
        display.classList.remove('critical');
    }
}

function startTimer() {
    clearInterval(timer);
    
    if (!timeLeft || timeLeft <= 0) {
        const m = parseInt(minutesInput.value) || 0;
        const s = parseInt(secondsInput.value) || 0;
        timeLeft = (m * 60) + s;
        if (timeLeft <= 0) return alert("Masukkan waktu terlebih dahulu!");
    }

    updateDisplay();

    timer = setInterval(() => {
        timeLeft--;
        
        updateDisplay(); 

        if (timeLeft <= 0) {
            clearInterval(timer);
            display.classList.remove('critical');
            
            setTimeout(() => {
                alert("WAKTU HABIS!");
            }, 100);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 0;
    display.innerText = "00:00";
    display.classList.remove('critical');
    minutesInput.value = "";
    secondsInput.value = "";
}