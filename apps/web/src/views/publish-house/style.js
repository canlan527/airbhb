import styled from 'styled-components'

export const PublishHouseWrapper = styled.div`
  width: 900px;
  max-width: calc(100vw - 48px);
  margin: 120px auto 48px;

  .publish-card {
    border-radius: 8px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`
