import budgetApi from "./interceptor";
import { useDispatch } from "react-redux";



const PERIOD_LIST_URL = "settlement/periodNoList"
const WORK_COMPANY_LIST_URL = "operate/deptlist"
const DEPR_DETAIL_CODE = "operate/detaildeptlist"
const PARENT_ACCOUNT_LIST = "operate/parentaccountlist"
const DETAIL_ACCOUNT_LIST = "operate/detailaccountlist"
const INSERT_BUDGET_ACCOUNT = "budget/budgetlist"
const SEARCH_BUDGET_ACCOUNT_LIST = "budget/budget"


// 회계연도 API 연결
export const getPeriodList = async() => {
    try{

        return await budgetApi.get(PERIOD_LIST_URL)

    }catch(error:any){

    }
}

// 사업장명 API 연결
export const getWorkCompnayList = async() => {
    try{
        return await budgetApi.get(WORK_COMPANY_LIST_URL)
    }catch(error:any){
        
    }
}

// 부서명 API 연결
export const getDetailDeptList = async(params : any)=>{
    console.log(params,"이것은 파람스요")
    try{
        return await budgetApi.get(DEPR_DETAIL_CODE,{params})
    }catch(error: any){
        console.log(error)
    }
}   

//계정과목선택 API 연결

export const getParentAccountList = async()=>{
    try{
        return await budgetApi.get(PARENT_ACCOUNT_LIST)
    }catch(error){
        console.log(error)
    }
}

//상세계정과목선택 API 연결 code는 뒷단에서 받을 @RequestParam으로 code로 지정해서 String으로 받아 넘겨주는 거임.
export const getDetailAccountList = async(params : any)=>{
    try{
        return await budgetApi.get(DETAIL_ACCOUNT_LIST,{params: {code: params.accountInnerCode}})
    }catch(error){
        console.log(error)
    }
}

//예산신청등록 get 아님 post
export const insertBudgetAccount = async(params : any)=>{
    console.log("파람스",params)
    try{
        return await budgetApi.post(INSERT_BUDGET_ACCOUNT,params)
    }catch(error){
        console.log(error)
    }
}

export const searchBudgetList = async(params : any)=>{
    console.log("파람스",params)
    try{
        return await budgetApi.get(SEARCH_BUDGET_ACCOUNT_LIST,{params})
    }catch(error){
        console.log(error)
    }
}



// export const getDetailDeptList(params : any){ //param에는 workplackCode와, workplackName이 들어가있음.
//     console.log(params,"파람스")
//     return async () => {
//         try{
//             return await budgetApi.get(DEPR_DETAIL_CODE,{
//                 params : {
//                     workplaceCode : params.workPlaceCode,
//                     workplaceName : params.workplaceName,
//                 }
//             })
            
//         }catch(error: any){
//             console.log(error)
//         }
//     }
// }
