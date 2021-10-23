import axios from "axios";

export default axios.create({
    baseURL:'https://gamingworldvuedb.herokuapp.com/',
    headers:{'Content-type': 'application/json'}
});

export function xempreAPI()
{
    return axios.create({
        baseURL:'https://xempre.com/api/v2/request.php',
        headers:{'Content-type': 'application/json'}
    });
}