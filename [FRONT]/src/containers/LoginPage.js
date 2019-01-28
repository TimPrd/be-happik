import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import GreenShape from '../assets/img/courbe-verte.svg';
import Logo from '../assets/img/icons/logo.svg';
import LoginHeader from '../components/Login/LoginHeader';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LeftLogin = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.greyf7};
  background-image: url(${Logo});
  background-size: 130px 147px;
  background-position: center;
  background-repeat: no-repeat;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    background: url(${GreenShape});
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  @media (max-width: 48em) {
    display: none;
  }
`;

const Label = styled.label`
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${props => props.theme.custom.bigtext}px 0;
`;

const Input = styled.input`
  width: 100%;
  height: ${props => props.theme.height.height}px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.greyc1};
  padding: 8px;
  font-size: 12px;

  &.error {
    border: 1px solid ${props => props.theme.colors.rose85};
    color: ${props => props.theme.colors.rose85};

    &::placeholder {
      color: ${props => props.theme.colors.rose85};
    }
  }
`;

const InputError = styled.span`
  width: auto;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.rose85}
  position: absolute;
  right: 8px;
  bottom: 0;
  height: ${props => props.theme.height.height}px;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  position: relative;
  width: 1em;
  height: 1em;
  border: 1px solid gray;
  border-radius: 3px;
  vertical-align: -2px;
  -webkit-appearance: none;
  -moz-appearance: none;

  &::before {
    content: "✔";
    position: absolute;
    font-size: 1em;
    right: 0;
    top: -0.3em;
    visibility: hidden;
  }

  &:checked::before {
    visibility: visible;
  }

`;

const Submitbutton = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 100px;
  border: none;
  background-color: ${props => props.theme.colors.rose85};
  color: ${props => props.theme.colors.white};
  margin: ${props => props.theme.custom.bigtext}px 0;
`;

const LoginPage = ({ history }) => (
  <Grid fluid>
    <Row middle="xs">
      <Col xs={0} md={4}>
        <LeftLogin />
      </Col>

      <Col xs={12} md={8} style={{ zIndex: 1 }}>
        <Row>
          <Col mdOffset={3} xs={12} md={6}>
            <LoginHeader
              title="Heureux de vous revoir"
              subtitle="Veuillez renseigner votre adresse e-mail et votre mot de passe afin
              d’accéder à la plateforme."
            />
          </Col>
        </Row>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            try {
              const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                email: values.email,
                password: values.password,
              });

              console.log(response);


              history.push('/');
            } catch (error) {
              console.log(error);
              toast.error('error', {
                position: toast.POSITION.TOP_RIGHT,
              });
              actions.setFieldError('email', true);
              actions.setFieldError('password', true);
            }
          }}
          render={({
            handleSubmit, handleChange, handleBlur, values, errors, touched,
          }) => (
            <Row>
              <Col xs={12}>
                <form onSubmit={handleSubmit}>
                  <Col xs={12} mdOffset={3} md={6}>
                    <Label htmlFor="email">
                      Adresse e-mail
                      <br />
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={(errors.email && touched.email) ? 'error' : ''}
                        name="email"
                        id="email"
                        placeholder="Votre adresse e-mail"
                      />
                      {(errors.email && touched.email) && <InputError>{errors.email}</InputError>}
                    </Label>
                  </Col>

                  <Col xs={12} mdOffset={3} md={6}>
                    <Label htmlFor="password">
                      Votre mot de passe
                      <br />
                      <Input
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={(errors.password && touched.password) ? 'error' : ''}
                        name="password"
                        id="password"
                        placeholder="Votre mot de passe"
                      />
                      {(errors.password && touched.password)
                        && <InputError>{errors.password}</InputError>
                      }
                    </Label>
                  </Col>

                  <Row>
                    <Col xs={6} mdOffset={3} md={3}>
                      <Row start="xs">
                        <Col xs={12}>
                          <label htmlFor="rememberMe">
                            <Checkbox id="rememberMe" />
                            Se souvenir de moi
                          </label>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={6} md={3}>
                      <Row end="xs">
                        <Col xs={12}>
                          Mot de passe oublié ?
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col mdOffset={7} xs={6} md={2}>
                      <Submitbutton type="submit">Submit</Submitbutton>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          )}
        />
      </Col>
    </Row>
  </Grid>
);

LoginPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

export default withRouter(LoginPage);
