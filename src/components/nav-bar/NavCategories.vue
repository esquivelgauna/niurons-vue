<template>
  <div class="columns"   >
    <div class="column is-full " >
      <ul class=" columns is-centered is-multiline"  >
        <li class=" column is-narrow " v-for=" cat in  categories " :key="cat.alias">
          <b-dropdown hoverable>
            <router-link :to="{ name: 'Categorie', params: { cat: cat.url , alias: cat.alias }}" slot="trigger" class="button is-light  ">
              {{ cat.alias }}</router-link>
            <b-dropdown-item v-for=" subCat in cat.subCats" :key="subCat.alias">
              <router-link :to="{ name: 'SubCategorie', params: { cat: cat.url , subCat: subCat.url }}">{{subCat.alias}}</router-link>
            </b-dropdown-item>
          </b-dropdown>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
  export default {
    props: ['categories'],
  }

</script>


