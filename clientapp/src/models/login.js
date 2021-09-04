import { stringify } from "querystring";
import { history } from "umi";
import { getAuthToken } from "@/services/login";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { message } from "antd";
const Model = {
	namespace: "login",
	state: {
		status: undefined
	},
	effects: {
		*login({ payload }, { call, put }) {
			const response = yield call(getAuthToken, payload);
			if (response?.token) {
				yield put({
					type: "changeLoginStatus",
					payload: response
				}); // Login successfully
				localStorage.setItem("auth_token", response.token);
				localStorage.setItem("user_id", response.id);
				message.success("🎉 🎉 🎉  Đăng nhập thành công！");
				history.replace("/");
			} else {
				message.error("Tên tài khoản hoặc mật khẩu không chính xác.");
			}
		},

		logout() {
			const { redirect } = getPageQuery(); // Note: There may be security issues, please note

			if (window.location.pathname !== "/user/login" && !redirect) {
				history.replace({
					pathname: "/user/login",
					search: stringify({
						redirect: window.location.href
					})
				});
			}
		}
	},
	reducers: {
		changeLoginStatus(state, { payload }) {
			setAuthority(payload.currentAuthority);
			return { ...state, status: payload.status, type: payload.type };
		}
	}
};
export default Model;
