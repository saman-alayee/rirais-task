<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input v-if="!isTextarea"
           :type="type"
           :value="modelValue"
           :placeholder="placeholder"
           :style="{ textAlign: align }"
           @input="$emit('update:modelValue', $event.target.value)"
           class="custom-input">
    <textarea v-else
              :value="modelValue"
              :placeholder="placeholder"
              :style="{ textAlign: align }"
              @input="$emit('update:modelValue', $event.target.value)"
              class="custom-textarea"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    modelValue: [String, Number],
    placeholder: String,
    align: String,
    isTextarea: Boolean
  }
};
</script>

<style scoped>

</style>
