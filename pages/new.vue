<script setup>
const router = useRouter();
const config = useRuntimeConfig();
const trainerName = ref("");
const safeTrainerName = computed(() => trimAvoidCharacters(trainerName.value));
const valid = computed(() => safeTrainerName.value.length > 0);
const onSubmit = async () => {
  const response = await $fetch("/api/trainer", {
    baseURL: config.public.backendOrigin,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: safeTrainerName.value,
    }),
  }).catch(err => console.log(err.status));
  if (response instanceof Error) return;
  router.push(`/trainer/${safeTrainerName.value}`);
};
const { dialog, onOpen, onClose } = useDialog();
</script>

<template>
  <div>
    <h1>新しく始める</h1>
    <p>では　はじめに　きみの　なまえを　おしえて　もらおう！</p>
    <form @submit.prevent>
      <div class="item">
        <label for="name">名前</label>
        <span id="name-description" style="background-color: blue;">特定の文字は取り除かれる</span>
        <input id="name" v-model="trainerName" aria-describedby="name-description" @keydown.enter="valid && onOpen(true)"/>
      </div>
      <GamifyButton type="button" :disabled="!valid" @click="onOpen(true)">決定</GamifyButton>
    </form>
    <GamifyDialog v-if="dialog" id="confirm-submit" title="確認" :description="`ふむ・・・　きみは　${safeTrainerName}　と　いうんだな！`" @close="onClose">
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="onClose">いいえ</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onSubmit">はい</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
  </div>
</template>

<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
