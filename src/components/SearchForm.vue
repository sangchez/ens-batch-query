<script setup lang="ts">
// <!-- Global Variable Start --->
import { ref } from "vue";
import { Form } from "@primevue/forms";

const isLoading = ref<boolean>(false);
// <!-- Global Variable End --->

// <!-- Form Variables Start --->
const initialValues = ref({
  rpcUrl: import.meta.env.VITE_JSON_RPC_URL || "",
  ensNames: "",
});

import { ResolverMessage } from "../except/error";
const resolver = ({ values }: { values: any }) => {
  const errors = {} as any;
  const rpcUrlReg = /^https?:\/\/.+/;

  if (!values.rpcUrl) {
    errors.rpcUrl = ResolverMessage.rpcUrl.required;
  } else if (!rpcUrlReg.test(initialValues.value.rpcUrl.trim())) {
    errors.rpcUrl = ResolverMessage.rpcUrl.invalid;
  }

  const ensNameReg = /^(([a-z0-9]([a-z0-9-]*[a-z0-9])?)\.)+eth$/;
  const { ensNames } = initialValues.value;
  let ensNameList = ensNames.trim().split("\n");
  ensNameList = ensNameList.filter((item) => item.trim() !== "");
  const isAllValid = ensNameList.every((item) => {
    const trimmed = item.trim().toLocaleLowerCase();
    const lengthValid = trimmed.length >= 3 && trimmed.length <= 225;
    const regValid = ensNameReg.test(trimmed);
    return lengthValid && regValid;
  });

  if (!values.ensNames) {
    errors.ensNames = ResolverMessage.ensNames.required;
  } else if (!isAllValid) {
    errors.ensNames = ResolverMessage.ensNames.invalid;
  }

  return { errors };
};
// <!-- Form Variables End --->

// <!-- Search ENS Start --->
import { ethers } from "ethers";
import { ProviderType } from "../config/enums";
import BaseRegistrar from "../contracts/BaseRegistrar";

import { useGlobalStore } from "../store/global";
const globalStore = useGlobalStore();

const removeLastSuffix = (domain: string) => {
  const lastDotIndex = domain.lastIndexOf(".");
  return lastDotIndex === -1 ? domain : domain.slice(0, lastDotIndex);
};

const doSearchENS = async (
  domain: string,
  provider: ethers.JsonRpcProvider,
  ensContract: any,
) => {
  const preffix = removeLastSuffix(domain);
  const address = await provider.resolveName(preffix);
  const domainHash = ethers.keccak256(ethers.toUtf8Bytes(preffix));
  const tokenId = ethers.toBigInt(domainHash).toString();
  const expiryResult = await ensContract.nameExpires(tokenId);
  const expiry = Number(expiryResult);

  return { domain, address, expiry };
};

const searchENS = async ({ valid }: { valid: any }) => {
  try {
    if (!valid) return;
    isLoading.value = true;

    const { rpcUrl, ensNames } = initialValues.value;
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const ensRegistrar = new BaseRegistrar();
    const ensContract = await ensRegistrar.getContract(rpcUrl);
    console.log(ensContract);

    const ensNameList = ensNames.trim().split("\n");
    const batchId = new Date().getTime().toString();
    const promiseArr = ensNameList.map(async (item) => {
      const trimmed = item.trim().toLocaleLowerCase();
      return await doSearchENS(trimmed, provider, ensContract);
    });

    const searchResults = await Promise.all(promiseArr);
    const key = `ENS-${batchId}`;
    window.localStorage.setItem(key, JSON.stringify(searchResults));
    globalStore.refreshGlobal();
  } finally {
    isLoading.value = false;
  }
};
// <!-- Search ENS End --->
</script>

<template>
  <Panel class="border-0! bg-surface!">
    <template #header>
      <h3 class="m-0">
        {{ $t("components.searchForm.header") }}
      </h3>
    </template>

    <template #default>
      <Form
        v-slot="$form"
        class="grid grid-cols-12 gap-4"
        :initialValues
        :resolver
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        :validateOnMount="['rpcUrl']"
        @submit="searchENS"
      >
        <div class="col-span-12">
          <p class="text-lg">
            {{ $t("components.searchForm.description") }}
          </p>
        </div>

        <div class="col-span-12">
          <div class="flex flex-col gap-1">
            <InputGroup>
              <InputGroupAddon> PRC </InputGroupAddon>
              <InputText
                v-model="initialValues.rpcUrl"
                name="rpcUrl"
                type="text"
                :placeholder="$t('components.searchForm.rpcPlaceholder')"
                :disabled="isLoading"
                fluid
              />
              <InputGroupAddon>
                <i class="pi pi-ethereum"></i>
              </InputGroupAddon>
            </InputGroup>
            <Message
              v-if="$form.rpcUrl?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.rpcUrl.error.message }}
            </Message>
          </div>
        </div>

        <div class="col-span-12">
          <div class="flex flex-col gap-1">
            <InputGroup>
              <Textarea
                v-model="initialValues.ensNames"
                name="ensNames"
                rows="5"
                cols="30"
                :placeholder="$t('components.searchForm.ensPlaceholder')"
                :disabled="isLoading"
                fluid
              />
              <Button
                type="submit"
                icon="pi pi-search"
                :loading="isLoading"
                :label="$t('components.searchForm.searchButton')"
                :disabled="!$form.valid"
              />
            </InputGroup>

            <Message
              v-if="$form.ensNames?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.ensNames.error.message }}
            </Message>
          </div>
        </div>
      </Form>
    </template>
  </Panel>
</template>
