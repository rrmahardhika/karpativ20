import axios from 'axios';
import { API_URL } from '../api_url';
export default class PembayaranPenjualanService {
   
    get(id) {
        const url = `${API_URL}/penjualan/pembayaranpenjualan/get.php`;
        return axios.get(url, {
            params: {
                id: id,
            }
        }).then(response => response.data)
    }
    delete(id) {
        const url = `${API_URL}/penjualan/pembayaranpenjualan/delete.php`;
        return axios.get(url, {
            params: {
                id: id
            }
        }).then(response => response.data)
    }
    post(data) {
        let formData = this.formDataConvert(data);
        const url = `${API_URL}/penjualan/pembayaranpenjualan/create.php`;
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