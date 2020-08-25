import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import {
  Button,
  Col, Grid, Page, useTheme,
} from 'reilleykit';

import Table from '../components/Table/Table';
import useAPI from '../hooks/useAPI';

const Orders = () => {
  const theme = useTheme();

  const ordersAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/orders`, config));

  if (ordersAPI.response) {
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
                  accessor: 'direction',
                  header: 'Direction',
                  Cell: ({ value }) => (
                    <span style={{ color: value === 'BUY' ? theme.palette.success.main : theme.palette.danger.main }}>
                      {value}
                    </span>
                  ),
                },
                {
                  accessor: 'price',
                  header: 'Price',
                  Cell: ({ value }) => value,
                },
                {
                  accessor: 'quantity',
                  header: 'Quantity',
                },
                {
                  header: 'Total',
                  Cell: ({ values }) => numeral((parseFloat(values.price) * parseFloat(values.quantity)) + parseFloat(values.fee)).format('$0,0.00'),
                },
              ]}
              data={ordersAPI.response.data}
            />
          </Col>
          <Col size={12}>
            <Button loading={ordersAPI.loading} onClick={() => ordersAPI.fetch()} style={{ marginRight: '.5rem' }}>
              Refresh
            </Button>
          </Col>
        </Grid>
      </Page>
    );
  }
  return null;
};

export default Orders;
