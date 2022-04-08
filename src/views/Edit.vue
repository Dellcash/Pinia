<script setup>
import { ref } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useNoteStore } from '../stores/notes';

const storeNotes = useNoteStore();
const route = useRoute();
const newNote = ref('');
newNote.value = storeNotes.getNote(route.params.id);

const router = useRouter();
const updateNote = () => {
  storeNotes.updateNote(route.params.id, newNote.value);
  router.push('/');
};
</script>

<template>
  <div class="flex flex-col items-start p-5 mx-5 mt-10 bg-white rounded">
    <textarea
      v-model="newNote"
      class="
        w-full
        h-40
        p-5
        mb-3
        font-semibold
        text-white
        rounded
        focus:outline-none
        bg-zinc-800
      "
    ></textarea>
    <div class="flex">
      <button
        :disabled="!newNote"
        @click="updateNote"
        class="
          px-4
          py-2
          font-bold
          text-gray-100
          duration-300
          rounded
          ml-2
          bg-zinc-800
          hover:bg-zinc-200 hover:text-gray-800
          focus:outline-none
        "
      >
        ذخیره
      </button>
      <RouterLink
        to="/"
        class="
          px-4
          py-2
          font-bold
          text-gray-800
          duration-300
          rounded
          bg-zinc-200
          hover:bg-zinc-800 hover:text-white
          focus:outline-none
        "
      >
        لغو
      </RouterLink>
    </div>
  </div>
</template>
