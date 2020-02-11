<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Edit Supplier</div>
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
            <v-flex sm3 xs12>
              <v-text-field
                v-model="editData.id_supplier"
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
                v-model="editData.nama_supplier"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Alamat Supplier</v-flex>
            <v-flex sm6 xs12>
              <v-text-field
                class="myForm"
                v-model="editData.alamat_supplier"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap pt-3>
            <v-flex xs12 dark class="">
              <v-btn class="myBtn mr-1" depressed dark color="rgba(255,101,57,1)" @click="updateData()">Update</v-btn>
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
      editData: {},
      dialogTanggal: false,
      itemsBreadcums: [
        {
          text: "Supplier",
          disabled: false,
          href: "/supplier"
        },
        {
          text: "Edit",
          disabled: true
        }
      ],
     
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
     getById(){
         supplierService
          .getById(this.$route.params.id)
          .then(data => {
              this.editData=data;
          })
          .catch(error => {
            this.$store.commit("showSnackBar","Terjadi Error"+error);           
          });
    },
    updateData() {
      supplierService
        .update(this.$route.params.id, this.editData)
        .then(() => {
          this.$store.commit("showSnackBar","Data berhasil diperbarui");
          this.$router.push("/supplier");
        })
        .catch(error => {
          this.snackbarText = "Error saat menyimpan data: "+ error;
          this.snackbar = true;
        });
    }
  },
  created() {
    this.getById();
  }
};
</script>
