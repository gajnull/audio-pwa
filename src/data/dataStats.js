
const zeroStats = {
  countRuns: 0, 
  workingTime: 0, 
  countDialogs: 0
};

let stats = zeroStats;

const getStats = () => {
  return stats;
};

const setParam = (name, value) => {
  //
};

// Запускаем отсчёт времени работы с диалогом
const start = (dialog) => {
  //
};

// Останавливаем отсчёт времени работы с диалогом и записываем в статистику
const stop = () => {
  //
};



export default {
  getStats,
  setParam,
  start,
  stop
};
