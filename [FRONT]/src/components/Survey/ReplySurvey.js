import React from 'react';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { Form, Formik, FieldArray } from 'formik';
// import { toast } from 'react-toastify';
import styled from 'styled-components';

import client from '../../api';
import AngryIcon from '../../assets/img/icons/Icon-Angry.svg';
import BigSmileIcon from '../../assets/img/icons/Icon-BigSmile.svg';
import NeutralIcon from '../../assets/img/icons/Icon-Neutral.svg';
import SadIcon from '../../assets/img/icons/Icon-Sad.svg';
import SmileIcon from '../../assets/img/icons/Icon-Smile.svg';

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

  &:hover {
    border: 1px solid ${props => props.theme.colors.greenc9};
    border-radius: 4px;
    cursor: pointor;
  }
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
  };

  fetchSurvey = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    try {
      let survey = await client.get('/api/survey/1', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(survey);
      survey = {
        author: null,
        survey: {
          id: 1,
          title: 'Future Interactions Officer',
          description: null,
          startDate: '2019-02-09T17:28:37.397Z',
          endDate: '',
          open: false,
          createdAt: '2019-02-09T17:28:37.397Z',
          updatedAt: '2019-02-09T17:28:37.397Z',
          AuthorId: undefined,
        },
        questions: [
          {
            UserId: null,
            createdAt: '2019-02-09T17:28:37.335Z',
            description: 'Sit incidunt aut minus voluptas libero quam.',
            id: 5,
            predefined: true,
            title: 'Internal Applications Liaison',
            updatedAt: '2019-02-09T17:28:37.335Z',
          },
          {
            UserId: null,
            createdAt: '2019-02-09T17:28:37.335Z',
            description: 'Sit incidunt aut minus voluptas libero quam.',
            id: 5,
            predefined: true,
            title: 'Internal Applications Liaison',
            updatedAt: '2019-02-09T17:28:37.335Z',
          },
          {
            UserId: null,
            createdAt: '2019-02-09T17:28:37.335Z',
            description: 'Sit incidunt aut minus voluptas libero quam.',
            id: 5,
            predefined: true,
            title: 'Internal Applications Liaison',
            updatedAt: '2019-02-09T17:28:37.335Z',
          },
          {
            UserId: null,
            createdAt: '2019-02-09T17:28:37.335Z',
            description: 'Sit incidunt aut minus voluptas libero quam.',
            id: 5,
            predefined: true,
            title: 'Internal Applications Liaison',
            updatedAt: '2019-02-09T17:28:37.335Z',
          },
        ],
      };

      return survey;
      // if (newdata.msg !== 'You are not authorize') {
      //   console.log(newdata);

      //   newdata = newdata.map(data => ({ question: data, isChecked: false }));
      // } else {
      //   return null;
      // }

      // return newdata;
    } catch (err) {
      return null;
    }
  };

  componentDidMount = async () => {
    const survey = await this.fetchSurvey();

    console.log(survey);

    this.setState({ survey });
  };

  render() {
    const { survey } = this.state;

    console.log(survey);

    return (
      <Grid>
        {survey && (
          <div>
            <Row>
              <Col md={3}>
                HELLO WORLD
              </Col>

              <Col md={6}>
                <SurveyTitle>{survey.survey.title}</SurveyTitle>
              </Col>

              <Col md={3}>
                HELLO WORLD
              </Col>
            </Row>
            <Formik
              initialValues={{ friends: ['jared', 'ian', 'brent'] }}
              onSubmit={values =>
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                }, 500)
              }
              render={({ values }) => (
                <Form>
                  <FieldArray
                    name="friends"
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
                                <Col md={2}>
                                  <ChoiceContainer>
                                    <Icon src={BigSmileIcon} alt="poll answer" />
                                    <ChoiceP>Très satisfait</ChoiceP>
                                  </ChoiceContainer>
                                </Col>
                                <Col md={2}>
                                  <ChoiceContainer>
                                    <Icon src={SmileIcon} alt="poll answer" />
                                    <ChoiceP>Satisfait</ChoiceP>
                                  </ChoiceContainer>
                                </Col>
                                <Col md={2}>
                                  <ChoiceContainer>
                                    <Icon src={NeutralIcon} alt="poll answer" />
                                    <ChoiceP>Indifférent</ChoiceP>
                                  </ChoiceContainer>
                                </Col>
                                <Col md={2}>
                                  <ChoiceContainer>
                                    <Icon src={SadIcon} alt="poll answer" />
                                    <ChoiceP>Insatisfait</ChoiceP>
                                  </ChoiceContainer>
                                </Col>
                                <Col md={2}>
                                  <ChoiceContainer>
                                    <Icon src={AngryIcon} alt="poll answer" />
                                    <ChoiceP>Très insatisfait</ChoiceP>
                                  </ChoiceContainer>
                                </Col>
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

export default ReplySurvey;
