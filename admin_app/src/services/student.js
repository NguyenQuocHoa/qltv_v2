import request from "../utils/request";

export async function getAllStudent() {
	return request(`/api/Student/get-all`);
}

export async function getStudentPaging({ params, body }) {
	return request(
		`/api/Student/get-all-paging?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`,
		{
			method: "POST",
			data: body
		}
	);
}

export async function getStudentDetail(id) {
	return request(`/api/Student/get-by-id/${id}`);
}

export async function createStudent(payload) {
	return request("/api/Student/create", {
		method: "POST",
		data: payload
	});
}

export async function updateStudent(payload) {
	return request(`/api/Student/update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteStudent(id) {
	return request(`/api/Student/delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/Student/GetDataOptions`);
}
