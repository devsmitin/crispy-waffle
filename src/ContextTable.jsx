import React, { useContext } from "react";
import { AppContext } from "./app-context";

export default function ContextTable() {
  const value = useContext(AppContext);

  const { mainData, updateValues } = value;

  let details = mainData.data.map((row, i) => (
    <tr key={row.fname} data-index={i}>
      <td>{row.fname}</td>
      <td>{row.desc}</td>
      <td>
        <u role="button" tabIndex={0} onClick={() => updateValues(i, "update")}>
          Update
        </u>
      </td>
      <td>
        <u role="button" tabIndex={0} onClick={() => updateValues(i, "delete")}>
          Delete
        </u>
      </td>
    </tr>
  ));

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <td>Name</td>
          <td>Color</td>
          <td colSpan={2}>Controls</td>
        </tr>
      </thead>
      <tbody>{details}</tbody>
    </table>
  );
}
