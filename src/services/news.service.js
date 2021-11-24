import http from '../core/http-common'

class NewsService{
    endPoint = '/news';

    getGeneralList()
    {
        return http.get(`${this.endPoint}?theme=Gamer`);
    }

    getListByTheme(theme){
        return http.get(`${this.endPoint}?theme=${theme}`);
    }
}

export default new NewsService();