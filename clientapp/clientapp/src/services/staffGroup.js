import request from "../utils/request";

export async function getStaffGroupList({ search, column, dir, page, p_size }) {
	return request(
		`/api/NhomNhanVien/GetAll?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}

export async function getAllStaffGroupList() {
	return request(`/api/NhomNhanVien/GetAllAsync`);
}

export async function getStaffGroupDetail(id) {
	return request(`/api/NhomNhanVien/GetById/${id}`);
}

export async function createStaffGroup(payload) {
	return request("/api/NhomNhanVien/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateStaffGroup(payload) {
	return request(`/api/NhomNhanVien/Update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteStaffGroup(id) {
	return request(`/api/NhomNhanVien/Delete/${id}`, { method: "DELETE" });
}
