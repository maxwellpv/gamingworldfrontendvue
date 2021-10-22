import http from '../core/http-common'

class ProfilesService{
    endPoint = '/profiles';

    getProfileByUserId(userId)
    {
        let registrationPromises = [];

        registrationPromises.push(http.get(this.endPoint, {q: userId }));
        registrationPromises.push(http.get(`favoritegames`, {q: userId }));
        registrationPromises.push(http.get(`experiences`, {q: userId }));
        registrationPromises.push(http.get(`streamingcategories`, {q: userId }));
        registrationPromises.push(http.get(`streamersponsors`, {q: userId }));
        registrationPromises.push(http.get(`tournaments`, {q: userId }));

        return Promise.all(registrationPromises);
    }

    create(profileData, favoriteGamesData, experiencesData, streamingCategoriesData, streamerSponsorsData, tournamentsData){
        let registrationPromises = [];

        registrationPromises.push(http.post(this.endPoint, profileData));

        if (favoriteGamesData !== undefined && favoriteGamesData.length > 0)
        {
            for (let i = 0; i < favoriteGamesData.length; ++i)
            {
                registrationPromises.push(http.post(`favoritegames`, favoriteGamesData[i]));
            }
        }
        if (experiencesData !== undefined && experiencesData.length > 0)
        {
            for (let i = 0; i < experiencesData.length; ++i)
            {
                registrationPromises.push(http.post(`experiences`, experiencesData[i]));
            }
        }
        if (streamingCategoriesData !== undefined && streamingCategoriesData.length > 0)
        {
            for (let i = 0; i < streamingCategoriesData.length; ++i)
            {
                registrationPromises.push(http.post(`streamingcategories`, streamingCategoriesData[i]));
            }
        }
        if (streamerSponsorsData !== undefined && streamerSponsorsData.length > 0)
        {
            for (let i = 0; i < streamerSponsorsData.length; ++i)
            {
                registrationPromises.push(http.post(`streamersponsors`, streamerSponsorsData[i]));
            }
        }
        if (tournamentsData !== undefined && tournamentsData.length > 0)
        {
            for (let i = 0; i < tournamentsData.length; ++i)
            {
                registrationPromises.push(http.post(`tournaments`, tournamentsData[i]));
            }
        }

        return Promise.all(registrationPromises);
    }

    update(profileData, favoriteGamesData, experiencesData, streamingCategoriesData, streamerSponsorsData, tournamentsData){
        let registrationPromises = [];

        registrationPromises.push(http.put(this.endPoint, profileData));

        if (favoriteGamesData !== undefined && favoriteGamesData.length > 0)
        {
            for (let i = 0; i < favoriteGamesData.length; ++i)
            {
                registrationPromises.push(http.put(`favoritegames`, favoriteGamesData[i]));
            }
        }
        if (experiencesData !== undefined && experiencesData.length > 0)
        {
            for (let i = 0; i < experiencesData.length; ++i)
            {
                registrationPromises.push(http.put(`experiences`, experiencesData[i]));
            }
        }
        if (streamingCategoriesData !== undefined && streamingCategoriesData.length > 0)
        {
            for (let i = 0; i < streamingCategoriesData.length; ++i)
            {
                registrationPromises.push(http.put(`streamingcategories`, streamingCategoriesData[i]));
            }
        }
        if (streamerSponsorsData !== undefined && streamerSponsorsData.length > 0)
        {
            for (let i = 0; i < streamerSponsorsData.length; ++i)
            {
                registrationPromises.push(http.put(`streamersponsors`, streamerSponsorsData[i]));
            }
        }
        if (tournamentsData !== undefined && tournamentsData.length > 0)
        {
            for (let i = 0; i < tournamentsData.length; ++i)
            {
                registrationPromises.push(http.put(`tournaments`, tournamentsData[i]));
            }
        }

        return Promise.all(registrationPromises);
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`);
    }


}

export default new ProfilesService();