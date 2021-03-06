// https://umijs.org/config/
import { defineConfig } from "umi";
import defaultSettings from "./defaultSettings";
import proxy from "./proxy";
const { REACT_APP_ENV } = process.env;
export default defineConfig({
	base: "/",
	hash: true,
	antd: {},
	dva: {
		hmr: true
	},
	history: {
		type: "hash"
	},
	locale: {
		// default zh-CN
		default: "vi",
		antd: true,
		// default true, when it is true, will use `navigator.language` overwrite default
		baseNavigator: true
	},
	dynamicImport: {
		loading: "@/components/PageLoading/index"
	},
	targets: {
		ie: 11
	},
	// umi routes: https://umijs.org/docs/routing
	routes: [
		{
			path: "/",
			component: "../layouts/BlankLayout",
			routes: [
				{
					path: "/",
					redirect: "/home"
				},
				{
					path: "/home",
					component: "../layouts/BlankLayout",
					routes: [
						{
							path: "/home",
							name: "home",
							component: "./home"
						}
					],
				},
				{
					path: "/book",
					component: "../layouts/BlankLayout",
					routes: [
						{
							path: "/book",
							name: "book",
							component: "./book"
						}
					],
				},
				{
					path: "/cart",
					component: "../layouts/BlankLayout",
					routes: [
						{
							path: "/cart",
							name: "cart",
							component: "./cart"
						}
					],
				},
				{
					
					path: "/user",
					component: "../layouts/UserLayout",
					routes: [
						{
							path: "/user/login",
							name: "login",
							component: "./User/login"
						}
						// {
						// 	path: "/user",
						// 	redirect: "/user/login"
						// },
						// {
						// 	name: "register-result",
						// 	icon: "smile",
						// 	path: "/user/register-result",
						// 	component: "./user/register-result"
						// },
						// {
						// 	name: "register",
						// 	icon: "smile",
						// 	path: "/user/register",
						// 	component: "./user/register"
						// },
						// {
						// 	component: "404"
						// }
					]
				},
				// {
				// 	path: "/",
				// 	component: "../layouts/BasicLayout",
				// 	authority: ["admin", "user"],
				// 	routes: [
				// 		{
				// 			path: "/",
				// 			redirect: "/dashboard"
				// 		},
				// 		{
				// 			name: "dashboard",
				// 			path: "/dashboard",
				// 			icon: "BarChartOutlined",
				// 			routes: [
				// 				{
				// 					path: "/dashboard",
				// 					component: "./dashboard"
				// 				}
				// 			]
				// 		},
				// 		{
				// 			component: "404"
				// 		}
				// 	]
				// }
			]
		}
	],
	// Theme for antd: https://ant.design/docs/react/customize-theme-cn
	theme: {
		"primary-color": defaultSettings.primaryColor
	},
	title: false,
	ignoreMomentLocale: true,
	proxy: proxy["pre"],
	manifest: {
		publicPath: "/sp/",
		basePath: "/"
	},
	publicPath: "/sp/",
	esbuild: {}
});
