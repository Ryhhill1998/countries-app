import { useState } from "react";
import "./App.scss";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryVisible, setCountryVisible] = useState(false);
  const [countryArea, setCountryArea] = useState([]);
  const [countryCapital, setCountryCapital] = useState([]);
  const [countryFlag, setCountryFlag] = useState([]);
  const [countryPopulation, setCountryPopulation] = useState([]);

  const url = "https://restcountries.com/v3.1/name";
  const url2 = "https://countryflagsapi.com/png";

  const backgroundImg = `${process.env.PUBLIC_URL}/images/image.png`;

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
    setCountryVisible(true);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    getCountryData(searchQuery);
    getCountryFlag(searchQuery);
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
      <form className="search-form" onSubmit={formSubmit}>
        <input
          className="search-countries"
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Enter a country"
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      <div className={`country-container ${countryVisible ? "" : "hidden"}`}>
        <img
          className="flag-img"
          src={countryFlag}
          alt={`${searchQuery} flag`}
        />
        <div className="country-details-container">
          <h2>
            Capital: <span className="detail-text">{countryCapital}</span>
          </h2>
          <h2>
            Population:{" "}
            <span className="detail-text">
              {countryPopulation.toLocaleString(navigator.language)}
            </span>
          </h2>
          <h2>
            Area:{" "}
            <span className="detail-text">
              {countryArea.toLocaleString(navigator.language)} km²
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default App;
