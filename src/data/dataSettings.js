let settings = null;

const defaultSettings = {
  speed: 1,
  ratePause: 1.4,
  metod: 'demand',  // "demand"/"all"/"repeat"
  transl: false,
  countRepeatAll: 3,
  countRepeatRepeat: 20  // только на случай, если забудет выключить
};

// При запуске приложения требуется получить метод
const initSettings = () => {
  settings = fetchSettings() || defaultSettings;
  return settings.metod;
};

const getTimeSettings = () => ({
  countRepeatAll: settings.countRepeatAll,
  countRepeatRepeat: settings.countRepeatRepeat,
  speed: settings.speed,
  ratePause: settings.ratePause,
  transl: settings.transl
});

// Возврат к настройкам по умолчанию
const setDefSettings = () => {
  settings.speed = defaultSettings.speed;
  settings.ratePause = defaultSettings.ratePause;
  settings.countRepeatAll = defaultSettings.countRepeatAll;
  settings.countRepeatRepeat = defaultSettings.countRepeatRepeat;
  return settings;
};

const setMetod = (metod) => { // metod = 'demand'/'repeat'/'all'/'next'
  settings.metod = (metod === 'next') ? nextMetod() : metod;
  saveSettings();
  return settings.metod;
};

const setTimeSetting = (name, _value) => {
  // для name = 'сountRepeatAll' ы|| 'сountRepeatRepeat'
  let value = (name.indexOf('countRepeat') === 0) ? parseInt(_value, 10) : parseFloat(_value);
  if (!value) value = defaultSettings[name];
  settings[name] = value;
};

const setTransl = (transl) => {
  settings.transl = !settings.transl;
  return settings.transl;
}

const getNameMetod = (metod) => {
  if (metod === 'demand') return 'один раз';
  if (metod === 'repeat') return 'постоянное повторение';
  if (metod === 'all') return 'весь диалог';
};

const saveSettings = () => {
  const ls = JSON.stringify(settings);
  try {
    localStorage.setItem('settings_lngt', ls);
  } catch (e) {
     console.log('settings не сохранены в localStorage');
  }
};

function nextMetod() {
  if (settings.metod === 'demand') return 'repeat';
  if (settings.metod === 'repeat') return 'all';
  if (settings.metod === 'all') return 'demand';
}

function fetchSettings() {
  try {
    return JSON.parse(localStorage.getItem('settings_lngt'));
  } catch (e) {
     return false;
  }
}


export default {
  initSettings,
  getTimeSettings,
  setDefSettings,
  setTimeSetting,
  setMetod,
  setTransl,
  getNameMetod,
  saveSettings
};
