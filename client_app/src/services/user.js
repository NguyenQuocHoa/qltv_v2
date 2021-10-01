import request from "@/utils/request";
export async function query() {
	return request("/api/users");
}
export async function queryCurrent() {
	return request("/api/currentUser");
}
export async function queryNotices() {
	return request("/api/notices");
}

export async function getAllListUser() {
	return request("/api/User/GetAllUserAsync");
}

export async function getListUser({ search, column, dir, page, p_size }) {
	return request(
		`/api/User/GetAll?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}

export async function getUserDetail(id) {
	return request(`/api/User/GetById/${id}`);
}

export async function getCurrentUser() {
	return request("/api/User/GetUserInfo");
}

export async function createUser(formData) {
	return request("/api/User/Create", {
		method: "POST",
		data: formData
	});
}

export async function updateUser(id, formData) {
	console.log("update payload", id, formData);
	return request(`/api/User/Update/${id}`, {
		method: "PUT",
		data: formData
	});
}

export async function deleteUser(id) {
	return request(`/api/User/Delete/${id}`, { method: "Delete" });
}
