import React, { Component } from "react";

import AdminService from "../services/admin-service";

export default class AddWarehouse extends Component {
  constructor(props) {
    super(props);
    this.onChangeWarehouseName = this.onChangeWarehouseName.bind(this);
    this.saveWarehouse = this.saveWarehouse.bind(this);
    this.newWarehouse = this.newWarehouse.bind(this);

    this.state = {
      warehouseId: null,
      warehouseName: "",

      submitted: false
    };
  }

  onChangeWarehouseName(e) {
    this.setState({
      warehouseName: e.target.value
    });
  }

  saveWarehouse() {
    var data = {
      warehouseName: this.state.warehouseName
    };
    console.log(data);

    AdminService.createWarehouses(data)
      .then(response => {
        this.setState({
          warehouseId: response.data.warehouseId,
          warehouseName: response.data.warehouseName,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWarehouse() {
    this.setState({
      warehouseId: null,
      warehouseName: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWarehouse}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.warehouseName}
                onChange={this.onChangeWarehouseName}
                name="name"
              />
            </div>

            <button onClick={this.saveWarehouse} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
