<template>
  <div>
    <div class="row">
      <div class="col-10">
        <ul class="editor-toolbar">
          <li>
            <div class='btn-group'>
              <button id="editor-btn-bold" class="btn btn-sm"
                      :class="{
                  'btn-outline-dark': active.bold == false,
                  'btn-dark': active.bold == true
                 }" @click="formatText('bold')"><b>Bold</b></button>
              <button id="editor-btn-italic" class="btn btn-sm"
                      :class="{
                  'btn-outline-dark': active.italic == false,
                  'btn-dark': active.italic == true
                 }" @click="formatText('italic')"><i>Italic</i></button>
              <button id="editor-btn-underline" class="btn btn-sm"
                      :class="{
                  'btn-outline-dark': active.underline == false,
                  'btn-dark': active.underline == true
                 }" @click="formatText('underline')"><u>Underline</u></button>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-dark btn-sm float-end" @click="clearMail" ref="btnSendMail">Clear</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <label for="editor">Text:</label>
        <div contenteditable="true" class="editor" ref="editor" @input="handleInput"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "Editor",
  data() {
    return {
      content: '',
      active: {
        bold: false,
        italic: false,
        underline: false
      }
    }
  },
  created() {
    this.$store.dispatch('editorFetch');
  },
  mounted() {
    this.$refs.editor.innerHTML = this.$store.getters.getEditorText();
    this.$emit('editorRefUpdated', this.$refs.editor);
  },
  watch: {
    content(val) {
      this.$store.commit('SET_EDITOR_TEXT',val);
      this.$store.dispatch('editorPersist');
    }
  },
  methods: {
    handleInput(event) {
      this.content = event.target.innerHTML;
    },
    formatText(style) {
      this.active[style] = !this.active[style];
      document.execCommand(style, false, null);
    },
    clearMail() {
      this.$store.dispatch('editorClear');
      this.$refs.editor.innerHTML = this.$store.getters.getEditorText();
      this.$emit('clearMail');
    }
  }
}
</script>

<style scoped>

.editor {
  border: 1px solid #ccc;
  min-height: 200px;
  padding: 10px;
  margin-bottom: 10px;
}

ul.editor-toolbar {
  margin: 0;
  padding: 0;
  display: block;
}

ul.editor-toolbar::after {
  clear: both;
  display: table;
  content: "";
}

ul.editor-toolbar > li {
  float: left;
  display: list-item;
  list-style: none;
  margin: 0 5px 10px 0;
}
</style>
