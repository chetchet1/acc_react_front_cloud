/* eslint-disable prettier/prettier */
import operateApi from './interceptor';

const FIXED_ASSET_URL = 'posting/assetList';
const FIXED_ASSET_LIST_URL = '/posting/findFixedAssetList';
const ADD_FIXED_ASSET_URL = '/posting/addFixedAsset';
const DEPRECIATION_LIST_URL = '/posting/getDepreciationList';
const SELECTED_DEPLIST_URL = '/posting/selectedDepreciationList';
const FIXED_ASSET_LEDGER_URL = '/posting/getFixedAssetLedgerList';

const ACCOUNTCODE_LIST_URL = '/operate/accountCodes';
const SELECTED_ACCCODE_URL = '/operate/accountCodes';
const CUSTOMER_CODE_URL = '/operate/customers';

const PLAN_URL = '/funds/dailyFundPlan';
const SELECT_ALL_NOTE_URL='/funds/bills';

const DAILY_TRADE_URL = '/funds/dailyTradeStatus';
const INOUT_EXPECTED_URL = '/funds/inoutExpectedPrice';
const FINANCE_URL = '/funds/financeStatus';
const GENERAL_FUND_URL = '/funds/generalFundStatus'

//자산유형 조회
export const getAssetList = async() => {
  try{
    return await operateApi.get(FIXED_ASSET_URL)
  }
  catch(error:any){
    console.log(error);
  }
};

//고정자산목록 조회
export const getFixedAssetList = async(params:any) => {
  try{
    return await operateApi.get(FIXED_ASSET_LIST_URL, {
      params:{
        accountCode: params.accountCode,
        accountName: params.accountName,
      }
    });
  }catch(error:any){
    console.log(error);
  }
};

//고정자산 추가
export const insertFixedAsset = async(body:any) => {
  try{
    return await operateApi.post(ADD_FIXED_ASSET_URL, body);
  
  }catch(error:any){
    console.log(error);
  }
};

//감가상각현황 전체조회
export const getDepreciationList = async() => {
  try{
    return await operateApi.get(DEPRECIATION_LIST_URL);
  }
  catch(error:any){
    console.log(error);
  }
};

//감가상각현황 조건조회
export const getSelectedDepList = async(params:any) => {
  try{
    return await operateApi.get(SELECTED_DEPLIST_URL, {
      params:{
        accountCode: params,
      }
    });
  }catch(error:any){
    console.log(error);
  }
};

//고정자산 관리대장
export const getFixedAssetLedgerList = async() => {
  try{
    return await operateApi.get(FIXED_ASSET_LEDGER_URL);
  }
  catch(error:any){
    console.log(error);
  }
};

//계정코드 전체조회
export const getAccountCodeList = async() => {
  try{
    return await operateApi.get(ACCOUNTCODE_LIST_URL);
  }
  catch(error:any){
    console.log(error);
  }
};

//계정코드 조건조회
export const getSelectedAccCode = async(params:any) => {
  try{
    return await operateApi.get(`${SELECTED_ACCCODE_URL}/${params.accountId}`, {
      params:{
        accountName: params.accountName,
      }
    });
  }
  catch(error:any){
    console.log(error);
  }
};

//거래처코드 전체조회
export const getCustomerCodeList = async() => {
  try{
    return await operateApi.get(CUSTOMER_CODE_URL);
  }
  catch(error:any){
    console.log(error);
  }
};

//일자별자금계획 추가
export const insertFundPlan = async(body:any) => {
  try{
    return await operateApi.post(PLAN_URL, body);
  
  }catch(error:any){
    console.log(error);
  }
};

//일자별자금계획 조회
export const getFundPlan = async(params:any) => {
   try{
     return await operateApi.get(PLAN_URL, {
       params:{
         startDate: params.startDate,
         endDate: params.endDate,
       }
     });
   }
   catch(error:any){
     console.log(error);
   }
 };

 //일자별자금 계획 수정
export const updateFundPlan = async(body:any) => {
  try{
    return await operateApi.put(PLAN_URL, body);
  
  }catch(error:any){
    console.log(error);
  }
};

 //일자별자금 계획 삭제
 export const deleteFundPlan = async(params:any) => {
  try{
    return await operateApi.delete(PLAN_URL, {
      params:{
        planNo: params,
      }
    });
  
  }catch(error:any){
    console.log(error);
  }
};

//어음명세서 조회
export const getAllNote = async(params:any) => {
   try{
     return await operateApi.get(SELECT_ALL_NOTE_URL, {
       params:{
         accountCode: params.accCode
     }});
   }
   catch(error:any){
     console.log(error);
   }
 };

 //일일거래증감현황 조회
export const getDailyTradeStatus = async(params:any) => {
  console.log("params??", params);
   try{
     return await operateApi.get(DAILY_TRADE_URL, {
       params:{
         date: params
     }});
   }
   catch(error:any){
     console.log(error);
   }
 };

//입출금예정액 조회
export const getExpectedPrice = async(params:any) => {
   try{
     return await operateApi.get(INOUT_EXPECTED_URL, {
       params:{
         date: params
     }});
   }
   catch(error:any){
     console.log(error);
   }
 };

//예적금현황 조회
export const getFinanceStatus = async(params:any) => {
  console.log("params??", params);
   try{
     return await operateApi.get(FINANCE_URL, {
       params:{
         date: params.date,
         accountName: params.accountName
     }});
   }
   catch(error:any){
     console.log(error);
   }
 };

 //총괄거래현황 조회
export const getGeneralFundStatus = async(params:any) => {
  console.log("params??", params);
   try{
     return await operateApi.get(GENERAL_FUND_URL, {
       params:{
        startDate: params.startDate,
        endDate: params.endDate,
     }});
   }
   catch(error:any){
     console.log(error);
   }
 };