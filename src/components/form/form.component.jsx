import "./form.styles.scss";
import SearchBox from "./search-box/search-box.component";

const Form = ({ formSubmitHandler, inputValue, inputOnChangeHandler }) => {
  return (
    <form className="search-form" onSubmit={formSubmitHandler}>
      <SearchBox
        className="search-countries"
        inputValue={inputValue}
        inputOnChangeHandler={inputOnChangeHandler}
      />
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Form;
