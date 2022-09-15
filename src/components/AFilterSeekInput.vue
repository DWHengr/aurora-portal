<template>
  <div>
    <div @click="seekClick" class="box">
      <n-tag
        v-for="item in tags"
        :key="item.key"
        closable
        @close="onTagDelete(item.key)"
        class="seek-tag"
      >
        {{ item.value }}
      </n-tag>
      <n-dropdown
        trigger="manual"
        ref="seekDropdown"
        @select="seekOptionClick"
        placement="bottom-start"
        class="seek-dropdown"
        style="background-color: rgba(221, 214, 254)"
        :on-clickoutside="onClickoutside"
        :show="showDropdown"
        :options="currentOption"
      >
        <input
          autosize
          class="seek-input"
          type="text"
          @keyup.enter.stop="onInputEnter"
          v-model="inputValue"
          ref="seekInput"
          placeholder="请输入"
        />
      </n-dropdown>
      <n-icon :component="Dismiss20Filled" @click.stop="onDeleteAll" class="seek-icon" size="18" />
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, watch } from 'vue';
  import { Dismiss20Filled } from '@vicons/fluent';

  export default defineComponent({
    props: {
      value: {
        type: Array,
        default: null,
      },
      seekOption: {
        type: Array,
        default: null,
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const seekInput = ref(null);
      const seekDropdown = ref(null);
      const showDropdown = ref(false);
      const inputValue = ref(null);
      const tags = ref([]);
      let currentOption = ref(props.seekOption);
      const selectedVlaue = ref(props.value);

      const seekClick = () => {
        showDropdown.value = !showDropdown.value;
        seekInput.value.focus();
      };

      watch(inputValue, () => {
        onInputChange();
      });

      const onInputChange = () => {
        // input value is null. all show
        if (inputValue.value == null || inputValue.value == '') {
          currentOption.value = props.seekOption;
          return;
        }

        //dynamic update option content
        if (inputValue.value?.search(/:|：/) == -1) {
          currentOption.value = [];
          for (let index = 0; index < props.seekOption.length; index++) {
            if (props.seekOption[index].label.search(inputValue.value) != -1) {
              currentOption.value.push(props.seekOption[index]);
              break;
            }
          }
          if (currentOption.value.length <= 0) currentOption.value = props.seekOption;
          return;
        }

        // find children option
        const kv = inputValue.value?.split(/:|：/);
        if (kv.length <= 1 || kv[1] == '') {
          for (let index = 0; index < props.seekOption.length; index++) {
            currentOption.value = [];
            if (kv[0] == props.seekOption[index].label) {
              currentOption.value = props.seekOption[index].map ? props.seekOption[index].map : [];
            }
          }
          return;
        }
      };

      const seekOptionClick = (key, obj) => {
        seekInput.value.focus();
        const kv = inputValue.value?.split(/:|：/);
        for (let index = 0; index < props.seekOption.length; index++) {
          if (kv?.[0] == props.seekOption[index].label) {
            inputValue.value = kv[0] + ':' + obj.label;
            onInputEnter();
            return;
          }
        }

        inputValue.value = obj.label + ':';
      };

      const onInputEnter = () => {
        showDropdown.value = false;
        const kv = inputValue.value?.split(/:|：/);
        if (!kv || !kv[0] || !kv[1]) {
          inputValue.value = '';
          return;
        }
        let index = 0;
        //find option
        let option = null;
        for (index = 0; index < props.seekOption.length; index++) {
          if (props.seekOption[index].label === kv[0]) {
            option = props.seekOption[index];
            break;
          }
        }
        //set tags
        for (index = 0; index < tags.value.length; index++) {
          let tag = tags.value[index];
          if (tag.key === option?.key) {
            tag.value = kv[0] + ':' + kv[1];
            break;
          }
        }
        if (option && index >= tags.value.length) {
          tags.value.push({
            key: option.key,
            value: inputValue.value,
          });
        }
        //set props value
        for (index = 0; index < selectedVlaue.value.length; index++) {
          let vlaue = selectedVlaue.value[index];
          if (vlaue.key === option?.key) {
            vlaue.value = kv[1];
            emit('update:value', selectedVlaue.value);
            break;
          }
        }
        if (option && index >= selectedVlaue.value.length) {
          selectedVlaue.value.push({
            key: option.key,
            value: inputValue.value,
          });
          emit('update:value', selectedVlaue.value);
        }
        inputValue.value = '';
      };

      const onTagDelete = (key) => {
        // delete tag
        for (let index = 0; index < tags.value.length; index++) {
          let tag = tags.value[index];
          if (tag.key === key) {
            tags.value.splice(index, 1);
            break;
          }
        }
        //delete props value
        for (let index = 0; index < selectedVlaue.value.length; index++) {
          let vlaue = selectedVlaue.value[index];
          if (vlaue.key === key) {
            selectedVlaue.value.splice(index, 1);
            emit('update:value', selectedVlaue.value);
            break;
          }
        }
      };

      const onDeleteAll = () => {
        inputValue.value = '';
        tags.value = [];
        selectedVlaue.value = [];
        emit('update:value', []);
      };

      const onClickoutside = () => {
        showDropdown.value = false;
      };
      return {
        seekInput,
        seekDropdown,
        showDropdown,
        inputValue,
        tags,
        currentOption,
        Dismiss20Filled,
        seekClick,
        seekOptionClick,
        onInputEnter,
        onTagDelete,
        onDeleteAll,
        onInputChange,
        onClickoutside,
      };
    },
  });
</script>

<style lang="less" scoped>
  .box {
    border: 1px solid rgba(209 209 209);
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 34px;
    padding: 1px;
    position: relative;
  }
  .box:hover {
    border-color: rgba(91, 33, 182);
  }
  .box:active {
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  .box:focus {
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  .seek-input {
    margin-left: 2px;
    height: 30px;
    width: 300px;
    font-size: 15px;
    border: none;
    background-color: transparent;
    outline: none;
  }
  .seek-input:focus {
    border: none;
    outline: white solid 1px;
  }
  .seek-tag {
    background-color: rgba(221, 214, 254);
    border-radius: 15px;
  }
  input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 15px;
  }
  .seek-icon {
    right: 8px;
    position: absolute;
    float: right;
  }
  .seek-dropdown {
    background-color: rgba(221, 214, 254);
  }
</style>
