import { createContext, useState } from "react";
import { useContract } from "web3-hooks";
import { Birthday_abi } from "../contracts/Birthday";
import Birthday from "./Birthday";
import { ethers } from "ethers";

export const BirthdayContext = createContext(null);

const Birthdays = ({ setMenu }) => {
  const [address, setAddress] = useState(ethers.constants.AddressZero);
  const birthday = useContract(address, Birthday_abi);

  return (
    <BirthdayContext.Provider value={{ birthday, address, setAddress }}>
      <Birthday />
      <button
        type="button"
        className="btn m-3"
        style={{ backgroundColor: "#fe91ca", color: "#251f44" }}
        onClick={() => setMenu("Menu")}
      >
        Retour
      </button>
    </BirthdayContext.Provider>
  );
};

export default Birthdays;
