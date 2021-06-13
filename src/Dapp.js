import React, { useContext, useState } from "react";
import { Web3Context } from "web3-hooks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Birthdays from "./components/Birthdays";
import CreateBirthday from "./components/CreateBirthday";

function Dapp() {
  const [web3State, login] = useContext(Web3Context);
  const [menu, setMenu] = useState("Menu");

  return (
    <>
      <Header />
      <main
        className="App min-vh-100 text-center pt-3"
        style={{ backgroundColor: "#d3dbff", color: "#251f44" }}
      >
        {!web3State.isLogged ? (
          <>
            <button
              type="button"
              className="btn btn-light btn-lg"
              onClick={login}
            >
              login
            </button>
          </>
        ) : (
          <>
            <div className="offset-9">
              <span
                className="btn"
                style={{ backgroundColor: "#002395", color: "#FFF" }}
              >
                {web3State.networkName}{" "}
              </span>
              <span className="btn" style={{ backgroundColor: "#F7F7F7" }}>
                {web3State.account?.slice(0, 8) + "..."}{" "}
              </span>
              <span
                className="btn"
                style={{ backgroundColor: "#ED2939", color: "#FFF" }}
              >
                {web3State.balance} ETH
              </span>
            </div>
            {web3State.chainId === 4 ? (
              <>
                {/*
            <img
              src="https://geo.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fgeo.2F2021.2F04.2F21.2F7f9272f7-0c1b-4d61-9af1-045fe3166b46.2Ejpeg/1150x647/background-color/ffffff/quality/70/tout-ce-quil-faut-savoir-sur-le-panda-roux.jpg"
              className="d-block"
              alt="..."
            />
            <img
              src="https://gurumed-oxn8moh.netdna-ssl.com/wp-content/uploads/2020/02/panda-roux-3-20_thumb.jpg"
              className="d-block"
              alt="..."
            />
            <img
              src="https://images.rtl.fr/~r/880v587/rtl/www/1292656-portrait-de-panda-roux.jpg"
              className="d-block"
              alt="..."
            />
            */}
                {menu === "Menu" && (
                  <>
                    <h2>Menu</h2>
                    <button
                      type="button"
                      className="btn me-5"
                      style={{ backgroundColor: "#ffe0f7", color: "#251f44" }}
                      onClick={() => setMenu("Create")}
                    >
                      Create Cagnotte
                    </button>
                    <button
                      type="button"
                      className="btn ms-5"
                      style={{ backgroundColor: "#251f44", color: "#ffe0f7" }}
                      onClick={() => setMenu("Check")}
                    >
                      Check Cagnotte
                    </button>
                  </>
                )}
                {menu === "Create" && <CreateBirthday setMenu={setMenu} />}
                {menu === "Check" && <Birthdays setMenu={setMenu} />}
              </>
            ) : (
              <h2 className="display-1">You need to be on rinkeby</h2>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Dapp;
