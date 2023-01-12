import './style.css';
import Garage from './components/garage/garage';
import { setSorting } from './components/garage/garage-options';
import store from './components/helpers/store';

document.querySelector('.wrapper').innerHTML = `
        <header>
            <div class="header_container">
                <h1>ASYNC RACE</h1>
            </div>
        </header>
        <main>
            <div class="main_container">
                <div class="button_block">
                    <button class="button_view_garage button_main">To Garage</button>
                    <button class="button_view_winner button_main">To Winners</button>
                </div>
                <div class="main_menu">
                    <form class="input_create_block">
                        <input type="text" class="name_car_create" value="Mercedes-Benz" required/>
                        <input type="color" class="color_car_create" value="#ffffff" />
                        <button class="button_create button_pink">Create</button>
                    </form>
                    <form class="input_update_block">
                        <input type="text" class="name_car_update" disabled required/>
                        <input
                            type="color"
                            class="color_car_update"
                            value="#ffffff"
                            disabled
                        />
                        <button class="button_update button_pink" disabled>update</button>
                    </form>
                    <div class="button_menu_block">
                        <button class="button_menu_race button_yellow" disable>Race</button>
                        <button class="button_menu_reset button_yellow" disable>Reset</button>
                        <button class="button_menu_generate button_green">Generate Cars</button>
                    </div>
                </div>
                <div class="garage">
                    <p class="garage_title">
                        Garage (<span class="garage_count">${store.view === 'garage' ? store.carsCount : store.winnersCount}</span>)
                    </p>
                    <div class="car_list"></div>
                </div>
                <div class="winners" style="display: none">
                    <p class="winners_title">
                        Winners (<span class="winners_count">${store.view === 'garage' ? store.pageCars : store.pageWinners}</span>)
                    </p>
                    <table class="table">
                        <thead>
                            <th>Number</th>
                            <th>Car</th>
                            <th>Name</th>
                            <th class="table_button sort" data-sort="wins" id="sort_wins">Win <span class="wins_order"></span></th>
                            <th class="table_button sort" data-sort="time" id="sort_time">Best time (seconds) <span class="time_order"></span></th>
                        </thead>
                        <tbody class="table_body"></tbody>
                    </table>
                </div>
                <div class="pagination">
                <button class="button_prev button_yellow" id="prev" disabled>Prev</button>
                <p class="page_title"><span class="page_number"></span></p>
                <button class="button_next button_yellow" id="next" disabled>Next</button>
            </div>
            </div>
        </main>
`;

const garageCars = new Garage(store.pageCars, store.pageWinners);
export default garageCars;

garageCars.updateStateGarage();
garageCars.updateStateWinners();
garageCars.listen();
garageCars.pagination();

const mainForm = document.querySelector('.main_menu');
const blockGarage = document.querySelector('.garage');
const blockWinners = document.querySelector('.winners');

const buttonGarage = document.querySelector('.button_view_garage');
const buttonWinner = document.querySelector('.button_view_winner');

const pageNumber = document.querySelector('.page_number');
const garageCount = document.querySelector('.garage_count');

// view Garage
buttonGarage.addEventListener('click', () => {
  store.view = 'garage';
  mainForm.style.display = 'block';
  blockGarage.style.display = 'block';
  blockWinners.style.display = 'none';

  garageCars.checkPagination(store.pageCars, store.carsCount, store.carsOnPage);
  pageNumber.innerHTML = store.pageCars;
  garageCount.innerHTML = store.carsCount;
});

// view Winners
buttonWinner.addEventListener('click', () => {
  store.view = 'winners';
  blockWinners.style.display = 'block';
  mainForm.style.display = 'none';
  blockGarage.style.display = 'none';

  garageCars.checkPagination(store.pageWinners, store.winnersCount, store.winnerssOnPage);
  pageNumber.innerHTML = store.pageWinners;
  garageCount.innerHTML = store.winnersCount;
});

// sort Winners
document.addEventListener('click', (event) => {
  const eventTarget = event.target;
  const elemTarget = eventTarget.classList.contains('sort')
    ? eventTarget
    : eventTarget.closest('.sort');
  if (!elemTarget) {
    return;
  }

  setSorting(elemTarget, 'wins');
  setSorting(elemTarget, 'time');

  garageCars.updateStateWinners();
});
