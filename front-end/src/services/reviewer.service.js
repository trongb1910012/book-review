import http from "../common/http";
import store from "../store";

class ReviewerService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });
    }
    getAll() { return http.get("/reviewers"); }
    get(id) { return http.get(`/reviewers/${id}`); }
    create(data) { return http.post("/reviewers", data); }
    update(id, data) { return http.put(`/reviewers/${id}`, data); }
    delete(id) { return http.delete(`/reviewers/${id}`); }
    deleteAll() { return http.delete("/reviewers"); }
    findByName(name) { return http.get(`/reviewers?name=${name}`); }
}
export default new ReviewerService();