import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [allCurrencies, setAllCurrencies] = useState(null);
  const [curr, setCurr] = useState(null);
  const [inputCurr, setInputCurr] = useState(1);
  const [baseCurr, setBase] = useState(null);
  const [result, setResult] = useState("");
  const [times, setTimes] = useState(1);
  const [message, setMessage] = useState(
    "Please make a selection for currency conversion."
  );
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const cssClass = isError
    ? "text-danger"
    : isSuccess
    ? "text-success"
    : "text";

  const API_KEY = "YOUR_API_KEY";

  const getCurrencies = async () => {
    const allCurrencies = await axios.get(
      `https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`
    );
    setAllCurrencies(allCurrencies);
  };

  const convertCurrency = async () => {
    if (curr && baseCurr) {
      const currency = await axios.get(`
        https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${curr}&base_currency=${baseCurr}
      `);
      const response = currency.data.data;
      const total = Object.values(response)[0] * inputCurr;
      setResult(total.toFixed(2));
      setMessage("Good!");
      setIsSuccess(true);
      setIsError(false);
    } else {
      setMessage("Please make a selection for mandatory fields.");
      setIsSuccess(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <>
      <header className="p-3 bg-dark text-white border-bottom">
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
      <section className="mt-5 bg-dark text-white">
        <div className="container">
          <div>
            <h5 className={`text-center mb-5 ${cssClass}`}>{message}</h5>
          </div>
          <form action="#">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-ms-12  col-md-2">
                <div className="form-group">
                  <input
                    min="1"
                    value={times}
                    type="number"
                    placeholder="0"
                    className="form-control"
                    onChange={(e) => {
                      setTimes(Number(e.target.value));
                      setInputCurr(Number(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="col-ms-12 col-md-4">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setBase(e.target.value);
                    }}
                  >
                    <option value="">Select Currency</option>
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
              <div className="col-ms-12 col-md-2">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    disabled
                    value={result}
                  />
                </div>
              </div>
              <div className="col-ms-12 col-md-4">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setCurr(e.target.value);
                    }}
                  >
                    <option value="">Select base</option>
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
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.defaultPrevented;
                    convertCurrency();
                  }}
                >
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
