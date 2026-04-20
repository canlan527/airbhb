import styled from "styled-components";
import coverImg from '@/assets/img/home/cover_01.jpeg'; // 引入图片

export const BannerWrapper = styled.div`
  height: 529px; // 设置高度
  background: url(${coverImg}) center/cover; // 设置背景
`;