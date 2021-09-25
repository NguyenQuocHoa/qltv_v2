import React from "react";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { connect } from "umi";
import { toDateTime } from "../../../../utils/utils";

const FileTable = props => {
	const { handleParamsChange, dispatch, files, loading } = props;

	const handleDeleteFile = id => {
		dispatch({
			type: "fileDelete/deleteFileRequest",
			id
		});
	};

	const handleDownloadFile = id => {
		console.log(id);
		dispatch({
			type: "fileDownload/downloadFileRequest",
			id
		});
	};

	const columns = [
		{
			title: "Tên tập tin",
			dataIndex: "tenFile",
			key: "tenFile",
			filterMultiple: false
		},
		{
			title: "Loại tập tin",
			dataIndex: "loaiFile",
			key: "loaiFile",
			filterMultiple: false
		},
		{
			title: "Kích thước",
			dataIndex: "kichThuoc",
			key: "kichThuoc",
			filterMultiple: false,
			render: data => <div>{data} KB</div>
		},
		{
			title: "Ngày tạo",
			dataIndex: "ngayTao",
			key: "ngayTao",
			filterMultiple: false,
			render: data => <div>{toDateTime(data)}</div>
		},
		{
			title: "Thao tác",
			key: "action",
			render: (text, record, index) => (
				<div key={index}>
					<Space>
						<Button
							type="link"
							icon={<DownloadOutlined />}
							onClick={() => handleDownloadFile(record.id)}
						/>
						<Popconfirm
							title="Xác nhận xóa tập tin này?"
							onConfirm={() => {
								handleDeleteFile(record.id);
							}}
						>
							<Tooltip title="Xóa">
								<Button
									loading={loading}
									danger
									type="link"
									icon={<DeleteOutlined />}
								/>
							</Tooltip>
						</Popconfirm>
					</Space>
				</div>
			)
		}
	];

	return (
		<Table
			columns={columns}
			dataSource={files}
			pagination={false}
			onChange={handleParamsChange}
			size="small"
			rowKey="id"
		/>
	);
};

const mapStateTopProps = state => {
	return {
		loading: state.loading.effects["fileDelete/deleteFileRequest"]
	};
};

export default connect(mapStateTopProps)(FileTable);
