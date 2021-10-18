import http from '../core/http-common'

class GamesService{
    endPoint = '/games';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createGamesDto){
        return http.post(this.endPoint, createGamesDto)
    }

    update(id, updateGamesDto){
        return http.put(`${this.endPoint}/${id}`, updateGamesDto)
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`);
    }

    findByTittle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }

}

export default new GamesService();