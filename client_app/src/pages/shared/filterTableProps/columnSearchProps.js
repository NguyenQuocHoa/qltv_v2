import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import styles from "./style.less";

const columnSearchProps = dataIndex => ({
	filterDropdown: ({
		setSelectedKeys,
		selectedKeys,
		confirm,
		clearFilters
	}) => (
		<div style={{ padding: 8 }}>
			<Input
				placeholder={`Tìm kiếm ${dataIndex}`}
				value={selectedKeys[0]}
				onChange={e =>
					setSelectedKeys(e.target.value ? [e.target.value] : [])
				}
				onPressEnter={() => confirm()}
				className={styles.mb}
			/>
			<Space>
				<Button
					onClick={() => {
						clearFilters();
						setSelectedKeys("");
					}}
					size="small"
					style={{ width: 90 }}
				>
					Xem tất cả
				</Button>
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
			</Space>
		</div>
	),
	filterIcon: filtered => (
		<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
	),
	onFilterDropdownVisibleChange: visible => {
		if (visible) {
		}
	}
});

export default columnSearchProps;
