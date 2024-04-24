/* eslint-disable prettier/prettier */
// 날짜 모달 컬럼
export const yearColumns = [
    {
      headerName: '회계 기수',
      field: 'accountPeriodNo',
      width: 250
    },
    {
      headerName: '회계 시작일',
      field: 'periodStartDate',
      width: 250
    },
    { headerName: '회계 종료일', field: 'periodEndDate', width: 250 }
  ];

  // 부모 손익 칼럼
 export const IncomeStatementGroupColumns = [
    {
      headerName: " ", groupId: 'account', width: 100,
      children: [{ field: "accountName" }],
    },
    {
      headerName: '당기', groupId: 'thisYear',
      children: [{ field: 'income', }, { field: 'incomeSummary', }]
    },
    {
      headerName: '전기', groupId: 'lastYear',
      children: [{ field: 'earlyIncome' }, { field: 'earlyIncomeSummary' }]
    }
  ];

  // 자식 손익 컬럼
  export const IncomeStatementColumns: any = [
    {
      headerName: '과목', field: 'accountName',
      width: 300
    },
    {
      headerName: '금액',
      field: 'income',
      colId: '당기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    },
    {
      headerName: '잔액',
      field: 'incomeSummary',
      colId: '당기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    },
    {
      headerName: '금액',
      field: 'earlyIncome',
      colId: '전기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    },
    {
      headerName: '잔액',
      field: 'earlyIncomeSummary',
      colId: '전기',
      width: 200,
      // valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
    }
  ];