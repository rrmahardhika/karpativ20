<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Edit Pinjaman</div>
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
            @click="$router.push('/pinjaman/detail/'+$route.params.id)"
            depressed
            outlined
            dark
            color="rgba(255,101,57,1)"
          >Kembali ke Detail</v-btn>
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
                :return-value.sync="editData.tgl_pinjam"
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
                  v-model="editData.tgl_pinjam"
                  locale="id-id"
                  color="rgba(255,101,57,1)"
                  scrollable
                  @change="$refs.menu_tanggal.save(editData.tgl_pinjam);"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Anggota</v-flex>
            <v-flex sm3 xs12>
              <v-autocomplete
                v-model="editData.id_anggota"
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
                v-model="editData.jml_pinjam"
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
                v-model="editData.bunga"
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
                v-model="editData.ttl_pinjam"
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
                :return-value.sync="editData.tgl_jatuhtempo"
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
                  v-model="editData.tgl_jatuhtempo"
                  locale="id-id"
                  color="rgba(255,101,57,1)"
                  scrollable
                  @change="$refs.menu_tanggal2.save(editData.tgl_jatuhtempo);"
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
import PinjamanService from "../../services/pinjaman";
const pinjamanService = new PinjamanService();
import AnggotaService from "../../services/anggota";
const anggotaService = new AnggotaService();
export default {
  data() {
    return {
      editData: {},
      dialogTanggal: false,
      itemsBreadcums: [
        {
          text: "Pinjaman",
          disabled: false,
          href: "/pinjaman"
        },
         {
          text: "Detail",
          disabled: false,
          href: "/pinjaman/detail/"+this.$route.params.id
        },
        {
          text: "Edit",
          disabled: true
        }
      ],
      anggotaChoice: [],
    
    };
  },
  computed: {
     computed_tanggal() {
      return this.editData.tgl_pinjam
        ? moment(this.editData.tgl_pinjam).format("DD MMMM YYYY")
        : "";
    },
     computed_tanggalJatuh() {
      return this.editData.tgl_jatuhtempo
        ? moment(this.editData.tgl_jatuhtempo).format("DD MMMM YYYY")
        : "";
    }
  },
  methods: {
    getById() {
      pinjamanService
        .getById(this.$route.params.id)
        .then(data => {
          this.editData = data;
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Terjadi Error" + error);
        });
    },
    updateData() {
      pinjamanService
        .update(this.$route.params.id, this.editData)
        .then(() => {
          this.$store.commit("showSnackBar", "Data berhasil diperbarui");
          this.$router.push("/pinjaman/detail/"+this.$route.params.id);
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
    this.getById();
    this.getAnggotaChoice();
  }
};
</script>
