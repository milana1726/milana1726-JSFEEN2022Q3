import Car from "./car.js";
import { createCar, getCars } from "../api.js";
import { store, dataCars, dataModels } from "../store.js";
import { getRandomName, getRandomColor } from "../helpers.js";

export default class Garage {
    constructor(items, count, page) {
        this.cars = items;
        this.carsCount = count;
        this.pageCars = page;
        this.carList = document.querySelector(".car_list");
        this.inputNameCarCreate = document.querySelector(".name_car_create");
        this.inputColorCarCreate = document.querySelector(".color_car_create");
        this.buttonCreate = document.querySelector(".button_create");
        this.buttonUpdate = document.querySelector(".button_update");
        this.buttonGenerate = document.querySelector(".button_menu_generate");
        this.btnNext = document.getElementById("next");
        this.btnPrev = document.getElementById("prev");
        this.buttonRace = document.querySelector(".button_menu_race");
        this.buttonReset = document.querySelector(".button_menu_reset");
        this.renderState(this.cars);
        this.updateStateGarage();
        this.listener();
    }

    renderState(cars) {
        cars.forEach((el) => {
            new Car(el.name, el.color, el.id);
        });
    }

    checkPagination(page, count) {
        if (count > 7 && page * 7 < count) {
            document.getElementById("next").disabled = false;
        } else {
             document.getElementById("next").disabled = true;
        }
        if (page > 1) {
            document.getElementById("prev").disabled = false;
        } else {
            document.getElementById("prev").disabled = true;
        }

    }

    async updateStateGarage() {
        const {items, count } = await getCars(store.pageCars);
        if (!items.length)  {
            this.buttonRace.disabled = true;
            this.buttonReset.disabled = true;
        } else {
            this.buttonRace.disabled = false;
            this.buttonReset.disabled = false;
        }
        this.carList.innerHTML = '';
        this.renderState(items, count, store.pageCars);
        this.checkPagination(store.pageCars, count);
        document.querySelector(".page_number").innerHTML = store.pageCars;
        document.querySelector(".garage_count").innerHTML = count;
    }

    listener() {
        //add new car
        this.buttonCreate.addEventListener("click", () => {
            this.addNewCar();
        });

        //generate random cars
        this.buttonGenerate.addEventListener("click", () => {
            this.generateCars();
        });

        //click Next
        this.btnNext.addEventListener("click", () => {
            store.pageCars++;
            this.updateStateGarage();
        });

        //click Prev
        this.btnPrev.addEventListener("click", () => {
            store.pageCars--;
            this.updateStateGarage();
        });

        //click race all cars
        this.buttonRace.addEventListener("click", () => {
            this.raceAll();
        });

        //click reset all cars
        this.buttonReset.addEventListener("click", () => {
            this.resetAll();
        })
    }

    addNewCar() {
        const name = this.inputNameCarCreate.value;
        const color = this.inputColorCarCreate.value;
        if (this.inputNameCarCreate.value === "") {
            alert("Enter car name!");
        } else {
            createCar({ name: name, color: color })
            .then(() => {
                 this.updateStateGarage();
            });
        }
    }

    generateCars() {
        let i = 100;
        while (i !== 0) {
            const name = `${dataCars[getRandomName(dataCars)]} - ${dataModels[getRandomName(dataModels)]}`;
            const color = getRandomColor();
            createCar( { name: name, color:  `#${color}` })
            .then(() => {
                this.updateStateGarage();
            })
            i--;
        }
    }

    raceAll() {
        const buttonStart = document.querySelectorAll(".button_start");
        this.buttonCreate.disabled = true;
        this.buttonUpdate.disabled = true;
        this.buttonRace.disabled = true;
        this.buttonGenerate.disabled = true;
        buttonStart.forEach((button) => {
            button.click();
        });
    }

    resetAll() {
        const buttonStop = document.querySelectorAll(".button_stop");
        this.buttonCreate.disabled = false;
        this.buttonUpdate.disabled = false;
        this.buttonRace.disabled = false;
        this.buttonGenerate.disabled = false;
        buttonStop.forEach((button) => {
            button.click();
        });
    }
}

