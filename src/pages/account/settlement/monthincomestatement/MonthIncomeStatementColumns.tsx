const currencyFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  });

  const wonPrice = {
    type: 'number',
    valueFormatter: (params: any) => {
      if (params.value === null || isNaN(params.value)) {
        return ''; // Handle null or NaN values gracefully
      }
      return currencyFormatter.format(params.value);
    }
  };

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

export const MonthIncomeStatementColumns = [
    {
      headerName: '연도',
      field: 'year',
      hide: true,
      width: '150'
    },
    {
      headerName: '월',
      field: 'month',
      sortable: true, //컬럼눌러서 정렬가능하게하기
      cellClass: 'grid-cell-centered',
      width: 50
    },
    {
      headerName: '매출액',
      field: 'salesSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '매출원가',
      field: 'salesCostSummary',
      background: 'red',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '매출총액',
      field: 'grossMargin',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '판관비',
      field: 'salesManageCostSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '영업이익',
      field: 'operatingProfit',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '영업외수익',
      field: 'nonOperatingProfitSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '영업외비용',
      field: 'nonOperatingCostSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '법인세차감전이익',
      field: 'ordinaryProfit',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '법인세',
      field: 'corporateTaxSummary',
      ...wonPrice,
      width: 150
    },
    {
      headerName: '당기순이익',
      field: 'netIncome',
      ...wonPrice,
      width: 150
    }
  ];
