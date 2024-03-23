<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    close() {
      this.show = false
    }
  }
}
</script>

<template>
  <div
    v-if="show"
    class="m-auto text-center mt-5 border-l-4 border-orange-500 rounded-r-xl p-2 bg-orange-100 shadow shadow-orange-100"
  >
    <div class="relative">
      <img
        class="absolute right-0 w-6 cursor-pointer"
        src="/public/close.svg"
        alt="Close"
        @click="close"
      />
    </div>
    <h1 class="font-bold">Допущены ошибки:</h1>
    <p>{{ errorMessage }}</p>
  </div>
</template>
