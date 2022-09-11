import { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countryVisible, setCountryVisible] = useState(false);
  const [countryArea, setCountryArea] = useState([]);
  const [countryCapital, setCountryCapital] = useState([]);
  const [countryFlag, setCountryFlag] = useState([]);
  const [countryPopulation, setCountryPopulation] = useState([]);

  const urlAll = "https://restcountries.com/v3.1/all";
  const urlName = "https://restcountries.com/v3.1/name";
  const urlFlag = "https://countryflagsapi.com/png";

  const backgroundImg = `${process.env.PUBLIC_URL}/images/image.png`;

  useEffect(() => {
    getAllCountries();
  });

  const getAllCountries = async () => {
    try {
      const response = await fetch(urlAll);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} country data not found`);
      }
      const data = await response.json();
      const countries = data.map((country) =>
        country.name.common.toLowerCase()
      );
      setAllCountries(countries);
    } catch (err) {
      alert(err.message);
    }
  };

  const getCountryData = async (country) => {
    try {
      const response = await fetch(`${urlName}/${country}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} country data not found`);
      }
      const data = await response.json();
      const { area, capital, population } = data?.[0];
      setCountryArea(area);
      setCountryCapital(capital);
      setCountryPopulation(population);
    } catch (err) {
      alert(err.message);
    }
  };

  const getCountryFlag = async (country) => {
    try {
      const response = await fetch(`${urlFlag}/${country}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} flag not found`);
      }
      setCountryFlag(response.url);
    } catch (err) {
      alert(err.message);
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (!allCountries.includes(searchQuery.toLowerCase())) {
      alert("Sorry, we do not currently have data on this country!");
      return;
    }
    getCountryData(searchQuery);
    getCountryFlag(searchQuery);
    setCountryVisible(true);
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
