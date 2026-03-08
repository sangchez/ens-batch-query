<script setup lang="ts">
// <!-- Global Variable Start --->
import { onMounted } from "vue";
// <!-- Global Variable End --->

// <!-- Global Components Start --->
import Button from "primevue/button";
// <!-- Global Components End --->

// <!-- Test Start --->
import ETHRegistrarController from "../../contracts/ETHRegistrarController";

const test = async () => {
  const controller = new ETHRegistrarController();
  const contract = await controller.initialize();
  const result = await contract.available("test");
  console.log("Result:", result);
};

onMounted(() => {
  test();
});
// <!-- Test End --->
</script>

<template>
  <Button label="Submit" />
</template>
