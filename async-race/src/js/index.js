import "../css/style.css";
import Garage from "./garage.js";
import { createCar } from "./api.js";
import { store, dataCars, dataModels, getHexRGBColor, getRandomColor, getRandomName } from "./data.js";

document.querySelector(".wrapper").innerHTML = `
        <header>
            <div class="header_container">
                <h1>ASYNC RACE</h1>
            </div>
        </header>
        <main>
            <div class="main_container">
                <div class="main_menu">
                    <div class="button_block">
                        <button class="button_view_garage button_main">To Garage</button>
                        <button class="button_view_winner button_main">To Winners</button>
                    </div>
                    <div class="input_create_block">
                        <input type="text" class="name_car_create" value="Mercedes-Benz" />
                        <input type="color" class="color_car_create" value="#ffffff" />
                        <button class="button_create button_pink">Create</button>
                    </div>
                    <div class="input_update_block">
                        <input type="text" class="name_car_update" disabled />
                        <input
                            type="color"
                            class="color_car_update"
                            value="#ffffff"
                            disabled
                        />
                        <button class="button_update button_pink" disabled>update</button>
                    </div>
                    <div class="button_menu_block">
                        <button class="button_menu_race button_yellow">Race</button>
                        <button class="button_menu_reset button_yellow">Reset</button>
                        <button class="button_menu_generate button_green">Generate Car</button>
                    </div>
                </div>
                <div class="garage">
                    <p class="garage_title">
                        Garage (<span class="garage_count">${store.carsCount}</span>)
                    </p>
                    <div class="car_list"></div>
                    <div class="pagination">
                        <button class="button_prev button_yellow" id="prev" disabled>Prev</button>
                        <p class="page_title"><span class="page_number">${store.pageCars}</span></p>
                        <button class="button_next button_yellow" id="next" disabled>Next</button>
                    </div>
                </div>
                <div class="winners" style="display: none">
                    <p class="winners_title">
                        Winners (<span class="winners_count">0</span>)
                    </p>
                    <p class="winners_title">
                        Page #<span class="winners_count">0</span>
                    </p>
                    <table border="1" class="table">
                    <tr>
                    <th>Number</th>
                    <th>Car</th>
                    <th>Name</th>
                    <th>Win</th>
                    <th>Best time(second)</th>
                    </tr>
                    </table>
                </div>
            </div>
        </main>
`;

export const garageCars = new Garage(store.cars, store.carsCount, store.pageCars);

const inputNameCarCreate = document.querySelector(".name_car_create");
const inputColorCarCreate = document.querySelector(".color_car_create");
const buttonCreate = document.querySelector(".button_create");
const generateButton = document.querySelector(".button_menu_generate");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");

//add new car
buttonCreate.addEventListener("click", () => {
    const name = inputNameCarCreate.value;
    const color = inputColorCarCreate.value;
    let id = 1;
    if (store.cars.length) {
        id += store.cars[store.cars.length-1].id;
    }
    if (inputNameCarCreate.value === "") {
        alert("Enter car name!");
    } else {
            createCar({ name: name, color: color })
            .then(() => {
                garageCars.updateStateGarage();
            });
        }
});

//generate random cars
generateButton.addEventListener("click", () => {
    let i = 100;
    while (i !== 0) {
        const name = `${dataCars[getRandomName(0, dataCars.length)]} - ${dataModels[getRandomName(0, dataModels.length)]}`;
        const color = `rgb(${Math.floor(getRandomColor(0, 255))},${Math.floor(getRandomColor(0, 255))},${Math.floor(getRandomColor(0, 255))})`;
        createCar( { name: name, color:  `#${getHexRGBColor(color)}` })
        .then(() => {
            garageCars.updateStateGarage();
        })
        i--;
    }
});

//click Next
btnNext.addEventListener("click", () => {
    store.pageCars++;
    garageCars.updateStateGarage();
});

//click Prev
btnPrev.addEventListener("click", () => {
    store.pageCars--;
    garageCars.updateStateGarage();
});


