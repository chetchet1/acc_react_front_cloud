/* eslint-disable prettier/prettier */
const currencyFormatter:any = (params:any) => {
    return formatNumber(params.value) + ' 원';
    
};
const formatNumber:any = (number:any) => {
    return Math.floor(number)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const columns:any = [
    {
        headerName: '회계 기수'
        ,field: 'accountPeriodNo'
        ,width: 80
    },
    {
        headerName: '회계 시작일'
        ,field: 'periodStartDate'
        ,width: 150
    },
    { 
        headerName: '회계 종료일'
        ,field: 'periodEndDate'
        ,width: 150 
    }
]

export const  columnDefs:any = [
    {
        headerName: '회계 년도'
        ,field: 'accountPeriodNo'
        ,width: 120
    },
    {
        headerName: '세부 항목'
        ,field: 'accountName'
        ,width: 120
    },
    {   
        headerName: ' 자본금 '
        ,field: 'capitalStock'
        ,valueFormatter: currencyFormatter
        ,width: 120
    },
    {
        headerName: '자본 잉여금'
        ,field: 'capitalSurplus'
        ,valueFormatter: currencyFormatter
        ,width: 120
    },
    {
        headerName: '이익 잉여금'
        ,field: 'retainedEarnings'
        ,valueFormatter: currencyFormatter
        ,width: 120
    },
    {
        headerName: '기타 자본항목'
        ,field: 'etcCapital'
        ,valueFormatter: currencyFormatter
        ,width: 120
    },
    {
        headerName: '기타포괄수익'
        ,field: 'otherAccumulative'
        ,valueFormatter: currencyFormatter
        ,width: 120
    },
    {
        headerName: '자본 총계'
        ,field: 'totalStockholdersEquity'
        ,valueFormatter: currencyFormatter
        ,width: 120
    }
    ];