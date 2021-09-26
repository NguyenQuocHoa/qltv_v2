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
				{
					path: "/",
					component: "../layouts/BasicLayout",
					authority: ["admin", "user"],
					routes: [
						{
							path: "/",
							redirect: "/dashboard"
						},
						{
							name: "dashboard",
							path: "/dashboard",
							icon: "BarChartOutlined",
							routes: [
								{
									path: "/dashboard",
									component: "./dashboard"
								}
							]
						},
						// {
						// 	name: "latestReport",
						// 	path: "/latest-reports",
						// 	icon: "BarChartOutlined",
						// 	routes: [
						// 		{
						// 			path: "/latest-reports",
						// 			component: "./latestReport"
						// 		}
						// 	]
						// },
						// {
						// 	name: "report",
						// 	path: "/report",
						// 	icon: "AreaChartOutlined",
						// 	routes: [
						// 		{
						// 			path: "/report",
						// 			component: "./report"
						// 		},
						// 		{
						// 			path: "/report/create",
						// 			component: "./report/reportForm"
						// 		},
						// 		{
						// 			path: "/report/:id",
						// 			component: "./report/reportForm"
						// 		}
						// 	]
						// },
						// {
						// 	name: "project",
						// 	path: "/projects",
						// 	icon: "FundProjectionScreenOutlined",
						// 	routes: [
						// 		{
						// 			path: "/projects",
						// 			component: "./project"
						// 		},
						// 		{
						// 			path: "/projects/create",
						// 			component: "./project/create"
						// 		},
						// 		{
						// 			path: "/projects/:id",
						// 			component: "./project/update"
						// 		}
						// 	]
						// },
						// {
						// 	name: "backlog",
						// 	path: "/backlogs",
						// 	icon: "UnorderedListOutlined",
						// 	routes: [
						// 		// {
						// 		// 	path: "/backlogs",
						// 		// 	component: "./backlog"
						// 		// },
						// 		{
						// 			path: "/backlogs/create",
						// 			component: "./backlog/create"
						// 		},
						// 		{
						// 			path: "/backlogs/:id", // id of project
						// 			component: "./backlog"
						// 		}
						// 	]
						// },
						// {
						// 	name: "customer",
						// 	path: "/customers",
						// 	icon: "SmileOutlined",
						// 	routes: [
						// 		{
						// 			path: "/customers",
						// 			component: "./customer"
						// 		},
						// 		{
						// 			path: "/customers/create",
						// 			component: "./customer/create"
						// 		},
						// 		{
						// 			path: "/customers/:id",
						// 			component: "./customer/update"
						// 		}
						// 	]
						// },
						// {
						// 	name: "users",
						// 	path: "/users",
						// 	icon: "UserAddOutlined",
						// 	routes: [
						// 		{
						// 			path: "/users",
						// 			component: "./user"
						// 		},
						// 		{
						// 			path: "/users/create",
						// 			component: "./user/userForm"
						// 		},
						// 		{
						// 			path: "/users/:id",
						// 			component: "./user/userForm"
						// 		}
						// 	]
						// },
						{
							name: "bookCategories",
							path: "/book-category",
							icon: "DatabaseOutlined",
							routes: [
								{
									path: "/book-category",
									component: "./bookCategory"
								},
								{
									path: "/book-category/create",
									component: "./bookCategory/create"
								},
								{
									path: "/book-category/:id",
									component: "./bookCategory/update"
								}
							]
						},
						{
							name: "books",
							path: "/books",
							icon: "BookOutlined",
							routes: [
								{
									path: "/books",
									component: "./book"
								},
								{
									path: "/books/create",
									component: "./book/create"
								},
								{
									path: "/books/:id",
									component: "./book/update"
								}
							]
						},
						{
							name: "posts",
							path: "/posts",
							icon: "ContainerOutlined",
							routes: [
								{
									path: "/posts",
									component: "./post"
								},
								{
									path: "/posts/create",
									component: "./post/create"
								},
								{
									path: "/posts/:id",
									component: "./post/update"
								}
							]
						},
						{
							name: "accounts",
							path: "/accounts",
							icon: "UserOutlined",
							routes: [
								{
									path: "/accounts",
									component: "./account"
								},
								{
									path: "/accounts/create",
									component: "./account/create"
								},
								{
									path: "/accounts/:id",
									component: "./account/update"
								}
							]
						},
						// {
						// 	name: "staffGroup",
						// 	path: "/staffGroups",
						// 	icon: "UsergroupAddOutlined",
						// 	routes: [
						// 		{
						// 			path: "/staffGroups",
						// 			component: "./staffGroup"
						// 		},
						// 		{
						// 			path: "/staffGroups/create",
						// 			component: "./staffGroup/create"
						// 		},
						// 		{
						// 			path: "/staffGroups/:id",
						// 			component: "./staffGroup/update"
						// 		}
						// 	]
						// },
						// {
						// 	name: "permissionGroup",
						// 	path: "/pgs",
						// 	icon: "GroupOutlined",
						// 	routes: [
						// 		{
						// 			path: "/pgs",
						// 			component: "./permissionGroup"
						// 		},
						// 		{
						// 			path: "/pgs/create",
						// 			component: "./permissionGroup/create"
						// 		},
						// 		{
						// 			path: "/pgs/:id",
						// 			component: "./permissionGroup/update"
						// 		}
						// 	]
						// },
						// {
						// 	name: "delegate",
						// 	path: "/delegates",
						// 	icon: "UsergroupAddOutlined",
						// 	routes: [
						// 		{
						// 			path: "/delegates",
						// 			component: "./delegate"
						// 		}
						// 	]
						// },
						// {
						// 	name: "file",
						// 	path: "/folders",
						// 	icon: "FileOutlined",
						// 	routes: [
						// 		{
						// 			path: "/folders",
						// 			component: "./file"
						// 		},
						// 		{
						// 			path: "/folders/:id/create",
						// 			component: "./file/create"
						// 		},
						// 		{
						// 			path: "/folders/:id",
						// 			component: "./file/list"
						// 		}
						// 	]
						// },
						{
							component: "404"
						}
					]
				}
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
