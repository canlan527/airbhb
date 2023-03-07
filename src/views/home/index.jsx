import React, { memo } from 'react'
import Banner from './c-cpns/banner';
import {HomeWrapper} from './style';

const Home = memo(() => {
  return (
    <HomeWrapper>
      <Banner />
    </HomeWrapper>
  )
})

export default Home