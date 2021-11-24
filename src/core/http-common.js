import axios from "axios";

export default axios.create({
    baseURL:'https://localhost:5001/api/v1',
    headers:{'Content-type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYmYiOjE2Mzc2OTE1NDQsImV4cCI6MTYzODI5NjM0NCwiaWF0IjoxNjM3NjkxNTQ0fQ.NDbrywBOBGORenUCCMTJBDOIQMBLl08QPyvtsHfsG94'}
});

export function xempreAPI()
{
    return axios.create({
        baseURL:'https://xempre.com/api/v2/request.php',
        headers:{'Content-type': 'application/json'}
    });
}