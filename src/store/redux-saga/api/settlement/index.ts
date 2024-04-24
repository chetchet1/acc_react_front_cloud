/* eslint-disable prettier/prettier */
// redux-saga/api/operate/index.ts 참고하여 작성함

import settlementApi from './interceptor';

const PERIOD_NO_LIST_DATA_URL = '/settlement/periodNoList'; // 회계기수(날짜) 가져오는 거 (account어쩌구에서 수정함)
const ToTal_Trial_Balance_LIST_URL='/settlement/searchTotalTrialBalance' // 선택한 회계기수에 해당하는 데이터 가져오는 거
const Financial_Position_LIST_URL= '/settlement/financialposition'



export const getAccountPeriodNo = async() => {
    try{
        return await settlementApi.get(PERIOD_NO_LIST_DATA_URL)
    } catch(error:any){
        console.log(error);
    }
};

export const getTotalTrialBalance = async(params:any) => {
    try{
        console.warn("----- api 요청 중 -----")
        console.log("----- params -----", params)
        return await settlementApi.get(ToTal_Trial_Balance_LIST_URL, {
            params:{
                accountPeriodNo: params.periodNoList,
            }
        });
    }catch(error:any){
        console.log(error);
    }
}

export const getFinancialPosition = async(params:any) => {
    try{
        console.log("----- parms -----", params);
        console.log("----- params.accountPeriodNo -----", params.accountPeriodNo);
        console.log("----- parms.callResult -----", params.callResult );
        return await settlementApi.get(Financial_Position_LIST_URL, {
            params:{
                accountPeriodNo: params.accountPeriodNo,
                callResult: params.callResult
            }
        });
    }catch(error:any){
        console.log(error);
    }
}