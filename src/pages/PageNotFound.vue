<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 90vh;">
    <div class="text-center">
      <img class="pagenotfound" :src="img" alt="not found" height="400" width="400">
      <p class="fw-light" style="font-size:55px;">Page Not Found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  data(){
    return {
      img: require('@/assets/page_not_found.svg')
    }
  }
}
</script>