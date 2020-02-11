<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Entri Penjualan</div>
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
              <v-flex sm5 xs12>
                <v-text-field
                  v-model="newData.no_penjualan"
                  class="myForm"
                  color="rgba(255,101,57,1)"
                  dense
                  type="number"
                  hide-details
                  outlined
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12 style="font-weight:600;" class="mb-1">Tanggal Penjualan</v-flex>
            <v-flex sm8 xs12>
              <v-menu
                ref="menu_tanggal"
                v-model="dialogTanggal"
                :close-on-content-click="false"
                :return-value.sync="newData.tgl_penjualan"
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
                  v-model="newData.tgl_penjualan"
                  locale="id-id"
                  color="rgba(255,101,57,1)"
                  scrollable
                  @change="$refs.menu_tanggal.save(newData.tgl_penjualan);"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout wrap mb-2 style="font-size:14px;">
            <v-flex xs12 style="font-weight:600;" class="mb-1">Anggota</v-flex>
            <v-flex sm6 xs12>
              <v-autocomplete
                v-model="newData.id_anggota"
                class="mySelect"
                :items="anggotaChoice"
                color="rgba(255,101,57,1)"
                item-text="nama_anggota"
                item-value="id"
                dense
                hide-details
                outlined
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <!-- <v-layout wrap pt-3>
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
          </v-layout>-->
        </v-flex>
      </v-layout>
      <v-layout mt-2 pt-5>
        <v-flex xs12 class="tableContent">
          <v-layout mb-3 pt-1>
            <v-flex>
              <div class="myTitle" style="font-size:20px">ITEM PENJUALAN</div>
            </v-flex>
            <v-flex class="text-right">
              <v-btn
                class="myBtn2 noActive"
                depressed
                outlined
                dark
                color="rgba(255,101,57,1)"
                @click="addRow()"
              >Tambah Item</v-btn>
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
                    <v-flex xs12 pt-2>
                      <v-autocomplete
                        class="mySelect"
                        color="rgba(255,101,57,1)"
                        dense
                        v-model="items[index].id_itemjual"
                        :items="itemJualChoice"
                        item-text="nama_itemjual"
                        item-value="id"
                        hide-details
                        v-on:change="updatePriceOnProduct(index)"
                        outlined
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </td>

                <td>
                  <v-flex xs12>
                    <v-text-field
                      v-model="items[index].qty"
                      class="myForm textAlignRight"
                      color="rgba(255,101,57,1)"
                      dense
                      type="number"
                      hide-details
                      outlined
                    ></v-text-field>
                  </v-flex>
                </td>
                <td class="text-right">{{formatMoney(item.harga_satuan)}}</td>
                <td class="text-right">{{formatMoney(item.ttl_harga)}}</td>

                <td class="text-center">
                  <v-btn
                    outlined
                    depressed
                    small
                    color="rgba(255,101,57,1)"
                    class="myBtn2"
                    @click="deleteRow(index)"
                  >Delete</v-btn>
                </td>
              </tr>
            </template>
            <template v-slot:body.append="{ }">
              <tr>
                <td colspan="4" class="myTitle" style="font-size:20px;">
                  <v-flex pt-4>TOTAL PENJUALAN</v-flex>
                </td>
                <td
                  colspan="1"
                  class="myTitle text-right"
                  style="text-transform:none; font-size:20px;"
                >
                  <v-flex pt-4>{{formatMoney(totalHarga)}}</v-flex>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout wrap pt-5>
        <v-flex xs12 dark class="text-right">
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
import PenjualanService from "../../services/penjualan";
const penjualanService = new PenjualanService();
import AnggotaService from "../../services/anggota";
const anggotaService = new AnggotaService();
import ItemJualService from "../../services/itemjual";
const itemJualService = new ItemJualService();
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
      items: [
        {
          id_itemjual: "",
          qty: 1,
          itemjualObj: {},
          harga_satuan: 0,
          ttl_harga: 0
        }
      ],
      anggotaChoice: [],
      newRow: {
        id_itemjual: "",
        itemjualObj: {},
        qty: 1,
        harga_satuan: 0,
        ttl_harga: 0
      },
      itemJualChoice: [],
      totalHarga: 0
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
      return this.newData.tgl_penjualan
        ? moment(this.newData.tgl_penjualan).format("DD MMMM YYYY")
        : "";
    },
  },
  methods: {
    addRow() {
      this.items.push(this.newRow);
      this.newRow= {
        id_itemjual: "",
        itemjualObj: {},
        qty: 1,
        harga_satuan: 0,
        ttl_harga: 0
      }
    },
    deleteRow(index) {
      this.items.splice(index, 1);
    },
    updateHarga() {
      this.totalHarga = 0;
      for (let index = 0; index < this.items.length; index++) {
        this.items[index].ttl_harga =
          this.items[index].qty * this.items[index].harga_satuan;
        this.totalHarga = this.totalHarga + this.items[index].ttl_harga;
      }
    },
    updatePriceOnProduct(index) {
      var objItemJual = this.itemJualChoice.find(itemJual => {
        return itemJual.id === this.items[index].id_itemjual;
      });
      this.items[index].harga_satuan = objItemJual.harga_jual;
    },
    initNew() {
      this.newData = {
        id_itemjual: "",
        no_penjualan:'',
        tgl_penjualan:'',
        id_anggota:'',
        item_jual:[]
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
      this.newData.item_jual=this.items;
      penjualanService
        .post(this.newData)
        .then(() => {
          this.$store.commit("showSnackBar", "Data berhasil disimpan");
          this.$router.push("/penjualan");
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
    },
    getItemJualChoice() {
      itemJualService
        .getBySupplier(this.newData.id_supplier)
        .then(data => {
          if (data != null) {
            this.itemJualChoice = data;
          } else this.itemJualChoice = [];
        })
        .catch(error => {
          this.$store.commit(
            "showSnackBar",
            "Error saat mengambil data item jual" + error
          );
        });
    }
  },
  created() {
    this.initNew();
    this.getAnggotaChoice();
    this.getItemJualChoice();
  }
};
</script>
