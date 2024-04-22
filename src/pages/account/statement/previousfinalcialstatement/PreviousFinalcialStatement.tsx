import React from 'react'
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';

const PreviousFinalcialStatement = () => {
  return (
    <div>PreviousFinalcialStatement</div>
  )
}

PreviousFinalcialStatement.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default PreviousFinalcialStatement;