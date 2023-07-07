<template>
  <div class="container p-3">
    <notifications position="top center"/>
    <h3>Editor Email Live</h3>
    <div class="mt-5">
      <EditorMailLive></EditorMailLive>
    </div>
  </div>
</template>

<script lang="ts">

import EditorMailLive from "./views/EditorMailLive.vue";

import './mail.scss';

export default {
  name: "App",
  components: {
    EditorMailLive
  }
}
</script>
