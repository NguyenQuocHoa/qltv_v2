export const dataTemplate = [
	{
		maDuAn: "TOOLBCCV",
		soGioDuKien: "5",
		batDau: "13:50",
		ketThuc: "14:05",
		moTa: "Mô tả mẫu 1",
		ngayBaoCao: "2021-08-08T17:00:00.000Z",
		loai: "Tạo chức năng mới",
		trangThai: "Hoàn thành",
		tenDangNhap: "admin"
	},
	{
		maDuAn: "TOOLBCCV",
		soGioDuKien: "3",
		batDau: "13:30",
		ketThuc: "15:30",
		moTa: "Mô tả mẫu 2",
		ngayBaoCao: "2021-08-08T17:00:00.000Z",
		loai: "Năng cấp chức năng cũ",
		trangThai: "Chưa hoàn thành",
		tenDangNhap: "admin"
	},
	{
		maDuAn: "TOOLBCCV",
		soGioDuKien: "5",
		batDau: "13:50",
		ketThuc: "14:05",
		moTa: "Mô tả mẫu 3",
		ngayBaoCao: "2021-08-08T17:00:00.000Z",
		loai: "Fix bug",
		trangThai: "Hoàn thành",
		tenDangNhap: "admin"
	}
];

export const ExportHeader = [
	{ key: "tenDuAn", label: "Tên dự án" },
	{ key: "soGioDuKien", label: "Số giờ dự kiến" },
	{ key: "batDau", label: "Bắt đầu" },
	{ key: "ketThuc", label: "Kết thúc" },
	{ key: "tenNguoiBaoCao", label: "Người báo cáo" },
	{ key: "ngayBaoCao", label: "Ngày báo cáo" },
	{ key: "tenNhom", label: "Công việc" },
	{ key: "tenTrangThai", label: "Trạng thái" }
];

export const importHeader = [
	{ key: "maDuAn", label: "Mã dự án" },
	{ key: "soGioDuKien", label: "Số giờ dự kiến" },
	{ key: "batDau", label: "Bắt đầu" },
	{ key: "ketThuc", label: "Kết thúc" },
	{ key: "moTa", label: "Mô tả" },
	{ key: "tenDangNhap", label: "Người báo cáo" },
	{ key: "ngayBaoCao", label: "Ngày báo cáo" },
	{ key: "loai", label: "Công việc" },
	{ key: "trangThai", label: "Trạng thái" }
];

export const status = {
	"chua hoan thanh": 3048,
	"hoan thanh": 3049
};

export const tasks = {
	"fix bug": 3047,
	"nang cap chuc nang cu": 3046,
	"tao chuc nang moi": 3045
};

export const limit = 5;
