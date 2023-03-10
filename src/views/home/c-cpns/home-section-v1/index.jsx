import PropTypes from "prop-types";
import React, { memo } from "react";

import { SectionV1Wrapper } from "./style";
import SectionHeader from "@/components/setion-header";
import SectionRoom from "@/components/section-room";

const SectionV1 = memo((props) => {
  const { info } = props;

  return (
    <SectionV1Wrapper>
      <SectionHeader title={info.title} subTitle={info.subtitle} />
      <SectionRoom roomlist={info.list} />
    </SectionV1Wrapper>
  );
});

SectionV1.propTypes = {
  info: PropTypes.object,
};

export default SectionV1;
