<template>
  <NInput
    :disabled="disabled"
    v-model:value="inputValue"
    :allow-input="(value) => !value || /^\d+$/.test(value)"
  >
    <template #suffix>
      <n-select
        :disabled="disabled"
        class="time-uint-select"
        v-model:value="timeSelectValue"
        @update:value="onSelectUpdate"
        size="small"
        :options="timeOptions"
        placeholder="分钟"
      />
    </template>
  </NInput>
</template>

<script>
  import { defineComponent, ref, computed } from 'vue';
  export default defineComponent({
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: '',
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const timeSelectValue = ref('m');
      const timeOptions = [
        {
          label: '秒',
          value: 's',
        },
        {
          label: '分钟',
          value: 'm',
        },
        {
          label: '小时',
          value: 'h',
        },
      ];
      const inputValue = computed({
        get() {
          if (!props.value) return null;
          let time = props.value.match(/^[0-9]+/gi);
          let unit = props.value.match(/[a-z|A-Z]+/gi);
          if (unit) setUnit(unit);
          return time[0];
        },
        set(value) {
          if (value) emit('update:value', value + timeSelectValue.value);
          else emit('update:value', null);
        },
      });

      const setUnit = (v) => {
        timeSelectValue.value = v[0];
      };

      const onSelectUpdate = () => {
        if (inputValue.value) emit('update:value', inputValue.value + timeSelectValue.value);
        else emit('update:value', null);
      };
      return {
        inputValue,
        timeOptions,
        timeSelectValue,
        onSelectUpdate,
      };
    },
  });
</script>

<style lang="less" scoped>
  .time-uint-select {
    margin: 0;
    padding: 0;
    display: flex;
    width: 72px;
    :deep(.n-base-selection__border) {
      border: none;
    }
  }
</style>
