<template>
    <Form 
        @submit="$emit('author-submit', authorLocal)"
        :validation-schema="schema"    
    >
        <div class="form-group">
            <label for="name" style="color:  #4663b9">Tên</label>
            <div class="form-element">
            <Field
                name="name"
                type="name"
                class="form-control"
                v-model="authorLocal.name"
            />
            </div>
            <ErrorMessage name="name" class="error-feedback" /> 
        </div >
        <div class="form-group">
            <label for="profile" style="color:  #4663b9">Thông tin</label>
            <div class="form-element">
            <Field
                name="profile"
                as="textarea"
                class="form-control"
                v-model="authorLocal.profile"
            />
            </div>
            <ErrorMessage name="profile" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input 
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="authorLocal.favorite"
            />
            <label for="favorite" class="form-check-label" >
                <strong style="color:  #4663b9">Yêu thích</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-outline-secondary">Lưu</button>
            <button
                v-if="authorLocal.id"
                type="button"
                class="ml-2 btn btn-outline-secondary"
                @click="$emit('author-delete', authorLocal.id)"
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
    name: "AuthorForm",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["author-submit", "author-delete"],
    props: ["author"],
    data() {
        const schema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải có ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            profile: yup
                .string(),           
        });
        return {
            authorLocal: this.author,
            schema,
        };
    },
};
</script>

<style>
    @import "../assets/styles/main.css";
    
</style>