import React from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Layout from 'layout';

const WorkplaceManagement = () => {
  return (
    <div></div>
  )
}

WorkplaceManagement.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default WorkplaceManagement;