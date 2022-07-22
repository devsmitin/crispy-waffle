import React, { useContext } from "react";
import { AppContext } from "./app-context";
import DataControl from "./DataControl";

export default function ContextForm() {
  const value = useContext(AppContext);

  const { mainData, updateData, printTable, resetData } = value;

  const update = (name, value) => {
    updateData({ ...mainData, [name]: value });
  };

  return (
    <div className="form-main card card-body">
      <DataControl
        label="Name"
        type="text"
        name="fname"
        value={mainData.fname}
        onupdate={update}
      />
      <DataControl
        label="Color"
        type="select"
        name="desc"
        options={["Red", "Green", "Blue"]}
        value={mainData.desc}
        onupdate={update}
      />

      <div className="d-flex">
        <button type="button" className="btn btn-primary" onClick={printTable}>
          {mainData.update === false ? "Submit" : "Update"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={resetData}
        >
          Reset
        </button>
      </div>

      <div className="d-flex mt-3">
        {Object.keys(mainData.colors).map((key) => (
          <div
            className="bg-secondary text-white flex-fill text-center p-3"
            key={key}
          >
            {key}: {mainData.colors[key]}
          </div>
        ))}
      </div>
    </div>
  );
}
