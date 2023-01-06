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

export const getHexRGBColor = (color) => {
    return color.toString(16);
};

export const getRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
}

export const getRandomName = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

const getPositionAtCenter = (element) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2
    }
}

export const getDistance = (a, b) => {
    const positionA =  getPositionAtCenter(a);
    const positionB =  getPositionAtCenter(b);
    return Math.hypot(positionA.x - positionB.x, positionA.y - positionB.y);
};
