import React from "react";
import { Card, Typography } from "antd";
import { Link } from "react-dom";

const { Text } = Typography;

const CardPost = props => {
    const { textLink } = props;
	return (
		<Card style={{ width: "100%" }}>
			<Text>
                <a>{textLink}</a>
			</Text>
		</Card>
	);
};

export default CardPost;