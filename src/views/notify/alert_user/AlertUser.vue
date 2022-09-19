<template>
  <div>
    <ACard :bordered="false">
      <div class="mb-4">
        <n-icon :component="People20Filled" class="text-purple-800 align-middle" size="38" />
        <h1 class="inline-block ml-2 align-middle" style="font-size: 18px">通知用户</h1>
      </div>
      <p> 设置告警通知的用户信息</p>
    </ACard>
    <ACard class="mt-[15px]" :gradual="false">
      <!-- 操作栏 -->
      <div v-show="checkedRowKeys.length <= 0">
        <n-input-group class="w-[calc(100%-5.25rem)]">
          <AFilterSeekInput
            class="w-full"
            v-model:value="multipleSelectValue"
            :seek-option="seekOption"
          />
          <NButton type="primary" class="w-20"> 查找 </NButton>
        </n-input-group>
        <div class="inline-block">
          <NButton type="primary" class="w-20 left-1" @click="showModal = true"> 新增 </NButton>
        </div>
      </div>
      <div v-show="checkedRowKeys.length > 0">
        <div class="inline-block">
          <NButton type="error" class="w-20" @click="onUserDelete"> 删除 </NButton>
        </div>
      </div>
      <!-- 数据表格 -->
      <div class="mt-[10px]">
        <n-data-table
          remote
          :row-key="(row) => row.id"
          v-model:checked-row-keys="checkedRowKeys"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :on-update:page="page"
        />
      </div>
    </ACard>
    <n-modal v-model:show="showModal" class="w-[600px]" :mask-closable="false" preset="card">
      <template #header>
        <div class="model-header items-center">
          <NIcon size="26" class="text-purple-800 mr-2" :component="Add12Filled" />
          <div>新增告警用户</div>
        </div>
      </template>
      <div class="mt-5">
        <n-form
          ref="formRef"
          :model="userData"
          :rules="rules"
          :label-width="60"
          label-placement="left"
          :style="{
            maxWidth: '780px',
          }"
        >
          <n-form-item label="姓名:" path="name">
            <n-input class="w-9" v-model:value="userData.name" placeholder="请输入用户姓名" />
          </n-form-item>
          <n-form-item label="部门:" path="department">
            <n-input class="w-9" v-model:value="userData.department" placeholder="请输入用户部门" />
          </n-form-item>
          <n-form-item label="邮箱:" path="email">
            <n-input class="w-9" v-model:value="userData.email" placeholder="请输入用户邮箱" />
          </n-form-item>
          <n-form-item label="手机:" path="phone">
            <n-input class="w-9" v-model:value="userData.phone" placeholder="请输入用户手机" />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div class="flex justify-end w-full">
          <NButton class="w-20 m-1" @click="showModal = false"> 取消 </NButton>
          <NButton type="primary" class="w-20 m-1"> 确定 </NButton>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script>
  import { h, defineComponent, ref, onMounted, reactive } from 'vue';
  import { NButton } from 'naive-ui';
  import { People20Filled, Add12Filled } from '@vicons/fluent';
  import AFilterSeekInput from '@/components/AFilterSeekInput.vue';
  import ACard from '@/components/ACard.vue';
  import { useRouter } from 'vue-router';
  import userapi from '@/api/user.js';

  const createSeekOptions = () => {
    return [
      {
        label: '姓名',
        key: 'name',
      },
      {
        label: '部门',
        key: 'department',
      },
      {
        label: '邮箱',
        key: 'email',
      },
      {
        label: '手机',
        key: 'phone',
      },
    ];
  };

  const createColumns = () => {
    return [
      {
        type: 'selection',
      },
      {
        title: '名称',
        key: 'name',
      },
      {
        title: '部门',
        key: 'department',
      },
      {
        title: '邮箱',
        key: 'email',
      },
      {
        title: '手机',
        key: 'phone',
      },
      {
        title: '操作',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              type: 'error',
              size: 'small',
            },
            { default: () => '删除' }
          );
        },
      },
    ];
  };

  const rules = {
    name: [
      {
        required: true,
        message: '请输入用户姓名',
        trigger: ['input', 'blur'],
      },
    ],
  };

  export default defineComponent({
    name: 'AlertUser',
    components: { AFilterSeekInput, ACard },
    setup() {
      const multipleSelectValue = ref([]);
      const seekSelect = ref(null);
      const router = useRouter();
      const checkedRowKeys = ref([]);
      const data = ref([]);
      const showModal = ref(false);
      const userData = ref({});
      const pagination = reactive({
        pageSize: 10,
      });

      onMounted(() => {
        page();
      });

      const page = (pagedata) => {
        userapi.page({ page: pagedata ? pagedata : 1, size: pagination.pageSize }).then((res) => {
          if (res.code == 0) {
            data.value = res.data.dataList;
            // pagination.itemCount = res.data.total;
            pagination.pageCount = Math.ceil(res.data.total / pagination.pageSize);
            // eslint-disable-next-line no-console
            console.log(pagination);
          }
        });
      };

      const seekChage = (e) => {
        seekSelect.value.focus();
      };

      const onUserCreate = () => {};

      const onUserDelete = () => {};

      return {
        columns: createColumns(),
        seekOption: createSeekOptions(),
        data,
        pagination,
        multipleSelectValue,
        seekSelect,
        checkedRowKeys,
        showModal,
        userData,
        rules,
        seekChage,
        onUserCreate,
        onUserDelete,
        page,
        People20Filled,
        Add12Filled,
      };
    },
  });
</script>

<style lang="less">
  .model-header {
    display: flex;
    color: black;
    font-size: 20px;
    background: linear-gradient(to right, white, #c4b5fd);
  }
</style>
