<template>
  <v-container style="max-width: 600px">
    <v-text-field
      v-model="task"
      label="What are you working on?"
      solo
      @keydown.enter="addTask"
    >
      <v-fade-transition slot="append">
        <v-icon v-if="task" @click="addTask"> add_circle </v-icon>
      </v-fade-transition>
    </v-text-field>

    <h2 class="display-1 success--text pl-3 text-center">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-3"></v-divider>

    <v-layout my-1 align-center>
      <strong class="mx-3 info--text text--darken-3">
        Remaining: {{ remainingTasks }}
      </strong>

      <!-- Will be fixed for v1.2 -->
      <v-divider vertical></v-divider>

      <strong class="mx-3 black--text">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-layout>

    <v-divider class="mb-3"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition class="py-0" group>
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item :key="`${i}-${task.nombre}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.realizada"
                color="info darken-3"
                @click="accion(task)"
              >
                <div
                  slot="label"
                  :class="(task.realizada && 'grey--text') || 'text--primary'"
                  class="ml-3"
                  v-text="task.nombre"
                ></div>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="task.realizada" color="success"> check </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "tareas",
  data: () => ({
    tasks: [],
    task: null,
  }),

  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.realizada).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
    this.listar();
  },

  methods: {
    listar() {
      let me = this;
      axios
        .get("tarea/listar?usuario=" + this.$store.state.usuario._id)
        .then(function (response) {
          console.log(response.data);
          me.tasks = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addTask() {
      let me = this;
      console.log(this.task);
      //guardar nuevo registro
      axios
        .post("tarea/crear", {
          usuario: this.$store.state.usuario._id,
          nombre: this.task,
        })
        .then(function (response) {
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });

      this.task = null;
    },
    accion(tarea) {
      let me = this;
      if (tarea.realizada) {
        axios
          .post("tarea/terminada", {
            _id: tarea._id,
          })
          .then(function (response) {
            me.listar();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //deshacer el realizado
        axios
          .post("tarea/deshacer", {
            _id: tarea._id,
          })
          .then(function (response) {
            me.listar();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>