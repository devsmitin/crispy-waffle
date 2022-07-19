import React, { Component } from "react";
import DataControl from "./DataControl";
import Table from "./Table";

import "bootstrap/dist/css/bootstrap.min.css";
class SingleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fname: "",
      desc: "",
      colors: {
        Red: 0,
        Green: 0,
        Blue: 0,
      },
      update: false,
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  printTable = () => {
    let { data, fname, desc, update } = this.state;

    let new_data;

    if (fname.trim() === "" || desc.trim() === "") {
      alert("both fields are required");
      return false;
    }

    if (update !== false) {
      new_data = [...data];

      new_data[update] = {
        fname: fname.trim(),
        desc: desc.trim(),
      };
    } else {
      let dataExists = data.find((row) => row.fname === fname.trim());

      if (dataExists) {
        alert("data duplicate");
        return false;
      }

      let row_data = {
        fname: fname.trim(),
        desc: desc.trim(),
      };
      new_data = [...data];
      new_data.push(row_data);
    }

    let new_colors = this.updateColors(new_data);

    this.setState({
      data: new_data,
      fname: "",
      desc: "",
      colors: new_colors,
      update: false,
    });
  };

  updateColors = (data) => {
    let { colors } = this.state;
    let new_colors = {};

    for (const color of Object.keys(colors)) {
      let color_entries = data.filter((row) => row.desc === color);
      new_colors[color] = color_entries.length;
    }

    return new_colors;
  };

  resetData = () => {
    this.setState({ fname: "", desc: "", update: false });
  };

  updateValues = (index, action) => {
    if (action === "delete") {
      let { data } = this.state;
      data.splice(index, 1);
      let new_colors = this.updateColors(data);
      this.setState({ data, colors: new_colors });
    } else if (action === "update") {
      let { data } = this.state;
      let { fname, desc } = data[index];
      this.setState({
        fname,
        desc,
        update: index,
      });
    }
  };

  render() {
    const { update, colors } = this.state;
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <div className="form-main card card-body">
              <DataControl
                label="Name"
                type="text"
                name="fname"
                value={this.state.fname}
                onupdate={this.handleInputChange}
              />
              <DataControl
                label="Color"
                type="select"
                name="desc"
                options={["Red", "Green", "Blue"]}
                value={this.state.desc}
                onupdate={this.handleInputChange}
              />

              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.printTable}
                >
                  {update === false ? "Submit" : "Update"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={this.resetData}
                >
                  Reset
                </button>
              </div>

              <div className="d-flex mt-3">
                {Object.keys(colors).map((key) => (
                  <div
                    className="bg-secondary text-white flex-fill text-center p-3"
                    key={key}
                  >
                    {key}: {colors[key]}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="form-output">
              <Table data={this.state.data} updateValues={this.updateValues} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleComponent;
