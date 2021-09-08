import { notification } from "antd";
import { createFolder } from "../../services/folder";

const FolderCreateModel = {
	namespace: "folderCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createFolderRequest({ payload }, { call, put }) {
			const response = yield call(createFolder, payload);
			if (response?.code == 200) {
				notification.success({
					message: "Thêm thư mục mới thành công"
				});
				yield put({
					type: "createFolderSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra."
				});
				yield put({
					type: "createFolderFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createFolderRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createFolderSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createFolderFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FolderCreateModel;
