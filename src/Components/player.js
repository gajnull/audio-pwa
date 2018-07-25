const player = {};

let audio,
    _from = '0', _to = '0',
    counter = 1,
    timerPlay, timerPause,
    fnGotoNext, // функция перехода к следующему участку (устанавливается _from, _to)
    countRepeat, speed, ratePause, metod,
    isPlay = false;



player.load = (src) => {
  audio = new Audio(src);
};

player.settings = (settings) => {
  ({countRepeat, speed, ratePause, metod} = settings);
  audio.defaultPlaybackRate = speed;
}

player.unload = (src) => {
  audio.pause();
  audio.src = "";
  isPlay = false;
};

player.range = (inFrom, inTo) => {
  _from = inFrom;
  _to = inTo;
}

player.setGotoNextFn = (fn) => {
  fnGotoNext = fn;
}

player.toogle = () => {
  if(!isPlay && Number(_to) >= 0) {
    playFromBegin();
  } else {
    stop();
  }
  return isPlay;
};




function playFromBegin() {
  console.log(metod); // !!!!!!!!!
  if (metod === 'all' && 'repeat') counter = 0;
  play();
}

function play() {
  audio.currentTime = _from;
  audio.play();
  const durationPlay = (_to - _from) * 1000;
  timerPlay =  setTimeout(next, durationPlay);
  isPlay = true;
}

function next() {
  audio.pause();
  //clearTimeout(timerPlay);
  const durationPause = (_to - _from) * (1 + ratePause) * 1000;
  if (!defineNextStep()) {
    end();
    return;
  }
  timerPause = setTimeout(play, durationPause);
}

function defineNextStep() {
  if (metod === 'demand') return false;
  counter++;
  if (metod === 'repeat') {
    if (counter <= countRepeat) return true;
    return false;
  }
  if (metod === 'all') {
    if (counter <= countRepeat) {
      return true;
    } else {
      fnGotoNext();
      if (_to < 0) return false;
      return true
    }
  }
}

function end() {
  isPlay = false; // возможне здесб надо передать это выше по иеархии
}

function stop() {
  audio.pause(); //  нужно ли это
  clearTimeout(timerPlay);
  clearTimeout(timerPause);
  isPlay = false;
}






export default player;
