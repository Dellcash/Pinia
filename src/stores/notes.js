import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useNoteStore = defineStore('Notes', {
  state: () => {
    return {
      notes: useStorage('notes', []),
    };
  },
  getters: {
    getNote: (state) => {
      return (id) => {
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },
  },
  actions: {
    addNote(newNote) {
      const current = new Date().getTime(),
        id = current.toString();

      const note = {
        id,
        content: newNote,
      };
      this.notes.unshift(note);
    },
    deleteNote(id) {
      const index = this.notes.findIndex((note) => note.id === id);
      this.notes.splice(index, 1);
    },
    updateNote(id, newContent) {
      const index = this.notes.findIndex((note) => note.id === id);
      this.notes[index].content = newContent;
    },
  },
});
