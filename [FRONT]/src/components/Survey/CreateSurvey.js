import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Formik, FieldArray } from 'formik';
import { toast } from 'react-toastify';
import Select from 'react-select';
import styled from 'styled-components';

import client from '../../api';
import Input from '../inputs';

const Submitbutton = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 100px;
  border: none;
  background-color: ${props => props.theme.colors.rose85};
  color: ${props => props.theme.colors.white};
  margin: ${props => props.theme.custom.bigtext}px 0;
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
  };

  fetchQuestions = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    console.log(loggedUser);

    try {
      const predefinedquestions = await client.get('/api/question/predefined?q=20', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      return predefinedquestions.data.msg === 'You are not authorize' ? null : predefinedquestions.data;
    } catch (err) {
      return null;
    }
  };

  fetchTeams = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    try {
      const teams = await client.get('/api/team/list/', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      return teams.data.msg === 'You are not authorize' ? null : teams.data;
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
    const { teams, predefQuestions } = this.state;

    console.log(this.state);

    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            title: '',
            teams: teams || [],
            predefined_questions: predefQuestions || [],
            questions: [],
          }}
          // validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            try {
              // const response = await client.post('/api/login', {
              //   email: values.email,
              //   password: values.password,
              // });

              // localStorage.setItem('user', JSON.stringify(response.data));

              // history.push('/');
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
                  <Row>
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
                  </Row>

                  <Row>
                    <Col xs={12} mdOffset={3} md={6}>
                      <Select
                        options={values.teams}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={option => setFieldValue('teamSelect', option)}
                        name="teamSelect"
                        // styles={colourStyles}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={6}>
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
                                        {question}
                                      </span>

                                      <input
                                        type="checkbox"
                                        name={`predefined_questions.${index}`}
                                        onClick={e => arrayHelpers.replace(index, { ...question, isChecked: e.target.checked })}
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
        {/* {teams} */}
      </div>
    );
  }
}

export default CreateSurvey;
