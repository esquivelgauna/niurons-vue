<template>

  <ul class=" columns is-multiline is-mobile  is-centered is-variable is-2 ">
    <li class=" column is-narrow " v-for=" cat in  categories " :key="cat.alias">
      <b-dropdown hoverable>
        <router-link :to="{ name: 'Categorie', params: { cat: cat.url , alias: cat.alias }}" slot="trigger" class=" has-text-grey is-text  ">
          {{ cat.alias }}</router-link>

        <router-link v-for=" subCat in cat.subCats" :key="subCat.alias" :to="{ name: 'SubCategorie', params: { cat: cat.url , subCat: subCat.url }}"
          class=" dropdown-item ">
          {{subCat.alias}}</router-link>


      </b-dropdown>
    </li>
  </ul>


</template>
<script>
  export default {
    props: ['categories'],
  }

</script>
