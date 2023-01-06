import { garageCars } from "../index.js";
import { getCarById, removeCar, updateCar, engineStartStop, driveCar } from "../api.js";
import { store } from "../store.js";
import { getHexRGBColor, getDistance } from "../helpers.js";

export default class Car {
    constructor(nameCar, colorCar, idCar) {
        this.nameCar = nameCar;
        this.colorCar = colorCar;
        this.idCar = idCar;
        this.carList = document.querySelector(".car_list");
        this.buttonRace = document.querySelector(".button_menu_race");
        this.buttonReset = document.querySelector(".button_menu_reset");
        this.buttonUpdate;
        this.buttonSelect;
        this.buttonRemove;
        this.nameCarUpdate;
        this.colorCarUpdate;
        this.buttonStart;
        this.buttonStop;
        this.selectedCar = null;
        this.createBlockCar(this.nameCar, this.colorCar, this.idCar);
        this.listener();
    }

    createBlockCar(nameCar, colorCar, idCar) {
        const carBlock = document.createElement("div");
        carBlock.className = "car_block";
        carBlock.id = idCar;
        carBlock.innerHTML = `
            <div class="car_block_button">
                <button class="button_select button_green" id="select-${idCar}">Select</button>
                <button class="button_remove button_green" id="remove-${idCar}">Remove</button>
                <span class="name_car" id="car-name-${idCar}">${nameCar}</span>
            </div>
            <div class="car_block_img">
                <button class="button_start" id="start-${idCar}"></button>
                <button class="button_stop" id="stop-${idCar}" disabled></button>
                <div class="svg_car">${this.appendCarSvg(idCar, colorCar)}</div>
                <div class="svg_flag">${this.appendFlagSvg(idCar)}</div>
            </div>
        `
        this.carList.appendChild(carBlock);

        this.nameCarUpdate = document.querySelector(".name_car_update");
        this.colorCarUpdate = document.querySelector(".color_car_update");
        this.buttonUpdate = document.querySelector(".button_update");
        this.buttonSelect = document.getElementById(`select-${idCar}`);
        this.buttonRemove = document.getElementById(`remove-${idCar}`);
        this.buttonStart =  document.getElementById(`start-${idCar}`);
        this.buttonStop =  document.getElementById(`stop-${idCar}`);

    }

