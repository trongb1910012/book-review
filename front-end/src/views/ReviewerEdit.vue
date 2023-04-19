<template>
    <div v-if="reviewer" class="edit-form">
        <h4 style="color:  #4663b9">Hiệu chỉnh Người đánh giá</h4>
        <ReviewerForm
            :reviewer="reviewer"
            @reviewer-submit="updateReviewer"
            @reviewer-delete="deleteReviewer"
        />
        <p>{{ message }}</p>
    </div>
    <div v-else>
        <br />
        <p>Không tìm thấy người đánh giá.</p>
    </div>
</template>
<script>
import ReviewerService from "../services/reviewer.service";
import ReviewerForm from "../components/ReviewerForm";
export default {
    name: "ReviewerEdit",
    components: {
        ReviewerForm,
    },
    data() {
        return {
            reviewer: null,
            message: "",
        };
    },
    methods: {
        async getReviewer(id) {
            const [error, response] = await this.handle(ReviewerService.get(id));
            if (error) {
                console.log(error);
            } else {
            this.reviewer = response.data;
            console.log(response.data);
            }
        },
        async updateReviewer(data) {
            const [error, response] = await this.handle(
                ReviewerService.update(this.reviewer.id, data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                alert("Người đánh giá được cập nhật thành công.");
            }
        },
        async deleteReviewer() {
            const [error, response] = await this.handle(
                ReviewerService.delete(this.reviewer.id)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.$router.push({ name: "Reviewer" });
            }
        },
        },
        mounted() {
            this.message = "";
            this.getReviewer(this.$route.params.id);
        },
    };
</script>
<style>
.edit-form {
    max-width: 400px;
    margin: auto;
}
</style>