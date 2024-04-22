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

// 부모 칼럼
export const IncomeStatementGroupColumns = [
  {
    headerName: " ", groupId: 'account', width: 100,
    children: [{ field: "accountName" }],
  },
  {
    headerName: '당기', groupId: 'income',
    children: [{ field: 'balanceDetail', }, { field: 'balanceDetailSummary', }]
  },
  {
    headerName: '전기', groupId: 'earlyIncome',
    children: [{ field: 'preBalanceDetail' }, { field: 'preBalanceDetailSummary' }]
  }
];

// 자식 칼럼
export const IncomeStatementColumns: any = [
  {
    headerName: '과목', field: 'accountName',
    width: 300
  },
  {
    headerName: '세부금액',
    field: 'balanceDetail',
    colId: '당기',
    width: 200,
    //valueFormatter: Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"
  },
  {
    headerName: '합계금액',
    field: 'balanceDetailSummary',
    colId: '당기',
    width: 200,
    //valueFormatter: Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"
  },
  {
    headerName: '세부금액',
    field: 'preBalanceDetail',
    colId: '전기',
    width: 200,
    //valueFormatter: Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"
  },
  {
    headerName: '합계금액',
    field: 'preBalanceDetailSummary',
    colId: '전기',
    width: 200,
    //valueFormatter: Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"
  }
];