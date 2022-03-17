<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center" style="height: 90vh;">
      <div class="col-sm-12 col-md-10 col-lg-8">
        <div class="header text-center">
          <div class="d-inline-flex">
            <img class="mt-2" src="@/assets/chain.png" alt="url" height="50" width="50">
            <h1 class="fw-light" style="font-size:55px;">BtURL</h1>
          </div>
          <p class="fw-light text-muted header-description">URL Shortener made with Vue 3, Express and MongoDB</p>
        </div>

        <div class="row gy-2">
          <div class="col-sm-12 col-lg-9">
            <input class="form-control form-control-lg w-100" id="url" placeholder="Enter URL" v-model="longUrl">
          </div>
          <div class="col-sm-12 col-lg-3">
            <button type="submit" :disabled="loading" class="btn btn-primary btn-lg w-100" @click="generateShortUrl">
              {{ loading ? 'Generating' : 'Generate' }}
            </button>
          </div>
        </div>

        <div :class="`status mt-3 ${alert.show && alert.type === 'danger' ? 'text-center' : ''}`">
          <div v-if="alert.show" :class="`alert alert-${alert.type} fade show ${alert.type === 'success' ? 'd-flex justify-content-between align-items-center' : ''}`">
            {{ alert.message }}
            <button v-if="alert.type === 'success'" class="btn btn-success ml-3" @click="copyShortUrl">{{ copied }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import cryptoRandomString from 'crypto-random-string';
import isURL from 'validator/lib/isURL';

export default {
  name: "Home",
  setup(){
    const longUrl = ref(null)
    const origin = window.location.origin
    let loading = ref(false)
    let alert = ref({
      show: false,
      type: 'danger',
      message: ''
    })
    let copied = ref('Copy')

    const generateCode = async () => {
      let code = ''
      /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
      while(true){
        let urlCode = await cryptoRandomString({length: 8, type: 'alphanumeric'})
        let queryResult = await axios.get(`api/urls/${urlCode}`);
        console.log(queryResult)
        if(!queryResult.data){
          code = urlCode
          break
        }
      }
      return code
    }

    const generateShortUrl = async () => {
      alert.value = { show: false, type: 'danger', message: '' }
      try {
        //check if long url input is not empty
        if(!longUrl.value) throw new Error('Please enter URL!')

        //check long url if valid
        if(!isURL(longUrl.value)) throw new Error('Invalid URL!')
        
        loading.value = true
        let urlCode = await generateCode()
        let shortUrl =  `${origin}/${urlCode}`
        let urlData = {
          urlCode,
          longUrl: longUrl.value,
          shortUrl
        }
        console.log(urlData)
        let res = await axios.post('api/urls', urlData)
        console.log(res)
        alert.value = {
          show: true,
          type: 'success',
          message: shortUrl
        }
      } catch (error) {
        alert.value = {
          show: true,
          type: 'danger',
          message: error.message
        }
      }finally{
        loading.value = false
      }
    }

    const copyShortUrl = () => {
      const els = document.createElement('textarea');
      els.value = alert.value.message;
      document.body.appendChild(els);
      els.select();
      document.execCommand('copy');
      document.body.removeChild(els)
      copied.value = 'Copied!'

      setTimeout(() => copied.value = 'Copy', 1000)
    }

    return { alert, longUrl, loading, generateShortUrl, copyShortUrl, copied }
  }
}
</script>