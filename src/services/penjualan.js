import axios from 'axios';
import { API_URL } from '../api_url';
export default class PenjualanService {
    
    get() {
        const url = `${API_URL}/penjualan/get.php`;
        return axios.get(url).then(response => response.data);
    }
    getById(id) {
        const url = `${API_URL}/penjualan/getById.php`;
        return axios.get(url, {
            params: {
                id: id,
            }
        }).then(response => response.data[0])
    }
    getItemById(id) {
        const url = `${API_URL}/penjualan/getItemById.php`;
        return axios.get(url, {
            params: {
                id: id,
            }
        }).then(response => response.data)
    }
    delete(id) {
        const url = `${API_URL}/penjualan/delete.php`;
        return axios.get(url, {
            params: {
                id: id
            }
        }).then(response => response.data)
    }
    post(data) {
        data.item_jual=JSON.stringify(data.item_jual);
        let formData = this.formDataConvert(data);
        const url = `${API_URL}/penjualan/create.php`;
        return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    }
    formDataConvert(object) {
        var properties = Object.keys(object);
        let formData = new FormData();
        for (let i = 0; i < properties.length; i++) {
            formData.append(properties[i], object[properties[i]]);
        }
        return formData;
    }
}