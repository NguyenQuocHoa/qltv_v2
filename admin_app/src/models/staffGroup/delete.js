import { notification } from "antd";
import { deleteStaffGroup } from "../../services/staffGroup";

const StaffGroupDeleteModel = {
	namespace: "staffGroupDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteStaffGroupRequest({ id }, { call, put }) {
			const response = yield call(deleteStaffGroup, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa nhóm nhân viên"
				});
				yield put({
					type: "deleteStaffGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteStaffGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteStaffGroupRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteStaffGroupSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteStaffGroupFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default StaffGroupDeleteModel;
