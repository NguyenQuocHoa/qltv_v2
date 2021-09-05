import { notification } from "antd";
import { createStaffGroup } from "../../services/staffGroup";

const StaffGroupCreateModel = {
	namespace: "staffGroupCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createStaffGroupRequest({ payload }, { call, put }) {
			const response = yield call(createStaffGroup, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Thêm nhóm nhân viên mới thành công"
				});
				yield put({
					type: "createStaffGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra. "
				});
				yield put({
					type: "createStaffGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createStaffGroupRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createStaffGroupSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createStaffGroupFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default StaffGroupCreateModel;
