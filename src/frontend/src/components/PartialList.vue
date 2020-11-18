<template>
  <fragment>
    <slot :filteredItems="filteredItems"></slot>
    <fast-button v-if="items.length > renderedCount" @click="showMore">Show more</fast-button>
  </fragment>
</template>
<script src="./PartialList.ts"></script>