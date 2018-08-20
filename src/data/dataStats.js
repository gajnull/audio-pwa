
const zeroStats = {
  countRuns: 0,
  workingTime: 0, // в минутах
  countDialogs: 0,
  dialogs: [] // {name, count}
};

let startDialogTime;

const getStats = () => {
  return fetchStats() || zeroStats;
};

const formatPeriod = (totalMin) => {
  const hour = Math.floor(totalMin / 60);
  const min = totalMin % 60;
  return (hour + ':' + min);
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
  stats.workingTime += Math.floor(sec / 60);
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
  formatPeriod,
  startApp,
  startDialog,
  stopDialog
};
