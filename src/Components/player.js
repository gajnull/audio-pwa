const player = {};

let audio,
    _from = '0',
    _to = '0',
    isPlaying = false;

player.load = (src) => {
  audio = new Audio('data/' + src);
};

player.unload = (src) => {
  audio.pause();
  audio.src = "";
  isPlaying = false;
};

player.range = (inFrom, inTo) => {
  _from = inFrom;
  _to = inTo;
}

player.toogle = () => {
  if(isPlaying) {
    //player.
  }
};

player.play = () => {
  //
};

player.stop = () => {
  //
};





export default player;
