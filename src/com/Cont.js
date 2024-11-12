import React, { createContext, useContext, useReducer } from 'react';

// Create contexts
const CreateStateContext = createContext();
const CreateDispatchContext = createContext();

// Define a reducer function
const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, img: action.img, price: action.price }];
      case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
    case "DROP":
        let empArray = []
        return empArray
    case "UPDATE":
        let arr = [...state]
        arr.find((food, index) => {
            if (food.id === action.id) {
                console.log(food.qty, parseInt(action.qty), action.price + food.price)
                arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
            }
            return arr
        })
        return arr
    default:
      console.log("Action type not found");
      return state; 
  }
};

// Define the Card component
export const Card = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, []);

  return (
    <CreateDispatchContext.Provider value={dispatch}>
      <CreateStateContext.Provider value={state}>
        {children}
      </CreateStateContext.Provider>
    </CreateDispatchContext.Provider>
  );
};

// Custom hooks for state and dispatch
export const useCreateState = () => useContext(CreateStateContext);
export const useCreateDispatch = () => useContext(CreateDispatchContext);
