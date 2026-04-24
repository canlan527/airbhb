import React, { memo, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeHomeHeaderAction } from "@/store/modules/main";
import { changeDetailInfoAction } from "@/store/modules/detail";
import { getHouseDetail } from "@/services";
import DetailPicture from "./c-cpns/detail-pictures";
import DetailInfo from "./c-cpns/detail-info";
import { useScrollTop } from "@/hooks";
import "./style.scss";

function toLegacyDetail(house) {
  if (!house) return null;
  if (house.picture_url || house.picture_urls) return house;

  const verifyMessages = house.tags?.length
    ? house.tags
    : house.verifyMessage
      ? house.verifyMessage.split("·").map((item) => item.trim()).filter(Boolean)
      : ["整套房源"];

  return {
    ...house,
    _id: house.id,
    id: house.legacyId || house.id,
    picture_url: house.coverUrl,
    picture_urls: house.imageUrls?.length ? house.imageUrls : [house.coverUrl].filter(Boolean),
    verify_info: {
      messages: verifyMessages,
      text_color: "#767676",
    },
    name: house.title,
    price_format: `￥${house.price}`,
    star_rating: house.rating ?? 5,
    star_rating_color: "#FF5A5F",
    reviews_count: house.reviewsCount ?? 0,
    reviews: house.reviews || [],
    bottom_info: null,
  };
}

function DetailSkeleton() {
  return (
    <div className="detail-skeleton">
      <div className="picture-shell">
        <div className="hero skeleton-block"></div>
        <div className="thumb-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="thumb skeleton-block" key={index}></div>
          ))}
        </div>
      </div>
      <div className="info-shell">
        <div className="main">
          <div className="title skeleton-block"></div>
          <div className="tag-row">
            <div className="tag skeleton-block"></div>
            <div className="tag skeleton-block"></div>
          </div>
          <div className="section skeleton-block"></div>
          <div className="section skeleton-block"></div>
          <div className="section skeleton-block"></div>
        </div>
        <div className="side">
          <div className="price skeleton-block"></div>
          <div className="field skeleton-block"></div>
          <div className="field skeleton-block"></div>
          <div className="button skeleton-block"></div>
        </div>
      </div>
    </div>
  );
}

const Detail = memo(() => {
  const dispatch = useDispatch(); // 获取dipatch
  const { id = "" } = useParams();
  const { detailInfo } = useSelector(
    (state) => ({
      detailInfo: state.detail.detailInfo,
    }),
    shallowEqual
  );
  const [isLoading, setIsLoading] = useState(true);
  const matchedCurrentDetail = useMemo(() => {
    if (!detailInfo || !id) return false;
    return [detailInfo.id, detailInfo.legacyId, detailInfo._id].some(
      (value) => value && String(value) === String(id)
    );
  }, [detailInfo, id]);

  useScrollTop();
  // 派发修改header动画的action
  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: false, alpha: false }));
  }, [dispatch]);

  useEffect(() => {
    let cancelled = false;

    if (matchedCurrentDetail) {
      setIsLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setIsLoading(true);
    getHouseDetail(id)
      .then((house) => {
        if (cancelled) return;
        dispatch(changeDetailInfoAction(toLegacyDetail(house)));
      })
      .catch(() => {
        if (cancelled) return;
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch, id, matchedCurrentDetail]);

  return (
    <div className="detail-page">
      {isLoading || !detailInfo ? (
        <DetailSkeleton />
      ) : (
        <>
          <DetailPicture />
          <DetailInfo />
        </>
      )}
    </div>
  );
});

export default Detail;
