<script setup lang="ts">
// <!-- Define Props Value Start --->
const props = defineProps({ modelValue: Number });
// <!-- Define Props Value End --->

// <!-- Global Variable Start --->
import type { ENSResult } from "../types/types";
import { ref } from "vue";
import { parseEnsTimeout } from "../utils/common";

const isLoading = ref<boolean>(false);
// <!-- Global Variable End --->

// <!-- Export CSV Start --->
import { t } from "../i18n";

const exportCsv = () => {
  try {
    isLoading.value = true;
    const headers = [
      t("components.ensDataTable.domain"),
      t("components.ensDataTable.owner"),
      t("components.ensDataTable.expiry"),
    ];

    const csvRows: string[] = [headers.join(",")];
    const obj = window.localStorage.getItem(`ENS-${props.modelValue}`);
    const data: ENSResult[] = JSON.parse(obj || "[]");
    data.forEach((item: ENSResult) => {
      const expiry = parseEnsTimeout(item.expiry);
      const row = [item.domain, item.address, expiry];
      row.map((value) => {
        return value || "-";
      });
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${props.modelValue}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  } finally {
    isLoading.value = false;
  }
};
// <!-- Export CSV End --->

// <!-- Delete History Start --->
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

import { useGlobalStore } from "../store/global";
const globalStore = useGlobalStore();

const deleteHistory = () => {
  confirm.require({
    message: t("components.dataToolbar.confirm"),
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: t("components.dataToolbar.reject"),
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: t("components.dataToolbar.accept"),
    },
    accept: () => {
      window.localStorage.removeItem(`ENS-${props.modelValue}`);
      globalStore.refreshGlobal();
    },
  });
};
// <!-- Delete History End --->
</script>

<template>
  <Toolbar class="border-0!">
    <template #start>
      <div class="flex items-center gap-2">
        <Button
          icon="pi pi-download"
          :loading="isLoading"
          :label="$t('components.dataToolbar.export')"
          @click="exportCsv"
        />
        <Button icon="pi pi-bell" disabled="true" />
        <Button icon="pi pi-print" disabled="true" />
        <Button icon="pi pi-share-alt" disabled="true" />
      </div>
    </template>

    <template #end>
      <ConfirmPopup />
      <Button icon="pi pi-trash" severity="danger" @click="deleteHistory" />
    </template>
  </Toolbar>
</template>
