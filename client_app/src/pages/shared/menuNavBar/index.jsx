import { Menu, Badge, Icon } from "antd";
import { useState } from "react";

const handleClick = () => {};

const MenuNavBar = props => {
	const { keyNav } = props;
	return (
		<Menu onClick={handleClick} selectedKeys={[keyNav]} mode="horizontal">
			<Menu.Item key="home">
				<a href="/#/home">Trang chủ</a>
			</Menu.Item>
			<Menu.Item key="book">
				<a href="/#/book">Sách</a>
			</Menu.Item>
			<Menu.Item key="post">
				<a href="/#/post">Bài viết</a>
			</Menu.Item>
			<Menu.Item key="cart">
				<Badge count={1} showZero>
					<a href="/#/cart">{"Giỏ sách  "}</a>
				</Badge>
			</Menu.Item>
		</Menu>
	);
};

export default MenuNavBar;
