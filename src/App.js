import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState();
  const [selectedCoin, setSelectedCoin] = useState();
  const onChangeSelect = (event) => setSelectedCoin(event.target.value);
  const onChange = (event) => setDollar(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (dollar === "") {
      return;
    }
    setDollar("");
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={dollar}
          type="number"
          placeholder="How much do you have?"
        />
      </form>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onChangeSelect}>
            {coins.map((coin, index) => {
              return (
                <option id={index} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
                </option>
              );
            })}
          </select>
          <hr />
          you can get {dollar / selectedCoin}
        </div>
      )}
    </div>
  );
}

/*
function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDo("");
    setToDos((currentArray) => [toDo, ...currentArray]);
  };
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      {toDos.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
}*/

export default App;
