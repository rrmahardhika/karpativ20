<template>
  <v-app>
    <v-navigation-drawer
      v-if="notLoginPage"
      permanent
      app
      dark
      color="#323232"
      width="300"
      style="padding:5px;"
    >
      <v-list nav class="py-0" dense>
        <v-list-item two-line class="mb-4">
          <v-list-item-content>
            <div class="logoKarpati">KARPATI</div>
            <v-list-item-subtitle>
              <div class="logoPmt">PT Prima Multi Terminal</div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-analytics</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="textNavDiv">Master</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/assets">
          <v-list-item-icon>
            <v-icon>mdi-book-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Aset</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/anggota">
          <v-list-item-icon>
            <v-icon>mdi-account-badge</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Anggota</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/supplier">
          <v-list-item-icon>
            <v-icon>mdi-package-variant-closed</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Supplier</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/itemjual">
          <v-list-item-icon>
            <v-icon>mdi-tag-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Item Jual</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="textNavDiv">Transaksi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/simpanan">
          <v-list-item-icon>
            <v-icon>mdi-page-next</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Simpanan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/pinjaman">
          <v-list-item-icon>
            <v-icon>mdi-page-next-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Pinjaman</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/penjualan">
          <v-list-item-icon>
            <v-icon>mdi-script-text</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Penjualan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/pembelian">
          <v-list-item-icon>
            <v-icon>mdi-script-text-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Pembelian</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="textNavDiv">Laporan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/laporan">
          <v-list-item-icon>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="textNav">Laporan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
    <v-snackbar v-model="$store.state.snackbar" color="#323232" :timeout="2000">
      {{ $store.state.snackbarText }}
      <v-btn color="rgba(255,101,57,1)" text @click="$store.state.snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>
<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&display=swap");
</style>
<script>
import AuthService from "./services/auth";
const authService = new AuthService();
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    notLoginPage() {
      return this.$route.path != "/login";
    }
  },
  watch: {
    $route() {
      this.checkAuthToken();
    }
  },
  methods: {
    checkAuthToken() {
      let auth;
      auth = authService.getLoginAccount();
      this.loginAccount = auth;
      if (this.notLoginPage) {
        try {
          if (this.loginAccount == null) throw "Silahkan Login terlebih dahulu";
          if (!this.loginAccount.username || !this.loginAccount.password)
            throw "Silahkan Login terlebih dahulu";
        } catch (error) {
          this.$router.push("/login");
          this.$store.commit("showSnackBar", error);
        }
      }
    }
  },
  created() {
    this.checkAuthToken();
  }
};
</script>
