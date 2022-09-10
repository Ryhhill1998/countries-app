import { useState, useEffect } from "react";
import "./App.scss";

const App = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [countryArea, setCountryArea] = useState([]);
  const [countryCapital, setCountryCapital] = useState([]);
  const [countryFlag, setCountryFlag] = useState([]);
  const [countryPopulation, setCountryPopulation] = useState([]);

  const url = "https://restcountries.com/v3.1/name";
  const url2 = "https://countryflagsapi.com/png";
  const query = "spain";

  const backgroundImg = `${process.env.PUBLIC_URL}/images/image.png`;

  useEffect(() => {
    getCountryData(query);
    getCountryFlag(query);
  }, []);

  const getCountryData = async (country) => {
    if (!query) return;
    const response = await fetch(`${url}/${country}`);
    const [data] = await response.json();
    console.log(data);
    const { area, capital, population } = data;
    setCountryArea(area);
    setCountryCapital(capital);
    setCountryPopulation(population);
  };

  const getCountryFlag = async (country) => {
    const response = await fetch(`${url2}/${country}`);
    setCountryFlag(response.url);
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="title-container">
        <h1 className="title">Country Database</h1>
      </div>
      <input
        className="search-countries"
        type="search"
        placeholder="Search countries"
      ></input>
      <div className="country-container">
        <div className="flag-img-container">
          <img className="flag-img" src={countryFlag} alt={`${query} flag`} />
        </div>
        <div className="country-details-container">
          <h2>Country: {query}</h2>
          <h2>Capital: {countryCapital}</h2>
          <h2>Population: {countryPopulation}</h2>
          <h2>Area: {countryArea} km²</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
