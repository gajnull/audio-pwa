
const zeroStats = {
  countRuns: 0,
  workingTime: 0, // в секундах
  countDialogs: 0,
  dialogs: [] // {name, count}
};

let startDialogTime;

const getStats = () => {
  return fetchStats() || zeroStats;
};

const clearAllData = () => {
  saveStats(zeroStats);
};

const formatPeriod = (totalSec) => {
  const sec = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const min = totalMin % 60;
  const hour = Math.floor(totalMin / 60);
  let res = sec;
  if  (sec < 10) res = '0' + res; 
  res = min + ':' + res;
  if  (min < 10) res = '0' + res;  
  res = hour + ':' + res;
  if  (hour < 10) res = '0' + res;  
  return res;
};

//const setParam = (name) => {};

// Должно выполняться при запуске приложения
const startApp = () => {
  const stats = getStats();
  stats.countRuns++;
  saveStats(stats);
};

// Запускаем отсчёт времени работы с диалогом
const startDialog = () => {
  startDialogTime = new Date();
};

// Останавливаем отсчёт времени работы с диалогом и если работали с ним достаточно, записываем в статистику
const stopDialog = (dialog) => {  // dialog - имя диалога
  const sec = (new Date() - startDialogTime) / 1000;  // в секундах
  if (sec < 20) return; // если меньше 20 секунд, то не считается
  recordDataDialogs(dialog, sec);
};

function recordDataDialogs(name, sec) {
  const stats = getStats();
  stats.workingTime += Math.round(sec);
  const dialogs = stats.dialogs
  stats.dialogs = addInfoDialogs(name, dialogs);
  stats.countDialogs = stats.dialogs.length;
  saveStats(stats);
}

function addInfoDialogs(name, dialogs) {
  for (let i = 0; i < dialogs.length; i++) {
    if (dialogs[i].name === name) {
      dialogs[i].count++;
      return dialogs;
    }
  }
  dialogs.push({name, count: 1});
  return dialogs; // в пердыдущей строке нельзя return, т.к. возвращается длина массива
}



function saveStats(stats) {
  const ls = JSON.stringify(stats);
  try {
    localStorage.setItem('stats_lngt', ls);
  } catch (e) {
     console.log('settings не сохранены в localStorage');
  }
}

function fetchStats() {
  try {
    return JSON.parse(localStorage.getItem('stats_lngt'));
  } catch (e) {
     return false;
  }
}

export default {
  getStats,
  clearAllData,
  formatPeriod,
  startApp,
  startDialog,
  stopDialog
};
