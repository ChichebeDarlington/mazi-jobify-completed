import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>

      <input
        type="text"
        value={value}
        name={name}
        id="name"
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
