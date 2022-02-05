import enviroment from '../enviroment';
import axios from "axios";
axios.defaults.baseURL = `${enviroment.BaseUrl}:${enviroment.backendPort}`;

class Server {

    constructor() {
        this.port = enviroment.backendPort;
        this.baseUrl = `${enviroment.BaseUrl}:${this.port}`;
        this.POST = "POST";
        this.GET = "GET";
        this.PUT = "PUT";
        this.DELETE = "DELETE";
    }

    createRequest = async (url, method, values = {}) => {
        const option = {
            method: this[method],
            url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: values,
        };

        try {
          const res = await axios(option);
          return res.data;
        } catch (err) {
            throw new Error(err.response.data.errMessage)
        }
    }
}

export default Server;