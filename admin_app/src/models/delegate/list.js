import { notification } from "antd";
import { getAllListRole } from "../../services/delegate";

const DelegateListModel = {
	namespace: "delegateList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allRoles: [],
		allRoleSuccess: false,
		allRoleFailure: false,

		allRolesMutate: []
	},
	effects: {
		*getAllRoleListRequest(_, { call, put }) {
			const response = yield call(getAllListRole);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllRoleListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllRoleListSuccess",
					payload: response
				});
			}
		},
		*mutateAllRoles({ payload }, { call, put }) {
			yield put({
				type: "mutateAllRolesSuccess",
				payload
			});
		}
	},
	reducers: {
		getAllRoleListRequest(state, action) {
			return {
				...state,
				allRoles: [],
				allRoleSuccess: false,
				allRoleFailure: false
			};
		},
		getAllRoleListSuccess(state, action) {
			return {
				...state,
				allRoles: action.payload,
				allRolesMutate: action.payload.items?.map(role => {
					return {
						id: role.id,
						name: role.roleName,
						view: false,
						create: false,
						update: false,
						all: false,
						none: true
					};
				}),
				allRoleSuccess: true,
				allRoleFailure: false
			};
		},
		getAllRoleListFailure(state, action) {
			return {
				...state,
				allRoleSuccess: false,
				allRoleFailure: true
			};
		},

		mutateAllRolesSuccess(state, action) {
			return {
				...state,
				allRolesMutate: action.payload
			};
		}
	}
};
export default DelegateListModel;
