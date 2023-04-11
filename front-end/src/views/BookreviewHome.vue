<template>
  <div class="row">
    <div class="col-md-12">
      <div class="mb-3 input-group">
        <input
          id="input-keyword"
          type="text"
          class="form-control"
          placeholder="Tìm theo tựa đề"
          v-model="nameToSearch"
        />
        <div class="input-group-append">
          <button
            id="input-buttom"
            class="btn btn-outline-secondary ml-2"
            type="button"
            @click="searchName"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div v-if="currentBookreview">
        <BookreviewFullDetails :bookreview="currentBookreview" />
      </div>
      <div v-else class="jumbotron p-4 p-md-5 text-dark rounded bg-light">
        <div class="col-md-12">
          <div class="row overflow-hidden flex-md-row">
            <div class="col d-flex flex-column position-static">
              <p class="d-inline-block mb-2" style="color:  #00e600"></p>
            </div>
          </div>
        </div>
        <div class="col-md-12 px-0 py-3 border-bottom border-dark">
          <h1 class="display-4 text-center" id="title">
            Ứng dụng đánh giá sách
          </h1>
        </div>
        <div class="border-top p-1">
          <h4 class="px-1 py-3 text-center" id="title">
            <q
              >Bất luận làm công việc gì cũng cần phải đọc sách. Người mới học
              chữ cần đọc để không mù lại, người làm công an cần đọc để nắm tình
              hình. Những người làm công việc chuyên môn cần phải đọc để nâng
              cao trình độ. Người làm quản lý lãnh đạo cần phải đọc để quản lý,
              lãnh đạo tốt hơn…</q
            >
          </h4>
          <p
            class="text-justify font-italic text-right"
            style="text-decoration: underline; font-size: 20px; color:  #00e600"
          >
            Hồ Chí Minh
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <h4 style="color:  #00e600">Bài đánh giá</h4>
      <div class="list-group">
        <div
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(bookreview, index) in bookreviews"
          :key="bookreview.id"
          @click="setActiveBookreview(bookreview, index)"
        >
          <div class="d-flex w-100 justify-content-between">
            <strong class="mb-1" style="color:  #00e600">{{
              bookreview.title
            }}</strong>
          </div>
          <p class="mb-1 font-italic text-secondary">
            {{ bookreview.bookname }}
          </p>
        </div>
      </div>

      <button
        class="mt-3 ml-2 btn btn-sm btn-outline-secondary"
        @click="goToAddBookreview"
      >
        Thêm mới
      </button>

      <button
        class="mt-3 ml-2 btn btn-sm btn-outline-secondary"
        @click="removeAllBookreviews"
      >
        Xóa tất cả
      </button>
    </div>
  </div>
</template>


<script>
import BookreviewService from "../services/bookreview.service";
import BookreviewFullDetails from "../components/BookreviewFullDetails";

export default {
    name: "BookreviewHome",
    components: {
        BookreviewFullDetails,
    },
    data() {
        return {
            bookreviews: [],
            currentBookreview: null,
            currentIndex: -1,
            nameToSearch: "",
        };
    },
    methods: {
        setActiveBookreview(bookreview, index) {
            this.currentBookreview = bookreview;
            this.currentIndex = bookreview ? index : -1;
        },

        async retrieveBookreviews() {
            const [error, response] = await this.handle(
                BookreviewService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.bookreviews = response.data;
                console.log(response.data);
            }
        },
        
        refreshList() {
            this.retriveBookreviews();
            this.currentBookreview = null;
            this.currentIndex = -1;
        },

        async removeAllBookreviews() {
            const [error, response] = await this.handle(
                BookreviewService.deleteAll()
            );
            if (error){
                console.log(error);
            } else {
                console.log(response.data);
                this.refreshList();
            }
        },
        goToAddBookreview() {
            this.$router.push("/addbookreview");
        },
        async searchName() {
            const [error, response] = await this.handle(
                BookreviewService.findByName(this.nameToSearch)
            );
            if(error){
                console.log(error);
            } else {
                this.bookreviews = response.data;
                this.setActiveBookreview(null);
                console.log(response.data);
            }
        },

        
    }, 
    mounted() {
        this.retrieveBookreviews();
    },   
};
</script>

<style>
#title {
  font-family: "Playfair Display";
  color:  #00e600;
}
.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #76575727;
  border: solid 2px  #00e600;
}
.list-group-item:hover {
  color: #fff;
  background-color: #76575727;
  border: solid 2px  #00e600;
}
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