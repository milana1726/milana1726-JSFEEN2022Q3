import {
  addArrowsSort, setDisabled, setStartCount,
} from './garage-options';
import {
  createCar, getCarById, getCars, getWinners,
} from '../api/api';
import {
  dataCars, dataModels, getRandomColor, getRandomName,
} from '../helpers/helper';
import Car from '../car';
import Winner from '../winner';
import store from '../helpers/store';

export default class Garage {
  constructor(pageCars, pageWinners) {
    this.pageCars = pageCars;
    this.pageWinners = pageWinners;
    this.cars = null;
    this.winners = null;
    this.carList = document.querySelector('.car_list');
    this.pageNumber = document.querySelector('.page_number');
    this.garageCount = document.querySelector('.garage_count');
    this.winnersCount = document.querySelector('.winners_count');
    this.inputNameCarCreate = document.querySelector('.name_car_create');
    this.inputColorCarCreate = document.querySelector('.color_car_create');
    this.buttonCreate = document.querySelector('.button_create');
    this.buttonUpdate = document.querySelector('.button_update');
    this.buttonGenerate = document.querySelector('.button_menu_generate');
    this.buttonNext = document.getElementById('next');
    this.buttonPrev = document.getElementById('prev');
    this.buttonRace = document.querySelector('.button_menu_race');
    this.buttonReset = document.querySelector('.button_menu_reset');
    this.tableBody = document.querySelector('.table_body');
    this.tableWinsOrder = document.querySelector('.wins_order');
    this.tableTimeOrder = document.querySelector('.time_order');
  }

  renderCars(cars) {
    this.cars = cars;
    this.cars.forEach((el) => new Car(el));
  }

  renderWinners(winners) {
    this.winners = winners;
    const tableWinners = new Winner(this.winners);
    tableWinners.createWinner();
  }

  async updateStateGarage() {
    const { items, count } = await getCars(this.pageCars);
    if (!items.length) {
      this.buttonRace.setAttribute('disabled', '');
      this.buttonReset.setAttribute('disabled', '');
    }
    this.carList.innerHTML = '';
    this.buttonRace.removeAttribute('disabled');
    this.buttonReset.removeAttribute('disabled');
    this.checkPagination(this.pageCars, count, store.carsOnPage);
    this.pageNumber.innerHTML = this.pageCars;
    this.garageCount.innerHTML = count;
    store.pageCars = this.pageCars;
    store.carsCount = count;
    if (store.view === 'winners') {
      this.checkPagination(this.pageWinners, store.winnersCount, store.winnerssOnPage);
      this.pageNumber.innerHTML = this.pageWinners;
      this.winnersCount.innerHTML = store.winnersCount;
    }
    this.renderCars(items);
  }

  async updateStateWinners() {
    const winners = await getWinners({
      page: this.pageWinners, sort: store.sortBy, order: store.order,
    });

    const arrayCars = await Promise.all(winners.items.map((winner) => getCarById(winner.id)));

    const arrayWinners = arrayCars.map((car, index) => ({
      ...car,
      ...winners.items.find((win) => win.id === car.id),
      number: index + 1,
    }));

    this.tableBody.innerHTML = '';
    this.tableWinsOrder.textContent = addArrowsSort('wins');
    this.tableTimeOrder.textContent = addArrowsSort('time');

    this.checkPagination(this.pageWinners, winners.count, store.winnerssOnPage);
    this.pageNumber.innerHTML = this.pageWinners;
    this.winnersCount.innerHTML = winners.count;
    store.pageWinners = this.pageWinners;
    store.winnersCount = winners.count;
    if (store.view === 'garage') {
      this.checkPagination(this.pageCars, store.carsCount, store.carsOnPage);
      this.pageNumber.innerHTML = this.pageCars;
      this.garageCount.innerHTML = store.carsCount;
    }
    arrayWinners.map((winner) => this.renderWinners(winner)).join('');
  }

  checkPagination(page, count, onPage) {
    if (count > onPage && page * onPage < count) {
      this.buttonNext.removeAttribute('disabled');
    } else {
      this.buttonNext.setAttribute('disabled', '');
    }
    if (page > 1) {
      this.buttonPrev.removeAttribute('disabled');
    } else {
      this.buttonPrev.setAttribute('disabled', '');
    }
  }

  listen() {
    // add new car
    this.buttonCreate.addEventListener('click', () => {
      this.addNewCar();
    });

    // generate random cars
    this.buttonGenerate.addEventListener('click', () => {
      this.generateCars();
    });

    // race all cars
    this.buttonRace.addEventListener('click', () => {
      this.raceAll();
    });

    //  reset all cars
    this.buttonReset.addEventListener('click', () => {
      this.resetAll();
    });
  }

  pagination() {
    // next page
    this.buttonNext.addEventListener('click', () => {
      if (store.view === 'garage') {
        this.pageCars += 1;
        store.pageCars = this.pageCars;
        this.updateStateGarage();
      }
      if (store.view === 'winners') {
        this.pageWinners += 1;
        store.pageWinners = this.pageWinners;
        this.updateStateWinners();
      }
    });

    // previous page
    this.buttonPrev.addEventListener('click', () => {
      if (store.view === 'garage') {
        this.pageCars -= 1;
        store.pageCars = this.pageCars;
        this.updateStateGarage();
      }
      if (store.view === 'winners') {
        this.pageWinners -= 1;
        store.pageWinners = this.pageWinners;
        this.updateStateWinners();
      }
    });
  }

  addNewCar() {
    const name = this.inputNameCarCreate.value;
    const color = this.inputColorCarCreate.value;
    if (this.inputNameCarCreate.value === '') {
      const alert = () => 'Enter car name!';
      alert();
    } else {
      createCar({ name, color })
        .then(() => {
          this.updateStateGarage(this.view);
        });
    }
  }

  generateCars() {
    let count = 100;
    while (count !== 0) {
      const name = `${dataCars[getRandomName(dataCars)]} - ${dataModels[getRandomName(dataModels)]}`;
      const color = `#${getRandomColor()}`;
      createCar({ name, color })
        .then(() => {
          this.updateStateGarage(this.view);
        });
      count -= 1;
    }
  }

  async raceAll() {
    const buttonStart = document.querySelectorAll('.button_start');
    setStartCount(buttonStart.length);
    buttonStart.forEach((button) => {
      button.click();
    });
    this.buttonRace.setAttribute('disabled', '');
    setDisabled(false);
  }

  resetAll() {
    const buttonStop = document.querySelectorAll('.button_stop');
    buttonStop.forEach((button) => {
      button.click();
    });
    this.buttonRace.removeAttribute('disabled');
  }
}
