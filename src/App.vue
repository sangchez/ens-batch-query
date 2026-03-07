<script setup lang="ts">
// <!-- Router Value Start --->
// const hash = window.location.hash;
// const queryString = hash.split("?")[1];
// const params = new URLSearchParams(queryString);
// const inviter = params.get("i");
// const deft = import.meta.env.VITE_DEFAULT_INVITER;
// console.debug("Inviter:", inviter);
// window.localStorage.setItem("inviter", inviter || deft);
// <!-- Router Value End --->
</script>

<template>
  <router-view />
</template>
