import axios from 'axios';
import moment from 'moment';
import React from 'react';
import {
  Button, Col, Grid, Page,
} from 'reilleykit';

import Table from '../components/Table/Table';
import useAPI from '../hooks/useAPI';

const Trades = () => {
  const tradesAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/trades`, config));

  if (tradesAPI.response) {
    return (
      <Page id={'orders'}>
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
                  accessor: 'from',
                  header: 'From',
                },
                {
                  accessor: 'to',
                  header: 'To',
                },
                {
                  accessor: 'rate',
                  header: 'Rate',
                },
                {
                  accessor: 'quantity',
                  header: 'Quantity',
                },
                {
                  header: 'Total',
                  Cell: ({ values }) => (values.quantity / values.rate) - values.fee,
                },
              ]}
              data={tradesAPI.response.data}
            />
          </Col>
          <Col size={12}>
            <Button loading={tradesAPI.loading} onClick={() => tradesAPI.fetch()} style={{ marginRight: '.5rem' }}>
              Refresh
            </Button>
          </Col>
        </Grid>
      </Page>
    );
  }
  return null;
};

export default Trades;
