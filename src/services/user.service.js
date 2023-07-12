import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
    getAllWarehouses() {
        return axios.get(API_URL + 'get-all-warehouse', { headers: authHeader() });
    }

    getWarehousesById(id) {
        return axios.get(API_URL + `get-warehouse-by-id/${id}`, { headers: authHeader() })
    }

    getDeviceByWarehouseId(id) {
        return axios.get(API_URL + `get-device-by-warehouse?id=${id}`, { headers: authHeader() })
    }
}

export default new UserService();
