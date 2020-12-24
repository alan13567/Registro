<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl5>
      <v-card>
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title> Acceso al Sistema </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="email"
            autofocus
            color="accent"
            label="Email"
            required
            @keydown.enter="ingresar()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            color="accent"
            label="Password"
            required
            @keydown.enter="ingresar()"
          ></v-text-field>
          <v-flex class="red--text" v-if="errorM">
            {{ errorM }}
          </v-flex>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right class="float-left">
            <v-btn @click="ingresar()" color="primary"> Ingresar</v-btn>
          </v-flex>
          <v-flex text-xs-left>
            <v-btn
              color="warning"
              class="float-right"
              :to="{ name: 'registro' }"
            >
              ¿No tiene cuenta?</v-btn
            >
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorM: "",
    };
  },

  methods: {
    ingresar() {
      axios
        .post("usuario/login", { email: this.email, password: this.password })
        .then((respuesta) => {
          return respuesta.data;
        })
        .then((data) => {
          this.$store.dispatch("guardarToken", data.tokenReturn);
          this.$router.push({ name: "tareas" });
        })
        .catch((error) => {
          this.errorM = null;
          if (error.response.status == 404) {
            this.errorM =
              "No existe el usuario o las credenciales son incorrectas";
          } else {
            this.errorM = "Ocurrió un error con el servidor";
          }
        });
    },
  },
};
</script>