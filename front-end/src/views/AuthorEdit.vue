<template>
    <div v-if="author" class="edit-form">
        <h4 style="color:  #4663b9;">Hiệu chỉnh Tác giả</h4>
        <AuthorForm
            :author="author"
            @author-submit="updateAuthor"
            @author-delete="deleteAuthor"
        />
        <p>{{ message }}</p>
    </div>
    <div v-else>
        <br />
        <p>Không tìm thấy tác giả.</p>
    </div>
</template>
<script>
import AuthorService from "../services/author.service";
import AuthorForm from "../components/AuthorForm";
export default {
    name: "AuthorEdit",
    components: {
        AuthorForm,
    },
    data() {
        return {
            author: null,
            message: "",
        };
    },
    methods: {
        async getAuthor(id) {
            const [error, response] = await this.handle(AuthorService.get(id));
            if (error) {
                console.log(error);
            } else {
            this.author = response.data;
            console.log(response.data);
            }
        },
        async updateAuthor(data) {
            const [error, response] = await this.handle(
                AuthorService.update(this.author.id, data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                alert("Tác giả được cập nhật thành công.");
            }
        },
        async deleteAuthor() {
            const [error, response] = await this.handle(
                AuthorService.delete(this.author.id)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.$router.push({ name: "Author" });
            }
        },
        },
        mounted() {
            this.message = "";
            this.getAuthor(this.$route.params.id);
        },
    };
</script>
<style>
.edit-form {
    max-width: 400px;
    margin: auto;
}
</style>