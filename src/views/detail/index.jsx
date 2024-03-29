import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHomeHeaderAction } from "@/store/modules/main";
import DetailPicture from "./c-cpns/detail-pictures";
import DetailInfo from "./c-cpns/detail-info";
import { DetailWrapper } from "./style";
import { useScrollTop } from "@/hooks";
const Detail = memo(() => {

  const dispatch = useDispatch();
  useScrollTop();
  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: false, alpha: false }));
    
  }, [dispatch]);

  return (
    <DetailWrapper>
      <DetailPicture />
      <DetailInfo />
    </DetailWrapper>
  );
});

export default Detail;
