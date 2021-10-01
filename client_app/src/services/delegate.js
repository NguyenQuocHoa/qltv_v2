import request from "../utils/request";

// get all role
export async function getAllListRole() {
	return request(`/api/Role/Get`);
}

export async function updateUserRole(payload) {
	return request(`/api/NhanVienRole`, {
		method: "PUT",
		data: payload
	});
}
