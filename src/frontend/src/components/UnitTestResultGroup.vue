<template>
  <fast-accordion-item :expanded="expanded">
    <span slot="heading" :style="getStyle(result)">{{ result }}</span>
    <div style="display: flex; flex-direction: column; width: 100%">
      <filtered-results :items="items" :filter="filterCallback">
        <template v-slot:default="filtered">
          <partial-list :items="filtered.filteredItems">
            <template v-slot:default="partial">
              <fast-accordion>
                <unit-test-result v-for="item of partial.filteredItems" v-bind:key="item.testId" :item="item" />
              </fast-accordion>
            </template>
          </partial-list>
        </template>
      </filtered-results>
    </div>
  </fast-accordion-item>
</template>

<script src="./UnitTestResultGroup.ts"></script>
