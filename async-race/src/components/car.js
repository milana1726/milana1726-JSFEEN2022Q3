import { appendCarSvg, appendFlagSvg } from './images';
import { areAllFinished, isWinner } from './garage/garage-options';
import {
  deleteCar, deleteWinner, driveCar, engineStartStop, getCarById, updateCar,
} from './api/api';
import { getDistance, getHexRGBColor } from './helpers/helper';
import garageCars from '../index';
import store from './helpers/store';

export default class Car {
  constructor(car) {
    this.nameCar = car.name;
    this.colorCar = car.color;
    this.idCar = car.id;
    this.carList = document.querySelector('.car_list');
    this.buttonUpdate = null;
    this.buttonSelect = null;
    this.buttonRemove = null;
    this.nameCarUpdate = null;
    this.colorCarUpdate = null;
    this.buttonStart = null;
    this.buttonStop = null;
    this.selectedCar = null;
    this.createBlockCar(this.nameCar, this.colorCar, this.idCar);
    this.listener();
  }

  createBlockCar(nameCar, colorCar, idCar) {
    const carBlock = document.createElement('div');
    carBlock.className = 'car_block';
    carBlock.id = idCar;
    carBlock.innerHTML = `
            <div class='car_block_button'>
                <button class='button_select button_green' id='select-${idCar}'>Select</button>
                <button class='button_remove button_green' id='remove-${idCar}'>Remove</button>
                <span class='name_car' id='car-name-${idCar}'>${nameCar}</span>
            </div>
            <div class='car_block_img'>
                <button class='button_start' id='start-${idCar}'></button>
                <button class='button_stop' id='stop-${idCar}' disabled></button>
                <div class='svg_car'>${appendCarSvg(idCar, colorCar)}</div>
                <div class='svg_flag'>${appendFlagSvg(idCar)}</div>
            </div>
        `;
    this.carList.appendChild(carBlock);

    this.nameCarUpdate = document.querySelector('.name_car_update');
    this.colorCarUpdate = document.querySelector('.color_car_update');
    this.buttonUpdate = document.querySelector('.button_update');
    this.buttonSelect = document.getElementById(`select-${idCar}`);
    this.buttonRemove = document.getElementById(`remove-${idCar}`);
    this.buttonStart = document.getElementById(`start-${idCar}`);
    this.buttonStop = document.getElementById(`stop-${idCar}`);
  }

  listener() {
    // click select car
    this.buttonSelect.addEventListener('click', (event) => {
      this.selectCar(event);

      // click update car
      this.buttonUpdate.addEventListener('click', () => {
        this.updateBlockCar();
      });
    });

    // click remove car
    this.buttonRemove.addEventListener('click', (event) => {
      this.removeBlockCar(event);
    });

    // click start drive
    this.buttonStart.addEventListener('click', async (event) => {
      const id = Number(event.target.id.split('start-')[1]);
      this.startDriving(id);
    });

    // click stop drive
    this.buttonStop.addEventListener('click', (event) => {
      const id = Number(event.target.id.split('stop-')[1]);
      this.stopDriving(id);
    });
  }

  async selectCar(event) {
    this.nameCarUpdate.disabled = false;
    this.colorCarUpdate.disabled = false;
    this.buttonUpdate.disabled = false;

    this.selectedCar = await getCarById(event.target.id.split('select-')[1]);
    this.nameCarUpdate.value = this.selectedCar.name;
    this.colorCarUpdate.value = this.selectedCar.color;
    store.idCar = this.selectedCar.id;
  }

  updateBlockCar() {
    if (this.nameCarUpdate.value !== '') {
      updateCar(this.nameCarUpdate.value, `${getHexRGBColor(this.colorCarUpdate.value)}`, store.idCar)
        .then(() => {
          garageCars.updateStateGarage();
          garageCars.updateStateWinners();
        });
      this.nameCarUpdate.value = '';
      this.colorCarUpdate.value = '#ffffff';
      this.nameCarUpdate.disabled = true;
      this.colorCarUpdate.disabled = true;
      this.buttonUpdate.disabled = true;
      this.selectedCar = null;
    }
  }

  async removeBlockCar(event) {
    this.selectedCar = await getCarById(event.target.id.split('remove-')[1]);
    deleteCar(this.selectedCar.id)
      .then(() => {
        garageCars.updateStateGarage();
      });
    deleteWinner(this.selectedCar.id)
      .then(() => {
        garageCars.updateStateWinners();
      });
    this.selectedCar = null;
  }

  async startDriving(id) {
    this.buttonStart.setAttribute('disabled', true);
    this.buttonStop.removeAttribute('disabled');

    const car = await getCarById(id);
    const { velocity, distance } = await engineStartStop(id, 'started');
    const duration = Math.floor(distance / velocity);

    const carImage = document.getElementById(`svg-car-${id}`);
    const flagImage = document.getElementById(`svg-flag-${id}`);

    const htmlDistance = Math.floor(getDistance(carImage, flagImage)) + 65;
    const animation = carImage.animate(
      [
        {
          transform: 'translateX(0)',
        },
        {
          transform: `translateX(${htmlDistance}px)`,
        },
      ],
      {
        duration,
        fill: 'forwards',
      },
    );

    store.animation[id] = animation;

    const { success } = await driveCar(id);
    if (!success) {
      animation.pause();
    }
    if (success) {
      areAllFinished();
      isWinner(car, Number((duration / 1000).toFixed(2)));
    }
  }

  async stopDriving(id) {
    this.buttonStart.removeAttribute('disabled');
    this.buttonStop.setAttribute('disabled', true);
    const animation = store.animation[id];

    animation.pause();
    await engineStartStop(id, 'stopped');

    if (animation) {
      animation.currentTime = 0;
    }
  }
}
