import { notification } from "antd";
import { updateFolder } from "../../services/folder";

const FolderUpdateModel = {
	namespace: "folderUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateFolderRequest({ payload }, { call, put }) {
			const response = yield call(updateFolder, payload);
			if (response?.code == 200) {
				notification.success({
					message: "Cập nhật thông tin thư mục thành công!"
				});
				yield put({
					type: "updateFolderSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra"
				});
				yield put({
					type: "updateFolderFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateFolderRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		updateFolderSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateFolderFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FolderUpdateModel;
