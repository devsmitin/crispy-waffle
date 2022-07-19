import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let details = this.props.data.map((row, i) => (
      <tr key={row.fname} data-index={i}>
        <td>{row.fname}</td>
        <td>{row.desc}</td>
        <td>
          <u
            role="button"
            tabIndex={0}
            onClick={() => this.props.updateValues(i, "update")}
          >
            Update
          </u>
        </td>
        <td>
          <u
            role="button"
            tabIndex={0}
            onClick={() => this.props.updateValues(i, "delete")}
          >
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
}

export default Table;
