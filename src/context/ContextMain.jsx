import React, { useState } from "react";
import { AppContext, appData } from "./app-context";
import ContextForm from "./ContextForm";
import ContextTable from "./ContextTable";

export default function ContextMain() {
  const [mainData, updateData] = useState(appData);

  const updateColors = (data) => {
    let { colors } = mainData;
    let newColors = {};

    for (const color of Object.keys(colors)) {
      let colorEntries = data.filter((row) => row.desc === color);
      newColors[color] = colorEntries.length;
    }

    return newColors;
  };

  const printTable = () => {
    let { data, fname, desc, update } = mainData;
    let newData;
    if (fname.trim() === "" || desc.trim() === "") {
      alert("both fields are required");
      return false;
    }

    if (update !== false) {
      newData = [...data];

      newData[update] = {
        fname: fname.trim(),
        desc: desc.trim(),
      };
    } else {
      let dataExists = data.find((row) => row.fname === fname.trim());

      if (dataExists) {
        alert("data duplicate");
        return false;
      }

      let rowData = {
        fname: fname.trim(),
        desc: desc.trim(),
      };
      newData = [...data];
      newData.push(rowData);
    }
    let newColors = updateColors(newData);

    updateData({
      ...mainData,
      data: newData,
      fname: "",
      desc: "",
      colors: newColors,
      update: false,
    });
  };

  const resetData = () => {
    updateData({ ...mainData, fname: "", desc: "" });
  };

  const updateValues = (index, action) => {
    let { data } = mainData;
    let update = {};
    if (action === "delete") {
      data.splice(index, 1);
      let newColors = updateColors(data);
      update = { data, colors: newColors };
    } else if (action === "update") {
      let { fname, desc } = data[index];
      update = { fname, desc, update: index };
    }
    updateData({ ...mainData, ...update });
  };

  return (
    <AppContext.Provider
      value={{ mainData, updateData, printTable, resetData, updateValues }}
    >
      <div className="row">
        <div className="col-md-3">
          <ContextForm />
        </div>
        <div className="col-md-8">
          <div className="form-output">
            <ContextTable />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
