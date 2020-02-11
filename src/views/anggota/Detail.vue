<template >
  <v-content class="content">
    <v-container style="padding:40px" justify-center fluid>
      <v-layout mb-5>
        <v-flex class="pl-5 ml-1">
          <div class="myTitle">Detail Anggota</div>
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
            depressed
            color="rgba(255,101,57,1)"
            dark
            class="myBtn"
            @click="$router.push('/anggota/detail/edit/'+$route.params.id)"
          >Edit</v-btn>&nbsp;
          <v-btn
            class="myBtn2 noActive"
            @click="$router.push('/anggota')"
            depressed
            outlined
            dark
            color="rgba(255,101,57,1)"
          >Kembali ke Detail</v-btn>
        </v-flex>
      </v-layout>
      <v-layout mt-5 pt-5>
        <v-flex xs12 class="tableContent2">
          <v-layout wrap>
            <v-flex>
              <div class="myTitle" style="font-size:20px">Randy R Mahardhika (L)</div>
              <div style="font-size:15px">Nomor Anggota : NPP-001</div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex class="text-right">
              <div style="font-size:15px">
                082277177733
                <v-icon color="black" class="pb-1">mdi-cellphone-android</v-icon>
              </div>
              <div style="font-size:15px">
                Jalan Pelabuhan Kuala Tanjung Kec. Sei Suka
                <v-icon color="black">mdi-map-marker</v-icon>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout pt-5>
        <v-flex xs6 mr-2 class="tableContent2">
          <v-layout wrap>
            <v-flex xs12>
              <div class="myTitle" style="font-size:20px">Statistik Simpanan</div>
            </v-flex>
            <v-flex xs12 mt-2>
              <div class="tinyHeader" style="font-weight:600; letter-spacing:0.5px">Total Simpanan</div>
            </v-flex>
            <v-flex xs12>
              <div class="greatNominal" style="margin-top:-7px;">Rp. 2.540.000,-</div>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">Total 13 kali melakukan simpanan</div>
            </v-flex>
            <v-flex xs12>
              <hr class="my-2 hrJudul" />
            </v-flex>
            <v-flex xs12>
              <div
                class="tinyHeader"
                style="font-weight:600; letter-spacing:0.5px"
              >Simpanan Terakhir</div>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex shrink>
                  <div
                    class="greatNominal"
                    style="margin-top:-7px; font-weight:700; font-size:23px"
                  >Rp. 2.540.000,-</div>
                </v-flex>
                <v-flex>
                  <div
                    class
                    style=" font-weight:500; font-size:15px; color:grey; margin-left:10px;"
                  >Simpanan Pokok</div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">30 Desember 2019</div>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs6 ml-2 class="tableContent2">
          <v-layout wrap>
            <v-flex xs12>
              <div class="myTitle" style="font-size:20px">Statistik Pinjaman</div>
            </v-flex>
            <v-flex xs12 mt-2>
              <div
                class="tinyHeader"
                style="font-weight:600; letter-spacing:0.5px"
              >Total Pinjaman Belum Dibayar</div>
            </v-flex>
            <v-flex xs12>
              <div class="greatNominal" style="margin-top:-7px; color:red">Rp. 2.540.000,-</div>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">Total 13 kali melakukan simpanan</div>
            </v-flex>
            <v-flex xs12>
              <hr class="my-2 hrJudul" />
            </v-flex>
            <v-flex xs12 mt-2>
              <div
                class="tinyHeader"
                style="font-weight:600; letter-spacing:0.5px"
              >Total Pinjaman Keseluruhan</div>
            </v-flex>
            <v-flex xs12>
              <div class="greatNominal" style="margin-top:-7px;">Rp. 2.540.000,-</div>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">Total 13 kali melakukan simpanan</div>
            </v-flex>
            <v-flex xs12>
              <hr class="my-2 hrJudul" />
            </v-flex>
            <v-flex xs12>
              <div
                class="tinyHeader"
                style="font-weight:600; letter-spacing:0.5px"
              >Pinjaman Terakhir</div>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex shrink>
                  <div
                    class="greatNominal"
                    style="margin-top:-7px; font-weight:700; font-size:23px"
                  >Rp. 2.540.000,-</div>
                </v-flex>
                <v-flex>
                  <div
                    class
                    style=" font-weight:500; font-size:15px; color:grey; margin-left:10px;"
                  >Sedang Diangsur</div>
                </v-flex>
                <v-flex>
                  <v-btn
                    class="myBtn2 noActive"
                    depressed
                    outlined
                    dark
                    small
                    color="rgba(255,101,57,1)"
                  >Detail</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">30 Desember 2019</div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout pt-5>
        <v-flex xs6 mr-2 class="tableContent2">
          <v-layout wrap>
            <v-flex xs12>
              <div class="myTitle" style="font-size:20px">Statistik Penjualan</div>
            </v-flex>
            <v-flex xs12 mt-2>
              <div
                class="tinyHeader"
                style="font-weight:600; letter-spacing:0.5px"
              >Total Tagihan Penjualan Kepada Randy</div>
            </v-flex>
            <v-flex xs12>
              <div class="greatNominal" style="margin-top:-7px; color:red">Rp. 490.000,-</div>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">Dari total 1 penjualan</div>
            </v-flex>
            <v-flex xs12>
              <hr class="my-2 hrJudul" />
            </v-flex>
            <v-flex xs12 mt-2>
              <div
                class="tinyHeader"
                style="font-weight:600; letter-spacing:0.5px"
              >Total Penjualan Keseluruhan</div>
            </v-flex>
            <v-flex xs12>
              <div class="greatNominal" style="margin-top:-7px;">Rp. 2.540.000,-</div>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">Dari total 13 kali melakukan pembelian</div>
            </v-flex>
            <v-flex xs12>
              <hr class="my-2 hrJudul" />
            </v-flex>
            <v-flex xs12>
              <div
                class="tinyHeader"
                style="font-weight:600; letter-spacing:0.5px"
              >Penjualan Terakhir</div>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex shrink>
                  <div
                    class="greatNominal"
                    style="margin-top:-7px; font-weight:700; font-size:23px"
                  >Rp. 540.000,-</div>
                </v-flex>
                <v-flex>
                  <div
                    class
                    style=" font-weight:500; font-size:15px; color:grey; margin-left:10px;"
                  >Lunas</div>
                </v-flex>
                <v-flex>
                  <v-btn
                    class="myBtn2 noActive"
                    depressed
                    outlined
                    dark
                    small
                    color="rgba(255,101,57,1)"
                  >Detail</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <div class="tinyHeader" style="margin-top:-6px">30 Desember 2019</div>
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
