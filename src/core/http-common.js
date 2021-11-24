import axios from "axios";

export default axios.create({
    baseURL:'https://api.aw.gamingworld.xempre.com/api/v1',
    headers:{'Content-type': 'application/json', 'Authorization': ''}
});