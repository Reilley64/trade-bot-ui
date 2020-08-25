import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Col, Grid, Page, useTheme,
} from 'reilleykit';

import Table from '../../components/Table/Table';
import useAPI from '../../hooks/useAPI';

const Transactions = () => {
  const theme = useTheme();

  const transactionsAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/transactions`, config));

  if (transactionsAPI.response) {
    return (
      <Page id={'transactions'}>
        <Grid>
          <Col size={12}>
            <Table
              columns={[
                {
                  accessor: 'createdAt',
                  header: 'Date',
                  Cell: ({ value }) => moment(value).format('DD/MM/YYYY HH:MM:SS'),
                },
                {
                  accessor: 'description',
                  header: 'Description',
                },
                {
                  accessor: 'amount',
                  header: 'Amount',
                  Cell: ({ value }) => (
                    <span style={{ color: value < 0 ? theme.palette.danger.main : theme.palette.success.main }}>
                      {numeral(value).format('$0,0.00')}
                    </span>
                  ),
                },
              ]}
              data={transactionsAPI.response.data}
            />
          </Col>
          <Col size={12}>
            <Button loading={transactionsAPI.loading} onClick={() => transactionsAPI.fetch()} style={{ marginRight: '.5rem' }}>
              Refresh
            </Button>
            <Link to={'/transactions/new'}><Button>Create deposit</Button></Link>
          </Col>
        </Grid>
      </Page>
    );
  }
  return null;
};

export default Transactions;
