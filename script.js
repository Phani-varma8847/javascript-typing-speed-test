const sentences = [
  "JavaScript is a versatile language.",
  "Typing fast requires practice.",
  "Frontend development is fun.",
  "GitHub is great for sharing code.",
  "Coding challenges improve skills."
];

let startTime, timerInterval;
let currentSentence = "";

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const accuracyEl = document.getElementById("accuracy");
const wpmEl = document.getElementById("wpm");
const restartBtn = document.getElementById("restart");

function setSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.innerText = currentSentence;
  inputEl.value = "";
  timeEl.innerText = "0";
  accuracyEl.innerText = "0";
  wpmEl.innerText = "0";
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    timeEl.innerText = elapsed;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

inputEl.addEventListener("input", () => {
  const typed = inputEl.value;
  const totalTime = Math.floor((new Date() - startTime) / 1000);
  const correctChars = typed.split("").filter((char, i) => char === currentSentence[i]).length;
  const accuracy = Math.floor((correctChars / currentSentence.length) * 100);
  const wpm = Math.floor((typed.length / 5) / (totalTime / 60 || 1));

  accuracyEl.innerText = isNaN(accuracy) ? 0 : accuracy;
  wpmEl.innerText = isNaN(wpm) ? 0 : wpm;

  if (typed === currentSentence) {
    stopTimer();
  }
});

restartBtn.addEventListener("click", () => {
  stopTimer();
  setSentence();
  startTimer();
});

window.onload = () => {
  setSentence();
  startTimer();
};
