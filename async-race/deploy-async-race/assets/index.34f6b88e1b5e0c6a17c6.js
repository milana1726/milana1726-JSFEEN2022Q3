import './style.css';
import Garage from './components/garage/garage';
import { setSorting } from './components/garage/garage-options';
import store from './components/helpers/store';
document.querySelector('.wrapper').innerHTML = "\n        <header>\n            <div class=\"header_container\">\n                <h1>ASYNC RACE</h1>\n            </div>\n        </header>\n        <main>\n            <div class=\"main_container\">\n                <div class=\"button_block\">\n                    <button class=\"button_view_garage button_main\">To Garage</button>\n                    <button class=\"button_view_winner button_main\">To Winners</button>\n                </div>\n                <div class=\"main_menu\">\n                    <div class=\"input_create_block\">\n                        <input type=\"text\" class=\"name_car_create\" value=\"Mercedes-Benz\" />\n                        <input type=\"color\" class=\"color_car_create\" value=\"#ffffff\" />\n                        <button class=\"button_create button_pink\">Create</button>\n                    </div>\n                    <div class=\"input_update_block\">\n                        <input type=\"text\" class=\"name_car_update\" disabled />\n                        <input\n                            type=\"color\"\n                            class=\"color_car_update\"\n                            value=\"#ffffff\"\n                            disabled\n                        />\n                        <button class=\"button_update button_pink\" disabled>update</button>\n                    </div>\n                    <div class=\"button_menu_block\">\n                        <button class=\"button_menu_race button_yellow\" disable>Race</button>\n                        <button class=\"button_menu_reset button_yellow\" disable>Reset</button>\n                        <button class=\"button_menu_generate button_green\">Generate Car</button>\n                    </div>\n                </div>\n                <div class=\"garage\">\n                    <p class=\"garage_title\">\n                        Garage (<span class=\"garage_count\">".concat(store.view === 'garage' ? store.carsCount : store.winnersCount, "</span>)\n                    </p>\n                    <div class=\"car_list\"></div>\n                </div>\n                <div class=\"winners\" style=\"display: none\">\n                    <p class=\"winners_title\">\n                        Winners (<span class=\"winners_count\">").concat(store.view === 'garage' ? store.pageCars : store.pageWinners, "</span>)\n                    </p>\n                    <table class=\"table\">\n                        <thead>\n                            <th>Number</th>\n                            <th>Car</th>\n                            <th>Name</th>\n                            <th class=\"table_button sort\" data-sort=\"wins\" id=\"sort_wins\">Win <span class=\"wins_order\"></span></th>\n                            <th class=\"table_button sort\" data-sort=\"time\" id=\"sort_time\">Best time (seconds) <span class=\"time_order\"></span></th>\n                        </thead>\n                        <tbody class=\"table_body\"></tbody>\n                    </table>\n                </div>\n                <div class=\"pagination\">\n                <button class=\"button_prev button_yellow\" id=\"prev\" disabled>Prev</button>\n                <p class=\"page_title\"><span class=\"page_number\"></span></p>\n                <button class=\"button_next button_yellow\" id=\"next\" disabled>Next</button>\n            </div>\n            </div>\n        </main>\n");
var garageCars = new Garage(store.pageCars, store.pageWinners);
export default garageCars;
garageCars.updateStateGarage();
garageCars.updateStateWinners();
garageCars.listen();
garageCars.pagination();
var mainForm = document.querySelector('.main_menu');
var blockGarage = document.querySelector('.garage');
var blockWinners = document.querySelector('.winners');
var buttonGarage = document.querySelector('.button_view_garage');
var buttonWinner = document.querySelector('.button_view_winner');
var pageNumber = document.querySelector('.page_number');
var garageCount = document.querySelector('.garage_count');

// view Garage
buttonGarage.addEventListener('click', function () {
  store.view = 'garage';
  mainForm.style.display = 'block';
  blockGarage.style.display = 'block';
  blockWinners.style.display = 'none';
  garageCars.checkPagination(store.pageCars, store.carsCount, store.carsOnPage);
  pageNumber.innerHTML = store.pageCars;
  garageCount.innerHTML = store.carsCount;
});

// view Winners
buttonWinner.addEventListener('click', function () {
  store.view = 'winners';
  blockWinners.style.display = 'block';
  mainForm.style.display = 'none';
  blockGarage.style.display = 'none';
  garageCars.checkPagination(store.pageWinners, store.winnersCount, store.winnerssOnPage);
  pageNumber.innerHTML = store.pageWinners;
  garageCount.innerHTML = store.winnersCount;
});

// sort Winners
document.addEventListener('click', function (event) {
  var eventTarget = event.target;
  var elemTarget = eventTarget.classList.contains('sort') ? eventTarget : eventTarget.closest('.sort');
  if (!elemTarget) {
    return;
  }
  setSorting(elemTarget, 'wins');
  setSorting(elemTarget, 'time');
  garageCars.updateStateWinners();
});