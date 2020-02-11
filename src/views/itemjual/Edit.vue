<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Edit Item Jual</div>
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
            to="/itemjual"
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
            <v-flex xs12 style="font-weight:600;" class="mb-1">No Item Jual</v-flex>
            <v-flex sm3 xs12>
              <v-text-field
                v-model="editData.no_itemjual"
                class="myForm"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Nama Item</v-flex>
            <v-flex sm5 xs12>
              <v-text-field
                class="myForm"
                v-model="editData.nama_itemjual"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Kategori Item</v-flex>
             <v-flex sm3 xs12>
              <v-autocomplete
                v-model="editData.kategori_itemjual"
                class="mySelect"
                :items="kategoriChoice"
                item-text="text"
                item-value="value"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Supplier</v-flex>
            <v-flex sm4 xs12>
              <v-autocomplete
                v-model="editData.id_supplier"
                class="mySelect"
                :items="supplierChoice"
                color="rgba(255,101,57,1)"
                item-text="nama_supplier"
                item-value="id_supplier"
                dense
                hide-details
                outlined
              ></v-autocomplete>
            </v-flex>
          </v-layout>
           <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Harga Beli</v-flex>
            <v-flex sm3 xs12>
              <v-text-field
                class="myForm"
                v-model="editData.harga_beli"
                color="rgba(255,101,57,1)"
                dense
                type="number"
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Harga Jual</v-flex>
            <v-flex sm3 xs12>
              <v-text-field
                class="myForm"
                v-model="editData.harga_jual"
                color="rgba(255,101,57,1)"
                dense
                type="number"
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
import ItemJualService from "../../services/itemjual";
const itemJualService = new ItemJualService();
import SupplierService from "../../services/supplier";
const supplierService = new SupplierService();
export default {
  data() {
    return {
      editData: {},
      dialogTanggal: false,
      itemsBreadcums: [
        {
          text: "Item Jual",
          disabled: false,
          href: "/itemjual"
        },
        {
          text: "Edit",
          disabled: true
        }
      ],
      kategoriChoice: [
        {
          value: "0",
          text: "Barang"
        },
        {
          value: "1",
          text: "Jasa"
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
         itemJualService
          .getById(this.$route.params.id)
          .then(data => {
              this.editData=data;
              this.editData.kategori_itemjual=this.editData.kategori_itemjual.toString();
          })
          .catch(error => {
            this.$store.commit("showSnackBar","Terjadi Error"+error);           
          });
    },
    updateData() {
      itemJualService
        .update(this.$route.params.id, this.editData)
        .then(() => {
          this.$store.commit("showSnackBar","Data berhasil diperbarui");
          this.$router.push("/itemjual");
        })
        .catch(error => {
          this.$store.commit("showSnackBar","Terjadi error saat pembaruan "+error);
        });
    },
    getSupplierChoice() {
      supplierService
        .get()
        .then(data => {
          if (data != null) {
            this.supplierChoice = data;
          } else this.supplierChoice = [];
        })
        .catch(error => {
          this.$store.commit(
            "showSnackBar",
            "Error saat mengambil data supplier " + error
          );
        });
    },
  },
  created() {
    
    this.getSupplierChoice();
    this.getById();
  }
};
</script>
