<script setup>
import CardContacts from './CardContacts.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const contacts = ref([])

const fetchData = async () => {
  try {
    const { data } = await axios.get('https://d30986509723c54d.mokky.dev/contacts')
    contacts.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div
    class="w-4/5 m-auto text-center mt-10 border border-slate-200 rounded-3xl p-10 cursor-default"
  >
    <h1 class="text-2xl font-bold mb-5 border-b border-dashed border-slate-300 w-2/3 m-auto pb-5">
      Контакты разработчиков:
    </h1>
    <p>Вы можете связаться с нами, или посмотреть наши репозитории:</p>

    <div class="flex justify-center space-x-4 mt-8">
      <CardContacts
        v-for="contact in contacts"
        :key="contact.id"
        :name="contact.name"
        :label="contact.label"
        :telegramLink="contact.telegramLink"
        :githubLink="contact.githubLink"
        :photo="contact.photo"
      />
    </div>
  </div>
</template>
