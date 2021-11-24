import http from '../core/http-common'

class GamesService{
    endPoint = '/games';

    getAll(){
        return http.get(this.endPoint);
    }

    getListByName(query)
    {
        return http.get(`${this.endPoint}/find?name=${query}&limit=10`);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    getTopGames(){
        return http.get(`${this.endPoint}/top?limit=5`);
    }
}

export default new GamesService();