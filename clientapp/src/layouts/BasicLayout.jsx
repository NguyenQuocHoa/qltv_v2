/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
	DefaultFooter,
	SettingDrawer
} from "@ant-design/pro-layout";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useIntl, connect, history } from "umi";
import {
	CopyrightOutlined,
	GithubOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined
} from "@ant-design/icons";
import { Result, Button, Layout, message } from "antd";
import Authorized from "@/utils/Authorized";
// import RightContent from "@/components/GlobalHeader/RightContent";
import { getMatchMenu } from "@umijs/route-utils";
import logo from "../assets/logo.png";
import RightContent from "../components/GlobalHeader/RightContent";
import { set } from "lodash";
import { EROLE } from "../utils/utils";

const { Footer } = Layout;

const noMatch = (
	<Result
		status={403}
		title="403"
		subTitle="Sorry, you are not authorized to access this page."
		extra={
			<Button type="primary">
				<Link to="/user/login">Go Login</Link>
			</Button>
		}
	/>
);

const defaultFooterDom = (
	<DefaultFooter
		copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
		links={[
			{
				key: "Ant Design Pro",
				title: "Ant Design Pro",
				href: "https://pro.ant.design",
				blankTarget: true
			},
			{
				key: "github",
				title: <GithubOutlined />,
				href: "https://github.com/ant-design/ant-design-pro",
				blankTarget: true
			},
			{
				key: "Ant Design",
				title: "Ant Design",
				href: "https://ant.design",
				blankTarget: true
			}
		]}
	/>
);

const headerTitle = pathname => {
	const path = pathname.split("/");
	if (path[1] === "projects") {
		if (path[2]) {
			return "Chi tiết dự án";
		}
		return "Danh sách dự án";
	} else if (path[1] === "report") {
		if (path[2]) {
			return path[2] === "create" ? "Tạo báo cáo" : "Chi tiết báo cáo";
		}
		return "Danh sách báo cáo";
	} else if (path[1] === "users") {
		if (path[2]) {
			return path[2] === "create"
				? "Thêm nhân viên mới"
				: "Chi tiết nhân viên";
		}
		return "Danh sách nhân viên";
	} else if (path[1] === "latest-reports") return "Các báo cáo mới nhất";
};

const BasicLayout = props => {
	const {
		dispatch,
		children,
		settings,
		location = {
			pathname: ""
		},
		userRoles
	} = props;

	const menuDataRef = useRef([]);
	const [countAccess, setCountAccess] = useState(0);
	const [collapsedValue, setCollapsedValue] = useState(!props.collapsed);
	// useEffect(() => {
	// 	if (dispatch) {
	// 		dispatch({
	// 			type: "user/fetchCurrent"
	// 		});
	// 	}
	// }, []);
	/** Init variables */

	// get user role by id
	useEffect(() => {
		if (dispatch) {
			dispatch({
				type: "UserRole/getAllUserRoleByIdRequest",
				id: localStorage.getItem("user_id") ?? 0
			});
		}
	}, []);

	const handleMenuCollapse = payload => {
		if (dispatch) {
			dispatch({
				type: "global/changeLayoutCollapsed",
				payload
			});
		}
		if (countAccess > 0) {
			console.log(countAccess);
			setCollapsedValue(!collapsedValue);
		} else {
			setCountAccess(1);
		}
	}; // get children authority

	const authorized = useMemo(
		() =>
			getMatchMenu(
				location.pathname || "/",
				menuDataRef.current
			).pop() || {
				authority: undefined
			},
		[location.pathname]
	);
	const { formatMessage } = useIntl();
	const menuItemRender = (menuItemProps, defaultDom) => {
		if (
			menuItemProps.isUrl ||
			!menuItemProps.path ||
			location.pathname === menuItemProps.path
		) {
			return defaultDom;
		}

		return <Link to={menuItemProps.path}>{defaultDom}</Link>;
	};
	/** Use Authorized check all menu item */
	const menuDataRender = menuList => {
		return menuList.map(item => {
			let role = EROLE.find(r => r.path === item.path);
			let hidden = true;
			if (role !== undefined) {
				if (userRoles?.[role.name]?.xem) {
					hidden = false;
				}
			}
			const localItem = {
				...item,
				children: item.children
					? menuDataRender(item.children)
					: undefined,
				hideInMenu: hidden
			};
			return Authorized.check(item.authority, localItem, null);
		});
	};

	return (
		<>
			<ProLayout
				logo={logo}
				formatMessage={formatMessage}
				{...props}
				defaultCollapsed={true}
				collapsed={collapsedValue}
				{...settings}
				onCollapse={handleMenuCollapse}
				onMenuHeaderClick={() => history.push("/")}
				menuItemRender={menuItemRender}
				breadcrumbRender={(routers = []) => [
					{
						path: "/",
						breadcrumbName: formatMessage({
							id: "menu.home"
						})
					},
					...routers
				]}
				itemRender={(route, params, routes, paths) => {
					const first = routes.indexOf(route) === 0;
					return first ? (
						<Link to={paths.join("/")}>{route.breadcrumbName}</Link>
					) : (
						<span>{route.breadcrumbName}</span>
					);
				}}
				footerRender={() => {
					// if (settings.footerRender || settings.footerRender === undefined) {
					//   return defaultFooterDom;
					// }

					return (
						<Footer
							style={{ paddingTop: "0px", paddingBottom: "0px" }}
						>
							Copyright 2021
							<CopyrightOutlined /> by Mekong Soft
						</Footer>
					);
				}}
				menuDataRender={menuDataRender}
				rightContentRender={() => <RightContent />}
				postMenuData={menuData => {
					menuDataRef.current = menuData || [];
					return menuData || [];
				}}
				headerContentRender={() => {
					return (
						<div>
							<div>
								<span
									style={{
										cursor: "pointer",
										fontSize: "16px"
									}}
									onClick={handleMenuCollapse}
								>
									{collapsedValue ? (
										<MenuUnfoldOutlined />
									) : (
										<MenuFoldOutlined />
									)}
								</span>
								<span
									style={{
										marginLeft: "16px",
										fontWeight: 500
									}}
								>
									{headerTitle(location.pathname)}
								</span>
							</div>
						</div>
					);
				}}
			>
				<Authorized authority={authorized.authority} noMatch={noMatch}>
					{children}
				</Authorized>
			</ProLayout>
			{/* <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      /> */}
		</>
	);
};

export default connect(({ global, settings, UserRole }) => ({
	collapsed: global.collapsed,
	settings,
	userRoles: UserRole.userRoles
}))(BasicLayout);
