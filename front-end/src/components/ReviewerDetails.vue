<template>
    <div class="jumbotron p-4 p-md-5 text-dark rounded bg-light">
        <div class="border-bottom p-1">
            <h2 class="px-1 py-3 font-weight-bold text-center" id="name" > {{ reviewer.name }}</h2>
        </div>
        <div class="p-3">
          <h5 class="font-weight-bold" style="color:  #4663b9;">Thông tin</h5>
          <p class="text-justify">{{ reviewer.profile }}</p>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
                    <div class="col p-3 d-flex flex-column position-static">
                        <strong class="d-inline-block" style="color:  #4663b9">
                            Yêu thích:
                            <i v-if="reviewer.favorite" style="color: red" class="fas fa-heart"></i>
                            <i v-else class="far fa-heart"></i>
                        </strong>
                    </div>
            </div>
            <div class="col-md-6">
                    <div class="col p-3 d-flex flex-column position-static">
                        <strong class="d-inline-block text-right" >
                            <router-link style="color:  #4663b9" :to="'/editreviewer/' + reviewer.id">
                                <span>Chỉnh sửa <i class="far fa-edit"></i></span>
                            </router-link>
                        </strong>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewerDetails",
    props: ["reviewer"],
};
</script>

<style>
#name {
    font-family: "Playfair Display";
    color:  #4663b9;;
}
</style>