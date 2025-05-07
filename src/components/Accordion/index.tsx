'use client';

import { Collapse } from 'antd';
import TransactionList from '@/app/transactions/page';

const { Panel } = Collapse;

const Accordion = () => {
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Extrato" key="1">
        <TransactionList />
      </Panel>
    </Collapse>
  );
};

export default Accordion;
