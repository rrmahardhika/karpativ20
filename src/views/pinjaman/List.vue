<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Pinjaman</div>
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
          <v-btn class="myBtn" to="pinjaman/create" depressed dark color="rgba(255,101,57,1)">Entri</v-btn>
        </v-flex>
      </v-layout>
      <v-layout mt-5 pt-5>
        <v-flex xs12 class="tableContent">
          <v-layout wrap mb-3 style="font-size:14px;">
            <v-spacer></v-spacer>
            <v-flex sm3 xs12 class="mr-2">
              <v-autocomplete
                v-model="sortTable"
                class="mySelect"
                :items="headerForSort"
                prepend-inner-icon="mdi-sort"
                item-text="text"
                item-value="value"
                placeholder="Urutkan Berdasarkan"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                outlined
              ></v-autocomplete>
            </v-flex>
            <v-flex sm3 xs12>
              <v-text-field
                class="myForm"
                prepend-inner-icon="mdi-magnify"
                v-model="searchTable"
                color="rgba(255,101,57,1)"
                dense
                hide-details
                placeholder="Cari"
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            :search="searchTable"
            must-sort
            :sort-by.sync="sortTable"
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{index+1}}</td>
                <td>{{convertDate(item.tgl_pinjam)}}</td>

                <td>{{item.nama_anggota}}</td>
                <td>{{formatMoney(item.ttl_pinjam)}}</td>
                <td>{{convertDate(item.tgl_jatuhtempo)}}</td>
                <td class="text-center">
                  <v-chip small v-if="item.ttl_pembayaran===0" color="error">Belum dibayar</v-chip>
                  <v-chip
                    small
                    v-else-if="item.ttl_pinjam-item.ttl_pembayaran>0"
                    color="warning"
                  >Sedang diangsur</v-chip>
                  <v-chip
                    small
                    v-else-if="item.ttl_pembayaran===item.ttl_pinjam"
                    color="success"
                  >Lunas</v-chip>
                </td>
                <td class="text-center">
                  <v-btn
                    outlined
                    depressed
                    small
                    color="rgba(255,101,57,1)"
                    class="myBtn2"
                    @click="$router.push('pinjaman/detail/'+item.id)"
                  >Detail</v-btn>&nbsp;
                  <v-btn
                    outlined
                    depressed
                    small
                    color="rgba(255,101,57,1)"
                    class="myBtn2"
                    @click="showDialogHapus(item.id)"
                  >Delete</v-btn>
                </td>
              </tr>
            </template>
            <!-- <template v-slot:item.aksi="{ }">
            </template>-->
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialogHapus" max-width="290">
      <v-card class="pa-1">
        <v-card-title class="headline">Konfirmasi Hapus</v-card-title>
        <v-card-text>Yakin hapus pinjaman ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            dark
            small
            color="rgba(255,101,57,1)"
            class="myBtn"
            @click="hapusData()"
          >Hapus</v-btn>&nbsp;
          <v-btn
            outlined
            depressed
            small
            color="rgba(255,101,57,1)"
            class="myBtn2"
            @click="dialogHapus=false"
          >Batal</v-btn>&nbsp;
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
import PinjamanService from "../../services/pinjaman";
const pinjamanService = new PinjamanService();
import AnggotaService from "../../services/anggota";
const anggotaService = new AnggotaService();
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
  weekdays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  items: []
});
export default {
  data() {
    return {
      idPenanda: "",
      searchTable: "",
      itemsBreadcums: [
        {
          text: "Pinjaman",
          disabled: true,
          href: "pinjaman"
        }
      ],
      headers: [
        {
          text: "No",
          align: "left",
          sortable: false,
          value: "no"
        },
        { text: "Tanggal", value: "tgl_pinjam" },
        { text: "Anggota", value: "nama_anggota" },
        { text: "Total Pinjaman", value: "ttl_pinjam" },
        { text: "Tanggal Jatuh Tempo", value: "tgl_jatuhtempo" },
        { text: "Status Bayar", align: "center" },
        { text: "Aksi", value: "aksi", sortable: false, align: "center" }
      ],
      items: [],
      dialogHapus: false,
      sortTable: "tgl_pinjaman",

      anggotaChoice: []
    };
  },
  computed: {
    headerForSort() {
      return this.headers.filter(header => header.sortable != false);
    }
  },
  methods: {
    convertDate(tgl) {
      return tgl ? moment(tgl).format("DD MMMM YYYY") : "";
    },
    showDialogHapus(id) {
      this.dialogHapus = true;
      this.idPenanda = id;
    },
    hapusData() {
      pinjamanService
        .delete(this.idPenanda)
        .then(() => {
          this.$store.commit("showSnackBar", "Data berhasil dihapus");
          this.getData();
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Error saat pengapusan " + error);
        });
      this.dialogHapus = false;
    },
    getDisplayDate(tanggal) {
      return moment(tanggal).format("DD MMMM YYYY");
    },
    formatMoney(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "Rp " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getData() {
      this.loadingTable = true;
      pinjamanService
        .get()
        .then(data => {
          if (data != null) {
            this.items = data;
          } else this.items = [];
          this.loadingTable = false;
        })
        .catch(error => {
          this.snackbarText = "Error saat mengambil data: " + error;
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
    this.getData();
    this.getAnggotaChoice();
  }
};
</script>
