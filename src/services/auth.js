import axios from 'axios';
import { API_URL } from '../api_url';
const jwt = require('jwt-simple');
const secret = 'RRMahardhika_97';
export default class AuthService {
    login(account) {
        let formData = this.formDataConvert(account);
        const url = `${API_URL}/auth/login.php`;
        return axios.post(url, formData).then(response => response.data);
    }
    changePassword(obj) {
        let formData = this.formDataConvert(obj);
        const url = `${API_URL}/auth/password.php`;
        return axios.post(url, formData).then(response => response.data);
    }
    setLoginAccount(data) {
        window.sessionStorage.setItem("auth_token", jwt.encode(data, secret));
    }
    getLoginAccount() {
        var token;
        if (window.sessionStorage.getItem("auth_token") != null) {
            token = window.sessionStorage.getItem("auth_token").toString()
            var result = jwt.decode(token, secret);
            return result[0];
        }
        else
            return null;
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