    listener() {
        //click select car
        this.buttonSelect.addEventListener("click", (event) => {
            this.selectCar(event);

            //click update car
            this.buttonUpdate.addEventListener("click", () => {
                this.updateBlockCar();
            });
        });

        //click remove car
        this.buttonRemove.addEventListener("click", (event) => {
            if (store.carsCount) {
                this.removeBlockCar(event);
            }
        });

        //click start drive
        this.buttonStart.addEventListener("click", (event) => {
            const id = +event.target.id.split('start-')[1];
            this.startDriving(id);
        });

        //click stop drive
        this.buttonStop.addEventListener("click", (event) => {
            const id = +event.target.id.split('stop-')[1];
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
    }

    updateBlockCar() {
        if (this.nameCarUpdate.value === "") {
            alert("Enter car name!");
            return;
        }
        updateCar(this.nameCarUpdate.value, `${getHexRGBColor(this.colorCarUpdate.value)}`,  this.selectedCar.id)
        .then(() => {
            garageCars.updateStateGarage();
            this.nameCarUpdate.value = '';
            this.colorCarUpdate.value = '#ffffff';
            this.nameCarUpdate.disabled = true;
            this.colorCarUpdate.disabled = true;
            this.buttonUpdate.disabled = true;
            this.selectedCar = null;
        });
    }

    async removeBlockCar(event) {
        const car = await getCarById(event.target.id.split('remove-')[1]);
        removeCar(car.id)
        .then(() => {
            garageCars.updateStateGarage();
        });
    }

    async startDriving(id) {
        this.buttonStart.disabled = true;
        this.buttonStop.disabled = false;
        const { velocity, distance } = await engineStartStop(id, 'started');
        const duration =  Math.floor(distance / velocity);

        const car = document.getElementById(`svg-car-${id}`);
        const flag = document.getElementById(`svg-flag-${id}`);

        const htmlDistance = Math.floor(getDistance(car, flag)) + 65;
        const animation = car.animate([
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
            });

        store.animation[id] = animation;

        const { success } = await driveCar(id);
        if (!success) {
            animation.pause();
        }
        return { success, id, duration };
    }

    stopDriving(id) {
        this.buttonStart.disabled = false;
        this.buttonStop.disabled = true;
        const animation = store.animation[id];

        animation.pause();
        engineStartStop(id, 'stopped');

        if (animation) {
            animation.currentTime = 0;
        }
    }

    //svg icon car
    appendCarSvg(id, color) {
        const svgStr = `
        <svg version="1.1" id="svg-car-${id}" width="70px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 485.838 485.839" style="enable-background:new 0 0 485.838 485.839;" xml:space="preserve">
            <g>
                <path style="fill:${color};" d="M 409.109 211.45 c -5.282 -0.368 -9.842 -0.683 -12.11 -1.326 c -15.926 -4.521 -72.646
                -7.222 -78.714 -7.506 c -9.75 -2.737 -18.262 -8.791 -28.088 -15.77 c -19.841 -14.106 -44.539 -31.67 -94.121 -32.704 l
                -3.438 -0.032 c -23.976 0 -50.706 5.025 -76 11.838 c -11.163 -4.27 -29.551 -10.818 -39.834 -11.814 c -5.188 -0.495
                -7.843 2.038 -8.938 3.603 c -3.791 5.432 -1.132 15.629 1.701 23.167 c -30.046 10.888 -51.814 21.164 -53.726 22.077 l
                -1.138 0.815 c -5.482 5.667 -3.086 13.784 -1.146 20.308 c 0.585 2.018 1.184 4.003 1.537 5.881 c 0.706 3.791 -7.544
                6.217 -7.632 6.233 l -5.628 1.483 l 7.492 10.055 l -6.242 8.756 l 6.899 8.885 c -4.364 0.825 -8.574 2.673 -9.694
                6.632 c -1.533 5.383 2.997 10.9 15.164 18.451 c 6.053 3.759 12.451 6.019 19.588 7.076 c -0.269 -1.311 -0.449
                -2.652 -0.613 -4.003 c -0.165 -1.362 -0.249 -2.749 -0.315 -4.14 c -0.03 -0.726 -0.106 -1.447 -0.106 -2.185 c 0
                -28.885 23.5 -52.387 52.383 -52.387 c 28.883 0 52.385 23.51 52.385 52.387 c 0 4.28 -0.571 8.42 -1.545 12.399 c
                -0.322 1.303 -0.659 2.597 -1.07 3.863 c -0.399 1.227 -0.839 2.42 -1.327 3.61 c 24.87 6.685 54.892 8.355 77.776
                8.355 c 16.108 0 27.088 -0.789 27.272 -0.813 h 134.038 c -0.873 -1.262 -1.687 -2.58 -2.444 -3.923 c -0.721
                -1.274 -1.37 -2.585 -1.983 -3.919 c -2.954 -6.457 -4.641 -13.605 -4.641 -21.16 c 0 -28.18 22.931 -51.114 51.11
                -51.114 c 28.185 0 51.115 22.935 51.115 51.114 c 0 6.465 -1.259 12.628 -3.451 18.322 c -0.645 1.663 -1.374 3.29
                -2.172 4.869 c -0.841 1.646 -1.755 3.25 -2.765 4.785 c 18.306 -3.595 23.664 -15.741 24.093 -16.896 c 5.767
                -25.659 3.366 -45.833 -7.142 -59.941 C 459.338 214.923 427.892 212.745 409.109 211.45 Z"/>
                <path style="fill:${color};" d="M 43.273 298.22 c 4.899 19.271 22.321 33.546 43.116 33.546 c 18.315 0 34.031 -11.061 40.877
                -26.862 c 0.509 -1.182 0.958 -2.393 1.365 -3.626 c 0.418 -1.259 0.771 -2.537 1.076 -3.844 c 0.771 -3.278 1.216 -6.685
                1.216 -10.203 c 0 -24.593 -19.941 -44.534 -44.534 -44.534 c -24.594 0 -44.533 19.941 -44.533 44.534 c 0 1.034 0.084
                2.048 0.156 3.074 c 0.092 1.343 0.241 2.669 0.453 3.972 C 42.68 295.61 42.944 296.921 43.273 298.22 Z"/>
                <path style="fill:${color};" d="M 415.961 328.904 c 12.72 0 24.129 -5.526 32.04 -14.267 c 1.194 -1.326 2.332 -2.713 3.366
                -4.184 c 0.926 -1.311 1.799 -2.669 2.568 -4.08 c 3.366 -6.155 5.29 -13.225 5.29 -20.738 c 0 -23.896 -19.368 -43.26 -43.265
                -43.26 s -43.26 19.363 -43.26 43.26 c 0 7.698 2.023 14.904 5.542 21.159 c 0.762 1.358 1.604 2.661 2.501 3.919 c 0.981 1.371
                2.039 2.674 3.174 3.924 C 391.836 323.386 403.247 328.904 415.961 328.904 Z"/>
            </g>
        </svg>`;
        return svgStr;
    }

    //svg icon finish flag
    appendFlagSvg(id) {
        const str = `
        <svg version="1.1" id="svg-flag-${id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="38px" height="38px" viewBox="0 0 106.06 122.88" style="enable-background:new new 0 0 106.06 122.88;"
        xml:space="preserve">
            <g>
                <path style="fill: #fff;" d="M 0 4.16 C 0 1.86 1.86 0 4.16 0 c 2.3 0 4.16 1.86 4.16 4.16 v 6.34 h 94.62 c 1.72 0 3.12 1.4 3.12
                3.12 v 66.8 c 0 1.72 -1.4 3.12 -3.12 3.12 H 8.32 v 35.18 c 0 2.3 -1.86 4.16 -4.16 4.16 c -2.3 0 -4.16 -1.86 -4.16 -4.16 V 4.16
                L 0 4.16 Z M 84.42 55.3 h 15.4 V 37.73 h -15.4 V 55.3 L 84.42 55.3 Z M 82.06 77.3 V 57.66 H 64.94 V 77.3 H 82.06 L 82.06 77.3
                Z M 82.06 35.37 V 16.74 H 64.94 v 18.63 H 82.06 L 82.06 35.37 Z M 43.1 77.3 V 57.66 H 25.97 V 77.3 H 43.1 L 43.1 77.3 Z M 45.46
                55.3 h 17.12 V 37.73 H 45.46 V 55.3 L 45.46 55.3 Z M 43.1 35.37 V 16.74 H 25.97 v 18.63 H 43.1 L 43.1 35.37 Z M 23.62 55.3 V
                37.73 H 8.43 V 55.3 H 23.62 L 23.62 55.3 Z"/>
            </g>
        </svg>`;
        return str;
    }
}