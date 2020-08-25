import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import {
  Col, Grid, Page, useTheme,
} from 'reilleykit';
import { VictoryChart, VictoryLine, VictoryPie } from 'victory';

import useAPI from '../hooks/useAPI';

const Home = () => {
  const theme = useTheme();

  const snapshotsAPI = useAPI((config) => axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/snapshots`, config));

  if (snapshotsAPI.response) {
    return (
      <Page id={'transactions'}>
        <Grid style={{ justifyContent: 'center' }}>
          <Col size={3}>
            <VictoryChart>
              <VictoryLine
                data={snapshotsAPI.response.data.map((datum) => ({ x: moment(datum.createdAt).format('DD/MM/YYYY'), y: (datum.xrp * datum.xrpusdtRate) + datum.usdt })).reverse()}
                style={{ data: { stroke: theme.palette.primary.main } }}
              />
            </VictoryChart>
          </Col>
          <Col size={3}>
            <VictoryPie
              colorScale={[theme.palette.primary.main, theme.palette.primary.light]}
              data={[
                { x: 'usdt', y: parseFloat(snapshotsAPI.response.data[0].usdt) },
                { x: 'xrp', y: parseFloat(snapshotsAPI.response.data[0].xrp) * parseFloat(snapshotsAPI.response.data[0].xrpusdtRate) },
              ]}
              height={260}
              innerRadius={70}
              labels={({ datum }) => (datum.y > 0 ? [`${numeral((datum.y / (parseFloat(snapshotsAPI.response.data[0].usdt) + parseFloat(snapshotsAPI.response.data[0].xrp))) * 100).format('0,0.00')}%`, datum.x] : null)}
              style={[
                { fontSize: '1rem' },
                { fill: theme.palette.text.base, fontSize: '.75rem' },
              ]}
            />
          </Col>
        </Grid>
      </Page>
    );
  }
  return null;
};

export default Home;
