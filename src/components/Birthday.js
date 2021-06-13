import { useContext, useState } from "react";
import { BirthdayContext } from "./Birthdays";
import { ethers } from "ethers";
import { Web3Context } from "web3-hooks";

const Birthday = () => {
  const { birthday, address, setAddress } = useContext(BirthdayContext);
  const [web3State] = useContext(Web3Context);
  const [address2, setAddress2] = useState(ethers.constants.AddressZero);
  const [date, setDate] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [eth2Send, setEth2Send] = useState("0");
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);

  const handleClickContract = async () => {
    setLoading(true);
    try {
      const receiver = await birthday.receiver();
      const date = await birthday.dateBirthday();
      const balance = await web3State.provider.getBalance(address);
      setAddress2(receiver.toString());
      setDate(date.toString());
      setContractBalance(ethers.utils.formatEther(balance));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setClick(true);
    }
  };

  /*
  const handleAddress2 = async () => {
    try {
      const receiver = await birthday.receiver();
      setAddress2(receiver.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const handleDate = async () => {
    try {
      const date = await birthday.dateBirthday();
      setDate(date.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const handleContractBalance = async () => {
    try {
      const balance = await web3State.provider.getBalance(address);
      setContractBalance(ethers.utils.formatEther(balance));
    } catch (e) {
      console.error(e);
    }
  };
  */

  const handleClickSend = async () => {
    const EtherAmount = ethers.utils.parseEther(eth2Send);
    try {
      const tx = await birthday.offer({
        value: EtherAmount,
      });
      await tx.wait();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickGetPresent = async () => {
    try {
      const tx = await birthday.getPresent();
      await tx.wait();
      console.log("Boom retrait");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h2>Birthday</h2>
      <div>
        <div>
          <label>Birthday Contract Address:&nbsp;</label>
          <input
            type="address"
            value={address}
            placeholder="birthday contract address"
            size="47"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={handleClickContract}
          >
            Go !
          </button>
        </div>
      </div>
      {loading ? (
        <div className="m-3">
          <div className="spinner-grow text-dark me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        click && (
          <>
            <p className="mt-2">Receiver Address: {address2}</p>
            <p>Date: {date}</p>
            <p>Contract Balance: {contractBalance} ETH</p>
            {/*<button type="button" onClick={handleAddress2}>
              Receiver Address
            </button>
            <button type="button" onClick={handleDate}>
              Date
            </button>
            <button type="button" onClick={handleContractBalance}>
              Balance
            </button>*/}
            <br />
            {web3State.account.toUpperCase() === address2.toUpperCase() ? (
              <>
                <button
                  type="button"
                  className="m-3 btn"
                  style={{ backgroundColor: "#faff73" }}
                  onClick={handleClickGetPresent}
                >
                  Get Present
                </button>
                <br />
              </>
            ) : (
              <>
                <label htmlFor="eth2send">Send to: {address}&nbsp;</label>
                <input
                  id="eth2Send"
                  type="text"
                  placeholder="ether ammount"
                  size="10"
                  value={eth2Send}
                  onChange={(event) => setEth2Send(event.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                  onClick={handleClickSend}
                >
                  Send
                </button>
                <br />
              </>
            )}
          </>
        )
      )}
    </>
  );
};

export default Birthday;
