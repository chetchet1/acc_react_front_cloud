import React from 'react'
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import CapitalStatementMenu from './CapitalStatementMenu';

const CapitalStatement = () => {
  return (
    <>
    <CapitalStatementMenu/>
    </>
  )
}

CapitalStatement.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default CapitalStatement;