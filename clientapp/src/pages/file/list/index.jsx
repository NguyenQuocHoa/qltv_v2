import React, { useEffect, useState } from "react";
import { connect } from "umi";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	InputNumber,
	Pagination,
	Row,
	Spin,
	Input,
	Space
} from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import FileTable from "../components/fileTable";

const { Search } = Input;

const FileList = props => {
	const { filePayload, dispatch, loading, isDeleteSuccess } = props;
	const id = props.match.params.id;
	const history = useHistory();
	const total = filePayload?.total || 0;
	const records = filePayload?.items || [];

	const [params, setParams] = useState({
		dir: "desc",
		search: "",
		page: 1,
		p_size: 10,
		column: "ngaytao",
		folderId: id
	});

	const getFileListRequest = params => {
		setParams(params);
		// history.push({
		// 	pathname: "/folders",
		// 	search: qs.stringify(params)
		// });

		dispatch({
			type: "fileList/getFileListRequest",
			payload: params
		});
	};

	const handleSearchChange = e => {
		setParams({
			...params,
			search: e.target.value
		});
		getFileListRequest({ ...params, search: e.target.value });
	};

	const handleSearchPress = () => {
		getFileListRequest({ ...params });
	};

	const handlePageIndexChange = newPageIndex => {
		getFileListRequest({ ...params, page: newPageIndex });
	};

	const handlePageSizeChange = newPageSize => {
		getFileListRequest({ ...params, page: 1, p_size: newPageSize });
	};

	const handleParamsChange = params => {};

	useEffect(() => {
		getFileListRequest(params);
	}, []);

	useEffect(() => {
		getFileListRequest(params);
	}, [isDeleteSuccess]);

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
					<Space>
						<Button
							type="default"
							icon={<LeftOutlined />}
							onClick={() => {
								history.goBack();
							}}
						>
							Trở về
						</Button>
						<Button
							onClick={() => {
								history.push(`/folders/${id}/create`);
							}}
							type="primary"
							icon={<PlusOutlined />}
						>
							Thêm mới
						</Button>
					</Space>
				</Col>
			</Row>

			<Row className={styles.mt16}>
				<Col>
					Tổng số tập tin:{" "}
					<span className={styles.title}>{total}</span>
				</Col>
			</Row>

			<div className={styles.mt16}>
				<FileTable
					files={records}
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
							<Col>Số tập tin mỗi trang</Col>
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
		filePayload: state.fileList.payload,
		isDeleteSuccess: state.fileDelete.success,
		loading: state.loading.effects["fileList/getFileListRequest"]
	};
};

export default connect(mapStateToProps)(FileList);
