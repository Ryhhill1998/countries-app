import { useState, useEffect } from "react";
import "./App.scss";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryArea, setCountryArea] = useState([]);
  const [countryCapital, setCountryCapital] = useState([]);
  const [countryFlag, setCountryFlag] = useState([]);
  const [countryPopulation, setCountryPopulation] = useState([]);

  const url = "https://restcountries.com/v3.1/name";
  const url2 = "https://countryflagsapi.com/png";

  const backgroundImg = `${process.env.PUBLIC_URL}/images/image.png`;

  useEffect(() => {
    getCountryData(searchQuery);
    getCountryFlag(searchQuery);
  }, [searchQuery]);

  const getCountryData = async (country) => {
    const response = await fetch(`${url}/${country}`);
    const [data] = await response.json();
    const { area, capital, population } = data;
    setCountryArea(area);
    setCountryCapital(capital);
    setCountryPopulation(population);
  };

  const getCountryFlag = async (country) => {
    const response = await fetch(`${url2}/${country}`);
    setCountryFlag(response.url);
  };

  const onSearchChange = (event) => {
    const searchQueryString = event.target.value.toLowerCase();
    setSearchQuery(searchQueryString);
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
        onChange={onSearchChange}
      ></input>
      <div className="country-container">
        <img
          className="flag-img"
          src={countryFlag}
          alt={`${searchQuery} flag`}
        />
        <div className="country-details-container">
          <h2>Country: {searchQuery}</h2>
          <h2>Capital: {countryCapital}</h2>
          <h2>Population: {countryPopulation}</h2>
          <h2>Area: {countryArea} km²</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
