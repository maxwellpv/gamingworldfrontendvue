import http from '../core/http-common'

class ProfilesService{
    endPoint = '/profiles';

    getProfileByUserId(userId)
    {
        return http.get(`${this.endPoint}/user/${userId}`);
    }

    update(id, profileData){
        return http.put(`${this.endPoint}/${id}`, profileData);
    }

}

export default new ProfilesService();