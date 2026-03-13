<script setup lang="ts">
// <!-- Global Variable Start --->
import { onMounted } from "vue";
import { ethers } from "ethers";
import { ProviderType } from "../../config/enums";
// <!-- Global Variable End --->

// <!-- Global Components Start --->
// import Button from "primevue/button";
// <!-- Global Components End --->

// <!-- Test Start --->
import ETHRegistrarController from "../../contracts/BaseRegistrar";

const test = async () => {
  // const controller = new ETHRegistrarController();
  // const rpcUrl = import.meta.env.VITE_JSON_RPC_URL as string;
  // const provider = new ethers.JsonRpcProvider(rpcUrl);
  // console.log(await provider.resolveName("eth"));

  // const controller = new ETHRegistrarController(ProviderType.JsonRPC);
  // const contract = await controller.initialize();
  // const result = await contract.available("ethereum.eth");
  // console.log("Result:", result);
  const domain = "ethereum.eth";
  const label = domain.split(".")[0] as string;
  const labelhash = ethers.keccak256(ethers.toUtf8Bytes(label));
  const tokenId = ethers.toBigInt(labelhash).toString();
  console.log("Token ID:", tokenId);
  // const namehash = (name: string) => ethers.namehash(name);
  // console.log("Namehash:", namehash("eth"));
};

onMounted(() => {
  // test();
});
// <!-- Test End --->
</script>

<template>
  <!-- <Button label="Submit" /> -->
  <div style="height: 200px; border: 1px solid red"></div>
</template>
