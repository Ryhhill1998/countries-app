import "./search-box.styles.scss";

const SearchBox = ({ inputValue, inputOnChangeHandler, className }) => {
  return (
    <input
      className={className}
      type="text"
      value={inputValue}
      onChange={inputOnChangeHandler}
      placeholder="Enter a country"
    />
  );
};

export default SearchBox;
