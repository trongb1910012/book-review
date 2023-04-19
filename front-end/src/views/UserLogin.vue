<template>
    <div class="col-md-12">
        <div class="card card-container" style="border: solid 1px  #4663b9; border-radius: 15px; box-shadow: 10px 10px 8px #CBCAFF">
            <img
                id="profile-img"
                src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-world-book-day-423-charity-banner-image_190995.jpg"
                alt="Cannot load the image"
                class="profile-img-card"
            />
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group">
                    <label for="username" style="color:  #4663b9; font-weight: bold">Tên đăng nhập</label>
                    <Field name="username" type="text" class="form-control" />
                    <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password" style="color:  #4663b9; font-weight: bold">Mật khẩu</label>
                    <Field
                        name="password"
                        type="password"
                        class="form-control"
                    />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <div class="form-group my-3">
                    <button
                        class="btn btn-sm btn-outline-secondary btn-block"
                        :disabled="loading"
                    >
                        <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span> 
                        <span>Đăng nhập</span>
                    </button>
                </div>

                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapGetters} from "vuex";

export default {
    name: "Login",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập phải có giá trị."),
            password: yup.string().required("Mật khẩu phải có giá trị."),
        });

        return {
            loading: false,
            message: "",
            schema,
        };
    },
    computed: {
        ...mapGetters([
            "userLoggedIn"
        ]),
    },
    created() {
        if (this.userLoggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        async handleLogin(user) {
            this.loading = true;

            const [error] = await this.handle(
                this.$store.dispatch("login", user)
            );
            if (error) {
                console.log(error);
                this.loading = false;
                this.message = "Đăng nhập thất bại";
            } else {
                this.$router.push("/profile");
            }
        },
    },
};
</script>

<style>
@import "../assets/styles/main.css";
</style>
