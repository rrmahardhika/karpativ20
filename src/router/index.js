import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import('@/views/Dashboard.vue')
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: function () {
      return import('@/views/Login.vue')
    }
  },
  {
    path: '/assets',
    name: 'Asset',
    component: function () {
      return import('@/views/asset/List.vue')
    }
  },
  {
    path: '/assets/create',
    name: 'Asset-Create',
    component: function () {
      return import('@/views/asset/Create.vue')
    }
  },
  {
    path: '/assets/edit/:id',
    name: 'Edit-Create',
    component: function () {
      return import('@/views/asset/Edit.vue')
    }
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: function () {
      return import('@/views/supplier/List.vue')
    }
  },
  {
    path: '/supplier/create',
    name: 'Supplier-Create',
    component: function () {
      return import('@/views/supplier/Create.vue')
    }
  },
  {
    path: '/supplier/edit/:id',
    name: 'Supplier-Edit',
    component: function () {
      return import('@/views/supplier/Edit.vue')
    }
  },
  {
    path: '/itemjual',
    name: 'ItemJual',
    component: function () {
      return import('@/views/itemjual/List.vue')
    }
  },
  {
    path: '/itemjual/create',
    name: 'ItemJual-Create',
    component: function () {
      return import('@/views/itemjual/Create.vue')
    }
  },
  {
    path: '/itemjual/edit/:id',
    name: 'ItemJual-Edit',
    component: function () {
      return import('@/views/itemjual/Edit.vue')
    }
  },
  {
    path: '/anggota',
    name: 'Anggota',
    component: function () {
      return import('@/views/anggota/List.vue')
    }
  },
  {
    path: '/anggota/create',
    name: 'Anggota-Create',
    component: function () {
      return import('@/views/anggota/Create.vue')
    }
  },
  {
    path: '/anggota/detail/edit/:id',
    name: 'Anggota-Edit',
    component: function () {
      return import('@/views/anggota/Edit.vue')
    }
  },
  {
    path: '/anggota/detail/:id',
    name: 'Anggota-Detail',
    component: function () {
      return import('@/views/anggota/Detail.vue')
    }
  },
  
  {
    path: '/simpanan',
    name: 'Simpanan',
    component: function () {
      return import('@/views/simpanan/List.vue')
    }
  },
  {
    path: '/simpanan/create',
    name: 'Simpanan-Create',
    component: function () {
      return import('@/views/simpanan/Create.vue')
    }
  },
  {
    path: '/simpanan/edit/:id',
    name: 'Simpanan-Edit',
    component: function () {
      return import('@/views/simpanan/Edit.vue')
    }
  },
  {
    path: '/pinjaman',
    name: 'Pinjaman',
    component: function () {
      return import('@/views/pinjaman/List.vue')
    }
  },
  {
    path: '/pinjaman/create',
    name: 'Pinjaman-Create',
    component: function () {
      return import('@/views/pinjaman/Create.vue')
    }
  },
  {
    path: '/pinjaman/detail/edit/:id',
    name: 'Pinjaman-Edit',
    component: function () {
      return import('@/views/pinjaman/Edit.vue')
    }
  },
  {
    path: '/pinjaman/detail/:id',
    name: 'Pinjaman-Detail',
    component: function () {
      return import('@/views/pinjaman/Detail.vue')
    }
  },
  {
    path: '/pinjaman/detail/pembayaran/:id',
    name: 'Pinjaman-Detail',
    component: function () {
      return import('@/views/pinjaman/CreatePembayaran.vue')
    }
  },
  {
    path: '/penjualan',
    name: 'Penjualan',
    component: function () {
      return import('@/views/penjualan/List.vue')
    }
  },
  {
    path: '/penjualan/create',
    name: 'Penjualan-Create',
    component: function () {
      return import('@/views/penjualan/Create.vue')
    }
  },
  {
    path: '/penjualan/detail/:id',
    name: 'Penjualan-Detail',
    component: function () {
      return import('@/views/penjualan/Detail.vue')
    }
  },
  {
    path: '/penjualan/detail/pembayaran/:id',
    name: 'Penjualan-Detail',
    component: function () {
      return import('@/views/penjualan/CreatePembayaran.vue')
    }
  },
  {
    path: '/pembelian',
    name: 'Pembelian',
    component: function () {
      return import('@/views/pembelian/List.vue')
    }
  },
  {
    path: '/pembelian/create',
    name: 'Pembelian-Create',
    component: function () {
      return import('@/views/pembelian/Create.vue')
    }
  },
  {
    path: '/pembelian/detail/:id',
    name: 'Pembelian-Detail',
    component: function () {
      return import('@/views/pembelian/Detail.vue')
    }
  },
  {
    path: '/pembelian/detail/pembayaran/:id',
    name: 'Pembelian-Detail',
    component: function () {
      return import('@/views/pembelian/CreatePembayaran.vue')
    }
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
