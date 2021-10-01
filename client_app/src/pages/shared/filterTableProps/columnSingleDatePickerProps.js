import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Row, Space } from "antd";
import styles from "./style.less";

const columnSingleDatePickerProps = dataIndex => ({
	filterDropdown: ({
		setSelectedKeys,
		selectedKeys,
		confirm,
		clearFilters
	}) => (
		<div style={{ padding: 8 }}>
			<div className={styles.mb}>
				<DatePicker
					showTime
					placeholder="Chọn ngày"
					format="DD-MM-YYYY H:mm:ss"
					// value={selectedKeys}
					onChange={e => {
						setSelectedKeys(e !== null ? [e.valueOf()] : []);
					}}
					onOk={e => {
						setSelectedKeys(e !== null ? [e.valueOf()] : []);
						confirm();
					}}
					className={styles.mb}
				/>
			</div>

			<Row justify="space-between" align="middle" gutter={8}>
				<Col>
					<Button
						onClick={() => {
							setSelectedKeys([]);
							confirm();
							// handleReset(clearFilters);
						}}
						size="small"
						style={{ width: 90 }}
					>
						Xem tất cả
					</Button>
				</Col>
				<Col>
					<Button
						type="primary"
						onClick={() =>
							// handleSearch(selectedKeys, confirm, dataIndex)
							confirm()
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Tìm
					</Button>
				</Col>
			</Row>
		</div>
	),
	filterIcon: filtered => (
		<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
	),
	onFilterDropdownVisibleChange: visible => {
		if (visible) {
			// setTimeout(() => searchInput.select());
		}
	}
});

export default columnSingleDatePickerProps;
