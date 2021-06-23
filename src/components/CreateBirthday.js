import { useState, useContext } from "react";
import { useContract, Web3Context } from "web3-hooks";
import { DeployAddress, DeployAbi } from "../contracts/Deploy";
import { ethers } from "ethers";

const CreateBirthday = ({ setMenu }) => {
  const deploy = useContract(DeployAddress, DeployAbi);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [date, setDate] = useState(1);
  const [web3State] = useContext(Web3Context);
  const [contractAddress, setContractAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickCreate = async () => {
    try {
      setLoading(true);
      console.log(
        "Birthday Address from getContractAddress:",
        ethers.utils.getContractAddress({
          from: DeployAddress,
          nonce: await web3State.provider.getTransactionCount(DeployAddress),
        })
      );
      const tx = await deploy.createBirthday(receiverAddress, date);
      await tx.wait();
      const test = await web3State.provider.getTransactionReceipt(tx.hash);
      setContractAddress("0x" + test.logs[0].topics[1].slice(-40));
      //alert("Deployed");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  /* remove event listener, better solution to get contract address
  useEffect(() => {
    if (deploy) {
      const listener = (addressContract) => {
        console.log("Contract address event: ", addressContract);
      };
      deploy.on("Created", listener);
      return () => {
        deploy.off("Created", listener);
      };
    }
  }, [deploy]);
  */

  return (
    <>
      <h2>Deploy</h2>
      <form className="m-3">
        <label className="m-3">
          Destinataire de la cagnotte:&nbsp;
          <input
            placeholder="Ethereum Address"
            size="47"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="date">Durée de la cagnotte:&nbsp;</label>
        <input
          id="date"
          type="number"
          min="1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <span> (en secondes)</span>
        <br />
        <button
          type="button"
          className="m-3 btn"
          style={{ backgroundColor: "#faff73" }}
          onClick={handleClickCreate}
        >
          Create Birthday
        </button>
      </form>
      {loading && (
        <div className="m-3">
          <span className="display-3">Loading</span>
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
      )}
      {contractAddress && (
        <>
          <code
            className="p-3 col-4 rounded-3"
            style={{ backgroundColor: "#ffe0f7", color: "#251f44" }}
          >
            Birthday Address: <strong>{contractAddress}</strong>
          </code>
          <br />
          {/*<button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 17">
              <path
                fill="#666666"
                d="M13.806 4.068h-3.182V.886A.637.637 0 0 0 9.988.25h-8.91a.637.637 0 0 0-.636.636V12.34c0 .352.285.637.637.637h3.18v3.182c0 .35.286.635.637.635h8.91a.637.637 0 0 0 .635-.636V4.704a.637.637 0 0 0-.636-.637zm-9.546.637v7H1.715V1.523H9.35v2.545H4.898a.637.637 0 0 0-.637.637zm8.91 10.818H5.533V5.34h7.637v10.182z"
              />
            </svg>{" "}
            Copy
      </button>*/}
        </>
      )}
      <br />
      <button
        type="button"
        className="btn m-3"
        style={{ backgroundColor: "#fe91ca", color: "#251f44" }}
        onClick={() => setMenu("Menu")}
      >
        Retour
      </button>
    </>
  );
};

export default CreateBirthday;
