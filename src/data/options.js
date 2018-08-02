
function setMetod(_settings, metod) {
  const settings = {..._settings};
  if (settings.metod === metod) return settings;  // наверное это будет лишнее
  settings.metod = metod;
  if (metod === 'demand') settings.countRepeat = 1;
  if (metod === 'repeat') settings.countRepeat = settings.maxCountRepeatFoRepeat;
  if (metod === 'all') settings.countRepeat = settings.lastCountRepeatForAll;

  return settings;
}

// потом будем сохранять в localStorage
function getSettings() {
  return {
    countRepeat: 1,
    speed: 1,
    ratePause: 1.4,
    metod: 'demand',  // "demand"/"all"/"repeat"
    lastCountRepeatForAll: 3,
    maxCountRepeatFoRepeat: 20  // только на случай, если забудет выключить
  };
}


export default {
  setMetod,
  getSettings
};
