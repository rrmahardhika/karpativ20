<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Entri Item Jual</div>
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
            <v-flex xs12 style="font-weight:600;" class="mb-1">Id Item</v-flex>
            <v-flex sm2 xs12>
              <v-text-field
                v-model="newData.no_itemjual"
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
                v-model="newData.nama_itemjual"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Kategori</v-flex>
            <v-flex sm3 xs12>
              <v-autocomplete
                v-model="newData.kategori_itemjual"
                class="mySelect"
                :items="kategoriChoice"
                item-text="text"
                item-value="value"
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
                v-model="newData.id_supplier"
                class="mySelect"
                :items="supplierChoice"
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
                v-model="newData.harga_beli"
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
                v-model="newData.harga_jual"
                color="rgba(255,101,57,1)"
                dense
                type="number"
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
import ItemJualService from "../../services/itemjual";
const itemJualService = new ItemJualService();
import SupplierService from "../../services/supplier";
const supplierService = new SupplierService();
export default {
  data() {
    return {
      newData: {},
      dialogTanggal: false,
      itemsBreadcums: [
        {
          text: "Item Jual",
          disabled: false,
          href: "/itemjual"
        },
        {
          text: "Create",
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
      supplierChoice: []
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
        no_itemjual: "",
        nama_itemjual: "",
        kategori_itemjual: "",
        id_supplier: "",
        harga_beli: "",
        harga_jual: ""
      };
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
    saveData() {
      itemJualService
        .post(this.newData)
        .then(() => {
          this.$store.commit("showSnackBar", "Data berhasil disimpan");
          this.$router.push("/itemjual");
        })
        .catch(error => {
         this.$store.commit("showSnackBar", "Terjadi error saat proses penyimpanan " +error);
        });
    }
  },
  created() {
    this.initNew();
    this.getSupplierChoice();
  }
};
</script>
