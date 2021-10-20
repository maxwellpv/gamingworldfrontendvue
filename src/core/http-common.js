import axios from "axios";

export default axios.create({
    baseURL:'http://localhost:3000/api/v1',
    headers:{'Content-type': 'application/json'}
});

export function xempreAPI()
{
    return axios.create({
        baseURL:'http://xempre.com/api/v2/request.php',
        headers:{'Content-type': 'application/json'}
    });
}