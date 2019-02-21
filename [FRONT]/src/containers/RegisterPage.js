import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import LoginHeader from '../components/Login/LoginHeader';
import AuthLayout from './AuthLayout';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Mot de passe incorrect')
    .required('Requis!'),
  firstname: Yup.string()
    .required('Requis'),
  lastname: Yup.string()
    .required('Requis'),
});

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
  <AuthLayout>
    <Col xs={12} md={8} style={{ zIndex: 1 }}>
      <Row>
        <Col mdOffset={3} xs={12} md={6}>
          <LoginHeader
            title="Bienvenue"
            subtitle="Veuillez renseigner les informations requises afin de finaliser votre inscription à la plateforme."
          />
        </Col>
      </Row>

      <Formik
        initialValues={{
          email: '',
          password: '',
          firstname: '',
          lastname: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          try {
            await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
              email: values.email,
              password: values.password,
            });

            history.push('/');
          } catch (error) {
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
                <Row>
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
                    <Label htmlFor="tempPassword">
                      Mot de passe temporaire
                      <br />
                      <Input
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tempPassword}
                        className={(errors.tempPassword && touched.tempPassword) ? 'error' : ''}
                        name="tempPassword"
                        id="tempPassword"
                        placeholder="Votre mot de passe"
                      />
                      {(errors.tempPassword && touched.tempPassword)
                        && <InputError>{errors.tempPassword}</InputError>
                      }
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} mdOffset={3} md={3}>
                    <Label htmlFor="password">
                      Nouveau mot de passe
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

                  <Col xs={12} md={3}>
                    <Label htmlFor="passwordConfirm">
                      Confirmation du mot de passe
                      <br />
                      <Input
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={(errors.passwordConfirm && touched.passwordConfirm) ? 'error' : ''}
                        name="passwordConfirm"
                        id="passwordConfirm"
                        placeholder="Votre Prénom"
                      />
                      {(errors.passwordConfirm && touched.passwordConfirm)
                        && <InputError>{errors.passwordConfirm}</InputError>
                      }
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} mdOffset={3} md={3}>
                    <Label htmlFor="firstname">
                      Prénom
                      <br />
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstname}
                        className={(errors.firstname && touched.firstname) ? 'error' : ''}
                        name="firstname"
                        id="firstName"
                        placeholder="Votre Prénom"
                      />
                      {(errors.firstname && touched.firstname)
                        && <InputError>{errors.firstname}</InputError>
                      }
                    </Label>
                  </Col>

                  <Col xs={12} md={3}>
                    <Label htmlFor="lastname">
                      Nom
                      <br />
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                        className={(errors.lastname && touched.lastname) ? 'error' : ''}
                        name="lastname"
                        id="lastname"
                        placeholder="Votre Nom"
                      />
                      {(errors.lastname && touched.lastname)
                        && <InputError>{errors.lastname}</InputError>
                      }
                    </Label>
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
  </AuthLayout>
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
