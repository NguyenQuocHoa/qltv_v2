import { notification } from "antd";
import { deleteFolder } from "../../services/folder";

const FolderDeleteModel = {
	namespace: "folderDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteFolderRequest({ id }, { call, put }) {
			const response = yield call(deleteFolder, id);
			if (response?.code == 200) {
				notification.success({
					message: "Đã xóa thư mục!"
				});
				yield put({
					type: "deleteFolderSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra khi xóa thư mục"
				});
				yield put({
					type: "deleteFolderFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteFolderRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteFolderSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteFolderFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FolderDeleteModel;
