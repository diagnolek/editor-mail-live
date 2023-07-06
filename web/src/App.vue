<template>
  <div class="appMail">
    <h3>Welcome in AppMail {{name}}</h3>
    <div class="nav-bar">
      <button class="btn" @click="setRoute('MyTest')">MyTest</button>
    </div>
    <div class="container">
      <MyTestLib v-if="route=='MyTest'" @limit="checkLimit"></MyTestLib>
    </div>
  </div>
</template>

<script lang="ts">

import MyTestLib from "./components/MyTest.vue";

import './mail.scss';

export default {
  name: "App",
  components: {
    MyTestLib
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    push: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      route: "MyTest",
      limit: 6,
    }
  },
  watch: {
    push(val) {
      this.route = val
    }
  },
  created() {
    if (this.push !== "") {
      this.route = this.push
    }
  },
  methods: {
    setRoute(route) {
      this.route = route
    },
    checkLimit(max) {
      if (max > this.limit) {
        alert("the limit was exceeded");
        this.$eventBus.$emit('reset')
      }
    }
  }
}
</script>
