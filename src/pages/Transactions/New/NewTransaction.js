import axios from 'axios';
import {
  Field, Form, FormikProvider, useFormik,
} from 'formik';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  Button, Col, Grid, Page, Textfield,
} from 'reilleykit';

import useAPI from '../../../hooks/useAPI';

const NewTransaction = () => {
  const history = useHistory();

  const transactionAPI = useAPI((config, data = {}) => axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/transactions`, data, config), false);

  useEffect(() => {
    if (transactionAPI.response && !transactionAPI.loading) history.push('/transactions');
  }, [transactionAPI.response, transactionAPI.loading]);

  const transactionForm = useFormik({
    initialValues: {
      description: '',
      amount: '',
    },
    onSubmit: (values) => transactionAPI.fetch(null, values),
  });

  return (
    <Page id={'new-transaction'} style={{ padding: '1rem 35rem' }}>
      <Grid>
        <Col size={12}>
          <FormikProvider value={transactionForm}>
            <Form>
              <Grid nested>
                <Col size={6}>
                  <Field component={Textfield} label={'Description'} name={'description'} required/>
                </Col>
                <Col size={6}/>
                <Col size={3}>
                  <Field component={Textfield} label={'Amount'} name={'amount'} required/>
                </Col>
                <Col size={9}/>
                <Col size={12} style={{ textAlign: 'right' }}>
                  <Button loading={transactionAPI.loading} type={'submit'}>Submit</Button>
                </Col>
              </Grid>
            </Form>
          </FormikProvider>
        </Col>
      </Grid>
    </Page>
  );
};

export default NewTransaction;
