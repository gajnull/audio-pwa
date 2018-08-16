import dataSettings from './dataSettings';

const player = {};
const path = 'data/';

let audio,
    _from = '0', _to = '0',
    counter = 0,
    timerPlay, timerPause,
    fnSetPlayStatus, // функция-событие, которое меняет статус isPlay
    fnGotoNext, // функция перехода к следующему участку (устанавливается _from, _to)
    countRepeat, speed, ratePause, metod,
    isPlay = false;



player.load = (src) => {
  audio = new Audio(path + src);
  //audio.onloadedmetadata = () => { duration = audio.duration };
};

player.unload = (src) => {
  stop();
  audio.src = "";
};


player.range = (inFrom, inTo) => {
  _from = inFrom;
  _to = inTo;
}


player.onSetPlayStatus = (fn) => {
  fnSetPlayStatus = (_isPlay) => {
    isPlay = _isPlay;
    fn(isPlay);
  }
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
};

player.playAtOnce = () => {
  stop();
  playFromBegin();
};

player.stop = () => {
  stop();
};


function playFromBegin() {
  counter = 0;  // наверное это лишнее
  loadSettings();
  play();
  fnSetPlayStatus(true);
}

function loadSettings() {
  ({countRepeat, speed, ratePause, metod} = dataSettings.getPlayerSettings());  
  audio.defaultPlaybackRate = speed;
}

function play() {
  audio.currentTime = _from;
  audio.play();
  const durationPlay = (_to - _from) * 1000;
  timerPlay =  setTimeout(next, durationPlay);
}

function next() {
  audio.pause();
  const durationPause = (_to - _from) * ratePause * 1000;
  if (!defineNextStep()) {
    end();
  } else {
    timerPause = setTimeout(play, durationPause);
  }
}

function defineNextStep() {
  if (metod === 'demand') return false; // наверное тоже самое было в условии 'repeat'
  counter++;
  if (metod === 'repeat') {
    if (counter < countRepeat) return true;
    return false;
  }
  if (metod === 'all') {
    if (counter < countRepeat) {
      return true;
    }
    counter = 0;
    const isNext = fnGotoNext();
    if (isNext) return true;
    return false;
  }
}


function end() {
  counter = 0;
  fnSetPlayStatus(false);
}

function stop() {
  audio.pause(); //  нужно ли это
  counter = 0;
  clearTimeout(timerPlay);
  clearTimeout(timerPause);
  fnSetPlayStatus(false);
}


export default player;
