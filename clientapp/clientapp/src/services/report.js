import request from "../utils/request";

export async function getReportList({
	search,
	userFilter,
	reportTimeFilterFrom,
	reportTimeFilterTo,
	statusFilter,
	column,
	dir,
	page,
	p_size
}) {
	return request(
		`/api/BaoCao/GetPagingReportFilterMultipleFields?search=${search}&userFilter=${userFilter}&reportTimeFilterFrom=${reportTimeFilterFrom}&reportTimeFilterTo=${reportTimeFilterTo}&statusFilter=${statusFilter}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}

export async function getReportListNoPaging({
	search,
	userFilter,
	reportTimeFilterFrom,
	reportTimeFilterTo,
	statusFilter,
	column,
	dir
}) {
	return request(
		`/api/BaoCao/GetReportFilterMultipleFields?search=${search}&userFilter=${userFilter}&reportTimeFilterFrom=${reportTimeFilterFrom}&reportTimeFilterTo=${reportTimeFilterTo}&statusFilter=${statusFilter}&column=${column}&dir=${dir}`
	);
}

export async function getLatestReportList({ search }) {
	return request(`/api/BaoCao/GetBaoCaoLatest/?search=${search}`);
}

export async function getReportDetail(id) {
	return request(`/api/BaoCao/GetById/${id}`);
}

export async function createReport(payload) {
	return request("/api/BaoCao/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateReport(payload) {
	return request(`/api/BaoCao/Update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteReport(id) {
	return request(`/api/BaoCao/Delete/${id}`, { method: "DELETE" });
}

export async function importReports(payload) {
	return request("/api/BaoCao/Import", {
		method: "POST",
		data: payload
	});
}
