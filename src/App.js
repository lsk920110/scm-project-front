import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import CategoryDetail from "./pages/category/CategoryDetail";
import CategoryManagement from "./pages/category/CategoryManagement";
import CategoryRegistration from "./pages/category/CategoryRegistration";
import DeliveryList from './pages/delivery/DeliveryList';
import DeliveryManagement from "./pages/delivery/DeliveryManagement";
import TcList from './pages/delivery/TcList';
import DeliveryStaffList from './pages/deliveryStaff/DeliveryStaffList';
import TodayDelivery from "./pages/deliveryStaff/TodayDelivery";
import TodayDeliveryDetail from "./pages/deliveryStaff/TodayDeliveryDetail";
import IncomeManagement from "./pages/income/IncomeManagement";
import LoginPage from "./pages/login/LoginPage";
import MemberDetail from "./pages/member/MemberDetail";
import MemberManagement from "./pages/member/MemberManagement";
import MemberRegistration from "./pages/member/MemberRegistration";
import MenuManagement from "./pages/menu/MenuManagement";
import MenuRegistration from './pages/menu/MenuRegistration';
import ModelDetail from "./pages/model/ModelDetail";
import ModelManagement from "./pages/model/ModelManagement";
import ModelRegistration from "./pages/model/ModelRegistration";
import OrderDetail from "./pages/order/OrderDetail";
import OrderManagement from "./pages/order/OrderManagement";
import OrderRegistration from "./pages/order/OrderRegistration";
import ProductCordDetail from "./pages/productCord/ProductCordDetail";
import ProductCordManagement from "./pages/productCord/ProductCordManagement";
import ProductCordRegistration from "./pages/productCord/ProductCordRegistration";
import VendorDetail from "./pages/verdor/VendorDetail";
import VendorManagement from "./pages/verdor/VendorManagement";
import VendorRegistration from "./pages/verdor/VendorRegistration";
import TcDetail from "./pages/delivery/TcDetail";
export default function App() {
  const [nowSection,setNowSetcion] = useState('');

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage nowSection={nowSection} setNowSection={setNowSetcion}/>} />
        <Route path="/" element={<Layout nowSection={nowSection} setNowSection={setNowSetcion} />} >
          {routing.map((item,idx)=>{
            return (
              <Route  path={item.path} element={<item.element title={item.title} changeTitle={()=>{setNowSetcion(item.title)}}/>}/>
            );
          })}
          <Route path="delivery/management" element={<DeliveryManagement title='배송' changeTitle={()=>setNowSetcion('배송관리')}/>}>
            <Route path="delivery/list" element={<DeliveryList/>}/>
            <Route path="tc/list" element={<TcList/>}/>
            <Route path="tc/detail" element={<TcDetail/>}/>
            {/* <Route path="staff/list" element={<DeliveryStaffList/>}/> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}


const routing = [
  {path : 'menu/management' , element : MenuManagement , title : '메뉴관리' ,},
  {path : 'menu/registration' , element : MenuRegistration , title : '메뉴등록'},
  {path : 'vendor/management' , element : VendorManagement , title : '거래선관리',},
  {path : 'vendor/registration' , element : VendorRegistration , title : '거래선등록'},
  {path : 'vendor/detail' , element : VendorDetail , title : '거래선 상세조회'},
  {path : 'member/management' , element : MemberManagement , title : '회원관리'},
  {path : 'member/registration' , element : MemberRegistration , title : '회원등록'},
  {path : 'member/detail' , element : MemberDetail , title : '회원 상세조회'},
  {path : 'category/management' , element : CategoryManagement , title : '카테고리 관리'},
  {path : 'category/registration' , element : CategoryRegistration , title : '카테고리 등록'},
  {path : 'category/detail' , element : CategoryDetail , title : '카테고리 상세조회'},
  {path : 'model/management' , element : ModelManagement , title : '모델관리'},
  {path : 'model/registration' , element : ModelRegistration , title : '모델등록'},
  {path : 'model/detail' , element : ModelDetail , title : '모델 상세조회'},
  {path : 'cord/management' , element : ProductCordManagement , title : '상품코드 관리'},
  {path : 'cord/registration' , element : ProductCordRegistration , title : '상품코드 등록'},
  {path : 'cord/detail' , element : ProductCordDetail , title : '상품코드 상세조회'},
  {path : 'order/registration' , element : OrderRegistration , title : '발주등록'},
  {path : 'order/management' , element : OrderManagement , title : '주문관리'},
  {path : 'order/detail' , element : OrderDetail , title : '주문 상세조회'},
  {path : 'delivery/management' , element : DeliveryManagement , title : '배송조회'},
  {path : 'delivery/staff/management' , element : DeliveryStaffList , title : '배송기사'},
  {path : 'delivery/staff/delivery/list' , element : TodayDelivery , title : '오늘의배송'},
  {path : 'delivery/staff/delivery/detail' , element : TodayDeliveryDetail , title : '배송상세'},
  {path : 'income/management' , element : IncomeManagement , title : '매출조회'},
  
]