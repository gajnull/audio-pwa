const defaultSettings = {
  countRepeat: 1,
  speed: 1,
  ratePause: 1.4,
  metod: 'demand',  // "demand"/"all"/"repeat"
  lastCountRepeatForAll: 3,
  maxCountRepeatForRepeat: 20  // только на случай, если забудет выключить
};

const getSettings = () => {
  return fetchSettings() || defaultSettings;
};

const getDefSettings = (_settings) => {
  const settings = {..._settings};
  settings.speed = defaultSettings.speed;
  settings.ratePause = defaultSettings.ratePause;
  if (settings.metod === 'demand') settings.countRepeat = 1;
  if (settings.metod === 'repeat') settings.countRepeat = defaultSettings.maxCountRepeatForRepeat;
  if (settings.metod === 'all') settings.countRepeat = defaultSettings.lastCountRepeatForAll;  
  return settings;
};

const setMetod = (_settings, metod) => { // metod = 'demand'/'repeat'/'all'/'next'
  const settings = {..._settings};
  const oldMetod = settings.metod;
  if (oldMetod === metod) return settings;  // наверное это будет лишнее
  const newMetod = (metod === 'next') ? nextMetod(oldMetod) : metod;
  settings.metod = newMetod;
  if (newMetod === 'demand') settings.countRepeat = 1;
  if (newMetod === 'repeat') settings.countRepeat = settings.maxCountRepeatForRepeat;
  if (newMetod === 'all') settings.countRepeat = settings.lastCountRepeatForAll;

  return settings;
};

const getNameMetod = (metod) => {
  if (metod === 'demand') return 'один раз';
  if (metod === 'repeat') return 'постоянное повторение';
  if (metod === 'all') return 'весь диалог';
};

const saveSettings = (_settings) => {
  const settings = fixing(_settings);
  const ls = JSON.stringify(settings);
  try {
    localStorage.setItem('settings_lngt', ls);
    return settings;
  } catch (e) {
     console.log('settings не сохранены в localStorage');
  }
};

function nextMetod(metod) {
  if (metod === 'demand') return 'repeat';
  if (metod === 'repeat') return 'all';
  if (metod === 'all') return 'demand';
}

function fixing(settings) {
  const res = {
    metod: settings.metod,
    countRepeat: settings.countRepeat || defaultSettings.countRepeat,
    speed: parseFloat(settings.speed) || defaultSettings.speed,
    ratePause: parseFloat(settings.ratePause) || defaultSettings.ratePause,
    lastCountRepeatForAll: settings.lastCountRepeatForAll,
    maxCountRepeatForRepeat: settings.maxCountRepeatForRepeat
  };
  if (settings.metod === 'repeat') res.maxCountRepeatForRepeat = res.countRepeat;
  if (settings.metod === 'all') res.lastCountRepeatForAll = res.countRepeat;
  return res;
}

function fetchSettings() {
  try {
    const settings = JSON.parse(localStorage.getItem('settings_lngt'));
    return settings;
  } catch (e) {
     return false;
  }
}


export {
  setMetod,
  getNameMetod,
  getSettings,
  getDefSettings,
  saveSettings
};
