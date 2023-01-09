import { saveWinner } from '../api/api';
import store from '../helpers/store';

let hasWinner = true;
let startCount = 0;

export const setStartCount = (count) => {
  startCount = count;
}

export const areAllFinished = () => {
  startCount -= 1;

  if (!startCount) {
    const buttonReset = document.querySelector('.button_menu_reset');
    buttonReset.removeAttribute('disabled');
  }
}

const addMessage = (name, time) => {
  const mainContainer = document.querySelector('.main_container');
  const message = document.createElement('div');
  message.className = 'message';
  message.innerHTML = `${name} went first ${time}s`;
  mainContainer.append(message);

  setTimeout(() => message.remove(), 3000);
}

export const setDisabled = (force) => {
  hasWinner = force;
  const buttonCreate = document.querySelector('.button_create');
  const buttonUpdate = document.querySelector('.button_update');
  const buttonGenerate = document.querySelector('.button_menu_generate');
  const buttonReset = document.querySelector('.button_menu_reset');

  buttonCreate.toggleAttribute('disabled', !force);
  buttonReset.toggleAttribute('disabled', !force);
  buttonUpdate.toggleAttribute('disabled', !force);
  buttonGenerate.toggleAttribute('disabled', !force);
}

export const removeDisabled = () => {
  const buttonRace = document.querySelector('.button_menu_race');
    if (buttonRace.hasAttribute('disabled')) {
      buttonRace.removeAttribute('disabled');
  }
}

export const isWinner = async (car, time) => {
  if (!hasWinner) {
    addMessage(car.name, time);
    setDisabled(true);
    areAllFinished();
    await saveWinner({id: car.id, time });
  }
}

export const setSorting = (eventTarget, sortType) => {
  if (eventTarget.dataset.sort === sortType) {
    if (store.sortBy !== sortType) {
      store.sortBy = sortType;
      store.order = 'asc';
    }
    store.order = store.order === 'asc' ? 'desc' : 'asc';
  }
}

export const addArrowsSort = (sortType) => {
  if (sortType !== store.sortBy || store.sortBy === '') {
    return '';
  }
  if (store.sortBy === sortType) {
    return store.order === 'asc' ? '↑' : '↓';
  }
  return '';
}
