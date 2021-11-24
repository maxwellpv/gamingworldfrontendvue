import http from '../core/http-common'
import SessionService from '../services/session.service'

class TournamentsService{
    endPoint = '/tournaments';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    getWithParticipantsById(id){
        return http.get(`${this.endPoint}/${id}/participants`);
    }

    addParticipantTournament(tournamentId){
        let participant = {
            userId: SessionService.getSession().id
        }
        return http.post(`${this.endPoint}/${tournamentId}/participants`, participant);
    }

    updateTournamentParticipantPoints(tournamentId,participantId, points){
        return http.put(`${this.endPoint}/${tournamentId}/participants/${participantId}?points=${points}`);
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

    endTournament(tournamentId){
        return http.put(`${this.endPoint}/${tournamentId}?tournamentStatus=false`);
    }


}

export default new TournamentsService();