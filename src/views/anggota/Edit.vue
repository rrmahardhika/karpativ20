<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Edit Anggota</div>
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
            to="/anggota"
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
            <v-flex xs12 style="font-weight:600;" class="mb-1">Nomor Anggota</v-flex>
            <v-flex sm3 xs12>
              <v-text-field
                v-model="editData.no_anggota"
                class="myForm"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Nama</v-flex>
            <v-flex sm5 xs12>
              <v-text-field
                class="myForm"
                v-model="editData.nama_anggota"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Jenis Kelamin</v-flex>
            <v-flex sm6 xs12>
              <v-radio-group v-model="editData.jenis_kelamin" row class="myRadio" hide-details>
                <v-radio label="Laki-laki" color="rgba(255,101,57,1)" value="0"></v-radio>
                <v-radio label="Perempuan" color="rgba(255,101,57,1)" value="1"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Nomor HP</v-flex>
            <v-flex sm3 xs12>
              <v-text-field
                class="myForm"
                v-model="editData.no_hp"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Alamat</v-flex>
            <v-flex sm8 xs12>
              <v-text-field
                class="myForm"
                v-model="editData.alamat"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap pt-3>
            <v-flex xs12 dark class>
              <v-btn
                class="myBtn mr-1"
                depressed
                dark
                color="rgba(255,101,57,1)"
                @click="updateData()"
              >Update</v-btn>
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
import AnggotaService from "../../services/anggota";
const anggotaService = new AnggotaService();
export default {
  data() {
    return {
      editData: {},
      dialogTanggal: false,
      itemsBreadcums: [
        {
          text: "Anggota",
          disabled: false,
          href: "/anggota"
        },
        {
          text: "Detail",
          disabled: false,
          href: "/anggota/detail/" + this.$route.params.id
        },
        {
          text: "Edit",
          disabled: true
        }
      ]
    };
  },
  computed: {
    computed_tanggal() {
      return this.editData.tanggal_perolehan
        ? moment(this.editData.tanggal_perolehan).format("DD MMMM YYYY")
        : "";
    }
  },
  methods: {
    getById() {
      anggotaService
        .getById(this.$route.params.id)
        .then(data => {
          this.editData = data;
          this.editData.jenis_kelamin = this.editData.jenis_kelamin.toString();
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Terjadi Error" + error);
        });
    },
    updateData() {
      anggotaService
        .update(this.$route.params.id, this.editData)
        .then(() => {
          this.$store.commit("showSnackBar", "Data berhasil diperbarui");
          this.$router.push("/anggota");
        })
        .catch(error => {
          this.$store.commit(
            "showSnackBar",
            "Ada error saat pembaruan " + error
          );
        });
    }
  },
  created() {
    this.getById();
  }
};
</script>
