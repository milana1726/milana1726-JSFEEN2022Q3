import { ASC } from '../garage/garage-options';

export const garageView = 'garage';
export const winnersView = 'winners';
export const sortWins = 'wins';
export const sortTime = 'time';

export default {
  view: garageView,
  pageCars: 1,
  carsOnPage: 7,
  carsCount: 1,
  idCar: null,
  animation: {},
  pageWinners: 1,
  winnerssOnPage: 10,
  winnersCount: 1,
  sortBy: '',
  order: ASC,
};
