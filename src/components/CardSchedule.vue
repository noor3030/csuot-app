<template>
  <div>
    <p v-if="card.lesson.teacher_id !=null">
      {{ getTeacher(card.lesson.teacher_id).name }}
    </p>
    <p>
      {{ getSubjects(card.lesson.subject_id).name }}
    </p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    card: {
      type: Object,
    },
    teachers: {
      type: Object,
    },
    subjects: {
      type: Object,
    },
  },
  methods: {
    getTeacher(id: string) {
      for (let i of this.teachers) {
        if (i.id == id) {
          return i;
        }
      }
    },
    getSubjects(id: string) {
      for (let subject of this.subjects) {
        if (subject.id == id) {
          return subject;
        }
      }
    },
  },
});
</script>