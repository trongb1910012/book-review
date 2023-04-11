<template>
    <div class="create-form">
        <div>
        <h4 style="color:  #00e600">Thêm bài đánh giá sách</h4>
        <BookreviewForm
            :bookreview="bookreview"
            @bookreview-submit="createBookreview"
        />
        <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import BookreviewService from "../services/bookreview.service";
import BookreviewForm from "../components/BookreviewForm";
export default {
    name: "BookreviewCreate",
    components: {
        BookreviewForm,
    },
    data() {
        return {
            bookreview: {},
            message: "",
        };
    },
    methods: {
        async createBookreview(data) {
            const [error, response] = await this.handle(
                BookreviewService.create(data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                alert("Bài đánh giá được thêm thành công.")
            }
        },
        },
    };
</script>
<style>
.create-form {
    max-width: 750px;
    margin: auto;
}
</style>