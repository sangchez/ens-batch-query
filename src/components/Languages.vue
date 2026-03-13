<script lang="ts" setup>
// <!-- Global Variable Start --->
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const languagesItem = [] as any;
languagesItem.push({
  label: "English",
  command: () => switchLanguages("en-EN"),
});
languagesItem.push({
  label: "한국어",
  command: () => switchLanguages("ko-KR"),
});
languagesItem.push({
  label: "繁體中文",
  command: () => switchLanguages("zh-TW"),
});
languagesItem.push({
  label: "简体中文",
  command: () => switchLanguages("zh-CN"),
});
// <!-- Global Variable End --->

// <!-- Switch Language Start --->
const switchLanguages = (lang: string) => {
  locale.value = lang;
  window.localStorage.setItem("locale", lang);
};
// <!-- Switch Language End --->
</script>

<template>
  <SplitButton
    :model="languagesItem"
    size="small"
    icon="pi pi-language"
    @click="switchLanguages('en-EN')"
  />
</template>
