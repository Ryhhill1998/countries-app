import "./details.styles.scss";

const Details = ({ capital, population, area }) => {
  return (
    <div className="country-details-container">
      <h2>
        Capital: <span className="detail-text">{capital}</span>
      </h2>
      <h2>
        Population:{" "}
        <span className="detail-text">
          {population.toLocaleString(navigator.language)}
        </span>
      </h2>
      <h2>
        Area:{" "}
        <span className="detail-text">
          {area.toLocaleString(navigator.language)} km²
        </span>
      </h2>
    </div>
  );
};

export default Details;
