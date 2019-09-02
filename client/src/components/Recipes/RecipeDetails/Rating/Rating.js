import React from "react";
import PropTypes from "prop-types";
import className from "classnames";
import "./rating.css";

function Rating(props) {
  const clickHandler = evt => {
    props.ratingChange(Number(evt.target.id));
  };

  const convertFactory = (rating, handler) => (elem, indx) => {
    var selectedClass = className({
      selected: elem === rating
    });
    return (
      <span id={elem} key={indx} onClick={handler} className={selectedClass}>
        ☆
      </span>
    );
  };

  const convertToSpans = convertFactory(props.rating, clickHandler);

  return <div className="rating">{[5, 4, 3, 2, 1].map(convertToSpans)}</div>;
}

Rating.propTypes = {
  ratingChange: PropTypes.func.isRequired,
  rating: PropTypes.number
};

Rating.defaultProps = {
  rating: 0
};

export default Rating;
