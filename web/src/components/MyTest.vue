<template>
  <div>
    <div style="margin-bottom: 5px;">
      <button @click="plus" class="btn">Plus</button>
      <button @click="minus" class="btn">Minus</button>
    </div>
    <div style="margin-bottom: 5px;">
      <label>ile</label>
      <span>{{amount}}</span>
    </div>
    <div style="margin-bottom: 5px;">
      <label>max</label>
      <span>{{max}}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MyTest",
  props: {
    start: {
      type: Number,
      required: false,
      default: 0
    },
    step: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data() {
    return {
      amount: 0,
      max: 0
    }
  },
  created() {
   this.reset();
  },
  mounted() {
    this.$eventBus.$on('reset', this.reset);
  },
  beforeDestroy(): void{
    this.$eventBus.$off('reset');
  },
  watch: {
    amount(value) {
      if (value > this.max) {
        this.max = value;
        this.$emit('limit', value);
      }
    }
  },
  methods: {
    plus() {
      this.amount += this.step;
    },
    minus() {
      this.amount -= this.step;
    },
    reset() {
      this.amount = this.start;
      this.max = this.start;
    }
  }
}
</script>
