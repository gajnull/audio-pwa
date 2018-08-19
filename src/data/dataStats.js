
const zeroStats = {
  countRuns: 0,
  workingTime: 0,
  countDialogs: 0,
  dialogs: []
};

let stats = zeroStats;

let startTimeApp; //
let startTime;

const getStats = () => {
  return fetchStats() || stats;
};

const setParam = (name) => {  // name = 'startApp'

};


const startApp = () => {
  stats.countRuns++;
};

// Запускаем отсчёт времени работы с диалогом
const startDialog = (dialog) => {
  startTime = new Date();
};

// Останавливаем отсчёт времени работы с диалогом и записываем в статистику
const stopDialog = (dialog) => {
  const duration = new Date() - startTime;
  stats.workingTime += duration;
};





function saveStats() {
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
//  setParam,
  startDialog,
  stopDialog
};
