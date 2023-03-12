import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import IconLogo from '@/assets/svg/icon_logo'
import TextLogo from '@/assets/img/home/logo-text.jpeg'
import { LeftWrapper } from './styled'

const HeaderLeft = memo(() => {

  const navigate = useNavigate()
  function handleClick() {
    navigate('/')
  }

  return (
    <LeftWrapper>
      <div className="logo" onClick={handleClick}>
        <IconLogo />
      </div>
      <div className="text-logo">
        <img className="text-logo-img" src={TextLogo} />
      </div>
    </LeftWrapper>
  )
})

export default HeaderLeft