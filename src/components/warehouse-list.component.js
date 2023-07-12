import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

export default class BoardUserWarehouseList extends Component {

  constructor(props) {
    super(props);
    this.setActiveWarehouse = this.setActiveWarehouse.bind(this);
    this.state = {
      warehouses: [],
      currentWarehouse: null,
      currentIndex: -1
    };
  }

  componentDidMount() {

    UserService.getAllWarehouses()
      .then(
        response => {
          this.setState({
            warehouses: response.data
          });
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
  }

  setActiveWarehouse(warehouse, index) {
    this.setState({
      currentWarehouse: warehouse,
      currentIndex: index
    });
  }

  render() {
    const { warehouses, currentWarehouse, currentIndex } = this.state;
    const user = AuthService.getCurrentUser();
    console.log(user.roles[0]);

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Danh sách kho</h4>

          <ul className="list-group">
            {warehouses &&
              warehouses.map((warehouse, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveWarehouse(warehouse, index)}
                  key={index}
                >
                  {warehouse.warehouseName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentWarehouse ? (
            <div>
              <h4>Kho</h4>
              <div>
                <label>
                  <strong>Tên kho:</strong>
                </label>{" "}
                {currentWarehouse.warehouseName}
              </div>
              {(user.roles[0] == "ROLE_USER") ?
                <Link
                  to={"/warehouses/" + currentWarehouse.warehouseId}
                  className="badge badge-warning"
                >
                  Xem
                </Link>
                :
                <Link
                  to={"/warehouses/" + currentWarehouse.warehouseId}
                  className="badge badge-warning"
                >
                  Sửa
                </Link>
              }
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a warehouse...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}