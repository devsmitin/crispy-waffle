import React, { useEffect, useState } from "react";

export default function ContextInputs(props) {
  const [inputValue, updateValue] = useState("");
  const { name, type, label, onupdate, propVal } = props;

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    updateValue(value);
  };

  useEffect(() => {
    onupdate(name, inputValue);
  }, [inputValue]);

  let dataControl;
  const currentProps = { ...props };

  delete currentProps.onupdate;
  delete currentProps.type;
  delete currentProps.label;
  delete currentProps.options;
  delete currentProps.value;

  switch (type) {
    case "textarea":
      dataControl = (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <textarea
            className="form-control"
            {...currentProps}
            onChange={handleInputChange}
          >
            {propVal}
          </textarea>
        </div>
      );
      break;

    case "select":
      dataControl = (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <select
            className="form-select"
            {...currentProps}
            onChange={handleInputChange}
          >
            <option value="">{label}</option>
            {props.options &&
              props.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      );
      break;

    default:
      dataControl = (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <input
            className="form-control"
            type={type}
            {...currentProps}
            value={propVal}
            onChange={handleInputChange}
          />
        </div>
      );
      break;
  }
  return dataControl;
}
