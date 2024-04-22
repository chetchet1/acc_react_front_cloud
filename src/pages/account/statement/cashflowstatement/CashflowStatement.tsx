import React from 'react'
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';

const CashflowStatement = () => {
  return (
    <div>CashflowStatement</div>
  )
}

CashflowStatement.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default CashflowStatement;