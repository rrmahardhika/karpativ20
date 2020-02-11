<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Entri Supplier</div>
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
            to="/supplier"
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
            <v-flex xs12 style="font-weight:600;" class="mb-1">Id Supplier</v-flex>
            <v-flex sm2 xs12>
              <v-text-field
                v-model="newData.id_supplier"
                class="myForm"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Nama Supplier</v-flex>
            <v-flex sm5 xs12>
              <v-text-field
                class="myForm"
                v-model="newData.nama_supplier"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Alamat</v-flex>
            <v-flex sm9 xs12>
              <v-text-field
                class="myForm"
                v-model="newData.alamat_supplier"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
        
          <v-layout wrap pt-3>
            <v-flex xs12 dark class="">
              <v-btn class="myBtn mr-1" depressed dark color="rgba(255,101,57,1)" @click="saveData()">Simpan</v-btn>
              <v-btn class="myBtn2 mx-1" outlined depressed dark color="rgba(255,101,57,1)" @click="initNew()">Reset</v-btn>
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
import SupplierService from "../../services/supplier";
const supplierService = new SupplierService();
export default {
  data() {
    return {
      newData: {},
      dialogTanggal: false,
      itemsBreadcums: [
        {
          text: "Supplier",
          disabled: false,
          href: "/supplier"
        },
        {
          text: "Create",
          disabled: true
        }
      ],
     
    };
  },
  computed: {
    computed_tanggal() {
      return this.newData.tanggal_perolehan
        ? moment(this.newData.tanggal_perolehan).format("DD MMMM YYYY")
        : "";
    }
  },
  methods: {
    initNew() {
      this.newData = {
        id_supplier: "",
        nama_supplier: "",
        alamat_supplier: ""
      };
    },
    saveData() {
      supplierService
        .post(this.newData)
        .then(() => {
          this.$store.commit("showSnackBar","Data berhasil disimpan");
          this.$router.push("/supplier");
        })
        .catch(error => {
          this.snackbarText = "Error saat menyimpan data: "+ error;
          this.snackbar = true;
        });
    }
  },
  created() {
    this.initNew();
  }
};
</script>
