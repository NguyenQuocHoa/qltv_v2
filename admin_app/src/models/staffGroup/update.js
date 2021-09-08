import { notification } from "antd";
import { updateStaffGroup } from "../../services/staffGroup";

const StaffGroupUpdateModel = {
	namespace: "staffGroupUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateStaffGroupRequest({ payload }, { call, put }) {
			const response = yield call(updateStaffGroup, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật thông tin nhóm nhân viên thành công!"
				});
				yield put({
					type: "updateStaffGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra. " + response?.message
				});
				yield put({
					type: "updateStaffGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateStaffGroupRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		updateStaffGroupSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateStaffGroupFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default StaffGroupUpdateModel;
