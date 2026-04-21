import styled from 'styled-components'

export const AdminWrapper = styled.div`
  width: 1180px;
  max-width: calc(100vw - 48px);
  margin: 120px auto 48px;

  .admin-head {
    margin-bottom: 24px;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 8px;
  }

  p {
    color: #717171;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 20px;
  }

  .admin-card {
    border-radius: 8px;
  }

  .toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
`
