export const dataCars = ['Lada', 'Lexus', 'Mercedes-Benz', 'Renault', 'KIA', 'Audi', 'Scoda', 'Tesla', 'Mazda', 'Ford', 'Honda'];
export const dataModels = ['Granta', 'LS', 's600', 'Logan', 'Sorento', 'TT', 'Fabia', 'Model S', 'CX-7', 'Mustang', 'Accord'];

export const getHexRGBColor = (color) => color.toString(16);

export const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

export const getRandomName = (arr) => Math.floor(Math.random() * arr.length);

const getPositionAtCenter = (element) => {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    positionX: left + width / 2,
    positionY: top + height / 2,
  };
};

export const getDistance = (posA, posB) => {
  const positionA = getPositionAtCenter(posA);
  const positionB = getPositionAtCenter(posB);
  return Math
    .hypot(positionA.positionX - positionB.positionX, positionA.positionY - positionB.positionY);
};
