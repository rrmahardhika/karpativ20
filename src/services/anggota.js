import axios from 'axios';
import {API_URL} from '../api_url';
export default class AnggotaService{
    // login(account) {
    //     let formData = this.formDataConvert(account);
    //     const url = `${API_URL}/booking/login.php`;
    //     return axios.post(url, formData).then(response => response.data);
    // }
    // setLoginAccount(data){
    //     window.sessionStorage.setItem("auth_token", JSON.stringify(data));
    // }
    // getLoginAccount(){
    //     return JSON.parse(window.sessionStorage.getItem("auth_token"));
    // }
    get() {
        const url = `${API_URL}/anggota/get.php`;
        return axios.get(url).then(response => response.data);
    }
    update(id, anggota) {
        let formData = this.formDataConvert(anggota);
        const url = `${API_URL}/anggota/update.php`;
        return axios.post(url, formData, {
        params: {
          id: id
        }
        }).then(response => response.data)
    }  
    getById(id) {
        const url = `${API_URL}/anggota/getById.php`;
        return axios.get(url, {
            params: {
              id: id,
            }
            }).then(response => response.data[0])
    }
    delete(id) {
        const url = `${API_URL}/anggota/delete.php`;
        return axios.get(url, {
            params: {
              id: id
            }
            }).then(response => response.data)
    }
    post(anggota) {
            let formData = this.formDataConvert(anggota);
            const url = `${API_URL}/anggota/create.php`;
            return axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }).then(response => response.data)
    }
    formDataConvert(object)
    {
        var properties = Object.keys(object);
        let formData = new FormData();
        for (let i = 0; i < properties.length; i++) {
            formData.append(properties[i], object[properties[i]]);
        }
        return formData;
    }
}