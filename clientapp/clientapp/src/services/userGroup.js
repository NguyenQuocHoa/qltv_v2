import request from "@/utils/request";

export async function getAllListUserGroup() {
	return request("/api/NhomNhanVien/GetAllAsync");
}

export async function getListUserGroup({ search, column, dir, page, p_size }) {
	return request(
		`/api/NhomNhanVien/GetAll?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}
export async function getUserGroupDetail(id) {
	return request(`/api/NhomNhanVien/GetById/${id}`);
}

export async function createUserGroup(payload) {
	return request("/api/NhomNhanVien/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateUserGroup(payload) {
	return request(`/api/NhomNhanVien/Update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteUserGroup(id) {
	return request(`/api/NhomNhanVien/Delete/${id}`, { method: "Delete" });
}
