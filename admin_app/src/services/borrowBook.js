import request from "../utils/request";

export async function getAllBorrowBook() {
	return request(`/api/BorrowBook/get-all`);
}

export async function getAllBorrowBookNotReturn({ borrowBookId }) {
	console.log("id", borrowBookId);
	return request(`/api/BorrowBook/get-all-not-return`, {
		method: "POST",
		params: { borrowBookId }
	});
}

export async function getBorrowBookPaging({ params, body }) {
	return request(
		`/api/BorrowBook/get-all-paging?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`,
		{
			method: "POST",
			data: body
		}
	);
}

export async function getBorrowBookDetail(id) {
	return request(`/api/BorrowBook/get-by-id/${id}`);
}

export async function createBorrowBook(payload) {
	return request("/api/BorrowBook/create", {
		method: "POST",
		data: payload
	});
}

export async function updateBorrowBook(payload) {
	return request(`/api/BorrowBook/update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteBorrowBook(id) {
	return request(`/api/BorrowBook/delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/BorrowBook/GetDataOptions`);
}
