<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex xs12 class="pl-5 ml-1">
          <div class="myTitle">Dashboard</div>
          <div class="breadcums">
            <v-breadcrumbs :items="itemsBreadcums">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </div>
        </v-flex>
      </v-layout>
      <v-layout mt-5 pt-5>
        <v-flex xs12 style="font-size:22px" class="pl-5 ml-1">
          Hai
          <b>Admin</b>,
          <br />SELAMAT DATANG DI SISTEM KOPERASI USAHA PT PRIMA MULTI TERMINAL
        </v-flex>
      </v-layout>
      <v-layout mt-5 pt-5>
        <v-flex pl-5 ml-1>
          <v-btn
            class="myBtn2 noActive"
            depressed
            outlined
            dark
            @click="logout()"
            color="rgba(255,101,57,1)"
          >Log Out</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
export default {
  data() {
    return {
      itemsBreadcums: [
        {
          text: "Dashboard",
          disabled: true,
          loginAccount:{}
        }
      ]
    };
  },
 
  methods: {
    logout() {
      window.sessionStorage.removeItem("auth_token");
      this.$router.push("/login");
    }
  },
  created() {
  }
};
</script>
