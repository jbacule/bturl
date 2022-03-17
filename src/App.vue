<template>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <div class="footer text-center text-muted py-4">
      &copy; BtURL 2021 - <a href="https://github.com/shujo/bturl" target="_blank">Github</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "App",
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