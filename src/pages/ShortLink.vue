<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 90vh;">
    <div v-if="isUrlFound">
      Redirecting...
    </div>

    <div v-else class="not-found text-center">
      <img :src="imgError" alt="error" height="350" width="350">
      <h1 class="fw-light" style="font-size:55px;">URL Link Not Found!</h1>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
export default {
  name: "Shortlink",
  setup(){
    let imgError = require('@/assets/error.svg')
    const route = useRoute()
    let isUrlFound = ref(true)

    const checkUrl = async () => {
      let code = route.params.code
      let result = await axios.get(`api/urls/${code}`)
      console.log(result)
      if(result.data){
        isUrlFound.value = true
        window.location.href = result.data.longUrl
      }else{
        isUrlFound.value = false
      }
    }

    onBeforeMount(() => {
      checkUrl()
    })

    return { imgError, isUrlFound }
  }
}
</script>