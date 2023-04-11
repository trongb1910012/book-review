import http from "../common/http";
import store from "../store";

class BookreviewService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });
    }

    getAll() { return http.get("/bookreviews"); }
    get(id) { return http.get(`/bookreviews/${id}`); }
    create(data) { return http.post("/bookreviews", data); }
    update(id, data) { return http.put(`/bookreviews/${id}`, data); }
    delete(id) { return http.delete(`/bookreviews/${id}`); }
    deleteAll() { return http.delete("/bookreviews"); }
    findByName(title) { return http.get(`/bookreviews?title=${title}`); }
}
export default new BookreviewService();