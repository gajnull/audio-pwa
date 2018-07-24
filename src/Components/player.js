const player = {};

let audio,
    _from = '0', _to = '0',
    counter = 1,
    timerPlay, timerPause,
    fnGotoNext, // функция перехода к следующему участку (устанавливается _from, _to)
    countRepeat, speed, ratePause, metod,
    isPlay = false;



player.load = (src) => {
  audio = new Audio('data/' + src);
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
  if(isPlay && Number(_to) === 0) {
    player.play();
  } else {
    player.stop();
  }
  return isPlay;
};

player.play = () => {
  audio.currentTime = _from;  ///
  audio.play();
  counter++;
  timerPlay = setTimeout(() => {}, (_to - _from) * 1000); ///
  timerPause = setTimeout(() => {}, (_to - _from)*1000*(1 + ratePause)); ///
  if(countRepeat < counter) fnGotoNext(); ///
  resolveToDo();
  isPlay = true;
};

player.stop = () => {
  clearTimeout(timerPlay);
  clearTimeout(timerPause);
  isPlay = false;
};




export default player;



function resolveToDo() {
  if (metod === 'demand') player.stop(); 
}