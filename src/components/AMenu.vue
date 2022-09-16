<template>
  <NMenu
    :options="menus"
    :mode="mode"
    :collapsed="collapsed"
    :inverted="true"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :expanded-keys="openKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>

<script>
  import { defineComponent, ref, reactive, computed, toRefs, unref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  export default defineComponent({
    name: 'AMenu',
    components: {},
    props: {
      menus: {
        type: Array,
        default: null,
      },
      mode: {
        // 菜单模式
        type: String,
        default: 'vertical',
      },
      collapsed: {
        // 侧边栏菜单是否收起
        type: Boolean,
        default: false,
      },
      //位置
      location: {
        type: String,
        default: 'left',
      },
    },
    emits: ['update:collapsed', 'clickMenuItem'],
    setup(props, { emit }) {
      // 当前路由
      const currentRoute = useRoute();
      const router = useRouter();
      const menus = ref([]);
      const selectedKeys = ref(currentRoute.name);
      const headerMenuSelectKey = ref('');

      const matched = currentRoute.matched;

      const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];

      const state = reactive({
        openKeys: getOpenKeys,
      });

      const getSelectedKeys = computed(() => {
        let location = props.location;
        return location === 'left' || location === 'header'
          ? unref(selectedKeys)
          : unref(headerMenuSelectKey);
      });

      function updateSelectedKeys() {
        const matched = currentRoute.matched;
        state.openKeys = matched.map((item) => item.name);
        const activeMenu = currentRoute.meta?.activeMenu || '';
        selectedKeys.value = activeMenu ? activeMenu : currentRoute.name;
      }

      function clickMenuItem(key) {
        if (/http(s)?:/.test(key)) {
          window.open(key);
        } else {
          router.push({ name: key });
        }
        emit('clickMenuItem', key);
        selectedKeys.value = key;
      }

      function menuExpanded(openKeys) {
        if (!openKeys) return;
        const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
        const isExistChildren = findChildrenLen(latestOpenKey);
        state.openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys;
      }

      function findChildrenLen(key) {
        if (!key) return false;
        const subRouteChildren = [];
        for (const { children, key } of unref(menus)) {
          if (children && children.length) {
            subRouteChildren.push(key);
          }
        }
        return subRouteChildren.includes(key);
      }

      return {
        ...toRefs(state),
        selectedKeys,
        headerMenuSelectKey,
        getSelectedKeys,
        clickMenuItem,
        menuExpanded,
      };
    },
  });
</script>
