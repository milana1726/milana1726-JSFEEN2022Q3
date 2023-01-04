// import { animation } from "./data";

export const getCars = async (page, limit = 7) => {
    const url = `http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count')
    }
}

export const getCarById = async (id) => {
    const url = `http://127.0.0.1:3000/garage/${id}`;
    const response = await fetch(url);
    return await response.json();
}


export const createCar = async (dataParams) => {
    const url = "http://127.0.0.1:3000/garage";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(dataParams),
      headers: {
        "Content-Type": "application/json",
      }
    });
}

export const removeCar = async (id) => {
    const url = `http://127.0.0.1:3000/garage/${id}`;
        await fetch(url, { method: "DELETE" });
}

export const updateCar = async (nameCar, colorCar, id) => {
    const dataParams = {
      name: nameCar,
      color: colorCar,
    };
    const url = `http://127.0.0.1:3000/garage/${id}`;
    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataParams),
    });
}

export const engineStartStop = async (id, status) => {
    const url = `http://127.0.0.1:3000/engine/?id=${id}&status=${status}`;
    return await fetch(url).json();
}

export const driveCar = async (id) => {
    const url = `http://127.0.0.1:3000/engine/?id=${id}&status=drive`;
    const response = await fetch(url).catch();
    return response.status !== 200 ? { success: false} : {...await response.json()};
}



