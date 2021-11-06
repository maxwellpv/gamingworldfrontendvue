import http, {xempreAPI} from '../core/http-common'

class GamesService{
    endPoint = '/games';

    getAll(){
        return http.get(this.endPoint);
    }

    getList()
    {
        return xempreAPI().get("", {params: { limit: 10, where: "rating>95", orderby: "rating" }});
    }

    getListByName(query)
    {
        return xempreAPI().get("", {params: { limit: 10, searchby: query }});
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createGamesDto){
        return http.post(this.endPoint, createGamesDto);
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