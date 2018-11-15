import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import NiuronsNavBar from '@/components/NiuronsNavBar'
import Landing from '@/components/landing/NiuLandingIndex'
import Categories from '@/components/categories/Categories'
import Categorie from '@/components/categories/Categorie'
import SubCategorie from '@/components/categories/SubCategorie'
import TermsAndConditions from '@/components/TermsAndConditions'

Vue.use(Resource)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
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
      path: '/nav',
      name: 'NiuronsNavBar',
      component: NiuronsNavBar
    },

    {
      path: '/Terminos-y-Condiciones',
      name: 'TermsAndConditions',
      component: TermsAndConditions
    }
  ]
})