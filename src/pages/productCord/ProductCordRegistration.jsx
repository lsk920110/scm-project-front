import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  Hidden,
  Input,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import service from "../../utils/requestAxios";
import { useNavigate } from "react-router-dom";

export default function ProductCordRegistration({ changeTitle }) {
  const [vendorList, setVendorList] = useState([]);
  const [vendorId, setVendorId] = useState(0);
  const [productCord, setProductCord] = useState("");
  const handleProductCord = (e) => setProductCord(e.target.value);
  const navigate = useNavigate();
  useEffect(() => {
    changeTitle();
    service
      .get("/api/vendor/list", {
        params: { reqIndex: 1, reqCount: 100, keyword: "keyword" },
      })
      .then((res) => {
        setVendorList(res.data.result);
        setVendorId(res.data.result[0].id);
      });
  }, []);
  const handleVendorId = (e) => setVendorId(e.target.value);

  const [list, setList] = useState([]);
  const addForm = () => {
    const temp = list;
    let lastIndex = list.length === 0 ? 0 : list[list.length - 1] + 1;
    setList([...temp, lastIndex]);
  };
  return (
    <>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <Button
          variant="contained"
          onClick={() => {
            // console.log(list);
            let cordDetails = [];
            const a = document.querySelectorAll(".cord-row.use");

            console.log(a);
            for (let index = 0; index < a.length; index++) {
              const data = {
                // vendorId: vendorId,
                // productCord: productCord,
                supplyPrice: a[index].querySelector(".supplyPrice input").value,
                supplyPriceVat: a[index].querySelector(".supplyPriceVat input")
                  .value,
                memo: a[index].querySelector(".memo input").value,
                modelCordId: a[index].querySelector(".modelCord-id").value,
                quantity: a[index].querySelector(".quantity input").value,
              };
              if(data.productCord === ''){
                alert('상품코드를 입력해주세요')
                return;
              }
              if(data.supplyPrice <= 0 || data.supplyPriceVat <= 0){
                alert('금액은 양수만 가능합니다')
                return;
              }
              if(data.modelCordId === 0 || 
                data.modelCordId === undefined || 
                data.modelCordId === '' || 
                data.modelCordId === undefined ||
                data.modelCordId === "0"
                ){
                alert('모델코드를 입력해주세요');
                return;
              }


              cordDetails.push(data);
            }
            console.log(cordDetails);
            const data = {
              vendorId : vendorId,
              productCord : productCord,
              cordDetails : cordDetails
            }

            service
              .post("/api/product/cord", data)
              .then((res) => {
                console.log(res.data);
                const { errorCode, errorMessage } = res.data;
                if (errorCode === "0000") {
                  alert("등록이 성공되었습니다.");
                  navigate("/cord/management");
                } else {
                  alert("등록 실패했습니다.");
                }
              })
              .catch((err) => console.error(err));
            console.log(data)
          }}
        >
          등록
        </Button>
      </Box>
      <Box>
        <Box>
          <Select
            value={vendorId}
            onChange={handleVendorId}
            placeholder="거래선"
            sx={{ marginY: "15px", width: "50%" }}
          >
            {vendorList.map((item, idx) => {
              return <MenuItem value={item.id}>{item.vendorName}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box>
          <TextField
            placeholder="상품코드"
            sx={{ marginY: "15px", width: "50%" }}
            value={productCord}
            onChange={handleProductCord}
          />
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>모델코드</TableCell>
            <TableCell sx={{ textAlign: "center" }}>수량</TableCell>
            <TableCell sx={{ textAlign: "center" }}>공급가</TableCell>
            <TableCell sx={{ textAlign: "center" }}>부가세</TableCell>
            <TableCell sx={{ textAlign: "center" }}>합계</TableCell>
            <TableCell sx={{ textAlign: "center" }}>비고</TableCell>
            <TableCell sx={{ textAlign: "center" }}>삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, idx) => {
            console.log(item);
            return (
              <ProductCordInput
                key={idx}
                item={item}
                list={list}
                setList={setList}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <Button variant="contained" onClick={addForm}>
            추가
          </Button>
        </TableFooter>
      </Table>
    </>
  );
}

function ProductCordInput({ item, list, setList }) {
  const deleteThisForm = () => {
    // console.log(item)
    // const temp = list.filter((item2,idx )=> item2 !== item )
    // console.log(temp)
    // setList(temp)
    setHidden(true);
  };
  const [searchCordList , setSearchCordList] = useState([])
  const [modalShow,setModalShow] = useState(false)
  const handleModalOpen =()=>setModalShow(true) 
  const handleModalClose =()=>setModalShow(false)
  const [hidden, setHidden] = useState(false);
  const [modelCordId, setModelCordId] = useState(0);
  const [modelCord, setModelCord] = useState("");
  const handleModelCord = (e) => {
    setModelCord(e.target.value);
  };
  const [supplyPrice, setSupplyPrice] = useState(0);
  const handleSupplyPrice = (e) => {
    setSupplyPrice(e.target.value);
    setSupplyPriceVat(Math.ceil(e.target.value / 10));
  };
  const [supplyPriceVat, setSupplyPriceVat] = useState(0);

  const [modelCordValidate, setModelCordValidate] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (e) => setQuantity(e.target.value);

  const findModelName = (e) => {
    if (e.keyCode === 13) {
      service
        .get("/api/model/isExist", { params: { modelCord: modelCord } })
        .then((res) => {
          console.log(res);
          if (res.data.errorCode === "0000") {
            alert("존재하는 모델명입니다.");
            // setModelCordValidate(true);
            // setModelCordId(res.data.result.id);
            setSearchCordList(res.data.result)
            handleModalOpen()
          } else if (res.data.errorCode === "0501") {
            alert("존재하지 않는 모델명입니다.");
            // setModelCordValidate(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };


  return (
    <>
      <Modal open={modalShow} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >{
            searchCordList.map((item,idx)=>{
                return (
                    <ListItemButton
                    onClick={()=>{
                        setModelCordId(item.id)
                        setModelCord(item.modelCord)
                        setModelCordValidate(true);
                        handleModalClose()

                    }}>{item.modelCord}</ListItemButton>

                );
            })
        }
            
        </Box>
      </Modal>
      <TableRow
        className={"cord-row" + " " + `${hidden ? "unuse" : "use"}`}
        sx={{ display: `${hidden ? "none" : ""}` }}
      >
        <TableCell>
          <TextField
            className="modelCord"
            fullWidth
            value={modelCord}
            onChange={handleModelCord}
            onKeyUp={findModelName}
            disabled={modelCordValidate}
          />
          <input
            className="modelCord-validate"
            value={modelCordValidate}
            type="hidden"
          />
          <input className="modelCord-id" value={modelCordId} type="hidden" />
        </TableCell>
        <TableCell>
          <TextField
            className="quantity"
            fullWidth
            type="number"
            value={quantity}
            onChange={handleQuantity}
            onAuxClick={handleQuantity}
          />
        </TableCell>

        <TableCell>
          <TextField
            className="supplyPrice"
            fullWidth
            type="number"
            value={supplyPrice}
            onAuxClick={handleSupplyPrice}
            onChange={handleSupplyPrice}
          />
        </TableCell>
        <TableCell>
          <TextField
            className="supplyPriceVat"
            fullWidth
            type="number"
            value={supplyPriceVat}
            // onChange={handleSupplyPriceVat}
          />
        </TableCell>
        <TableCell>
          <TextField
            fullWidth
            type="number"
            value={parseInt(supplyPrice) + parseInt(supplyPriceVat)}
          />
        </TableCell>
        <TableCell>
          <TextField className="memo" fullWidth type="text" />
        </TableCell>
        <TableCell>
          <Button variant="outlined" color="error" onClick={deleteThisForm}>
            삭제
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
