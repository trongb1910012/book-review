<template>
    <Form 
        @submit="$emit('bookreview-submit', bookreviewLocal)"
        :validation-schema="schema"    
    >
        <div class="form-group">
            <label for="title" style="color:  #4663b9">Tên</label>
            <Field
                name="title"
                type="text"
                class="form-control"
                v-model="bookreviewLocal.title"
            />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="bookname" style="color:  #4663b9">Tên sách</label>
            <Field
                name="bookname"
                type="bookname"
                class="form-control"
                v-model="bookreviewLocal.bookname"
            />
            <ErrorMessage name="bookname" class="error-feedback" /> 
        </div>
        <div>
            <label for="author" style="color:  #4663b9">Tác giả</label>
            <Field
                name="author"
                type="text"
                class="form-control"
                v-model="bookreviewLocal.author"
            />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div>
            <label for="reviewer" style="color:  #4663b9">Người đánh giá</label>
            <Field
                name="reviewer"
                type="text"
                class="form-control"
                v-model="bookreviewLocal.reviewer"
            />
            <ErrorMessage name="reviewer" class="error-feedback" />
        </div>
        <div>
            <label for="intro" style="color:  #4663b9">Giới thiệu</label>
            <Field
                name="intro"
                as="textarea"
                class="form-control"
                v-model="bookreviewLocal.intro" 
            />
            <ErrorMessage name="intro" class="error-feedback" />
        </div>
        <div>
            <label for="content" style="color:  #4663b9">Đánh giá</label>
            <Field
                name="content"
                as="textarea"
                class="form-control"
                v-model="bookreviewLocal.content" 
            />
            <ErrorMessage name="content" class="error-feedback" />
        </div>
        <div class="form-group form-check check">
            <input 
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="bookreviewLocal.favorite"
            />
            <label for="favorite" class="form-check-label" style="color:  #4663b9">
                <p>Yêu thích</p>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-outline-secondary">Lưu</button>
            <button
                v-if="bookreviewLocal.id"
                type="button"
                class="ml-2 btn btn-outline-secondary"
                @click="$emit('bookreview-delete', bookreviewLocal.id)"
            >
                Xóa
            </button>
        </div>

    </form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage} from "vee-validate";

export default {
    name: "BookreviewForm",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["bookreview-submit", "bookreview-delete"],
    props: ["bookreview"],
    data() {
        const schema = yup.object().shape({
            title: yup
                .string()
                .required("Tựa đề phải có giá trị.")
                .min(2, "Tựa đề có ít nhất 2 ký tự.")
                .max(100, "Tựa đề có nhiều nhất 100 ký tự."),
            bookname: yup
                .string()
                .required("Tên sách phải có giá trị.")
                .min(2, "Tên sách phải có ít nhất 2 ký tự.")
                .max(100, "Tên sách có nhiều nhất 100 ký tự."),
            author: yup
                .string()
                .required("Tên tác giả phải có giá trị.")
                .min(2, "Tên tác giả phải có ít nhất 2 ký tự.")
                .max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
            reviewer: yup
                .string()
                .required("Tên người đánh giá phải có giá trị.")
                .min(2, "Tên người đánh giá phải có ít nhất 2 ký tự.")
                .max(50, "Tên người đánh giá có nhiều nhất 50 ký tự."),
            intro: yup
                .string()
                .required("Giới thiệu phải có giá trị.")
                .min(50, "Giới thiệu phải có ít nhất 50 ký tự.")
                .max(2000, "Giới thiệu có nhiều nhất 2000 ký tự."),   
            content: yup
                .string()
                .required("Nội dung đánh giá phải có giá trị.")
                .min(50, "Nội dung đánh giá phải có ít nhất 50 ký tự.")
                .max(2000, "Nội dung đánh giá có nhiều nhất 2000 ký tự."),          
        });
        return {
            bookreviewLocal: this.bookreview,
            schema,
        };
    },
};
</script>

<style>
    @import "../assets/styles/main.css";    
</style>