const garage = 'http://127.0.0.1:3000/garage';
const winners = 'http://127.0.0.1:3000/winners';
const engine = 'http://127.0.0.1:3000/engine';

export const getCars = async (page, limit = 7) => {
  const url = `${garage}?_page=${page}&_limit=${limit}`;
  const response = await fetch(url);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCarById = async (id) => {
  const url = `${garage}/${id}`;
  const response = await fetch(url);
  return response.json();
};

export const createCar = async (body) => {
  const url = `${garage}`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteCar = async (id) => {
  const url = `${garage}/${id}`;
  await fetch(url, { method: 'DELETE' });
};

export const updateCar = async (nameCar, colorCar, id) => {
  const body = {
    name: nameCar,
    color: colorCar,
  };
  const url = `${garage}/${id}`;
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const engineStartStop = async (id, status) => {
  const url = `${engine}/?id=${id}&status=${status}`;
  const response = await fetch(url, { method: 'PATCH' });
  return response.json();
};

export const driveCar = async (id) => {
  const url = `${engine}/?id=${id}&status=drive`;
  const response = await fetch(url, { method: 'PATCH' }).catch();
  if (response.status !== 200) {
    return { success: false };
  }
  return { ...await response.json() };
};

export const getWinners = async ({
  page, limit = 10, sort, order,
}) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const items = await response.json();

  return {
    items: await Promise.all(items
      .map(async (winner) => ({ ...winner, car: await getCarById(winner.id) }))),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinnerById = async (id) => {
  const url = `${winners}/${id}`;
  const response = await fetch(url);
  return response.json();
};

export const getWinnerStatus = async (id) => {
  const url = `${winners}/${id}`;
  return (await fetch(url)).status;
};

export const deleteWinner = async (id) => {
  const url = `${winners}/${id}`;
  await fetch(url, { method: 'DELETE' });
};

export const createWinner = async (body) => {
  const url = `${winners}`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export const updateWinners = async (id, body) => {
  const url = `${winners}/${id}`;
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const saveWinner = async ({ id, time }) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinnerById(id);
    await updateWinners(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
