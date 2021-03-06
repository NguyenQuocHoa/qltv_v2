/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from "umi-request";
import { notification } from "antd";
import { history } from "umi";
import { stringify } from "querystring";

const codeMessage = {
	200: "The server successfully returned the requested data.",
	201: "Create or modify data successfully.",
	202: "A request has entered the background queue (asynchronous task).",
	204: "Delete data successfully.",
	400: "There is an error in the request sent, and the server did not create or modify data.",
	401: "The user does not have permission (the token, user name, password is wrong).",
	403: "The user is authorized, but access is forbidden.",
	404: "The request is for a record that does not exist, and the server is not operating.",
	406: "The requested format is not available.",
	410: "The requested resource has been permanently deleted and will no longer be available.",
	422: "When creating an object, a validation error occurred.",
	500: "An error occurred in the server, please check the server.",
	502: "Gateway error.",
	503: "The service is unavailable. The server is temporarily overloaded or maintained.",
	504: "Gateway timed out."
};
/** 异常处理程序 */

const errorHandler = error => {
	const { response } = error;

	if (response && response.status) {
		const errorText = codeMessage[response.status] || response.statusText;
		const { status, url } = response;
		// notification.error({
		// 	message: `Request error ${status}: ${url}`,
		// 	description: errorText
		// });
	} else if (!response) {
		notification.error({
			description:
				"Your network is abnormal and you cannot connect to the server",
			message: "network anomaly"
		});
	}

	return response;
};
/** 配置request请求时的默认参数 */

const request = extend({
	// prefix: "http://115.73.46.187:8080",
	prefix: "http://localhost:6165",
	errorHandler // 默认错误处理
	// credentials: "include"
});

// set header to add token
request.interceptors.request.use(async (url, options) => {
	// Here is the interceptor, before each request is sent to determine whether the token can be obtained
	let token = localStorage.getItem("auth_token");
	const headers = {
		// "Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token}`
	};
	return {
		url,
		options: { ...options, headers }
	};
	// }
});

request.interceptors.response.use(async response => {
	if (response.status === 401) {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("user_id");
		if (window.location.pathname !== "/user/login") {
			history.replace({
				pathname: "/user/login"
			});
		}
	}
	return response;
});

export default request;
