<template>
  <div>
    <ACard :bordered="false">
      <div class="mb-4">
        <n-icon :component="People20Filled" class="text-purple-800 align-middle" size="38" />
        <h1 class="inline-block ml-2 align-middle" style="font-size: 18px">通知用户</h1>
      </div>
      <p> 设置告警通知的用户信息</p>
    </ACard>
    <n-layout class="mt-[15px] bg-transparent">
      <n-layout class="bg-transparent" has-sider>
        <n-layout-sider width="450" class="bg-transparent">
          <div class="font-bold text-[15px] mb-10px">告警通知组</div>
          <ACard :gradual="false">
            <div class="overflow-hidden h-680px">
              <div>
                <n-input-group class="w-330px">
                  <AFilterSeekInput
                    class="w-270px"
                    v-model:value="multipleGroupSelectValue"
                    :seek-option="seekGroupOption"
                  />
                  <NButton type="primary" class="w-15" @click="pageUserGroup"> 查找 </NButton>
                </n-input-group>
                <NButton
                  type="primary"
                  class="w-15 ml-3px"
                  @click="
                    () => {
                      (showUserGroupModal = true), (is0EditAnd1Create = 1), (userGroupData = {});
                    }
                  "
                >
                  新增
                </NButton>
              </div>
              <n-scrollbar>
                <div class="mt-16px">
                  <n-collapse accordion>
                    <n-collapse-item
                      v-for="item in dataUserGroup"
                      :key="item.id"
                      class="n-collapse-item align-middle"
                      :title="item.name"
                      :name="item.id"
                    >
                      <template #header-extra>
                        <n-dropdown
                          trigger="click"
                          :options="groupItemOption"
                          :show-arrow="true"
                          @select="(key) => onGroupItemOptionSelect(key, item)"
                        >
                          <NButton class="mr-18px" @click.stop quaternary circle type="primary">
                            <template #icon>
                              <NIcon class="text-25px" :component="MoreVertical20Filled" />
                            </template>
                          </NButton>
                        </n-dropdown>
                      </template>
                      <n-ellipsis
                        v-if="item.description"
                        :line-clamp="2"
                        class="max-w-380px leading-16px ml-1 text-gray-400 text-13px"
                      >
                        {{ item.description }}
                        <template #tooltip>
                          <div style="text-align: center; max-width: 300px">
                            {{ item.description }}
                          </div>
                        </template>
                      </n-ellipsis>
                      <div
                        v-for="user in item.userIdsDetail"
                        class="group-user-item mr-10px"
                        :key="user.id"
                      >
                        <div>
                          <p class="inline-block w-335px leading-28px ml-1">{{ user.name }}</p>
                          <NButton
                            class="inline-block"
                            size="small"
                            @click="() => onRemoveGroupUser(item, user.id)"
                            >移除</NButton
                          >
                        </div>
                      </div>
                    </n-collapse-item>
                  </n-collapse>
                </div>
              </n-scrollbar>
            </div>
          </ACard>
        </n-layout-sider>
        <n-layout-content class="bg-transparent">
          <div class="ml-[10px] font-bold text-[15px] mb-10px">告警通用户</div>
          <ACard class="ml-[10px]" :gradual="false">
            <!-- 操作栏 -->
            <div v-show="checkedRowKeys.length <= 0">
              <n-input-group class="w-[calc(100%-5.25rem)]">
                <AFilterSeekInput
                  class="w-full"
                  v-model:value="multipleSelectValue"
                  :seek-option="seekOption"
                />
                <NButton type="primary" class="w-20" @click="page"> 查找 </NButton>
              </n-input-group>
              <div class="inline-block">
                <NButton
                  type="primary"
                  class="w-20 left-1"
                  @click="
                    () => {
                      (showUserModal = true), (is0EditAnd1Create = 1), (userData = {});
                    }
                  "
                >
                  新增
                </NButton>
              </div>
            </div>
            <div v-show="checkedRowKeys.length > 0">
              <div class="inline-block">
                <NButton type="error" class="w-20" @click="onUserDeleteTip"> 删除 </NButton>
              </div>
            </div>
            <!-- 数据表格 -->
            <div class="mt-[10px]">
              <n-data-table
                remote
                :row-key="(row) => row.id"
                v-model:checked-row-keys="checkedRowKeys"
                :on-update:checked-row-keys="
                  (keys, rows) => {
                    checkedRowKeys = keys;
                    checkedRows = rows;
                  }
                "
                :columns="columns"
                :data="data"
                :pagination="pagination"
                :on-update:page="page"
              />
            </div>
          </ACard>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-modal v-model:show="showUserModal" class="w-[600px]" :mask-closable="false" preset="card">
      <template #header>
        <div class="model-header items-center">
          <NIcon
            v-if="is0EditAnd1Create == 1"
            size="26"
            class="text-purple-800 mr-2"
            :component="Add12Filled"
          />
          <NIcon
            v-if="is0EditAnd1Create == 0"
            size="26"
            class="text-purple-800 mr-2"
            :component="Edit16Filled"
          />
          <div v-if="is0EditAnd1Create == 1">新增告警用户</div>
          <div v-if="is0EditAnd1Create == 0">修改告警用户</div>
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
          <NButton class="w-20 m-1" @click="showUserModal = false"> 取消 </NButton>
          <NButton
            v-if="is0EditAnd1Create == 1"
            type="primary"
            class="w-20 m-1"
            @click="onUserCreate"
          >
            确定
          </NButton>
          <NButton
            v-if="is0EditAnd1Create == 0"
            type="primary"
            class="w-20 m-1"
            @click="onUserEdit"
          >
            确定
          </NButton>
        </div>
      </template>
    </n-modal>
    <n-modal
      v-model:show="showUserGroupModal"
      class="w-[600px]"
      :mask-closable="false"
      preset="card"
    >
      <template #header>
        <div class="model-header items-center">
          <NIcon
            v-if="is0EditAnd1Create == 1"
            size="26"
            class="text-purple-800 mr-2"
            :component="Add12Filled"
          />
          <NIcon
            v-if="is0EditAnd1Create == 0"
            size="26"
            class="text-purple-800 mr-2"
            :component="Edit16Filled"
          />
          <div v-if="is0EditAnd1Create == 1">新增告警用户组</div>
          <div v-if="is0EditAnd1Create == 0">修改告警用户组</div>
        </div>
      </template>
      <div class="mt-5">
        <n-form
          ref="formGroupRef"
          :model="userGroupData"
          :rules="groupRules"
          :label-width="100"
          label-placement="left"
          :style="{
            maxWidth: '780px',
          }"
        >
          <n-form-item label="组名称:" path="name">
            <n-input class="w-9" v-model:value="userGroupData.name" placeholder="请输入组名称" />
          </n-form-item>
          <n-form-item label="备注:" path="department">
            <n-input
              class="w-9"
              v-model:value="userGroupData.description"
              placeholder="请输入备注"
            />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div class="flex justify-end w-full">
          <NButton class="w-20 m-1" @click="showUserGroupModal = false"> 取消 </NButton>
          <NButton
            v-if="is0EditAnd1Create == 1"
            type="primary"
            class="w-20 m-1"
            @click="onUserGroupCreate"
          >
            确定
          </NButton>
          <NButton
            v-if="is0EditAnd1Create == 0"
            type="primary"
            class="w-20 m-1"
            @click="onUserGroupEdit"
          >
            确定
          </NButton>
        </div>
      </template>
    </n-modal>
    <n-modal
      v-model:show="showGroupAddUserModal"
      class="w-[700px]"
      :mask-closable="false"
      preset="card"
    >
      <template #header>
        <div class="model-header items-center">
          <NIcon size="26" class="text-purple-800 mr-2" :component="Add12Filled" />
          <div>添加用户</div>
        </div>
      </template>
      <div class="mt-5">
        <n-transfer
          class="h-410px"
          ref="transfer"
          v-model:value="addUserValues"
          virtual-scroll
          :options="allUserOption"
          source-filterable
          target-filterable
        />
      </div>
      <template #action>
        <div class="flex justify-end w-full">
          <NButton class="w-20 m-1" @click="showGroupAddUserModal = false"> 取消 </NButton>
          <NButton type="primary" class="w-20 m-1" @click="onGroupAddUser"> 确定 </NButton>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script>
  import { h, defineComponent, ref, onMounted, reactive } from 'vue';
  import { NButton, NIcon } from 'naive-ui';
  import {
    People20Filled,
    MoreVertical20Filled,
    Add12Filled,
    Delete24Regular,
    Edit16Filled,
  } from '@vicons/fluent';
  import AFilterSeekInput from '@/components/AFilterSeekInput.vue';
  import ACard from '@/components/ACard.vue';
  import { useRouter } from 'vue-router';
  import userapi from '@/api/user.js';
  import usergroupapi from '@/api/userGroup.js';
  import { useDialog, useLoadingBar } from 'naive-ui';

  const seekOption = [
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

  const seekGroupOption = [
    {
      label: '组名称',
      key: 'name',
    },
  ];

  const rules = {
    name: {
      required: true,
      message: '请输入用户姓名',
      trigger: ['input', 'blur'],
    },
    phone: {
      trigger: ['input'],
      message: '手机格式错误',
      validator: (rule, value) => {
        if (value) return /^1[345678]\d{9}$/.test(value);
      },
    },
    email: {
      trigger: ['input'],
      message: '邮箱格式错误',
      validator: (rule, value) => {
        if (value) return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
      },
    },
  };

  const groupRules = {
    name: {
      required: true,
      message: '请输入组名称',
      trigger: ['input', 'blur'],
    },
  };

  const groupItemOption = [
    {
      label: '编辑',
      key: 'edit',
    },
    {
      label: '删除',
      key: 'delete',
    },
    {
      label: '添加用户',
      key: 'addUser',
    },
  ];

  export default defineComponent({
    name: 'AlertUser',
    components: { AFilterSeekInput, ACard },
    setup() {
      const dialog = useDialog();
      const multipleSelectValue = ref([]);
      const multipleGroupSelectValue = ref([]);
      const seekSelect = ref(null);
      const router = useRouter();
      const checkedRowKeys = ref([]);
      const checkedRows = ref([]);
      const data = ref([]);
      const dataUserGroup = ref([]);
      const showUserModal = ref(false);
      const showGroupAddUserModal = ref(false);
      const userData = ref({});
      const userGroupData = ref({});
      const formRef = ref(null);
      const formGroupRef = ref(null);
      const showUserGroupModal = ref(false);
      const allUserOption = ref([]);
      const addUserValues = ref([]);
      const loadingBar = useLoadingBar();
      const pagination = reactive({
        pageSize: 9,
      });
      const is0EditAnd1Create = ref(0);
      const columns = [
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
            return [
              h(
                NButton,
                {
                  type: 'primary',
                  size: 'small',
                  style: { margin: '2px' },
                  onClick: () => {
                    showUserModal.value = true;
                    is0EditAnd1Create.value = 0;
                    userData.value = { ...row };
                  },
                },
                () => [
                  h(NIcon, { component: Edit16Filled, size: 18, style: { marginRight: '2px' } }),
                  '编辑',
                ]
              ),
              h(
                NButton,
                {
                  type: 'error',
                  size: 'small',
                  style: { margin: '2px' },
                  onClick: () => onUserDeleteTip(row),
                },
                () => [
                  h(NIcon, { component: Delete24Regular, size: 18, style: { marginRight: '2px' } }),
                  '删除',
                ]
              ),
            ];
          },
        },
      ];

      onMounted(() => {
        loadingBar.finish();
        loadingBar.start();
        page();
        pageUserGroup();
      });

      const pageUserGroup = () => {
        usergroupapi
          .page({
            page: 1,
            size: 999,
            filters: multipleGroupSelectValue.value,
          })
          .then((res) => {
            loadingBar.finish();
            if (res.code == 0) {
              dataUserGroup.value = res.data.dataList;
            }
          });
      };

      const page = (pagedata) => {
        userapi
          .page({
            page: pagedata && typeof pagedata === 'number' ? pagedata : 1,
            size: pagination.pageSize,
            filters: multipleSelectValue.value,
          })
          .then((res) => {
            loadingBar.finish();
            if (res.code == 0) {
              data.value = res.data.dataList;
              pagination.itemCount = res.data.total;
              pagination.pageCount = Math.ceil(res.data.total / pagination.pageSize);
            }
          });
      };

      const onUserCreate = () => {
        formRef.value?.validate((errors) => {
          if (!errors) {
            userapi.create(userData.value).then((res) => {
              if (res.code == 0) {
                page();
                formRef.value.restoreValidation();
                userData.value = {};
                showUserModal.value = false;
                window.$message.success('添加成功');
              }
            });
          }
        });
        allUserOption.value = [];
      };

      const onUserGroupCreate = () => {
        formGroupRef.value?.validate((errors) => {
          if (!errors) {
            usergroupapi.create(userGroupData.value).then((res) => {
              if (res.code == 0) {
                pageUserGroup();
                formGroupRef.value.restoreValidation();
                userGroupData.value = {};
                showUserGroupModal.value = false;
                window.$message.success('添加成功');
              }
            });
          }
        });
      };

      const onUserEdit = () => {
        userapi.update(userData.value).then((res) => {
          if (res.code == 0) {
            page();
            formRef.value.restoreValidation();
            userData.value = {};
            showUserModal.value = false;
            window.$message.success('修改成功');
          }
        });
        allUserOption.value = [];
      };

      const onUserDeleteTip = (row) => {
        let ids = [];
        let names = [];
        if (row.id) {
          checkedRows.value = [];
          checkedRowKeys.value = [];
          ids.push(row.id);
          names.push(row.name);
        }
        ids.push(...checkedRowKeys.value);
        for (let index = 0; index < checkedRows.value.length; index++) {
          names.push(checkedRows.value[index].name);
        }
        dialog.warning({
          title: '删除警告',
          content: () => {
            return h('lable', {}, [
              '确定删除 ',
              h('lable', { style: { color: '#8b5cf6', 'font-weight': 'bold' } }, names.join('、')),
              ' ?',
            ]);
          },
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            onUserDelete(ids);
          },
        });
      };

      const onUserDelete = (ids) => {
        if (ids.length > 0) {
          userapi.deletes(ids).then((res) => {
            if (res.code == 0) {
              page();
              checkedRowKeys.value = [];
              window.$message.success('删除成功');
            }
          });
        }
      };

      const onGroupItemOptionSelect = (key, item) => {
        if (key == 'edit') {
          showUserGroupModal.value = true;
          is0EditAnd1Create.value = 0;
          userGroupData.value = { ...item };
        }
        if (key == 'delete') {
          onUserGroupDeleteTip(item);
        }
        if (key == 'addUser') {
          userGroupData.value.id = item.id;
          showGroupAddUserModal.value = true;
          if (allUserOption.value?.length <= 0) {
            userapi.all().then((res) => {
              if (res.code == 0) {
                let datas = res.data;
                for (let index = 0; index < datas?.length; index++) {
                  allUserOption.value.push({
                    label: datas[index].name,
                    value: datas[index].id,
                  });
                }
              }
            });
          }
          addUserValues.value = item.userIds.length > 0 ? item.userIds.split(',') : [];
        }
      };

      const onUserGroupEdit = () => {
        usergroupapi.update(userGroupData.value).then((res) => {
          if (res.code == 0) {
            pageUserGroup();
            formGroupRef.value.restoreValidation();
            userGroupData.value = {};
            showUserGroupModal.value = false;
            window.$message.success('修改成功');
          }
        });
      };

      const onUserGroupDeleteTip = (item) => {
        dialog.warning({
          title: '删除警告',
          content: () => {
            return h('lable', {}, [
              '确定删除 ',
              h('lable', { style: { color: '#8b5cf6', 'font-weight': 'bold' } }, item.name),
              ' ?',
            ]);
          },
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            onUserGroupDelete([item.id]);
          },
        });
      };

      const onUserGroupDelete = (ids) => {
        if (ids.length > 0) {
          usergroupapi.deletes(ids).then((res) => {
            if (res.code == 0) {
              pageUserGroup();
              window.$message.success('删除成功');
            }
          });
        }
      };

      const onGroupAddUser = () => {
        userGroupData.value.userIds = addUserValues.value.join(',');
        usergroupapi.update(userGroupData.value).then((res) => {
          if (res.code == 0) {
            pageUserGroup();
            userGroupData.value = {};
            showGroupAddUserModal.value = false;
            window.$message.success('添加成功');
          }
        });
      };

      const onRemoveGroupUser = (item, userId) => {
        userGroupData.value.id = item.id;
        userGroupData.value.userIds = item.userIds.replace(new RegExp(',' + userId + ','), ',');
        userGroupData.value.userIds = userGroupData.value.userIds.replace(
          new RegExp(',?' + userId + ',?'),
          ''
        );
        usergroupapi.update(userGroupData.value).then((res) => {
          if (res.code == 0) {
            pageUserGroup();
            userGroupData.value = {};
            showGroupAddUserModal.value = false;
            window.$message.success('移除成功');
          }
        });
      };

      const onSeek = () => {};

      return {
        seekOption,
        seekGroupOption,
        columns,
        data,
        pagination,
        multipleSelectValue,
        multipleGroupSelectValue,
        seekSelect,
        checkedRowKeys,
        checkedRows,
        is0EditAnd1Create,
        showUserModal,
        userData,
        rules,
        formRef,
        showUserGroupModal,
        userGroupData,
        formGroupRef,
        groupRules,
        dataUserGroup,
        groupItemOption,
        showGroupAddUserModal,
        allUserOption,
        addUserValues,
        onUserCreate,
        onUserDeleteTip,
        onUserDelete,
        page,
        onSeek,
        onUserEdit,
        onUserGroupCreate,
        pageUserGroup,
        onGroupItemOptionSelect,
        onUserGroupEdit,
        onGroupAddUser,
        onRemoveGroupUser,
        People20Filled,
        Add12Filled,
        Delete24Regular,
        Edit16Filled,
        MoreVertical20Filled,
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
  .n-collapse-item__header-main {
    height: 30px;
  }
  .n-collapse-item__header-main:hover {
    border-radius: 5px;
    background-color: #e5e0ff;
  }
  .group-user-item {
    display: flex;
    height: 38px;
    align-items: center;
  }
  .group-user-item:hover {
    border-radius: 5px;
    background-color: #e5e0ff;
  }
</style>
