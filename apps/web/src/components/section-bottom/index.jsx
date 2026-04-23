import PropTypes from "prop-types";
import React, { memo } from "react";
import {useNavigate} from 'react-router-dom'
import IconArrowFront from "@/assets/svg/icon-arrow-front";
import "./style.scss";

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
    <div className={`section-bottom ${text ? 'section-bottom--accent' : 'section-bottom--default'}`} onClick={handleClick}>
      <span className="text">{showMessage}</span>
      <span className="icon">
        <IconArrowFront />
      </span>
    </div>
  );
});

SectionBottom.propTypes = {
  text: PropTypes.string,
};

export default SectionBottom;
