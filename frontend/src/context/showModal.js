
import { createContext, useContext, useState } from "react";

const ShowModalContext = createContext();

export const ShowModalProvider = (props) => {
  const [show, setShow] = useState(false);
  const [num, setNum] = useState(0);


  return (
    <ShowModalContext.Provider value={{ show, setShow, num, setNum }}>
      {props.children}
    </ShowModalContext.Provider>
  );
};

export const useShowModal = () => useContext(ShowModalContext);
