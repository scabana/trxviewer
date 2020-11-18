<template>
  <div>
    <div>
      <h3>
        Outcome: <span :style="getStyle(testRun.resultSummary.outcome)">{{ testRun.resultSummary.outcome }}</span>
      </h3>
    </div>
    <div>
      <fast-text-field @change="applyFilter" placeholder="Filter" style="display: block"> </fast-text-field>
      <fast-accordion>
        <unit-test-result-group v-for="(val, key) in groupedResults" :key="key" :result="key" :items="val" :filter="filter"></unit-test-result-group>
      </fast-accordion>
    </div>
  </div>
</template>
<script src="./TestRun.ts"></script>