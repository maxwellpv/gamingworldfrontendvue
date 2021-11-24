import http from '../core/http-common'

class GamesService{
    endPoint = '/games';

    getAll(){
        return http.get(this.endPoint);
    }

    getListByName(query)
    {
        return http.get(`${this.endPoint}/find?name=${query}`);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    getTopGames(){
        return http.get(`${this.endPoint}/top`);
    }
}

export default new GamesService();