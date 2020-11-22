<template>
  <fragment>
    <a v-if="!testNotFound" @click="openTest" href="#">{{ testMethodName }} </a>
    <span v-if="testNotFound" href="#" :id="`navToTest${testId}`">{{ testMethodName }} </span>
    <fast-tooltip v-if="testNotFound" :anchor="`navToTest${testId}`">Test method not found</fast-tooltip>
  </fragment>
</template>
<script src="./NavToTestLink.ts"></script>