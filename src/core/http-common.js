import axios from "axios";

export default axios.create({
    baseURL:'http://gamingworldapi-aw-api.sa-east-1.elasticbeanstalk.com/api/v1/',
    headers:{'Content-type': 'application/json'}
});

export function xempreAPI()
{
    return axios.create({
        baseURL:'https://xempre.com/api/v2/request.php',
        headers:{'Content-type': 'application/json'}
    });
}