import React, { Component } from "react";
import UserService from "../services/user.service";
import AdminService from "../services/admin-service";
import { withRouter } from '../common/with-router';
import AuthService from "../services/auth.service";

class BoardUserWarehouse extends Component {
    constructor(props) {
        super(props);
        this.onChangeWarehouseName = this.onChangeWarehouseName.bind(this);
        this.getWarehouse = this.getWarehouse.bind(this);
        this.getDeviceByWarehouse = this.getDeviceByWarehouse.bind(this);
        this.updateWarehouse = this.updateWarehouse.bind(this);
        this.deleteWarehouse = this.deleteWarehouse.bind(this);

        this.state = {
            devices: [],
            currentWarehouse: {
                warehouseId: null,
                warehouseName: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        (user.roles[0] == "ROLE_ADMIN") ? this.getWarehouse(this.props.router.params.id) : this.getDeviceByWarehouse(this.props.router.params.id);
    }

    onChangeWarehouseName(e) {
        const warehouseName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentWarehouse: {
                    ...prevState.currentWarehouse,
                    warehouseName: warehouseName
                }
            };
        });
    }


    getWarehouse(id) {
        UserService.getWarehousesById(id)
            .then(response => {
                this.setState({
                    currentWarehouse: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getDeviceByWarehouse(id) {
        UserService.getDeviceByWarehouseId(id)
            .then(response => {
                console.log('check res: ', response)
                this.setState({
                    devices: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateWarehouse() {
        AdminService.updateWarehouse(
            this.state.currentWarehouse.warehouseId,
            this.state.currentWarehouse
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Warehouse was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteWarehouse() {
        AdminService.deleteWarehouseId(this.state.currentWarehouse.warehouseId)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/user-warehouse');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentWarehouse, devices } = this.state;
        const user = AuthService.getCurrentUser();

        return (
            <div>
                <div className="edit-form">
                    {(user.roles[0] == "ROLE_ADMIN") ? <>
                        <h4>Warehouse</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentWarehouse.warehouseName}
                                    onChange={this.onChangeWarehouseName}
                                />
                            </div>
                        </form>
                    </> :
                        <>
                            <h4>Danh sách thiết bị theo kho</h4>
                            <ul className="list-group">
                                {devices &&
                                    devices.map((device, index) => (
                                        <li key={index}>
                                            {device.name}
                                        </li>
                                    ))}
                            </ul>
                        </>
                    }
                    {(user.roles[0] == "ROLE_ADMIN") ? <>
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteWarehouse}
                        >
                            Xóa
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateWarehouse}
                        >
                            Sửa
                        </button>
                        <p>{this.state.message}</p>
                    </>
                        :
                        ""
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(BoardUserWarehouse);