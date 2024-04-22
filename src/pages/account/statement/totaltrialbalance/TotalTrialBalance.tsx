/* eslint-disable prettier/prettier */
import React from 'react';
import TotalTrialBalanceMenu from './TotalTrialBalanceMenu';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';


const TotalTrialBalance = () => {

    return (
        <>
            <TotalTrialBalanceMenu/>
        </>
    );
};

TotalTrialBalance.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default TotalTrialBalance;
