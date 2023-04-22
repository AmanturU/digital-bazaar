const timer = document.getElementById("timer");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

let remainingTime = 36000;

function updateTimer() {
    const hoursValue = Math.floor(remainingTime / 3600);
    const minutesValue = Math.floor((remainingTime - hoursValue * 3600) / 60);
    const secondsValue = remainingTime % 60;
  
    hours.textContent = hoursValue < 10 ? "0" + hoursValue : hoursValue;
    minutes.textContent = minutesValue < 10 ? "0" + minutesValue : minutesValue;
    seconds.textContent = secondsValue < 10 ? "0" + secondsValue : secondsValue;
  
    remainingTime--;
  
    if (remainingTime < 10) {
      clearInterval(timerInterval);
      timer.textContent = "Time's up!";
    }
  }
  const timerInterval = setInterval(updateTimer, 1000);

  
