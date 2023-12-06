import {
  Category,
  Group,
  Handshake,
  Inventory,
  Kitchen,
  ListAlt,
  LocalShipping,
  PointOfSale,
  Toc,
} from "@mui/icons-material";

export const menuList = [
  { id: 1, path: "member/management", title: "직원관리", icon: <Group /> },
  {
    id: 2,
    path: "vendor/management",
    title: "거래선관리",
    icon: <Handshake />,
  },
  {
    id: 3,
    path: "category/management",
    title: "카테고리관리",
    icon: <Category />,
  },
  { id: 4, path: "model/management", title: "모델관리", icon: <Kitchen /> },
  {
    path: "cord/management",
    title: "상품코드관리",
    icon: <Inventory />,
  },
  { id: 5, path: "order/registration", title: "발주등록", icon: <ListAlt /> },
  { id: 6, path: "order/management", title: "주문관리", icon: <Toc /> },
  { id: 7, path: "sales/management", title: "매출관리", icon: <PointOfSale /> },
  {
    id: 8,
    path: "shipping/management",
    title: "배송조회",
    icon: <LocalShipping />,
  },
  
];
