//E:\docker_Logi\acc_react_front_cloud\src\pages\account\budget\mrp\Mrpdialog.tsx
import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Grid, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Page from 'ui-component/Page';
import Layout from 'layout';
import { handleMrpData } from '../../../logi/mrp/api/index'; // API import 수정

const MrpContainer = ({ registerMrp }) => {
  const theme = useTheme();
  const [mrpSimulatorList, setMrpSimulatorList] = useState([]); // 상태 추가

  const Columns = [
    {
      headerName: '주생산계획번호',
      field: 'mpsNo',
      width: 130,
      suppressSizeToFit: true,
      headerCheckboxSelection: false,
      headerCheckboxSelectionFilteredOnly: true,
      suppressRowClickSelection: true,
      checkboxSelection: true
    },
    { headerName: 'BOM번호', field: 'bomNo', width: 130 },
    { headerName: '품목구분', field: 'itemClassification', width: 100 },
    { headerName: '품목코드', field: 'itemCode' },
    { headerName: '품목명', field: 'itemName', width: 150 },
    { headerName: '발주/작업지시 기한', field: 'orderDate', width: 150 },
    { headerName: '발주/작업지시 완료기한', field: 'requiredDate', width: 170 },
    { headerName: '계획수량', field: 'planAmount', width: 100 },
    { headerName: '누적손실율', field: 'totalLossRate', width: 100 },
    { headerName: '계산수량', field: 'caculatedAmount', width: 100 },
    { headerName: '필요수량', field: 'requiredAmount', width: 100 },
    { headerName: '단위', field: 'unitOfMrp', width: 100 },
    { headerName: '원자재 단가', field: 'standardUnitPrice', width: 100 },
    { headerName: '총 가격', field: 'totalPrice', width: 100 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("호출했냐");
        const response = await handleMrpData(); // API 호출
        setMrpSimulatorList(response); // 상태 업데이트
        console.log("호출했다!!");
      } catch (error) {
        console.error('Error fetching MRP data:', error);
      }
    };
  
    fetchData();
  
    const intervalId = setInterval(fetchData, 10000); // 10초마다 데이터 요청
  
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  return (
    <Page title="MrpContainer">
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: '1vh', marginTop: '1vh' }}
            onClick={() => registerMrp('승인')} // "승인" 버튼 클릭 시 처리
          >
            승인
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: '1vh', marginTop: '1vh' }}
            onClick={() => registerMrp('반려')} // "반려" 버튼 클릭 시 처리
          >
            반려
          </Button>
        </Grid>
      </Grid>

      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .MuiDataGrid-root': {
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderColor: theme?.palette?.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnsContainer': {
              color: theme?.palette?.mode === 'dark' ? 'grey.600' : 'grey.900',
              borderColor: theme?.palette?.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnSeparator': {
              color: theme?.palette?.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            }
          }
        }}
      >
        <DataGrid
          rows={mrpSimulatorList || []} // 상태를 사용하여 DataGrid에 데이터 제공
          columns={Columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.bomNo}
        />
      </Box>
    </Page>
  );
};

MrpContainer.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// 기본 내보내기를 MrpContainer로 수정
export default MrpContainer;
