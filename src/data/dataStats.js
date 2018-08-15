const getData = () => {
  return [
    {name: 'Количество запусков', value: 0},
    {name: 'Время работы с диалогами', value: 0, edIzm: 'час'},
    {name: 'Количество диалогов', value: 0},
    {name: 'Другие показатели...', value: '?'}
  ];
};

const setParam = (name, value) => {
  //
}

/*function fn() {
  return 'Данные по использованию программы:';
}*/

const stats = {
  getData,
  setParam
};

export default stats;

export {
  getData,
  setParam
};
