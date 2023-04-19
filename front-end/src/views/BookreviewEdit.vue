<template>
    <div v-if="bookreview" class="edit-form">
        <h4 style="color:  #4663b9;">Hiệu chỉnh Bài đánh giá</h4>
        <BookreviewForm
            :bookreview="bookreview"
            @bookreview-submit="updateBookreview"
            @bookreview-delete="deleteBookreview"
        />
        <p>{{ message }}</p>
    </div>
    
    <div v-else>
        <br />
        <p>Không tìm thấy bài đánh giá .</p>
    </div>
</template>
<script>
import BookreviewService from "../services/bookreview.service";
import BookreviewForm from "../components/BookreviewForm";
export default {
    name: "BookreviewEdit",
    components: {
        BookreviewForm,
    },
    data() {
        return {
            bookreview: null,
            message: "",
        };
    },
    methods: {
        async getBookreview(id) {
            const [error, response] = await this.handle(BookreviewService.get(id));
            if (error) {
                console.log(error);
            } else {
            this.bookreview = response.data;
            console.log(response.data);
            }
        },
        async updateBookreview(data) {
            const [error, response] = await this.handle(
                BookreviewService.update(this.bookreview.id, data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                alert("Cập nhật bài đánh giá thành công")
            }
        },
        async deleteBookreview() {
            const [error, response] = await this.handle(
                BookreviewService.delete(this.bookreview.id)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.$router.push({ name: "Bookreview" });
            }
        },
        },
        mounted() {
            this.message = "";
            this.getBookreview(this.$route.params.id);
        },
    };
</script>
<style>
.edit-form {
    max-width: 750px;
    margin: auto;
}
</style>