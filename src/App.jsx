import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [allCurrencies, setCurrencies] = useState(null);

  const getCurrencies = async () => {
    const allCurrencies = await axios.get(
      "https://api.freecurrencyapi.com/v1/currencies?apikey=APIKEY"
    );
    setCurrencies(allCurrencies);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              CurrencyConvert
            </a>
          </div>
        </div>
      </header>
      <section className="mt-5">
        <div className="container">
          <form action="">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-ms-12 col-md-4">
                <div className="form-group">
                  <select className="form-control">
                    {allCurrencies ? (
                      Object.values(allCurrencies.data.data).map((c, i) => (
                        <option key={i} value={c.code}>
                          {c.symbol} - {c.name}
                        </option>
                      ))
                    ) : (
                      <option>Loading...</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="col-ms-12  col-md-2">
                <div className="form-group">
                  <input
                    min="1"
                    type="number"
                    placeholder="0"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-ms-12 col-md-2">
                <div className="form-group">
                  <input type="number" className="form-control" disabled />
                </div>
              </div>
              <div className="col-ms-12 col-md-4">
                <div className="form-group">
                  <select className="form-control">
                    {allCurrencies ? (
                      Object.values(allCurrencies.data.data).map((c, i) => (
                        <option key={i} value={c.code}>
                          {c.symbol} - {c.name}
                        </option>
                      ))
                    ) : (
                      <option>Loading...</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary" type="submit">
                  Convert
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
