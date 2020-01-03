import React from "react";

const Option = props => (
  <div>
    <div>
      <span>Option >> {props.optionText}</span>
      <button
        onClick={e => {
          props.handleDeleteClick(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  </div>
);

export default Option;
