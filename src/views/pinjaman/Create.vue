<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Entri Pinjaman</div>
          <div class="breadcums">
            <v-breadcrumbs :items="itemsBreadcums">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex class="text-md-right pt-3">
          <v-btn
            class="myBtn2 noActive"
            to="/pinjaman"
            depressed
            outlined
            dark
            color="rgba(255,101,57,1)"
          >Kembali ke Daftar</v-btn>
        </v-flex>
      </v-layout>
      <v-layout mt-5 pt-5>
        <v-flex xs12 class="tableContent">
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Tanggal Pinjaman</v-flex>
            <v-flex sm4 xs12>
              <v-menu
                ref="menu_tanggal"
                v-model="dialogTanggal"
                :close-on-content-click="false"
                :return-value.sync="newData.tgl_pinjam"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computed_tanggal"
                    readonly
                    color="rgba(255,101,57,1)"
                    v-on="on"
                    class="myForm"
                    dense
                    hide-details
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="newData.tgl_pinjam"
                  locale="id-id"
                  color="rgba(255,101,57,1)"
                  scrollable
                  @change="$refs.menu_tanggal.save(newData.tgl_pinjam);"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Anggota</v-flex>
            <v-flex sm3 xs12>
              <v-autocomplete
                v-model="newData.id_anggota"
                class="mySelect"
                :items="anggotaChoice"
                item-text="nama_anggota"
                item-value="id"
                dense
                hide-details
                outlined
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Jumlah Pinjaman</v-flex>
            <v-flex sm2 xs12>
              <v-text-field
                v-model="newData.jml_pinjam"
                class="myForm"
                color="rgba(255,101,57,1)"
                dense
                type="number"
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Bunga</v-flex>
            <v-flex sm2 xs12>
              <v-text-field
                v-model="newData.bunga"
                class="myForm"
                color="rgba(255,101,57,1)"
                dense
                type="number"
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Total Pinjaman</v-flex>
            <v-flex sm2 xs12>
              <v-text-field
                v-model="newData.ttl_pinjam"
                class="myForm"
                color="rgba(255,101,57,1)"
                dense
                type="number"
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Tanggal Jatuh Tempo</v-flex>
            <v-flex sm4 xs12>
              <v-menu
                ref="menu_tanggal2"
                v-model="dialogTanggalJ"
                :close-on-content-click="false"
                :return-value.sync="newData.tgl_jatuhtempo"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computed_tanggalJatuh"
                    readonly
                    color="rgba(255,101,57,1)"
                    v-on="on"
                    class="myForm"
                    dense
                    hide-details
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="newData.tgl_jatuhtempo"
                  locale="id-id"
                  color="rgba(255,101,57,1)"
                  scrollable
                  @change="$refs.menu_tanggal2.save(newData.tgl_jatuhtempo);"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout wrap pt-3>
            <v-flex xs12 dark class>
              <v-btn
                class="myBtn mr-1"
                depressed
                dark
                color="rgba(255,101,57,1)"
                @click="saveData()"
              >Simpan</v-btn>
              <v-btn
                class="myBtn2 mx-1"
                outlined
                depressed
                dark
                color="rgba(255,101,57,1)"
                @click="initNew()"
              >Reset</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import moment from "moment";
moment.locale("bahasa", {
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ],
  weekdays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
});
import PinjamanService from "../../services/pinjaman";
const pinjamanService = new PinjamanService();
import AnggotaService from "../../services/anggota";
const anggotaService = new AnggotaService();
export default {
  data() {
    return {
      newData: {},

      dialogTanggal: false,
      dialogTanggalJ: false,
      itemsBreadcums: [
        {
          text: "Simpanan",
          disabled: false,
          href: "/simpanan"
        },
        {
          text: "Create",
          disabled: true
        }
      ],
      anggotaChoice: []
    };
  },
  computed: {
    computed_tanggal() {
      return this.newData.tgl_pinjaman
        ? moment(this.newData.tgl_pinjaman).format("DD MMMM YYYY")
        : "";
    },
     computed_tanggalJatuh() {
      return this.newData.tgl_jatuhtempo
        ? moment(this.newData.tgl_jatuhtempo).format("DD MMMM YYYY")
        : "";
    }
  },
  methods: {
    initNew() {
      this.newData = {
        id_anggota: "",
        jml_pinjam: "",
        bunga: "",
        ttl_pinjam: "",
        tgl_pinjam: "",
        tgl_jatuhtempo: ""
      };
    },
    saveData() {
      pinjamanService
        .post(this.newData)
        .then(() => {
          this.$store.commit("showSnackBar", "Data berhasil disimpan");
          this.$router.push("/pinjaman");
        })
        .catch(error => {
          this.snackbarText = "Error saat menyimpan data: " + error;
          this.snackbar = true;
        });
    },
    getAnggotaChoice() {
      anggotaService
        .get()
        .then(data => {
          if (data != null) {
            this.anggotaChoice = data;
          } else this.anggotaChoice = [];
        })
        .catch(error => {
          this.$store.commit(
            "showSnackBar",
            "Error saat mengambil data anggota " + error
          );
        });
    }
  },
  created() {
    this.initNew();
    this.getAnggotaChoice();
  }
};
</script>
