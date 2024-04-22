import React from 'react';
import DetailTrialBalanceGrid from './DetailTrialBalanceGrid';
import DetailTrialBalanceMenu from './DetailtrialBalanceMenu';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Layout from 'layout';
const DetailTrialBalance = () => {
  return (
    <>
      <DetailTrialBalanceMenu />
      <DetailTrialBalanceGrid />
    </>
  );
};

DetailTrialBalance.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DetailTrialBalance;
