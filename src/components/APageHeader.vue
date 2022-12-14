<template>
  <div class="layout-header">
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <n-icon :component="TextGrammarArrowRight20Filled" size="28" v-if="collapsed" />
        <n-icon :component="TextGrammarArrowLeft20Filled" size="28" v-else />
      </div>
      <n-breadcrumb>
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component :is="routeItem.meta.icon" />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component :is="routeItem.meta.icon" />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <n-dropdown trigger="hover" :options="avatarDropdownOptions" @select="onAvatarDropdownSelect">
      <n-avatar size="large" round class="mr-28px select-none"
        ><label class="text-purple-500 font-semibold">Admin</label></n-avatar
      >
    </n-dropdown>
  </div>
</template>

<script>
  import { TextGrammarArrowRight20Filled, TextGrammarArrowLeft20Filled } from '@vicons/fluent';
  import { LogOut } from '@vicons/ionicons5';
  import { useRouter, useRoute } from 'vue-router';
  import { NIcon } from 'naive-ui';
  import { defineComponent, computed, h } from 'vue';

  const renderIcon = (icon) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  export default defineComponent({
    name: 'APageHeader',
    props: {
      collapsed: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:collapsed'],
    setup(props) {
      const router = useRouter();
      const route = useRoute();
      const avatarDropdownOptions = [{ label: '退出', key: 'logout', icon: renderIcon(LogOut) }];

      const generator = (routerMap) => {
        return routerMap
          .map((item) => {
            const currentMenu = {
              ...item,
              label: item.meta.title,
              key: item.name,
              disabled: item.path === '/',
            };
            // 是否有子菜单，并递归处理
            if (item.children && item.children.length > 0) {
              // Recursion
              currentMenu.children = generator(item.children, currentMenu);
            }
            return currentMenu;
          })
          .filter((item) => !item.meta.isNoShow);
      };

      const dropdownSelect = (key) => {
        router.push({ name: key });
      };

      const onAvatarDropdownSelect = (key) => {
        if (key == 'logout') {
          sessionStorage.removeItem('Aurora-Token');
          router.push({ path: '/' });
        }
      };

      const breadcrumbList = computed(() => {
        return generator(route.matched);
      });
      return {
        TextGrammarArrowRight20Filled,
        TextGrammarArrowLeft20Filled,
        LogOut,
        breadcrumbList,
        avatarDropdownOptions,
        dropdownSelect,
        onAvatarDropdownSelect,
      };
    },
  });
</script>

<style lang="less">
  .layout-header {
    color: white;
    background-color: rgb(0, 20, 40);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: 64px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .link-text {
        color: white;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        height: 64px;
        line-height: 64px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .anticon {
        font-size: 16px;
        color: white;
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }
</style>
