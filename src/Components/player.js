const player = {};

let audio,
    _from = '0', _to = '0',
    counter = 0,
    timerPlay, timerPause,
    fnSetIsPlay, // функция-событие, которое меняет статус isPlay
    fnGotoNext, // функция перехода к следующему участку (устанавливается _from, _to)
    countRepeat, speed, ratePause, metod,
    isPlay = false;



player.load = (src) => {
  audio = new Audio(src);
  //audio.onloadedmetadata = () => { duration = audio.duration };
};

player.unload = (src) => {
  stop();
  audio.src = "";
};

player.settings = (settings) => {
    console.log('settings: '); ////
    console.dir(settings);
  ({countRepeat, speed, ratePause, metod} = settings);
  audio.defaultPlaybackRate = speed;
}

player.range = (inFrom, inTo) => {
  _from = inFrom;
  _to = inTo;
}


player.onChangeStatus = (fn) => {
  fnSetIsPlay = fn;
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
  isPlay = true;
  fnSetIsPlay(isPlay);  // сейчас это всегда true, потом возможно изменим
};

function playFromBegin() {
  console.log('playFromBegin' + metod); // !!!!!!!!!
  counter = 0;  // наверное это лишнее
  play();
  isPlay = true;
  fnSetIsPlay(isPlay);
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
    return;
  }
  timerPause = setTimeout(play, durationPause);
}

function defineNextStep() {
  if (metod === 'demand') return false; // наверное тоже самое было в условии 'repeat'
  counter++;
  if (metod === 'repeat') {
    if (counter < countRepeat) return true;
    return false;
  }
  if (metod === 'all') {
    if (counter <= countRepeat) {
      return true;
    } else {
      counter = 0;
      const isNext = fnGotoNext();
      if (isNext) return true;
      return false;
    }
  }
}

function end() {
  counter = 0;
  isPlay = false;
  fnSetIsPlay(isPlay);
}

function stop() {
  audio.pause(); //  нужно ли это
  counter = 0;
  clearTimeout(timerPlay);
  clearTimeout(timerPause);
  isPlay = false;
  fnSetIsPlay(isPlay);
}


export default player;
