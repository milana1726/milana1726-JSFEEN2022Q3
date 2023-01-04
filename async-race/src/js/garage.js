import Car from "./car.js";
import { store } from "./data.js";
import { getCars } from "./api.js";

export default class Garage {
    constructor(items, count, page) {
        this.cars = items;
        this.carsCount = count;
        this.pageCars = page;
        this.renderState(this.cars);
        this.updateStateGarage();
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

    updateStateGarage() {
        getCars(store.pageCars).then((data) => {
            document.querySelector(".car_list").innerHTML = '';
            this.renderState(data.items, data.count, store.pageCars);
            this.checkPagination(store.pageCars, data.count);
            document.querySelector(".page_number").innerHTML = store.pageCars;
            document.querySelector(".garage_count").innerHTML = data.count;
        });
    }
}

