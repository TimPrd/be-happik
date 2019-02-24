import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Formik, FieldArray } from 'formik';
import { toast } from 'react-toastify';
import Select from 'react-select';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import client from '../../api';
import Input from '../inputs';

const Container = styled(Row)`
  margin: ${props => props.theme.custom.text}px 0;
`;

const Submitbutton = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 100px;
  border: none;
  background-color: ${props => props.theme.colors.rose85};
  color: ${props => props.theme.colors.white};
  margin: ${props => props.theme.custom.text}px 0;
`;

const QuestionsPart1 = styled.div`
  width: 100%;
  height: auto;
  max-height: 500px;
  padding: 1rem;
  border: none;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);

  overflow: auto;
`;

const PredefQuestion = styled.div`
  width: 100%;
  height: 70px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  margin: 10px 0;
  padding: 0 25px;

  span {
    text-align: left;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span {
    margin: 10px 0;
    text-align: left;
  }
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.column_direction {
    flex-direction: column;
    align-items: flex-start;

    span {
      margin: 10px 0;
    }
  }
`;

class CreateSurvey extends React.Component {
  state = {
    teams: null,
    predefQuestions: null,
    me: JSON.parse(localStorage.getItem('user')),
  };

  fetchQuestions = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    try {
      const predefinedquestions = await client.get('/api/question/predefined?q=20', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });
      let newdata = predefinedquestions.data;

      if (newdata.msg !== 'You are not authorize') {
        newdata = newdata.map(data => ({ question: data, isChecked: false }));
      } else {
        return null;
      }

      return newdata;
    } catch (err) {
      return null;
    }
  };

  fetchTeams = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    try {
      const teams = await client.get('/api/team/list?q=20', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      return teams.data.msg === 'You are not authorize' ? null : teams.data.map(team => ({ value: team.id, label: team.teamName }));
    } catch (err) {
      return null;
    }
  };

  componentDidMount = async () => {
    const teams = await this.fetchTeams();
    const predefQuestions = await this.fetchQuestions();

    this.setState({
      teams,
      predefQuestions,
    });
  };

  render() {
    const { teams, predefQuestions, me } = this.state;
    const { history } = this.props;

    return (
      <div>
        {teams && (
          <Formik
            enableReinitialize
            initialValues={{
              title: '',
              teams: new Array(teams.length).fill(''),
              predefined_questions: predefQuestions || [],
              questions: [''],
            }}
            // validationSchema={SignupSchema}
            onSubmit={async (values /* , actions */) => {
              const predefined = values.predefined_questions
                .filter(question => question.isChecked)
                .map(question => ({ title: question.question, body: question.question }));
              const newQuestions = values.questions.map(question => ({
                title: question,
                body: question,
              }));

              const newTeams = values.teams.map(team => team.value);

              const data = {
                author: me.user.id,
                teams: newTeams,
                questions: [
                  ...predefined,
                  ...newQuestions,
                ],
                surveyTitle: values.title,
              };

              try {
                await client.post('/survey/validate', data);

                history.push('/');
              } catch (error) {
                toast.error('error', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
            }}
            render={({
              // , handleBlur, errors, touched,
              handleChange, handleSubmit, values, setFieldValue,
            }) => (
              <Row>
                <Col xs={12}>
                  <form onSubmit={handleSubmit}>
                    <Container>
                      <Col xs={12} mdOffset={3} md={6}>
                        <Label className="column_direction" htmlFor="title">
                          <span>
                            Titre du sondage
                          </span>

                          <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="mon super sondage"
                            onChange={handleChange}
                          />
                        </Label>
                      </Col>
                    </Container>

                    <Container>
                      <Col xs={12} mdOffset={3} md={6}>
                        <SelectContainer>
                          <span>
                            Sélectionner une ou plusieurs équipes
                          </span>

                          <Select
                            options={teams}
                            closeMenuOnSelect={false}
                            isMulti
                            onChange={option => setFieldValue('teams', option)}
                            name="teams"
                            // styles={colourStyles}
                          />
                        </SelectContainer>
                      </Col>
                    </Container>

                    <Container>
                      <Col xs={12} md={6}>
                        <h3>Questions prédéfinies</h3>

                        <QuestionsPart1>
                          <FieldArray
                            name="predefined_questions"
                            render={arrayHelpers => (
                              <Row>
                                {values.predefined_questions.map((question, index) => (
                                  <Col xs={12} key={index.toString()}>
                                    <PredefQuestion>
                                      <Label>
                                        <span>
                                          {question.question}
                                        </span>

                                        <input
                                          type="checkbox"
                                          name={`predefined_questions.${index}`}
                                          onClick={e => arrayHelpers.replace(index, {
                                            ...question,
                                            isChecked: e.target.checked,
                                          })}
                                        />
                                      </Label>
                                    </PredefQuestion>
                                  </Col>
                                ))}
                              </Row>
                            )}
                          />
                        </QuestionsPart1>
                      </Col>

                      <Col xs={12} md={6}>
                        <h3>Questions personnalisées</h3>

                        <FieldArray
                          name="questions"
                          render={arrayHelpers => (
                            <Row end="xs">
                              <Col xs={6}>
                                <Submitbutton type="button" onClick={() => arrayHelpers.push('')}>Ajouter une question</Submitbutton>
                              </Col>

                              {values.questions && values.questions.length > 0 && (
                                <Col xs={12}>
                                  {values.questions.map((question, index) => (
                                    <Row key={index.toString()}>
                                      <Col xs={12}>
                                        <Label className="column_direction">
                                          <span>
                                            Énoncé de la question
                                          </span>
                                          <Input
                                            type="text"
                                            name={`questions.${index}`}
                                            value={question}
                                            placeholder="Votre question ..."
                                            onChange={handleChange}
                                          />
                                        </Label>
                                      </Col>
                                    </Row>
                                  ))}
                                </Col>
                              )}
                            </Row>
                          )}
                        />
                      </Col>
                    </Container>

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
        )}
      </div>
    );
  }
}

CreateSurvey.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

export default withRouter(CreateSurvey);
