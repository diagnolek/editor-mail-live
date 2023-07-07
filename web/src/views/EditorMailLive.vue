<template>
  <div class="card">
    <div class="card-header">
      <div class="row mt-2 mb-3">
        <div class="col-10">
          <label>Editor Mail</label>
        </div>
        <div class="col-2">
          <button class="btn btn-outline-primary btn-sm float-end" @click="sentEmail" ref="btnSendMail">send email</button>
        </div>
      </div>
      <div class="row mt-2 mb-2">
        <div class="col-12">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">To:</span>
            <input type="text" class="form-control" v-model="recipients" aria-describedby="basic-addon1"
                   title="if you want to enter more addresses, use a comma as a separator">
          </div>
        </div>
      </div>
      <div class="row mt-4 mb-2">
        <div class="col-12">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon2">Subject:</span>
            <input type="text" class="form-control" v-model="subject" aria-describedby="basic-addon2">
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <Editor @editorRefUpdated="handleEditorRef" @clearMail="clearMail"></Editor>
    </div>
  </div>
</template>

<script lang="ts">

import Editor from '../components/Mail/Editor.vue'

export default {
  name: "EditorMail",
  components: {
    Editor
  },
  data() {
    return {
      subject: '',
      recipients: '',
      editor: HTMLElement = null
    }
  },
  created() {
    this.$store.dispatch('editorFetch');
  },
  mounted() {
    this.subject = this.$store.getters.getEditorSubject();
    this.recipients = this.$store.getters.getEditorRecipients().join(',');
  },
  watch: {
    recipients(val) {
      this.$store.commit('SET_EDITOR_RECIPIENTS', this.getRecipients());
      this.$store.dispatch('editorPersist');
    },
    subject(val) {
      this.$store.commit('SET_EDITOR_SUBJECT', val);
      this.$store.dispatch('editorPersist');
    }
  },
  methods: {
    handleEditorRef(ref: HTMLElement): void {
      this.editor = ref;
    },
    escapeHtmlTags(input: string): string {
      return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    getUrl(path: string): string {
      return (window as any).__INITIAL_DATA__ !== undefined ? (window as any).__INITIAL_DATA__.HOST_URL + path : path;
    },
    sending(status): void {
      const button = this.$refs.btnSendMail;
      if (status == 'start') {
        if (!button.hasAttribute('data-normal-text')) {
          button.setAttribute('data-normal-text',button.innerHTML);
        }
        button.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> sending...';
        button.setAttribute('disabled', '');
      } else if (status == 'stop' && button.hasAttribute('data-normal-text')) {
        button.innerHTML = button.getAttribute('data-normal-text');
        button.removeAttribute('disabled');
      }
    },
    getRecipients(trim: boolean = false): string[] {
      const data = this.recipients.split(',');
      return trim
        ? data.map(email => email.trim())
        : data
    },
    getContent(): string {
      return this.editor.innerHTML;
    },
    validation(): void {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (this.subject === '') {
        throw new Error('Subject is empty');
      }

      if (this.getContent() === '') {
        throw new Error('Text is empty');
      }

      if (this.recipients === '') {
        throw new Error('Address e-mail is empty');
      }

      this.getRecipients(true).map(recipient=>{
        if (!emailRegex.test(recipient)) {
          throw new Error('Incorrect address e-mail');
        }
      });
    },
    clearMail() {
      this.$store.dispatch('editorFetch');
      this.subject = this.$store.getters.getEditorSubject();
      this.recipients = this.$store.getters.getEditorRecipients().join(',');
    },
    async sentEmail() {
      try {
        this.validation();
        this.sending('start');
        await fetch(this.getUrl('/send-email'), {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subject: this.subject,
            body: this.getContent(),
            recipients: this.getRecipients()
          })
        }).then((resp)=>{
            resp.json().then((data)=>{
              if (resp.status == 200) {
                this.$notify({
                  text: data.message,
                  type: 'success'
                });
              } else {
                this.$notify({
                  text: data.message,
                  type: 'error'
                });
              }
            }).catch(()=>{
              this.$notify({
                text: 'process sending failed',
                type: 'error'
              });
            });
        }).finally(()=>{
          this.sending('stop');
        });
      } catch (error) {
        this.$notify({
          text: error.message,
          type: 'error'
        });
      }
    }
  }
}
</script>
