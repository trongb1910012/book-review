<template>
    <div class="list row">
        <div class="col-md-12">
            <div class="mb-3 input-group">
                <input 
                    type="text"
                    class="form-control"
                    placeholder="Tìm theo tên"
                    v-model="nameToSearch"/>
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondary ml-2"
                        type="button"
                        @click="searchName"
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <h4 style="color:  #4663b9">Tác giả</h4>
            <ul class="list-group">
                <li
                    class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(author, index) in authors"
                    :key="author.id"
                    @click="setActiveAuthor(author, index)"    
                >
                    <span style="color:  #4663b9">{{ author.name }}</span>
                </li>
            </ul>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="goToAddAuthor">
                Thêm mới
            </button>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="removeAllAuthors">
                Xóa tất cả
            </button>
        </div>
        <div class="col-md-8">
            <div v-if="currentAuthor">
                <AuthorDetails 
                    :author="currentAuthor"
                />
            </div>
        </div>
    </div>
</template>

<script>
import AuthorDetails from "../components/AuthorDetails";
import AuthorService from "../services/author.service";


export default {
    name: "AuthorHome",
    components: {
        AuthorDetails,
    },
    data() {
        return {
            authors: [],
            currentAuthor: null,
            currentIndex: -1,
            nameToSearch: "",
        };
    },
    methods: {
        setActiveAuthor(author, index) {
            this.currentAuthor = author;
            this.currentIndex = author ? index : -1;
        },

        async retrieveAuthors() {
            const [error, response] = await this.handle(
                AuthorService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.authors = response.data;
                console.log(response.data);
            }
        },
        
        refreshList() {
            this.retriveAuthors();
            this.currentAuthor = null;
            this.currentIndex = -1;
        },

        async removeAllAuthors() {
            const [error, response] = await this.handle(
                AuthorService.deleteAll()
            );
            if (error){
                console.log(error);
            } else {
                console.log(response.data);
                this.refreshList();
            }
        },
        goToAddAuthor() {
            this.$router.push("/addauthor");
        },
        async searchName() {
            const [error, response] = await this.handle(
                AuthorService.findByName(this.nameToSearch)
            );
            if(error){
                console.log(error);
            } else {
                this.authors = response.data;
                this.setActiveAuthor(null);
                console.log(response.data);
            }
        },
        
    }, 
    mounted() {
        this.retrieveAuthors();
    },   
};
</script>

<style>
.list {
    text-align: left;
    max-width: 900px;
    margin: auto;
}
.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #76575727;
  border: solid 2px  #4663b9;
}
.list-group-item:hover {
  color: #fff;
  background-color: #76575727;
  border: solid 2px  #4663b9;
}
/* .btn:hover {
    color: #756262;
    background-color: #76575727;
    border-color: #968080ab;
}
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #968080ab;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(94, 74, 44, 0.315);
} */
</style>