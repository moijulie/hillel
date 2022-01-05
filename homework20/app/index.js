const alarmClock = document.querySelector(".alarmClock");
const setAlarmBtn = document.querySelector(".setAlarmBtn");
const saveAlarmBtn = document.querySelector(".saveAlarmBtn");
const showResult = document.querySelector(".showResult");

const currentTime = (() => {
  setInterval(() => {
    const currentHour = new Date().getHours();
    document.querySelector(".hour").innerHTML =
      currentHour < 10 ? "0" + currentHour : currentHour;

    const currentMinute = new Date().getMinutes();
    document.querySelector(".minute").innerHTML =
      currentMinute < 10 ? "0" + currentMinute : currentMinute;

    const currentSecond = new Date().getSeconds();

    document.querySelector(".second").innerHTML =
      currentSecond < 10 ? "0" + currentSecond : currentSecond;
  });
})();

const handleSetAlarmBtn = (event) => {
  const clock = document.querySelector(".clock");
  showResult.hidden = true;
  alarmClock.hidden = false;
};

const handleSaveAlarmBtn = (event) => {
  showResult.hidden = false;
  alarmClock.hidden = true;

  const setHour = document.getElementById("setHour");
  const setMin = document.getElementById("setMin");
  const check = document.getElementById("check");

  const now = new Date();
  let chosenTime =
    setHour.value * 60 * 60 * 1000 +
    setMin.value * 60 * 1000 -
    (now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000);

  if (chosenTime < 0) {
    chosenTime = -chosenTime;
  }

  const chosenHour = setHour.value;
  const chosenMin = setMin.value < 10 ? "0" + setMin.value : setMin.value;
  showResult.innerHTML = `Alarm set at: ${chosenHour} : ${chosenMin}`;
  const audio = new Audio("sound.mp3");

  if (check.checked) {
    let repeat = setTimeout((everyday) => {
      audio.play();
      repeat = setTimeout(everyday, 24 * 60 * 60 * 1000);
    }, chosenTime);
    showResult.innerHTML = `Alarm set at: ${chosenHour} : ${chosenMin} every day`;
  } else {
    const alarmTime = setTimeout(() => audio.play(), chosenTime);
  }
};

setAlarmBtn.addEventListener("click", handleSetAlarmBtn);
saveAlarmBtn.addEventListener("click", handleSaveAlarmBtn);
