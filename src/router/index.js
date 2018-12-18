import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource' 

import Profile from '@/components/Profile'
import Configuration from '@/components/Configuration'

import Messages from '@/components/Messages'
import Notifications from '@/components/Notifications'
import Blog from '@/components/Blog'

import ProfileUser from '@/components/ProfileUser'
import Search from '@/components/Search'
import Lyfs from '@/components/Lyfs'
import LyfCreate from '@/components/LyfsCreate'
import LyfEdit from '@/components/LyfEdit'
import LyfView from '@/components/LyfView'

import Logout from '@/components/Logout'

import Landing from '@/components/landing/NiuLandingIndex'
import Categories from '@/components/categories/Categories'
import Categorie from '@/components/categories/Categorie'
import SubCategorie from '@/components/categories/SubCategorie'
import TermsAndConditions from '@/components/TermsAndConditions'

//Compras y ventas
import Purchases from '@/components/Purchases'
import Purchase from '@/components/Purchase'
import Sales from '@/components/Sales'
import Sale from '@/components/Sale'
import Finances from '@/components/Finances'
//Trabajos
import Works from '@/components/Works'

Vue.use(Resource)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/Categorias/',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/Categorias/:cat',
      name: 'Categorie',
      component: Categorie
    },
    {
      path: '/Categorias/:cat/:subCat',
      name: 'SubCategorie',
      component: SubCategorie
    },
    {
      path: '/Busqueda/',
      name: 'Search',
      component: Search
    },
    {
      path: '/Trabajos/',
      name: 'Works',
      component: Works
    },
    {
      path: '/Busqueda/:words',
      name: 'SearchW',
      component: Search
    },

    
    {
      path: '/Perfil/',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Perfil/:nickname',
      name: 'ProfileUser',
      component: ProfileUser
    },
    {
      path: '/Configuracion/',
      name: 'Configuration',
      component: Configuration
    },
    {
      path: '/Blog/',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/Mensajes/',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/Notificaciones/',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: '/Lyfs/',
      name: 'Lyfs',
      component: Lyfs
    },
    {
      path: '/Lyfs/:id',
      name: 'Lyf/View',
      component: LyfView
    },

    {
      path: '/Lyfs/Crear/',
      name: 'Lyf/Create',
      component: LyfCreate
    },
    {
      path: '/Lyfs/Editar/:id',
      name: 'Lyf/Edit',
      component: LyfEdit
    },

    {
      path: '/Compras',
      name: 'Purchases',
      component: Purchases
    },
    {
      path: '/Compra/:id',
      name: 'Purchase',
      component: Purchase
    },
    {
      path: '/Ventas',
      name: 'Sales',
      component: Sales
    },
    {
      path: '/Ventas/:id',
      name: 'Sale',
      component: Sale
    },
    {
      path: '/Finanzas',
      name: 'Finances',
      component: Finances
    },
    {
      path: '/Terminos-y-Condiciones',
      name: 'TermsAndConditions',
      component: TermsAndConditions
    },
    {
      path: '/Salir/',
      name: 'Logout',
      component: Logout
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
