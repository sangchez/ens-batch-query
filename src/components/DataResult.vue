<script setup lang="ts">
// <!-- Global Variable Start --->
import { onMounted, ref, watch } from "vue";

const defaultTab = ref<string>("0");
const scrollableTabs = ref<string[]>([]);
const tableData = ref<any[]>([]);
// <!-- Global Variable End --->

// <!-- Global Components Start --->
import EnsDataTable from "./EnsDataTable.vue";
// <!-- Global Components End --->

// <!-- ENS Name Data Start --->
const loadENSData = (key: string | null) => {
  key = key || defaultTab.value;
  tableData.value = [];
  const data = window.localStorage.getItem(`ENS-${key}`);
  tableData.value = JSON.parse(data || "[]");
};

const loadTabs = () => {
  scrollableTabs.value = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const isMatch = key.includes("ENS-");
    if (!isMatch) continue;

    const title = key.substring(4, key.length);
    scrollableTabs.value.push(title);
  }

  scrollableTabs.value = [...scrollableTabs.value].sort(
    (a: string, b: string) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    },
  );
  if (scrollableTabs.value.length <= 0) {
    scrollableTabs.value.push("0");
    defaultTab.value = "0";
  } else {
    defaultTab.value = scrollableTabs.value[0] || "0";
  }

  globalStore.refreshCurrent(parseInt(defaultTab.value));
  loadENSData(defaultTab.value);
};

const tabUpdate = (e: any) => {
  loadENSData(e);
};
// <!-- ENS Name Data End --->

// <!-- Vue Options Start --->
import { useGlobalStore } from "../store/global";
const globalStore = useGlobalStore();

onMounted(() => loadTabs());
watch(
  () => globalStore.refresh,
  () => loadTabs(),
);
// <!-- Vue Options End --->
</script>

<template>
  <div class="card border-0! bg-surface!">
    <Tabs
      :value="defaultTab"
      scrollable
      v-if="scrollableTabs.length > 1"
      @update:value="tabUpdate"
    >
      <TabList>
        <Tab v-for="tab in scrollableTabs" :key="tab" :value="tab">
          {{ tab }}
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel v-for="tab in scrollableTabs" :key="tab" :value="tab">
          <EnsDataTable v-model="tableData" :print-id="tab" />
        </TabPanel>
      </TabPanels>
    </Tabs>
    <EnsDataTable v-model="tableData" :print-id="defaultTab" v-else />
  </div>
</template>
