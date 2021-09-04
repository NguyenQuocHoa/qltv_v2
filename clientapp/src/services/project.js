import request from "../utils/request";

export async function getProjectList({ search, column, dir, page, p_size }) {
	return request(
		`/api/DuAn/GetAll?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}

export async function getAllProjectList() {
	return request(`/api/DuAn/GetAllDuAnAsync`);
}

export async function getProjectDetail(id) {
	return request(`/api/DuAn/GetById/${id}`);
}

export async function createProject(payload) {
	return request("/api/DuAn/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateProject(payload) {
	return request(`/api/DuAn/Update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteProject(id) {
	return request(`/api/DuAn/Delete/${id}`, { method: "DELETE" });
}
