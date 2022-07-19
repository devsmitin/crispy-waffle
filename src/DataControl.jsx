import React, { Component } from "react";

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

export default DataControl;
