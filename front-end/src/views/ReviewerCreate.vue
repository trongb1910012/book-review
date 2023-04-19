<template>
    <div class="create-form">
        <div>
        <h4 style="color:  #4663b9">Thêm bài Người đánh giá</h4>
        <ReviewerForm
            :reviewer="reviewer"
            @reviewer-submit="createReviewer"
        />
        <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import ReviewerService from "../services/reviewer.service";
import ReviewerForm from "../components/ReviewerForm";
export default {
    name: "ReviewerCreate",
    components: {
        ReviewerForm,
    },
    data() {
        return {
            reviewer: {},
            message: "",
        };
    },
    methods: {
        async createReviewer(data) {
            const [error, response] = await this.handle(
                ReviewerService.create(data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                alert("Người đánh giá được thêm thành công.") ;
            }
        },
        },
    };
</script>
<style>
.create-form {
    max-width: 400px;
    margin: auto;
}
</style>