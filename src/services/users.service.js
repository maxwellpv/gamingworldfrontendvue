import http from '../core/http-common'

class UsersService{
    endPoint = '/users';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    signUp(userData){
        return http.post(`${this.endPoint}/auth/sign-up`, userData);
    }

    signIn(userData){
        console.log(userData)
        return http.post(`${this.endPoint}/auth/sign-in`, userData);
    }
}

export default new UsersService();