<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl5>
      <v-card>
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title> Formulario de Registro </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-flex
            class="green--text text-center"
            v-if="this.usuarioRegistradoCorrectamente"
          >
            {{ this.usuarioRegistradoCorrectamente }}
          </v-flex>
          <v-text-field
            v-model="nombre"
            autofocus
            color="accent"
            label="Nombre"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            autofocus
            color="accent"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            color="accent"
            label="Password"
            required
          ></v-text-field>
          <v-flex class="red--text" v-if="errorM">
            {{ errorM }}
          </v-flex>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right>
            <v-btn @click="registrarse()" color="primary">Registrarse</v-btn>
          </v-flex>
          <v-flex text-xs-left>
            <v-btn color="warning" class="float-right" :to="{ name: 'login' }">
              ¿Tiene cuenta?</v-btn
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
      nombre: "",
      email: "",
      password: "",
      errorM: "",
      usuarioRegistradoCorrectamente: "",
    };
  },

  methods: {
    registrarse() {
      if (this.nombre != "" && this.email != "" && this.password != "") {
        this.errorM = "";
        axios
          .post("usuario/registro", {
            nombre: this.nombre,
            email: this.email,
            password: this.password,
          })
          .then((respuesta) => {
            this.usuarioRegistradoCorrectamente =
              "Usuario Creado correctamente!";
            this.nombre = "";
            this.email = "";
            this.password = "";
            return respuesta.data;
          })
          .catch((error) => {
            this.usuarioRegistradoCorrectamente = "";
            console.log(error);
          });
      } else {
        this.errorM = "Todos los datos son requeridos.";
      }
    },
  },
};
</script>