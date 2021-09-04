import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	InputNumber,
	Pagination,
	Row,
	Spin,
	Input,
	Modal
} from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import qs from "query-string";
import FolderTable from "./components/folderTable";

const { Search } = Input;

const Folder = props => {
	const {
		folderPayload,
		dispatch,
		loading,
		isDeleteSuccess,
		isCreateSuccess,
		userRoles
	} = props;
	const history = useHistory();
	const total = folderPayload?.total || 0;
	const records = folderPayload?.items || [];

	const [params, setParams] = useState({
		dir: "desc",
		search: "",
		page: 1,
		p_size: 10,
		column: "ngaytao"
	});
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newFolder, setNewFolder] = useState("");

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		dispatch({
			type: "folderCreate/createFolderRequest",
			payload: {
				tenNhom: newFolder,
				loaiNhom: 13
			}
		});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const getFolderListRequest = params => {
		setParams(params);
		history.push({
			pathname: "/folders",
			search: qs.stringify(params)
		});

		dispatch({
			type: "folderList/getFolderListRequest",
			payload: params
		});
	};

	const handleSearchChange = e => {
		setParams({
			...params,
			search: e.target.value
		});
		getFolderListRequest({ ...params, search: e.target.value });
	};

	const handleSearchPress = () => {
		getFolderListRequest({ ...params });
	};

	const handlePageIndexChange = newPageIndex => {
		getFolderListRequest({ ...params, page: newPageIndex });
	};

	const handlePageSizeChange = newPageSize => {
		getFolderListRequest({ ...params, page: 1, p_size: newPageSize });
	};

	const handleParamsChange = params => {};

	useEffect(() => {
		getFolderListRequest(params);
	}, []);

	useEffect(() => {
		getFolderListRequest(params);
	}, [isDeleteSuccess]);

	useEffect(() => {
		getFolderListRequest(params);
	}, [isCreateSuccess]);

	return (
		<div className={styles.container}>
			<Row justify="space-between" align="middle">
				<Col xs={8}>
					<Search
						placeholder="Tìm kiếm"
						value={params.search}
						onChange={handleSearchChange}
						onSearch={handleSearchPress}
						enterButton
					/>
				</Col>
				<Spin spinning={loading} />
				<Col>
					<Button
						onClick={showModal}
						type="primary"
						icon={<PlusOutlined />}
						disabled={!userRoles?.FILE?.them ?? true}
					>
						Thêm
					</Button>
					<Modal
						title="Thêm thư mục mới"
						okText="Thêm"
						visible={isModalVisible}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<Input
							value={newFolder}
							onChange={e => setNewFolder(e.target.value)}
							placeholder="Tên thư mục"
						></Input>
					</Modal>
				</Col>
			</Row>

			<Row className={styles.mt16}>
				<Col>
					Tổng số thư mục:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<FolderTable
					folders={records}
					onParamsChange={handleParamsChange}
				/>
			</div>

			{total !== 0 ? (
				<Row
					justify="space-between"
					gutter={16}
					className={styles.mt16}
				>
					<Col>
						<Pagination
							showSizeChanger={false}
							current={params.page}
							pageSize={params.p_size}
							total={total}
							onChange={handlePageIndexChange}
						/>
					</Col>
					<Col>
						<Spin spinning={loading} />
					</Col>
					<Col>
						<Row justify="center" align="middle" gutter={[8, 8]}>
							<Col>Số thư mục mỗi trang</Col>
							<Col>
								<InputNumber
									style={{ width: 60 }}
									min={1}
									max={100}
									value={params.p_size}
									onChange={handlePageSizeChange}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			) : null}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		folderPayload: state.folderList.payload,
		isDeleteSuccess: state.folderDelete.success,
		isCreateSuccess: state.folderCreate.success,
		loading: state.loading.effects["folderList/getFolderListRequest"],
		userRoles: state.UserRole.userRoles
	};
};

export default connect(mapStateToProps)(Folder);
