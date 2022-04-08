<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { useNoteStore } from '../stores/notes';

const storeNotes = useNoteStore();

const newNote = ref('');
const errorModal = ref(false);
const addNote = () => {
  if (newNote.value === '') {
    errorModal.value = true;
  } else {
    storeNotes.addNote(newNote.value);
  }
  setTimeout(() => {
    errorModal.value = false;
  }, 2000);
  newNote.value = '';
};

const modal = ref(false);
const modalRef = ref(null);
onClickOutside(modalRef, () => {
  modal.value = false;
});

const { notes } = storeNotes;
const deleteNote = () => {
  storeNotes.deleteNote(notes[0].id);
  modal.value = false;
};

const emptyPage = ref(false);
</script>

<template>
  <div class="mx-5">
    <!-- TEXTAREA -->
    <div
      class="relative flex flex-col items-start p-5 mt-10 rounded bg-zinc-800"
    >
      <textarea
        v-model="newNote"
        class="
          w-full
          h-40
          p-5
          mb-3
          font-semibold
          text-black
          rounded
          focus:outline-none
          bg-stone-50
        "
      ></textarea>
      <button
        @click="addNote"
        class="
          px-4
          py-2
          font-bold
          duration-300
          rounded
          bg-zinc-700
          hover:bg-zinc-600
          focus:outline-none
        "
      >
        یادداشت بردار
      </button>
    </div>

    <!-- ERROR MODAL -->
    <Transition name="toast">
      <div
        v-if="errorModal"
        class="
          absolute
          flex
          items-center
          justify-start
          w-full
          right-[5.2%]
          -top-5
          opacity-90
        "
      >
        <div
          class="
            bg-[#8b0000]
            tracking-widest
            text-white
            font-bold
            px-5
            py-4
            rounded
          "
        >
          باید حتما یه چیزی بنویسی!
        </div>
      </div>
    </Transition>

    <Transition appear name="note-list" mode="out-in">
      <!-- LIST OF NOTES -->
      <TransitionGroup tag="ul" name="list" v-if="storeNotes.notes.length > 0">
        <li
          v-for="note in storeNotes.notes"
          :key="note.id"
          class="
            mt-10
            mb-10
            space-y-5
            text-gray-800
            border
            rounded
            bg-stone-50
            border-zinc-300
          "
        >
          <p class="p-5 text-lg tracking-wide">{{ note.content }}</p>
          <div
            class="flex items-center justify-between border-t border-zinc-300"
          >
            <RouterLink
              class="
                w-full
                p-3
                font-semibold
                text-center
                duration-300
                border-r border-zinc-300
                hover:bg-zinc-200
              "
              :to="`/edit/${note.id}`"
            >
              ویرایش
            </RouterLink>
            <button
              @click="modal = true"
              class="w-full p-3 font-semibold duration-300 hover:bg-zinc-200"
            >
              پاک کردن
            </button>
          </div>
        </li>
      </TransitionGroup>

      <!-- EMPTY PAGE -->
      <div
        v-else-if="storeNotes.notes.length === 0"
        class="p-5 mt-10 text-2xl font-thin text-center text-white opacity-30"
      >
        No Notes Yet!
      </div>
    </Transition>

    <!-- MODAL -->
    <Transition name="fade" mode="out-in">
      <div v-if="modal" class="fixed inset-0 z-10 text-gray-800">
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div
          class="
            absolute
            inset-0
            flex flex-col
            items-center
            justify-center
            mx-5
          "
        >
          <div ref="modalRef" class="w-full p-5 bg-white rounded-lg shadow-xl">
            <div class="flex items-center justify-between">
              <h1 class="text-xl font-semibold tracking-tighter">
                پاک کردن یادداشت
              </h1>
              <button
                @click="modal = false"
                class="text-2xl font-semibold duration-500 hover:font-bold"
              >
                &times;
              </button>
            </div>
            <p class="tracking-wide">مطمئنی می‌خواهی پاک کنی؟</p>
            <div class="flex items-center justify-start mt-5">
              <button
                @click="deleteNote"
                class="
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-white
                  duration-300
                  bg-red-700
                  ml-2
                  rounded
                  hover:bg-red-600
                  focus:outline-none
                "
              >
                پاک کردن
              </button>
              <button
                @click="modal = false"
                class="
                  px-4
                  py-2
                  text-sm
                  font-bold
                  duration-300
                  rounded
                  bg-zinc-300
                  hover:bg-zinc-400
                  focus:outline-none
                "
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
/* TOAST */
@keyframes shake {
  0% {
    transform: translateX(-400px);
  }
  50% {
    transform: translateX(0);
  }
  60% {
    transform: translateX(-6px);
  }
  70% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(6px);
  }
  90% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-4px);
  }
}

.toast-enter-active {
  animation: shake 0.4s ease;
}

.toast-leave-active {
  transition: 0.4s ease all;
}

.toast-leave-to {
  transform: translateX(-400px);
}

/* NOTE */
.list-enter-active,
.list-move {
  transition: 0.5s ease all;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-leave-active {
  transition: 0.5s ease all;
  position: absolute;
  width: 70%;
}

/* NOTE LIST */
.note-list-enter-active,
.note-list-leave-active {
  transition: 0.5s ease all;
}

.note-list-enter-from,
.note-list-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/* MODAL */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
