<template>
  <v-layout style="padding:0px !important; height:100vh; background-color: #F8F8F8 !important;">
    <v-flex md3 sm6 class="mx-4 my-4" style="margin:auto !important;">
      <v-card
        class="px-5 py-4"
        style="opacity:1; background-color:#323232 ;border-radius:15px; -webkit-box-shadow: 7px 9px 5px -1px rgba(0,0,0,0.75); -moz-box-shadow: 7px 9px 5px -1px rgba(0,0,0,0.75); box-shadow: 7px 9px 5px -1px rgba(0,0,0,0.75);"
      >
        <v-layout justify-center row wrap>
          <v-flex xs12 class="text-center py-1">
            <img src="../assets/img/icon.png" height="60" width="250" />
          </v-flex>
          <v-flex xs12 class="text-center">
          <div class="logoKarpati text-center">KARPATI</div>
            <div class="logoPmt text-center mb-2" style="margin-top:-5px">PT Prima Multi Terminal</div>
          </v-flex>
        </v-layout>
        <v-layout my-2>
          <v-flex class="text-center" style="color:white; font-size:20px; font-weight:600; letter-spacing:2px; text-transform:uppercase">Login</v-flex>
        </v-layout>
        <!-- <v-layout class="titleApp2 mt-2" justify-center>Login Form</v-layout> -->
        <v-form ref="form">
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600; color:white" class="mb-1">Username</v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="dataLogin.username"
                class="myFormLogin"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600; color:white" class="mb-1">Password</v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="dataLogin.password"
                class="myFormLogin"
                color="rgba(255,101,57,1)"
                dense
                type="password"
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout pt-2>
          <v-flex class='text-center'>
            <v-btn color="myBtn" :loading="loginLoading" @click="login()">Login</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthService from "../services/auth";
const authService = new AuthService();
export default {
  data() {
    return {
      loginLoading: false,
      dataLogin: {
        username: null,
        password: null
      },
      formRules: {
        textRules: [
          v => !!v || "Isi terlebih dahulu"
          //v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ]
      }
    };
  },
  computed: {},
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loginLoading = true;
        authService
          .login(this.dataLogin)
          .then(data => {
            if (data.code == 200) {
              
            this.$store.commit("showSnackBar", "Login Berhasil");
              authService.setLoginAccount(data.jwt);
              this.$router.push("/");
            } else {
              throw "Username atau Password Salah";
            }
          })
          .catch(error => {
          this.$store.commit("showSnackBar", "Error Saat Login "+error);
            this.$refs.form.reset();
            this.loginLoading = false;
          });
      }
    }
  },
  created() {
    this.$store.state.isLoginPage = true;
  }
};
</script>