import React from 'react';
import Link from 'Link';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Tab, Tabs, Typography } from '@mui/material';

// assets
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { TabsProps } from 'types';

import DailyFundPlanInput from './DailyFundPlanInput';
import DailyFundPlanDetail from './DailyFundPlanDetail';

// tab content customize
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}
          style={{
            marginTop: '-30px',
            marginLeft: '-25px'
          }}>
        {value === index && (
          <Box
            sx={{
              p: 3
            }}
          >
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

const FundPlanInputTab = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  return (
    <div>
      <>
        <Tabs
            value={value}
            variant="scrollable"
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
            mb: 3,
            '& a': {
                minHeight: 'auto',
                minWidth: 10,
                py: 1.5,
                px: 1,
                mr: 2,
                color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            '& a.Mui-selected': {
                color: theme.palette.primary.main
            },
            '& a > svg': {
                mb: '0px !important',
                mr: 1.1
            }
            }}
        >
            <Tab component={Link} href="#" icon={<EventIcon sx={{ fontSize: '1.3rem' }} />} label="자금계획입력" {...a11yProps(0)} />
            <Tab component={Link} href="#" icon={<EventNoteIcon sx={{ fontSize: '1.3rem' }} />} label="자금계획상세보기" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
            <DailyFundPlanInput />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <DailyFundPlanDetail />
        </TabPanel>
        </>
    </div>
  )
}

FundPlanInputTab.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FundPlanInputTab
