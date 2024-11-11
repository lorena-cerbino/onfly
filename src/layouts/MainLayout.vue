<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-3">
    <q-header elevated class="bg-white">
      <q-toolbar class="q-px-xl q-py-xs">
        <img src="../assets/OnflyLogo.png" width="70px">
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'MainLayout'
  });
</script>
