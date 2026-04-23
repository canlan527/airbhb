import PropTypes from "prop-types";
import React, { memo } from "react";
import SectionHeader from "@/components/section-header";
import SectionRoom from "@/components/section-room";
import SectionBottom from "@/components/section-bottom";
import "./style.scss";

const SectionV1 = memo((props) => {
  const { info } = props;

  return (
    <div className="home-section-v1">
      <SectionHeader title={info.title} subTitle={info.subtitle} />
      <SectionRoom roomlist={info.list} itemWidth='25%' />
      <SectionBottom />
    </div>
  );
});

SectionV1.propTypes = {
  info: PropTypes.object,
};

export default SectionV1;
