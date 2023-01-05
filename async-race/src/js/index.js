import "../css/style.css";
import { store } from "./data.js";
import Garage from "./garage.js";

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
                        <button class="button_menu_race button_yellow" disable>Race</button>
                        <button class="button_menu_reset button_yellow" disable>Reset</button>
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


