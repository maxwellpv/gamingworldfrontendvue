import http from '../core/http-common'

class PublicationsService{
    endPoint = '/publications';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    getByType(type){
        return http.get(`${this.endPoint}?publicationType=${type}`);
    }

    create(createPublicationDto){
        return http.post(this.endPoint, createPublicationDto)
    }

    update(id, updatePublicationDto){
        return http.put(`${this.endPoint}/${id}`, updatePublicationDto)
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`);
    }

    findByTittle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }


}

export default new PublicationsService();