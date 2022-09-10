import { useState, useEffect } from "react";
import "./App.scss";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryArea, setCountryArea] = useState([]);
  const [countryCapital, setCountryCapital] = useState([]);
  const [countryFlag, setCountryFlag] = useState([]);
  const [countryPopulation, setCountryPopulation] = useState([]);

  const url = "https://restcountries.com/v3.1/name";
  const query = "france";

  useEffect(() => {
    getCountryData(query);
  }, []);

  const getCountryData = async (country) => {
    if (!query) return;
    const response = await fetch(`${url}/${country}`);
    const [data] = await response.json();
    console.log(data);
    const { area, capital, flag, population } = data;
    setCountryArea(area);
    setCountryCapital(capital);
    setCountryFlag(flag);
    setCountryPopulation(population);
  };

  return (
    <div className="container">
      <h1 className="title">Country Database</h1>
      <input
        className="search-countries"
        type="search"
        placeholder="Search countries"
      ></input>
      <div className="country-data">
        <h2>{countryArea}</h2>
        <h2>{countryCapital}</h2>
        <h2>{countryFlag}</h2>
        <h2>{countryPopulation}</h2>
      </div>
    </div>
  );
};

export default App;
