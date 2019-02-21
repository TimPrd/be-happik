import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { Form, Formik, FieldArray } from 'formik';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

import { surveyMock, allMoods } from './surveyMock';

import client from '../../api';

import Button from '../Buttons/Button';

const AnswerContainer = styled.div`
  height: 110px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  text-align: left;
  padding:
    ${props => props.theme.custom.text}px
    ${props => props.theme.custom.subtitle}px;
  margin: ${props => props.theme.custom.subtitle}px 0;
`;

const SurveyTitle = styled.h1`
  font-size: ${props => props.theme.custom.subtitle}px;
  font-weight: bold;
  line-height: 1.25;
  text-align: center;
  margin: 0;
`;

const QuestionTitle = styled.p`
  margin: 0;
  font-size: ${props => props.theme.custom.mediumtext}px;
  font-weight: 600;
  line-height: 1.79;
  text-align: left;
  color: #4d4d4d;
`;

const ChoiceContainer = styled.div`
  width: 80px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointor;
  position: relative;

  &:hover {
    border: 1px solid ${props => props.theme.colors.greenc9};
  }

  & input[type="checkbox"] {
    display: none;
  }

  & input[type="checkbox"]:checked + label::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    top: 0;
    left: 0;
    border: 1px solid ${props => props.theme.colors.greenc9};
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChoiceP = styled.p`
  margin: 0;
  font-size: ${props => props.theme.custom.text}px;
  line-height: 2.08;
  text-align: center;
  color: #505052;
`;

const Icon = styled.img`
  height: ${props => props.theme.custom.title}px;
  width: ${props => props.theme.custom.title}px;
`;

class ReplySurvey extends React.Component {
  state = {
    survey: null,
    moods: allMoods,
  };

  fetchSurvey = async () => {
    const { match } = this.props;
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const surveyId = match.params.id || null;

    try {
      let survey = await client.get(`/api/survey/${surveyId}`, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      // fake mock for survey;
      survey = surveyMock;

      return survey;
    } catch (err) {
      return null;
    }
  };

  componentDidMount = async () => {
    const survey = await this.fetchSurvey();

    this.setState({ survey });
  };

  render() {
    const { survey, moods } = this.state;
    const { history } = this.props;

    return (
      <Grid>
        {survey && (
          <div>
            <Formik
              initialValues={{ questions: survey.questions || '' }}
              onSubmit={async (values) => {
                const answers = values.questions;

                try {
                  await client.post('/api/survey/:idSurvey/answers/', answers);

                  toast.success('Réponse soumise avec succes', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                } catch (error) {
                  toast.error('error', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }
              }}
              render={({ values, handleChange, handleSubmit }) => (
                <Form>
                  <Row middle="xs">
                    <Col md={3}>
                      <Button label="Go Back" handleClick={history.goBack} type="submit" />
                    </Col>

                    <Col md={6}>
                      <Row>
                        <Col xs={12}>
                          <SurveyTitle>{survey.survey.title}</SurveyTitle>
                        </Col>

                        <Col xs={6}>
                          <p>
                            Auteur :&nbsp;
                            {survey.author}
                          </p>
                        </Col>
                        <Col xs={6}>
                          <p>
                            Date d’expiration :&nbsp;
                            {moment(survey.survey.endDate).format('D MMMM YYYY')}
                          </p>
                        </Col>
                      </Row>
                    </Col>

                    <Col md={3}>
                      <Button label="Submit" handleClick={handleSubmit} type="submit" />
                    </Col>
                  </Row>
                  <FieldArray
                    name="questions"
                    render={arrayHelpers => (
                      <Row>
                        <Col xs={12}>
                          {survey.questions.map((question, index) => (
                            <AnswerContainer key={index.toString()}>
                              <Row start="xs">
                                <Col md={6}>
                                  <QuestionTitle>{question.title}</QuestionTitle>
                                </Col>
                              </Row>

                              <Row around="xs">
                                {moods.map((mood, newIndex) => {
                                  const isChecked = values.questions
                                    && values.questions[index]
                                    && values.questions[index].isChecked
                                    && values.questions[index].mood === mood.mood;

                                  return (
                                    <Col md={2} key={newIndex.toString()}>
                                      <ChoiceContainer>
                                        <input
                                          name={`question.${newIndex}`}
                                          type="checkbox"
                                          id={`checkbox_${index}${newIndex}`}
                                          onClick={e => arrayHelpers.replace(index, {
                                            ...mood,
                                            isChecked: e.target.checked,
                                          })}
                                          onChange={handleChange}
                                          checked={isChecked}
                                        />
                                        <Label htmlFor={`checkbox_${index}${newIndex}`}>
                                          <Icon src={mood.icon} alt="poll answer" />
                                          <ChoiceP>{mood.title}</ChoiceP>
                                        </Label>
                                      </ChoiceContainer>
                                    </Col>
                                  );
                                })}
                              </Row>
                            </AnswerContainer>
                          ))}
                        </Col>
                      </Row>
                    )}
                  />
                </Form>
              )}
            />
          </div>
        )}
      </Grid>
    );
  }
}

ReplySurvey.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(ReplySurvey);
