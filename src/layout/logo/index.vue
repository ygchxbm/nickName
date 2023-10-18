<template>
	<div class="layout-logo">
		<img :src="logo" class="avatar" />
		<div>和平安全监控平台</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserInfo } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';

export default defineComponent({
	name: 'layoutLogo',
	setup() {
		const stores = useUserInfo();
		const { userInfos } = storeToRefs(stores);
		const { name } = userInfos.value;
		const router = useRouter();
		return {
			logo,
			name,
			logout: () => {
				ElMessageBox.confirm('确定注销吗？').then(() => {
					// @todo
				}).catch(e=>{})
			}
		};
	},
});
</script>

<style scoped lang="scss">
.layout-logo {
	width: 230px;
	height: 218px;
	font-size: 20px;
	color: #FFFFFF;
	animation: logoAnimation 0.3s ease-in-out;
	text-align: center;
	padding-top: 50px;
	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-bottom: 10px;
		object-fit: cover;
	}
	.logout {
		font-size: 14px;
		color: #aaa;
		margin-top: 8px;
		cursor: pointer;
	}
}
</style>
