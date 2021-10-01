import request from "../utils/request";

export async function getAllReturnBook() {
	return request(`/api/ReturnBook/get-all`);
}

export async function getReturnBookPaging({ params, body }) {
	return request(
		`/api/ReturnBook/get-all-paging?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`,
		{
			method: "POST",
			data: body
		}
	);
}

export async function getReturnBookDetail(id) {
	return request(`/api/ReturnBook/get-by-id/${id}`);
}

export async function createReturnBook(payload) {
	return request("/api/ReturnBook/create", {
		method: "POST",
		data: payload
	});
}

export async function updateReturnBook(payload) {
	return request(`/api/ReturnBook/update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteReturnBook(id) {
	return request(`/api/ReturnBook/delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/ReturnBook/GetDataOptions`);
}
