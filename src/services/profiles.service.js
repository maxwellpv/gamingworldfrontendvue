import http from '../core/http-common'

class ProfilesService{
    endPoint = '/userprofiles';

    getProfileByUserId(userId)
    {
        return http.get(`${this.endPoint}/user/${userId}`);
    }

    create(profileData){
        return http.post(this.endPoint, profileData);
    }

    update(id, profileData){
        return http.put(`${this.endPoint}/${id}`, profileData);
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`);
    }


}

export default new ProfilesService();