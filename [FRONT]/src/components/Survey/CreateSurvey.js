import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Formik, FieldArray } from 'formik';
import { toast } from 'react-toastify';
import Select from 'react-select';
import styled from 'styled-components';

import client from '../../api';
import Input from '../inputs';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

// const colourStyles = {
//   control: styles => ({ ...styles, backgroundColor: 'white' }),
//   option: (styles, {
//     data, isDisabled, isFocused, isSelected
//   }) => {
//     return {
//       ...styles,
//       backgroundColor: isDisabled
//         ? null
//         : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
//       color: isDisabled
//         ? '#ccc'
//         : isSelected
//           ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
//           : data.color,
//       cursor: isDisabled ? 'not-allowed' : 'default',
//     };
//   },
//   multiValue: (styles, { data }) => {
//     return {
//       ...styles,
//       backgroundColor: color.alpha(0.1).css(),
//     };
//   },
//   multiValueLabel: (styles, { data }) => ({
//     ...styles,
//     color: data.color,
//   }),
//   multiValueRemove: (styles, { data }) => ({
//     ...styles,
//     color: data.color,
//     ':hover': {
//       backgroundColor: data.color,
//       color: 'white',
//     },
//   }),
// };

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
  border: none;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
`;

const PredefQuestion = styled.div`
  width: 100%;
  height: 70px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  margin: 12px 0;
  padding: 0 30px;
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.column_direction {
    flex-direction: column;
  }
`;

const questions = [
  {
    question: 'car',
    isChecked: false,
  },
  {
    question: 'motorcycle',
    isChecked: false,
  },
  {
    question: 'airplane',
    isChecked: false,
  },
  {
    question: 'rocket',
    isChecked: false,
  },
];

class CreateSurvey extends React.Component {
  state = {
    teams: null,
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

      return teams;
    } catch (err) {
      return null;
    }
  };

  componentDidMount = async () => {
    const teams = await this.fetchTeams();

    this.setState(teams);
  };

  render() {
    const { teams } = this.state;

    return (
      <div>
        <Formik
          initialValues={{
            title: '',
            teams: [],
            predefined_questions: [],
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
              actions.setFieldError('email', true);
              actions.setFieldError('password', true);
            }
          }}
          render={({
            // handleChange, handleBlur, errors, touched,
            handleSubmit, values, setFieldValue,
          }) => (
            <Row>
              <Col xs={12}>
                <form onSubmit={handleSubmit}>
                  <Col xs={12} mdOffset={3} md={6}>
                    <label htmlFor="title">
                      Titre du sondage
                      <Input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="mon super sondage"
                      />
                    </label>
                  </Col>

                  <Col xs={12} mdOffset={3} md={6}>
                    <Select
                      options={options}
                      closeMenuOnSelect={false}
                      isMulti
                      onChange={option => setFieldValue('teamSelect', option)}
                      name="teamSelect"
                      // styles={colourStyles}
                    />
                  </Col>

                  <Row>
                    <Col xs={12} md={6}>
                      <QuestionsPart1>
                        <FieldArray
                          name="predefined_questions"
                          render={arrayHelpers => (
                            <div>
                              {questions.map((question, index) => (
                                <PredefQuestion key={index}>
                                  <Label>
                                    <span>
                                      {question.question}
                                    </span>

                                    <input
                                      type="checkbox"
                                      name={`predefined_questions.${index}`}
                                      // checked={}
                                      onClick={e => arrayHelpers.replace(index, { ...question, isChecked: e.target.checked })}
                                      // onChange={e => arrayHelpers.replace(index, { ...question, isChecked: !e.target.checked })}
                                    />
                                  </Label>
                                </PredefQuestion>
                              ))}
                            </div>
                          )}
                        />
                      </QuestionsPart1>
                    </Col>

                    <Col xs={12} md={6}>
                      <QuestionsPart1>
                        <FieldArray
                          name="questions"
                          render={arrayHelpers => (
                            <div>
                              {values.questions && values.questions.length > 0 ? (
                                <div>
                                  {values.questions.map((question, index) => (
                                    <div key={index}>
                                      <Label className="column_direction">
                                        <span>
                                          Énoncé de la question
                                        </span>
                                        <Input
                                          type="text"
                                          name={`questions.${index}`}
                                        />
                                      </Label>
                                    </div>
                                  ))}

                                  <button type="button" onClick={() => arrayHelpers.push('')}>
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button type="button" onClick={() => arrayHelpers.push('')}>
                                  Add a friend
                                </button>
                              )}
                            </div>
                          )}
                        />
                      </QuestionsPart1>
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
        {teams}
      </div>
    );
  }
}

export default CreateSurvey;
