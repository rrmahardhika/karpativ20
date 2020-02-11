<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Detail Penjualan</div>
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
            to="/penjualan"
            depressed
            outlined
            dark
            color="rgba(255,101,57,1)"
          >Kembali ke Daftar</v-btn>
        </v-flex>
      </v-layout>
      <v-layout mt-5 pt-5>
        <v-flex xs6 class="tableContent">
          <v-layout mb-3 pt-1>
            <div class="myTitle" style="font-size:20px">DATA PENJUALAN</div>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-layout wrap mb-2 style="font-size:14px;">
              <v-flex xs12 style="font-weight:600;" class="mb-1">Nomor Penjualan</v-flex>
              <v-flex sm5 xs12 class="detailPenjualan">{{detailData.no_penjualan}}</v-flex>
            </v-layout>
            <v-flex xs12 style="font-weight:600;" class="mb-1">Tanggal Penjualan</v-flex>
            <v-flex xs12 class="detailPenjualan">{{convertDate(detailData.tgl_penjualan)}}</v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Anggota</v-flex>
            <v-flex xs12 class="detailPenjualan">{{detailData.nama_anggota}}</v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Status Pembayaran</v-flex>
            <v-flex xs12 class="detailPenjualan">
              <v-chip v-if="detailData.ttl_pembayaran<=0" color="error">Belum dibayar</v-chip>
              <v-chip v-else-if="detailData.ttl_penjualan-detailData.ttl_pembayaran>0" color="warning">Sedang diangsur</v-chip>
              <v-chip v-else-if="detailData.ttl_penjualan-detailData.ttl_pembayaran==0" color="success">Lunas</v-chip>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout mt-2 pt-5>
        <v-flex xs12 class="tableContent">
          <v-layout mb-3 pt-1>
            <v-flex>
              <div class="myTitle" style="font-size:20px">ITEM PENJUALAN</div>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            no-data-text="Belum ada Item dipilih"
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{index+1}}</td>
                <td>
                  <v-layout wrap mb-2 style="font-size:14px;">
                    <v-flex xs12 pt-2>{{item.nama_itemjual}}</v-flex>
                  </v-layout>
                </td>

                <td>
                  <v-flex xs12>{{item.qty}}</v-flex>
                </td>
                <td class="text-right">{{formatMoney(item.harga_satuan)}}</td>
                <td class="text-right">{{formatMoney(item.ttl_harga)}}</td>
              </tr>
            </template>
            <template v-slot:body.append>
              <tr>
                <td colspan="4" class="myTitle" style="font-size:20px;">
                  <v-flex pt-4>TOTAL TAGIHAN  </v-flex>
                </td>
                <td
                  colspan="1"
                  class="myTitle text-right"
                  style="text-transform:none; font-size:20px;"
                >
                  <v-flex pt-4>{{formatMoney(detailData.ttl_penjualan)}}</v-flex>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>

      <v-layout mt-2 pt-5>
        <v-flex xs12 class="tableContent">
          <v-layout mb-3 pt-1>
            <v-flex>
              <div class="myTitle" style="font-size:20px">PEMBAYARAN PENJUALAN</div>
            </v-flex>
            <v-flex v-if="detailData.ttl_penjualan-detailData.ttl_pembayaran>0" class="text-right">
              <v-btn
                class="myBtn noActive"
                depressed
                dark
                color="rgba(255,101,57,1)"
                    @click="$router.push('/penjualan/detail/pembayaran/'+$route.params.id)"
              >Tambah Pembayaran</v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headersBayar"
            :items="itemsBayar"
            hide-default-footer
            no-data-text="Belum ada Item dipilih"
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{index+1}}</td>
                <td>
                  <v-layout wrap mb-2 style="font-size:14px;">
                    <v-flex xs12 pt-2>{{convertDate(item.tgl_pembayaranpenjualan)}}</v-flex>
                  </v-layout>
                </td>

                <td>{{formatMoney(item.nominal)}}</td>
                <td class="text-right">
                  <v-btn
                    depressed
                    dark
                    small
                    outlined
                    color="rgba(255,101,57,1)"
                    class="myBtn2"
                    @click="showDialogHapusBayar(item.id)"
                  >Hapus</v-btn>&nbsp;
                </td>
              </tr>
            </template>
            <template v-slot:body.append>
              <tr>
                <td colspan="3" class="myTitle" style="font-size:20px;">
                  <v-flex pt-4>TOTAL PEMBAYARAN</v-flex>
                </td>
                <td
                  colspan="1"
                  class="myTitle text-right"
                  style="text-transform:none; font-size:20px;"
                >
                  <v-flex colspan="2" pt-4>{{formatMoney(detailData.ttl_pembayaran)}}</v-flex>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="myTitle" style="font-size:20px;">
                  <v-flex pt-4>SISA PEMBAYARAN</v-flex>
                </td>
                <td
                  colspan="1"
                  class="myTitle text-right"
                  style="text-transform:none; font-size:20px;"
                >
                  <v-flex colspan="2" pt-4>{{formatMoney(detailData.ttl_penjualan-detailData.ttl_pembayaran)}}</v-flex>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-dialog v-model="dialogHapus" max-width="290">
      <v-card class="pa-1">
        <v-card-title class="headline">Konfirmasi Hapus</v-card-title>
        <v-card-text>Yakin hapus pembayaran ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            dark
            small
            color="rgba(255,101,57,1)"
            class="myBtn"
            @click="hapusDataBayar()"
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
import PenjualanService from "../../services/penjualan";
const penjualanService = new PenjualanService();
import PembayaranPenjualanService from "../../services/pembayaranpenjualan";
const pembayaranPenjualanService = new PembayaranPenjualanService();
export default {
  data() {
    return {
      detailData: {},

      itemsBreadcums: [
        {
          text: "Penjualan",
          disabled: false,
          href: "/penjualan"
        },
        {
          text: "Detail",
          disabled: true,
          href: "/penjualan/detail/"+this.$route.params.id
        }
      ],
      headers: [
        {
          text: "No",
          align: "left",
          sortable: false,
          value: "no"
        },
        { text: "Barang/Jasa", value: "id_itemjual" },
        { text: "Qty", value: "qty" },
        { text: "Harga Satuan", value: "harga_satuan", align: "right" },
        { text: "Total Harga", value: "ttl_harga", align: "right" }
      ],
      headersBayar: [
        {
          text: "No",
          align: "left",
          sortable: false,
          value: "no"
        },
        { text: "Tanggal Bayar", value: "tgl_bayar" },
        { text: "Nominal", value: "qty" },
        { text: "Aksi", align: "right", sortable: false }
      ],
      items: [],
      itemsBayar: [],
      anggotaChoice: [],
      newRow: {
        id_itemjual: "",
        itemjualObj: {},
        qty: 1,
        harga_satuan: 0,
        ttl_harga: 0
      },
      itemJualChoice: [],
      totalHarga: 0,
      dialogHapus : false,
      idPenanda : ''
    };
  },

  computed: {
    computed_tanggal() {
      return this.newData.tgl_penjualan
        ? moment(this.newData.tgl_penjualan).format("DD MMMM YYYY")
        : "";
    }
  },
  methods: {
     showDialogHapusBayar(id) {
      this.dialogHapus = true;
      this.idPenanda = id;
    },
    hapusDataBayar() {
      pembayaranPenjualanService
        .delete(this.idPenanda)
        .then(() => {
          this.$store.commit("showSnackBar", "Data berhasil dihapus");
          this.getById();
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Error saat pengapusan " + error);
        });
      this.dialogHapus = false;
    },
    getById() {
      penjualanService
        .getById(this.$route.params.id)
        .then(data => {
          this.detailData = data;
          this.getItemById();
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Terjadi Error" + error);
        });
    },
    getItemById() {
      penjualanService
        .getItemById(this.$route.params.id)
        .then(data => {
          this.items = data;
          this.getPembayaran();
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Terjadi Error" + error);
        });
    },
    getPembayaran() {
      pembayaranPenjualanService
        .get(this.$route.params.id)
        .then(data => {
           if (data != null)
          this.itemsBayar = data;
          else this.itemsBayar = [];
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Terjadi Error" + error);
        });
    },
    convertDate(tgl) {
      return tgl ? moment(tgl).format("dddd, DD MMMM YYYY") : "";
    },
    formatMoney(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "Rp " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    this.getById();
  }
};
</script>
