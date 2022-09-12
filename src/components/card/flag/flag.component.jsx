import "./flag.styles.scss";

const Flag = ({ className, imgSrc, altText }) => {
  return <img className={className} src={imgSrc} alt={altText} />;
};

export default Flag;
