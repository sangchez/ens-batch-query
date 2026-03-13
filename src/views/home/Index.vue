<script setup lang="ts">
// <!-- Global Variable Start --->
import { useGlobalStore } from "../../store/global";
const globalStore = useGlobalStore();
// <!-- Global Variable End --->

// <!-- Global Components Start --->
import SearchForm from "../../components/SearchForm.vue";
import DataToolbar from "../../components/DataToolbar.vue";
import DataResult from "../../components/DataResult.vue";
// <!-- Global Components End --->
</script>

<template>
  <section class="grid grid-cols-12 gap-4">
    <div class="col-span-12">
      <SearchForm />
    </div>

    <div class="col-span-12">
      <DataToolbar v-model="globalStore.current" />
    </div>

    <div class="col-span-12">
      <DataResult />
    </div>
  </section>
</template>
