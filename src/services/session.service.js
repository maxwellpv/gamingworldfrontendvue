class SessionService{
    createSession(data) {
        localStorage.setItem("SESSION", JSON.stringify(data));
    }

    getSession() {
        return JSON.parse(localStorage.getItem("SESSION"));
    }

    destroySession() {
        localStorage.removeItem("SESSION");
    }
}

export default new SessionService();