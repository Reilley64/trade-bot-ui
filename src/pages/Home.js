import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import {
  Col, Grid, Page, useTheme,
} from 'reilleykit';

import useAPI from '../hooks/useAPI';

const Home = () => {
  const theme = useTheme();

  const snapshotsAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/snapshots`, config));

  if (snapshotsAPI.response) {
    return (
      <Page id={'transactions'}>
        <Grid style={{ justifyContent: 'center' }}>
          <Col size={4}>
            <div style={{ height: '400px' }}>
              <ResponsiveLine
                colors={[theme.palette.primary.main]}
                data={[{ id: 'valuation', data: snapshotsAPI.response.data.map((datum) => ({ x: moment(datum.createdAt).format('DD/MM/YYYY'), y: (parseFloat(datum.xrp) * parseFloat(datum.xrpusdtRate)) + parseFloat(datum.usdt) })).reverse() }]}
                margin={{
                  top: 50, right: 110, bottom: 50, left: 60,
                }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', max: 'auto', min: 'auto' }}
              />
            </div>
          </Col>
          <Col size={4}>
            <div style={{ height: '400px' }}>
              <ResponsivePie
                animate
                colors={[theme.palette.primary.main, theme.palette.primary.light]}
                data={[
                  {
                    id: 'xrp',
                    label: 'Ripple',
                    value: snapshotsAPI.response.data[0].xrp * snapshotsAPI.response.data[0].xrpusdtRate,
                  },
                  {
                    id: 'usdt',
                    label: 'Tether',
                    value: snapshotsAPI.response.data[0].usdt,
                  },
                ]}
                enableSlicesLabels={false}
                innerRadius={0.75}
                margin={{
                  top: 40, right: 80, bottom: 80, left: 80,
                }}
                radialLabel={(d) => `${d.label} ($${parseFloat(d.value)}USDT)`}
              />
            </div>
          </Col>
        </Grid>
      </Page>
    );
  }
  return null;
};

export default Home;
