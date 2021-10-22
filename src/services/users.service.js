import http from '../core/http-common'

class UsersService{
    endPoint = '/users';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createUsersDto){
        return http.post(this.endPoint, createUsersDto);
    }

    update(id, updateUsersDto){
        return http.put(`${this.endPoint}/${id}`, updateUsersDto)
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`);
    }


}

export default new UsersService();