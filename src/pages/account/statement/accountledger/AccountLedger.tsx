import React from 'react'
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';

const AccountLedger = () => {
  return (
    <div>AccountLedger</div>
  )
}

AccountLedger.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default AccountLedger;