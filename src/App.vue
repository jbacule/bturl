<template>
  <template v-if="loading">
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="text-center">
        <img class="loading" src="@/assets/loader.gif" alt="loading" height="96" width="96">
      </div>
    </div>
  </template>
  <template v-else>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="footer text-center text-muted py-4">
        &copy; BtURL 2021 - <a href="https://github.com/shujo/bturl" target="_blank">Github</a>
      </div>
    </footer>
  </template>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "App",
  setup(){
    const loading = ref(false)

    const initLoading = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }

    initLoading()

    return { loading }
  }
};
</script>

<style>
  body{
    background-color: #eee;
  }
  p.header-description {
    font-size: 20px !important;
  }
  @media screen and (max-width: 600px) {
    p.header-description {
      font-size: 15px !important;
    }
  }
</style>