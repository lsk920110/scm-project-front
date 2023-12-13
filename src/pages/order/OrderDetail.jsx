import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import service from '../../utils/requestAxios';
const style = {
  marginY: "10px",
};
export default function OrderDetail({changeTitle}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [vendorList, setVendorList] = useState([]);
  const [vendorId, setVendorId] = useState(0);
  const [productCord, setProductCord] = useState([]);
  const [salesNo, setSalesNo] = useState("");
  const [deliveryReqDt, setDeliveryReqDt] = useState("");
  const [customerName, setCustomerName] = useState("이승규");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("01079076010");
  const [customerAddressFirst, setCustomerAddressFirst] = useState("서울");
  const [customerAddressSecond, setCustomerAddressSecond] = useState("영등포구");
  const [customerAddressThird, setCustomerAddressThird] = useState("대방역");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("아파트");
  const [remarks, setRemarks] = useState("비고사항입니다");
  const [cordList, setCordList] = useState([]);
  const [cord, setCord] = useState("");
  useEffect(() => {
    changeTitle();
    service
      .get(`/api/vendor/list`, {
        params: { reqIndex: 1, reqCount: 10, keyword: "" },
      })
      .then((res) => {
        setVendorList(res.data.result);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleVendorId = (e) => setVendorId(e.target.value);
  const handleSalesNo = (e) => setSalesNo(e.target.value);
  const handleDeliveryReqDt = (e) => setDeliveryReqDt(e.target.value);
  const handleCustomerName = (e) => setCustomerName(e.target.value);
  const handleCustomerPhoneNumber = (e) =>
    setCustomerPhoneNumber(e.target.value);
  const handleCustomerAddressFirst = (e) =>
    setCustomerAddressFirst(e.target.value);
  const handleCustomerAddressSecond = (e) =>
    setCustomerAddressSecond(e.target.value);
  const handleCustomerAddressThird = (e) =>
    setCustomerAddressThird(e.target.value);
  const handleCustomerAddressDetail = (e) =>
    setCustomerAddressDetail(e.target.value);
  const handleRemarks = (e) => setRemarks(e.target.value);
  return (
    <div>OrderDetail</div>
  )
}
