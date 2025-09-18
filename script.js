const stopwatchEl = document.getElementById("stopwatch");
const lapsList = document.getElementById("lapsList");
let timer = null;
let elapsedTime = 0; 

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);

  return (
    (hrs < 10 ? "0" + hrs : hrs) + ":" +
    (mins < 10 ? "0" + mins : mins) + ":" +
    (secs < 10 ? "0" + secs : secs)
  );
}

function start() {
  if (timer) return;
  let startTime = Date.now() - elapsedTime;
  timer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    stopwatchEl.textContent = timeToString(elapsedTime);
  }, 200);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  elapsedTime = 0;
  stopwatchEl.textContent = "00:00:00";
  lapsList.innerHTML = "";
  localStorage.removeItem('laps');
}

function lap() {
  if (!timer) return; 
  let lapTime = timeToString(elapsedTime);
  let li = document.createElement("li");
  li.textContent = lapTime;
  lapsList.appendChild(li);

  
  const existingLaps = JSON.parse(localStorage.getItem('laps')) || [];
  existingLaps.push(lapTime);
  localStorage.setItem('laps', JSON.stringify(existingLaps));
}

function loadLapHistory() {
  const storedLaps = JSON.parse(localStorage.getItem('laps')) || [];
  storedLaps.forEach(lapTime => {
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsList.appendChild(li);
  });
}

loadLapHistory();

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", pause);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);