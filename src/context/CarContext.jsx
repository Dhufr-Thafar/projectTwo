import { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
const CarContext = createContext();

const carReducer = (state, action) => {
  if (action.type == "init") {
    return action.payload;
  } else if (action.type == "addCar") {
    return [...state, action.payload];
  } else if (action.type == "deleteById") {
    const id = action.payload;
    return state.filter((car) => car.id !== id);;
  } else {
    return state;
  }
};

const CarProvider = (props) => {
  const [cars, dispatch] = useReducer(carReducer, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/cars");
      dispatch({ type: "init", payload: response.data.result });
    };

    getData();
  }, []);

  const addCars = (car) => {
    dispatch({ type: "addCar", payload: car });
  };

  const deleteCarById = (id) => {
    const resultList = cars.filter((car) => car.id !== id);
    setCars(resultList);
  };

  return (
    <CarContext.Provider value={{ cars, addCars, deleteCarById, dispatch }}>
      {props.children}
    </CarContext.Provider>
  );
};

export { CarProvider, CarContext };
