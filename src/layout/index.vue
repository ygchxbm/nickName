<template>
	<el-container class="layout-container">
		<Aside />
		<el-container class="flex-center" :class="{ 'layout-backtop': !isFixedHeader }">
			<el-scrollbar ref="layoutDefaultsScrollbarRef" :class="{ 'layout-backtop': isFixedHeader }">
				<Main />
			</el-scrollbar>
		</el-container>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import { onBeforeMount, onUnmounted, getCurrentInstance, defineComponent, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores/themeConfig';
import { Local } from '@/utils/storage';
import { useRoute } from 'vue-router';
import Aside from '@/layout/component/aside.vue';
import Main from '@/layout/component/main.vue';

export default defineComponent({
	name: 'layout',
	components: { Aside, Main },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 窗口大小改变时(适配移动端)
		const onLayoutResize = () => {
			if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) {
				themeConfig.value.isCollapse = false;
				proxy.mittBus.emit('layoutMobileResize', {
					layout: 'defaults',
					clientWidth,
				});
			} else {
				proxy.mittBus.emit('layoutMobileResize', {
					layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
					clientWidth,
				});
			}
		};
		const isFixedHeader = computed(() => {
			return themeConfig.value.isFixedHeader;
		});
		const route = useRoute();
		// 页面加载前
		onBeforeMount(() => {
			onLayoutResize();
			window.addEventListener('resize', onLayoutResize);
		});
		// 页面卸载时
		onUnmounted(() => {
			window.removeEventListener('resize', onLayoutResize);
		});
		// 监听路由的变化
		watch(() => route.path, () => proxy.$refs.layoutDefaultsScrollbarRef.wrap$.scrollTop = 0);
		return {
			isFixedHeader,
		};
	},
});
</script>
