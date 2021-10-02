import { notification } from "antd";
import { createUser } from "../../services/user";
const UserCreateModel = {
	namespace: "userCreate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*createUserRequest({ payload }, { call, put }) {
			const { formData } = payload;
			const response = yield call(createUser, formData);
			if (response?.code === 200) {
				notification.success({
					message: "Thêm nhân viên mới thành công!"
				});
				yield put({
					type: "createUserSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi khi tạo nhân viên mới!"
				});
				yield put({
					type: "createUserFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createUserRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		createUserSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		createUserFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserCreateModel;
