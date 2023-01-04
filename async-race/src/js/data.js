import { getCars } from "./api.js";
export const dataCars = ["Lada", "Lexus", "Mercedes-Benz", "Renault", "KIA", "Audi", "Scoda", "Tesla", "Mazda", "Ford", "Honda"];
export const dataModels = ["Granta", "LS", "s600", "Logan", "Sorento", "TT", "Fabia", "Model S", "CX-7", "Mustang", "Accord"];
export const winnerCarArr = [];

const { items: cars, count: carsCount } = await getCars(1);
export const store = {
    pageCars: 1,
    cars,
    carsCount
};

export const getHexRGBColor = (color) => {
    color = color.replace(/\s/g, "");
    const aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    if (aRGB) {
        color = "";
        for (let i = 1; i <= 3; i += 1) {
            color += Math.round((aRGB[i][aRGB[i].length - 1] === "%" ? 2.55 : 1) * parseInt(aRGB[i], 10))
            .toString(16)
            .replace(/^(.)$/, "0$1");
        }
    } else {
            color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, "$1$1$2$2$3$3");
    }
    return color;
};

export const getRandomColor = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const getRandomName = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const animation = (velocity, event, status) => {
    // if (velocity >= 100) {
    //     velocity /= 10;
    // }

    const carSvg = event.parentNode.parentNode.children[1].children[2];
    if (status === false) {
        carSvg.classList.remove("startAnumation");
    } else {
    carSvg.style.animationDuration = `${velocity}s`;
    carSvg.classList.add("startAnumation");
  }
}

