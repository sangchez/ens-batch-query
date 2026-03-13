<script setup lang="ts">
// <!-- Define Props Value Start --->
const props = defineProps({
  modelValue: Array,
  printId: String,
});
// <!-- Define Props Value End --->

// <!-- Global Variable Start --->
import { parseEnsTimeout } from "../utils/common";
const ensUrl = import.meta.env.VITE_ENS_BASE_URL;
const scanUrl = import.meta.env.VITE_ETHERSCAN_BASE_URL;
// <!-- Global Variable End --->
</script>

<template>
  <DataTable
    :id="props.printId"
    :value="props.modelValue"
    tableStyle="min-width: 50rem"
  >
    <Column field="domain" :header="$t('components.ensDataTable.domain')">
      <template #body="slotProps">
        <Button
          :href="`${ensUrl}${slotProps.data.domain}`"
          :label="slotProps.data.domain"
          as="a"
          target="_blank"
          text
          link
        />
      </template>
    </Column>
    <Column field="address" :header="$t('components.ensDataTable.owner')">
      <template #body="slotProps">
        <Button
          v-if="slotProps.data.address"
          :href="`${scanUrl}address/${slotProps.data.address}`"
          :label="slotProps.data.address"
          as="a"
          target="_blank"
          text
          link
        />
        <span v-else>-</span>
      </template>
    </Column>
    <Column field="expiry" :header="$t('components.ensDataTable.expiry')">
      <template #body="slotProps">
        {{ parseEnsTimeout(slotProps.data.expiry) }}
      </template>
    </Column>
    <template #empty>
      {{ $t("components.ensDataTable.empty") }}
    </template>
  </DataTable>
</template>
