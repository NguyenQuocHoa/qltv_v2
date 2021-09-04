import {
	CheckCircleOutlined,
	InfoCircleOutlined,
	SaveOutlined
} from "@ant-design/icons";
import { Modal, Button } from "antd";
import { useEffect, useState } from "react";

const SaveStatusConfirm = ({
	title,
	text,
	handleSave,
	handleActiveAndSave,
	visible,
	setVisible
}) => {

	// const showModal = () => {
	// 	setState({
	// 		visible: true
	// 	});
	// };

	// const handleOk = () => {
	// 	setState({ loading: true });
	// 	setTimeout(() => {
	// 		setState({ loading: false, visible: false });
	// 	}, 3000);
	// };

	const handleCancel = () => {
		setVisible(false);
	}

	return (
		<>
			{/* <Button icon={<SaveOutlined />} type="primary" onClick={showModal}>
				Lưu
			</Button> */}
			<Modal
				visible={visible}
				title={title}
				onOk={handleSave}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Quay lại
					</Button>,
					<Button
						key="handleSave"
						type="primary"
						// loading={state.loading}
						icon={<SaveOutlined />}
						onClick={() => {
							if (handleSave) {
								handleSave();
								handleCancel();
							}
						}}
					>
						Tiếp tục lưu
					</Button>,
					<Button
						key="handleActiveAndSave"
						type="primary"
						// loading={state.loading}
						icon={<CheckCircleOutlined />}
						onClick={() => {
							if (handleActiveAndSave) {
								handleActiveAndSave();
								handleCancel();
							}
						}}
					>
						Lưu và kích hoạt
					</Button>
				]}
			>
				<p>{text}</p>
			</Modal>
		</>
	);
};

export default SaveStatusConfirm;
