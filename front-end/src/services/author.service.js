import http from "../common/http";
import store from "../store";

class AuthorService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });
    }

    getAll() { return http.get("/authors"); }
    get(id) { return http.get(`/authors/${id}`); }
    create(data) { return http.post("/authors", data); }
    update(id, data) { return http.put(`/authors/${id}`, data); }
    delete(id) { return http.delete(`/authors/${id}`); }
    deleteAll() { return http.delete("/authors"); }
    findByName(name) { return http.get(`/authors?name=${name}`); }
}
export default new AuthorService();