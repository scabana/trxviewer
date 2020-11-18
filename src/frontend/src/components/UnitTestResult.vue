<template>
  <fast-accordion-item @change="loadTestResult">
    <span slot="heading">{{ item.testName }}</span>
    <div v-if="expandedOnce">
      <div>
        <span>Class name:</span>
        <span>{{ testModel.testMethodClassName }}</span>
      </div>
      <div>
        <span>Method name:</span>
        <a @click="openTest" href="#">{{ testModel.testMethodName }}</a>
      </div>
      <div v-if="output && output.errorInfo && output.errorInfo.message">
        <div>Message:</div>
        <pre>{{ output.errorInfo.message }}</pre>
      </div>
      <div v-if="output && output.errorInfo && output.errorInfo.stackTrace">
        <div>Stack Trace:</div>
        <pre>{{ output.errorInfo.stackTrace }}</pre>
      </div>
    </div>
  </fast-accordion-item>
</template>
<script src="./UnitTestResult.ts"></script>