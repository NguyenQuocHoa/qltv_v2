import request from "../utils/request";

export async function getAllAccount() {
	return request(`/api/User/get-all`);
}

export async function getAccountPaging({ params, body }) {
	return request(
		`/api/User/get-all-paging?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`,
		{
			method: "POST",
			data: body
		}
	);
}

export async function getAccountDetail(id) {
	return request(`/api/User/get-by-id/${id}`);
}

export async function createAccount(payload) {
	return request("/api/User/create", {
		method: "POST",
		data: payload
	});
}

export async function updateAccount(payload) {
	return request(`/api/User/update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function resetPassword(id) {
	return request(`/api/User/reset_password/${id}`, {
		method: "PUT"
	});
}

export async function deleteAccount(id) {
	return request(`/api/User/delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/User/GetDataOptions`);
}
