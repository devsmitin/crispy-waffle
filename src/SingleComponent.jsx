import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

class DataControl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
      },
      () => {
        typeof this.props.onupdate === "function" &&
          this.props.onupdate(name, value);
      }
    );
  };

  render() {
    let dataControl;
    const c_props = { ...this.props };

    delete c_props.onupdate;
    delete c_props.type;
    delete c_props.label;
    delete c_props.options;

    switch (this.props.type) {
      case "textarea":
        dataControl = (
          <div className="mb-3">
            <label className="form-label">{this.props.label}</label>
            <textarea
              className="form-control"
              type={this.props.type}
              {...c_props}
              onChange={this.handleInputChange}
            >
              {this.state[this.props.name]}
            </textarea>
          </div>
        );
        break;

      case "select":
        dataControl = (
          <div className="mb-3">
            <label className="form-label">{this.props.label}</label>
            <select
              className="form-select"
              {...c_props}
              onChange={this.handleInputChange}
            >
              <option value="">{this.props.label}</option>
              {this.props.options &&
                this.props.options.map((option) => (
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
            <label className="form-label">{this.props.label}</label>
            <input
              className="form-control"
              type={this.props.type}
              {...c_props}
              onChange={this.handleInputChange}
            />
          </div>
        );
        break;
    }
    return dataControl;
  }
}

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
    let { data, fname, desc, colors, update } = this.state;

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

    console.log("new_data", new_data);

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
                  <div className="bg-secondary text-white flex-fill text-center p-3" key={key}>
                    {key}: {colors[key]}
                  </div>
                ))}
                {/* <div className="bg-danger flex-fill text-center text-white p-3">
                  {red}
                </div>
                <div className="bg-success flex-fill text-center text-white p-3">
                  {green}
                </div>
                <div className="bg-primary flex-fill text-center text-white p-3">
                  {blue}
                </div> */}
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
