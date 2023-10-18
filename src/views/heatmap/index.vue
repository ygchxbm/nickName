<template>
	<el-tabs v-model="tabName">
		<el-tab-pane label="任务管理" name="taskManagement">
		</el-tab-pane>
		<el-tab-pane label="手动安装" name="manualInstall">
		</el-tab-pane>
		<el-tab-pane label="本地安装" name="localInstall">
		</el-tab-pane>
		<el-tab-pane label="系统安装" name="installSystem">
		</el-tab-pane>
		<el-tab-pane label="安装记录" name="installHistory">
		</el-tab-pane>
	</el-tabs>
</template>


<script lang="ts">
import { ref } from 'vue';
import MapConfig from './config';

export default {
	name: 'AppInstall',
	components: {
	},
	setup() {
		const tabName = ref('taskManagement');
		return {
			tabName,
		};
	},
};
</script>