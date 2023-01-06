import { getCars } from "./api.js";
export const dataCars = ["Lada", "Lexus", "Mercedes-Benz", "Renault", "KIA", "Audi", "Scoda", "Tesla", "Mazda", "Ford", "Honda"];
export const dataModels = ["Granta", "LS", "s600", "Logan", "Sorento", "TT", "Fabia", "Model S", "CX-7", "Mustang", "Accord"];
export const winnerCarArr = [];

const { items: cars, count: carsCount } = await getCars(1);
export const store = {
    pageCars: 1,
    cars,
    carsCount,
    animation: {}
};

