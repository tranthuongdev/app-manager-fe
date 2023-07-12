import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/admin/';

class AdminService {
    createWarehouses() {
        return axios.post(API_URL + 'create-warehouse', { headers: authHeader() });
    }

    updateWarehouse(id) {
        return axios.put(API_URL + `update-warehouse/${id}`, { headers: authHeader() })
    }

    deleteWarehouseId(id) {
        return axios.delete(API_URL + `delete-warehouse/${id}`, { headers: authHeader() })
    }
}

export default new AdminService();
