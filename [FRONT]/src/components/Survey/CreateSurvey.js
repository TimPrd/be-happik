import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import Select from 'react-select';
import styled from 'styled-components';

import client from '../../api';
// import { UserContext } from '../../contexts';

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

class CreateSurvey extends React.Component {
  state = {
    teams: null,
  };

  fetchTeams = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    try {
      // const response = await client.get('/me');
      const teams = await client.get('/api/team/list/', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(loggedUser);
      console.log(teams);

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
            email: '',
            password: '',
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
              {console.log(values)}
              <Col xs={12}>
                <form onSubmit={handleSubmit}>
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
