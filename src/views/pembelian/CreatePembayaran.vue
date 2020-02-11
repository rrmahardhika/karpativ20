<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Entri Pembayaran</div>
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
            @click="$router.push('/pembelian/detail/'+$route.params.id)"
            depressed
            outlined
            dark
            color="rgba(255,101,57,1)"
          >Kembali ke Detail Pembelian</v-btn>
        </v-flex>
      </v-layout>
      <v-layout mt-5 pt-5>
        <v-flex xs6 class="tableContent">
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-layout wrap mb-2 style="font-size:14px;">
              <v-flex xs12 style="font-weight:600;" class="mb-1">Tanggal Pembayaran</v-flex>
              <v-flex sm4 xs12>
                <v-menu
                  ref="menu_tanggal"
                  v-model="dialogTanggal"
                  :close-on-content-click="false"
                  :return-value.sync="newData.tgl_pembayaranpembelian"
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
                    v-model="newData.tgl_pembayaranpembelian"
                    locale="id-id"
                    color="rgba(255,101,57,1)"
                    scrollable
                    @change="$refs.menu_tanggal.save(newData.tgl_pembayaranpembelian);"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-flex xs12 style="font-weight:600;" class="mb-1">Nominal</v-flex>
            <v-flex sm4 xs12>
              <v-text-field
                v-model="newData.nominal"
                class="myForm textAlignRight"
                color="rgba(255,101,57,1)"
                dense
                type="number"
                hide-details
                outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex v-if="computed_sisabayar>0" style="font-size:14px; font-style:italic;">Sisa Pembayaran <span style="font-weight:600;">{{formatMoney(computed_sisabayar)}}</span></v-flex>
              <v-flex v-else-if="computed_sisabayar==0" style="font-size:14px; font-style:italic; color:green">Sisa Pembayaran <span style="font-weight:600;">{{formatMoney(computed_sisabayar)}} (LUNAS)</span></v-flex>
           <v-flex v-else-if="computed_sisabayar<0" style="font-size:14px; font-style:italic; color:red">Total Tagihan hanya <span style="font-weight:600;">{{formatMoney(detailData.ttl_penjualan-detailData.ttl_pembayaran)}} - Pembayaran Berlebih</span></v-flex>
         
          </v-layout>
          <v-layout wrap pt-3>
            <v-flex xs12 dark>
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
import PembelianService from "../../services/pembelian";
const pembelianService = new PembelianService();
import PembayaranPembelianService from "../../services/pembayaranpembelian";
const pembayaranPembelianService = new PembayaranPembelianService();
export default {
  data() {
    return {
      newData: {},
      dialogTanggal: false,
      dialogTanggalJ: false,
      itemsBreadcums: [
        {
          text: "Pembelian",
          disabled: false,
          href: "/pembelian"
        },
        {
          text: "Detail",
          disabled: false,
          href: "/pembelian/detail/" + this.$route.params.id
        },
        {
          text: "Pembayaran",
          disabled: true
        }
      ],
      detailData: [],
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
        { text: "Total Harga", value: "ttl_harga", align: "right" },
        { text: "Aksi", align: "center" }
      ],
    
     
    };
  },
  watch: {
    items: {
      handler: function() {
        this.updateHarga();
      },
      deep: true
    }
  },
  computed: {
    computed_tanggal() {
      return this.newData.tgl_pembayaranpembelian
        ? moment(this.newData.tgl_pembayaranpembelian).format("DD MMMM YYYY")
        : "";
    },
    computed_sisabayar(){
      return this.detailData.ttl_pembelian-this.detailData.ttl_pembayaran-this.newData.nominal;
    }
  },
  methods: {
    getById() {
      pembelianService
        .getById(this.$route.params.id)
        .then(data => {
          this.detailData = data;
        })
        .catch(error => {
          this.$store.commit("showSnackBar", "Terjadi Error" + error);
        });
    },
    initNew() {
      this.newData = {
        tgl_pembayaran: "",
        nominal: '',
        id_pembelian:this.$route.params.id
      };
    },
    convertDate(tgl) {
      return tgl ? moment(tgl).format("DD MMMM YYYY") : "";
    },
    formatMoney(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "Rp " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    saveData() {
      if(this.computed_sisabayar>=0)
      {
      pembayaranPembelianService
        .post(this.newData)
        .then(()=> {
          this.$store.commit("showSnackBar", "Data berhasil disimpan");
          this.$router.push("/pembelian/detail/"+this.$route.params.id);
        })
        .catch(error => {
        this.$store.commit("showSnackBar", "Error saat menyimpan data "+error);
        });
      }
      else
      {
        this.$store.commit("showSnackBar", "Pembayaran berlebih!");
      }
    }
  },
  created() {
    this.initNew();
    this.getById();
  }
};
</script>
