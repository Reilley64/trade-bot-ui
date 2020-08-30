import 'sanitize.css';

import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'react-bootstrap-icons';
import {
  Card, Col, Grid, Page, useTheme,
} from 'reilleykit';

import useStyles from './App.styles';
import CardBody from './components/CardBody/CardBody';
import Table from './components/Table/Table';
import useAPI from './hooks/useAPI';
import Navigation from './Navigation';

const App = () => {
  const isPortrait = window.innerHeight > window.innerWidth;

  const theme = useTheme();
  const classes = useStyles({ theme });

  const binanceAPI = useAPI((config) => axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=XRPUSDT', config));
  const snapshotsAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/snapshots`, config));
  const tradesAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/trades`, config));

  const xrpBalanceAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/asset-holdings/xrp`, config));
  const usdtBalanceAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/asset-holdings/usdt`, config));

  const response = binanceAPI.response && tradesAPI.response && snapshotsAPI.response && xrpBalanceAPI.response && usdtBalanceAPI.response;

  if (response) {
    return (
      <div className={classes.app} id="app">
        <Navigation />
        <Page id="transactions">
          <Grid>
            <Col size={isPortrait ? 12 : 5}>
              <Grid nested>
                <Col size={12}>
                  <Card>
                    <CardBody>
                      <h5 style={{ fontWeight: '600', fontSize: '1rem' }}>
                        Portfolio
                      </h5>
                      <div style={{ display: 'grid', height: '300px' }}>
                        <ResponsivePie
                          animate
                          colors={[theme.palette.primary.main, theme.palette.primary.light]}
                          data={[
                            {
                              id: 'xrp',
                              label: 'Ripple',
                              value: xrpBalanceAPI.response.data.balance * binanceAPI.response.data.lastPrice,
                            },
                            {
                              id: 'usdt',
                              label: 'Tether',
                              value: usdtBalanceAPI.response.data.balance,
                            },
                          ]}
                          enableSlicesLabels={false}
                          innerRadius={0.8}
                          radialLabel={(d) => `${d.label} (${numeral(d.value).format('0,0.00')}USDT)`}
                          radialLabelsLinkColor={theme.palette.text.muted}
                          radialLabelsTextColor={theme.palette.text.base}
                        />
                        <div style={{
                          alignSelf: 'center', justifySelf: 'center', position: 'absolute', textAlign: 'center',
                        }}
                        >
                          <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                            {numeral((parseFloat(xrpBalanceAPI.response.data.balance) * parseFloat(binanceAPI.response.data.lastPrice)) + parseFloat(usdtBalanceAPI.response.data.balance)).format('0,0.00')}
                            <small> USDT</small>
                          </span>
                          <br />
                          <span
                            style={{
                              color: ((parseFloat(xrpBalanceAPI.response.data.balance) * parseFloat(binanceAPI.response.data.lastPrice)) + parseFloat(usdtBalanceAPI.response.data.balance)) - ((parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].xrp) * parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].xrpusdtRate)) + parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].usdt)) > 0
                                ? theme.palette.success.main
                                : theme.palette.danger.main,
                            }}
                          >
                            {((parseFloat(xrpBalanceAPI.response.data.balance) * parseFloat(binanceAPI.response.data.lastPrice)) + parseFloat(usdtBalanceAPI.response.data.balance)) - ((parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].xrp) * parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].xrpusdtRate)) + parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].usdt)) > 0
                              ? <ArrowUpRight /> : <ArrowDownRight />}
                            {' '}
                            {numeral(((parseFloat(xrpBalanceAPI.response.data.balance) * parseFloat(binanceAPI.response.data.lastPrice)) + parseFloat(usdtBalanceAPI.response.data.balance)) - ((parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].xrp) * parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].xrpusdtRate)) + parseFloat(snapshotsAPI.response.data[snapshotsAPI.response.data.length - 1].usdt))).format('0,0.00')}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col size={12}>
                  <Card>
                    <CardBody>
                      <h5 style={{ fontWeight: '600', fontSize: '1rem' }}>
                        Valuation
                      </h5>
                      <div style={{ height: '300px' }}>
                        <ResponsiveLine
                          colors={[theme.palette.primary.main]}
                          data={[
                            {
                              id: 'valuation',
                              data: [
                                ...snapshotsAPI.response.data.map((datum) => ({
                                  x: moment(datum.createdAt).format('DD/MM/YYYY HH:mm'),
                                  y: (parseFloat(datum.xrp) * parseFloat(datum.xrpusdtRate)) + parseFloat(datum.usdt),
                                })),
                                {
                                  x: moment().format('DD/MM/YYYY HH:mm'),
                                  y: (parseFloat(xrpBalanceAPI.response.data.balance) * parseFloat(binanceAPI.response.data.lastPrice)) + parseFloat(usdtBalanceAPI.response.data.balance),
                                },
                              ],
                            },
                          ]}
                          margin={{
                            bottom: 60, left: 60, right: 60, top: 60,
                          }}
                          xScale={{ type: 'point' }}
                          yScale={{ type: 'linear', max: 'auto', min: 'auto' }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Grid>
            </Col>
            <Col size={isPortrait ? 12 : 7}>
              <Grid nested>
                {!isPortrait
                && (
                  <>
                    <Col size={2.4}>
                      <Card>
                        <CardBody>
                          <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                            <small>Latest</small>
                            <br />
                            {numeral(binanceAPI.response.data.lastPrice).format('0,0.00000')}
                            <small> USDT</small>
                          </span>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col size={2.4}>
                      <Card style={{ height: '100%' }}>
                        <CardBody>
                          <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                            <small>Change</small>
                            <br />
                            <span
                              style={{
                                color: binanceAPI.response.data.priceChange > 0
                                  ? theme.palette.success.main
                                  : theme.palette.danger.main,
                              }}
                            >
                              {numeral(binanceAPI.response.data.priceChange).format('0,0.00000')}
                              <small> USDT</small>
                            </span>
                          </span>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col size={2.4}>
                      <Card>
                        <CardBody>
                          <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                            <small>High</small>
                            <br />
                            {numeral(binanceAPI.response.data.highPrice).format('0,0.00000')}
                            <small> USDT</small>
                          </span>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col size={2.4}>
                      <Card>
                        <CardBody>
                          <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                            <small>Low</small>
                            <br />
                            {numeral(binanceAPI.response.data.lowPrice).format('0,0.00000')}
                            <small> USDT</small>
                          </span>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col size={2.4}>
                      <Card>
                        <CardBody>
                          <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                            <small>Volume</small>
                            <br />
                            {numeral(binanceAPI.response.data.quoteVolume).format('0,0')}
                            <small> USDT</small>
                          </span>
                        </CardBody>
                      </Card>
                    </Col>
                  </>
                )}
                <Col size={12}>
                  <Card>
                    <CardBody>
                      <h5 style={{ fontWeight: '600', fontSize: '1rem' }}>
                        Trades
                      </h5>
                      <Table
                        columns={[
                          {
                            accessor: 'createdAt',
                            header: 'Date',
                            Cell: ({ value }) => moment(value).format('DD/MM/YYYY HH:mm:ss'),
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
                            Cell: ({ value }) => numeral(value).format('0,0.00000'),
                          },
                          {
                            accessor: 'quantity',
                            header: 'Price',
                            Cell: ({ value }) => numeral(value).format('0,0.0000'),
                          },
                          {
                            accessor: 'total',
                            header: 'Amount',
                            Cell: ({ value }) => numeral(value).format('0,0.00'),
                          },
                        ]}
                        data={tradesAPI.response.data.map((datum) => ({
                          ...datum,
                          total: (datum.quantity / datum.rate) - datum.fee,
                        }))}
                        sortBy={{
                          field: 'createdAt',
                          desc: true,
                        }}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </Page>
      </div>
    );
  }
  return null;
};

export default App;
