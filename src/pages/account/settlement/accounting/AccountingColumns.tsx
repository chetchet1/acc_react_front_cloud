// 값의 공백을 지우지 않고 모두 표출(계층 표시)
function preserveWhitespace(params: any) {
    const text = params.value.replace(/ /g, '\u00A0');
    return text;
  }

export const columns = [
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

export const accountDetailcolums = [
    { field: 'accountName', headerName: '과목', width: 200, valueFormatter: preserveWhitespace }, // 값의 공백을 지우지 않고 모두 표출(계층 표시) cellStyle: { textAlign:'left', whiteSpace: 'pre' } -> 는 일반 TableCell 에서 적용 가능
    { field: 'income', headerName: '당기 금액', width: 170, editable:true },
    { field: 'incomeSummary', headerName: '당기 잔액', width: 170,editable:true },
    { field: 'earlyIncome', headerName: '전기 금액', width: 170,editable:true },
    { field: 'earlyIncomeSummary', headerName: '전기 잔액', width: 170,editable:true }
  ];
