const defaultSettings = {
  countRepeat: 1,
  speed: 1,
  ratePause: 1.4,
  metod: 'demand',  // "demand"/"all"/"repeat"
  lastCountRepeatForAll: 3,
  maxCountRepeatForRepeat: 20  // только на случай, если забудет выключить
};

function normalizeStgs(stgs) {
  const res = {
    metod: stgs.metod,
    countRepeat: stgs.countRepeat || defaultSettings.countRepeat,
    speed: parseFloat(stgs.speed) || defaultSettings.speed,
    ratePause: parseFloat(stgs.ratePause) || defaultSettings.ratePause,
    lastCountRepeatForAll: stgs.lastCountRepeatForAll,
    maxCountRepeatForRepeat: stgs.maxCountRepeatForRepeat
  };
  if (stgs.metod === 'repeat') res.maxCountRepeatForRepeat = res.countRepeat;
  if (stgs.metod === 'all') res.lastCountRepeatForAll = res.countRepeat;
  return res;
}

function setMetod(_settings, metod) {
  const settings = {..._settings};
  if (settings.metod === metod) return settings;  // наверное это будет лишнее
  settings.metod = metod;
  if (metod === 'demand') settings.countRepeat = 1;
  if (metod === 'repeat') settings.countRepeat = settings.maxCountRepeatForRepeat;
  if (metod === 'all') settings.countRepeat = settings.lastCountRepeatForAll;

  return settings;
}

function getNameMetod(metod) {
  if (metod === 'demand') return 'один раз';
  if (metod === 'repeat') return 'постоянное повторение';
  if (metod === 'all') return 'весь диалог';
}

function nextMetod(metod) {
  if (metod === 'demand') return 'repeat';
  if (metod === 'repeat') return 'all';
  if (metod === 'all') return 'demand';
}

function saveStgs(settings) {
  const ls = JSON.stringify(settings);
  try {
    localStorage.setItem('settings_lngt', ls);
    return true;
  } catch (e) {
     console.log('settings не сохранены в localStorage');
  }
}

function getSettings() {
  return fetchStgs() || defaultSettings;
}

function fetchStgs() {
  try {
    const ls = JSON.parse(localStorage.getItem('settings_lngt'));
    return ls;
  } catch (e) {
     return false;
  }
}


export default {
  normalizeStgs,
  setMetod,
  nextMetod,
  getNameMetod,
  getSettings,
  saveStgs
};
