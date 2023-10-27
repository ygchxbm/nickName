import { RouteRecordRaw } from 'vue-router';

export const constantRoutes: Array<RouteRecordRaw> = [
	{
		path: '/nickNameCompare',
		name: '/nickNameCompare',
		component: () => import('@/views/NickNameCompare.vue'),
		meta: {
			title: '昵称比较',
			roles: ['admin'],
			icon: 'menu-trend',
		},
	},
	{
		path: '/nickNameJudge',
		name: '/nickNameJudge',
		component: () => import('@/views/NickNameJudge.vue'),
		meta: {
			title: '昵称判断',
			roles: ['admin'],
			icon: 'menu-trend',
		},
	}
	// {
	// 	path: '/',
	// 	name: '/',
	// 	component: () => import('@/layout/index.vue'),
	// 	redirect: '/index/index',
	// 	meta: {
	// 		title: '首页'
	// 	},
	// 	children: [
	// 		{
	// 			path: '/:path(.*)*',
	// 			name: 'notFound',
	// 			component: () => import('@/views/error/404.vue'),
	// 			meta: {
	// 				title: 'message.staticRoutes.notFound',
	// 				isHide: true,
	// 			},
	// 		},
	// 		{
	// 			path: '/401',
	// 			name: 'noPower',
	// 			component: () => import('@/views/error/401.vue'),
	// 			meta: {
	// 				title: 'message.staticRoutes.noPower',
	// 				isHide: true,
	// 			},
	// 		},
	// 		{
	// 			path: '/index/index',
	// 			name: 'Index',
	// 			component: () => import('@/views/heatmap/index.vue'),
	// 			meta: {
	// 				title: '策略汇总',
	// 				roles: ['admin'],
	// 				icon: 'menu-dashboard',
	// 			},
	// 		},
	// 		{
	// 			path: '/ds-strategy/index',
	// 			name: 'DsStrategy',
	// 			component: () => import('@/views/heatmap/index.vue'),
	// 			meta: {
	// 				title: 'DS策略监控',
	// 				roles: ['admin'],
	// 				icon: 'menu-trend',
	// 			},
	// 		},
	// 		{
	// 			path: '/x-strategy/index',
	// 			name: 'XStrategy',
	// 			component: () => import('@/views/heatmap/index.vue'),
	// 			meta: {
	// 				title: '技术中心策略监控',
	// 				roles: ['admin'],
	// 				icon: 'menu-trend',
	// 			},
	// 		},
	// 		{
	// 			path: 'nickName',
	// 			name: 'NickNAme',
	// 			component: () => import('@/views/NickNameCompare.vue'),
	// 			meta: {
	// 				title: '模拟姓名',
	// 				roles: ['admin'],
	// 				icon: 'menu-trend',
	// 			},
	// 		},
	// 		{
	// 			path: '/strategy-intersection/index',
	// 			name: 'StrategyIntersection',
	// 			component: () => import('@/views/heatmap/index.vue'),
	// 			meta: {
	// 				title: '策略交集',
	// 				roles: ['admin'],
	// 				icon: 'menu-intersection',
	// 			},
	// 			children: [
	// 				{
	// 					path: '/strategy-intersection/rule',
	// 					name: 'StrategyIntersection',
	// 					component: () => import('@/views/heatmap/index.vue'),
	// 					meta: {
	// 						title: '上报与安全处罚交集',
	// 					},
	// 				},
	// 			]
	// 		},
	// 	],
	// },
];
