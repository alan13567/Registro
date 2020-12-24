<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height" justify="center">
        <h2>ToDo List</h2>
        <v-spacer></v-spacer>

        <v-btn icon v-if="logueado" @click="salir()">
          <v-icon>logout</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet
              rounded="lg"
              class="spacing-playground pa-6"
              align="center"
              justify="center"
            >
              <p v-if="cargadoNombre">
                ¡Bienvenido {{ this.$store.state.usuario.nombre }}!
              </p>
              <p v-else>¡Bienvenido!</p>
            </v-sheet>
          </v-col>

          <v-col cols="8">
            <v-sheet min-height="70vh" rounded="lg">
              <v-content>
                <v-container fluid fill-height>
                  <v-slide-y-transition mode="out-in">
                    <router-view />
                  </v-slide-y-transition>
                </v-container>
              </v-content>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    nombreUser: "",
  }),
  computed: {
    logueado() {
      return this.$store.state.usuario;
    },
    cargadoNombre() {
      return this.$store.state.usuario !== null;
    },
  },

  methods: {
    salir() {
      this.$store.dispatch("salir");
    },
  },
};
</script>
