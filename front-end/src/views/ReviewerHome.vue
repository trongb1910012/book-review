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
            <h4 style="color:  #4663b9">Người đánh giá</h4>
            <ul class="list-group">
                <li
                    class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(reviewer, index) in reviewers"
                    :key="reviewer.id"
                    @click="setActiveReviewer(reviewer, index)"    
                >
                    <span style="color:  #4663b9">{{ reviewer.name }}</span>
                </li>
            </ul>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="goToAddReviewer">
                Thêm mới
            </button>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="removeAllReviewers">
                Xóa tất cả
            </button>
        </div>
        <div class="col-md-8">
            <div v-if="currentReviewer">
                <ReviewerDetails 
                    :reviewer="currentReviewer"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ReviewerDetails from "../components/ReviewerDetails";
import ReviewerService from "../services/reviewer.service";


export default {
    name: "ReviewerHome",
    components: {
        ReviewerDetails,
    },
    data() {
        return {
            reviewers: [],
            currentReviewer: null,
            currentIndex: -1,
            nameToSearch: "",
        };
    },
    methods: {
        setActiveReviewer(reviewer, index) {
            this.currentReviewer = reviewer;
            this.currentIndex = reviewer ? index : -1;
        },

        async retrieveReviewers() {
            const [error, response] = await this.handle(
                ReviewerService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.reviewers = response.data;
                console.log(response.data);
            }
        },
        
        refreshList() {
            this.retriveReviewers();
            this.currentReviewer = null;
            this.currentIndex = -1;
        },

        async removeAllReviewers() {
            const [error, response] = await this.handle(
                ReviewerService.deleteAll()
            );
            if (error){
                console.log(error);
            } else {
                console.log(response.data);
                this.refreshList();
            }
        },
        goToAddReviewer() {
            this.$router.push("/addreviewer");
        },
        async searchName() {
            const [error, response] = await this.handle(
                ReviewerService.findByName(this.nameToSearch)
            );
            if(error){
                console.log(error);
            } else {
                this.reviewers = response.data;
                this.setActiveReviewer(null);
                console.log(response.data);
            }
        },
        
    }, 
    mounted() {
        this.retrieveReviewers();
    },   
};
</script>

<style>
.list {
    text-align: left;
    max-width: 900px;
    margin: auto;
}
/* .list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #76575727;
  border-color: #968080ab;
}
.list-group-item:hover {
  color: #fff;
  background-color: #76575727;
} */
/* .btn:hover {
    color: #756262;
    background-color: #76575727;
    border-color: #968080ab;
} */
/* .form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #968080ab;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(94, 74, 44, 0.315);
} */
</style>