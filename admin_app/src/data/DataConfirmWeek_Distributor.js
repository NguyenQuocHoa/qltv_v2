const DataConfirmWeekDistributor = [
	{
		key: 1,
		product_name: "Sản lượng(SL): Thùng",
		order_allocation: 200,
		order_confirm: 250,
		is_parent: true
	},
	{
		key: 2,
		product_name: "Trọng lượng(TL): Tấn",
		order_allocation: 225,
		order_confirm: 230,
		is_parent: true
	},
	{
		key: 3,
		product_name: "TỔNG THANH TOÁN TẠM TÍNH (TRIỆU ĐỒNG)",
		order_allocation: 200,
		order_confirm: 250,
		is_parent: true
	},
	{
		key: 4,
		product_name: "TỔNG DT PK BƠ (trừ VAT & CK) (TRIỆU ĐỒNG)",
		is_parent: true,
		children: [
			{
				key: "4_1",
				product_name: "DẦU COOK(X) 0.4L",
				order_allocation: 200,
				order_confirm: 250
			},
			{
				key: "4_2",
				product_name: "DẦU COOK(X) 0.4L",
				order_allocation: 2080,
				order_confirm: 1202
			},
			{
				key: "4_3",
				product_name: "DẦU COOK(X) 1L",
				order_allocation: 2080,
				order_confirm: 1202
			},
			{
				key: "4_4",
				product_name: "DẦU COOK(X) 2L",
				order_allocation: 2080,
				order_confirm: 1202
			},
			{
				key: "4_5",
				product_name: "DẦU COOK(X) 3L",
				order_allocation: 2080,
				order_confirm: 1202
			}
		]
	},
	{
		key: 5,
		product_name: "TỔNG DT PK CHUYÊN BIỆT | TỔNG DTHU(trừ VAT & CK)",
		is_parent: true,
		children: [
			{
				key: "5_1",
				product_name: "DẦU COOK(X) 1L",
				order_allocation: 200,
				order_confirm: 250
			},
			{
				key: "5_2",
				product_name: "DẦU COOK(X) 1.5L",
				order_allocation: 2080,
				order_confirm: 1202
			},
			{
				key: "5_3",
				product_name: "DẦU COOK(X) 2L",
				order_allocation: 2080,
				order_confirm: 1202
			},
			{
				key: "5_4",
				product_name: "DẦU COOK(X) 2.5L",
				order_allocation: 2080,
				order_confirm: 1202
			},
			{
				key: "5_5",
				product_name: "DẦU COOK(X) 3L",
				order_allocation: 2080,
				order_confirm: 1202
			}
		]
	},
	{
		key: 6,
		product_name: "TỔNG DT PK CAO CẤP | TỔNG DTHU(trừ VAT & CK)",
		is_parent: true
	},
	{
		key: 7,
		product_name: "TỔNG DT PK TRUNG CẤP | TỔNG DTHU(trừ VAT & CK)",
		is_parent: true
	},
	{
		key: 8,
		product_name: "TỔNG DT PK PHỔ THÔNG | TỔNG DTHU(trừ VAT & CK)",
		is_parent: true
	}
]
export default DataConfirmWeekDistributor;
