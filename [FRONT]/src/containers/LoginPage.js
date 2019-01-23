import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Grid, Col, Row } from 'react-flexbox-grid';

const LoginPage = () => (
  <Grid fluid>
    <Row>
      <Col xs={0} md={4}>
        empty
      </Col>

      <Col xs={12} md={8}>
        Not empty

        <Formik
          initialValues={{ name: 'jared' }}
          onSubmit={(values, actions) => {
            axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
              email: 'harry@potter.fr',
              password: 'horcrux',
            }).then((response) => {
              console.log(response);
            }).catch((error) => {
              console.log(error);
            });
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
              {props.errors.name && <div id="feedback">{props.errors.name}</div>}
              <button type="submit">Submit</button>
            </form>
          )}
        />
      </Col>
    </Row>
  </Grid>
);

export default LoginPage;
