import PropTypes from "prop-types";
import React, { memo } from "react";
import {useNavigate} from 'react-router-dom'
import { BottomWrapper } from "./style";
import IconArrowFront from "@/assets/svg/icon-arrow-front";
const SectionBottom = memo((props) => {
  const { text } = props;

  let showMessage = '显示全部'
  if(text) {
    showMessage = `显示更多${text}房源`
  }

  const navigate = useNavigate()
  function handleClick() {
    navigate('/entire')
  }

  return (
    <BottomWrapper color={text? '#00848A' : '#333'} onClick={handleClick}>
      <span className="text">{showMessage}</span>
      <span className="icon">
        <IconArrowFront />
      </span>
    </BottomWrapper>
  );
});

SectionBottom.propTypes = {
  text: PropTypes.string,
};

export default SectionBottom;
