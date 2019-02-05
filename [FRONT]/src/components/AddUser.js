import React from 'react';
import {
  Formik, Form, Field, FieldArray,
} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import AddItemBtn from './Buttons/AddItems';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 250px;
  background-color: transparent;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000;
  border-radius: 3px;
  box-sizing: border-box;

  &.withError {
    border: 2px solid red;
    color: red;
  }
`;

const InputError = styled.div`
  width: 250px;
  background-color: transparent;
  font-size: 1em;
  color: red;
`;

const SubmitBtn = styled.button`
  width: 250px;
  background-color: transparent;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000;
  border-radius: 3px;
`;

const AddUserSchema = Yup.object().shape({
  email: Yup.array()
    .of(
      Yup.string()
        .min(5, 'Your email is too Short!')
        .max(50, 'Your email is too Long!')
        .required('Email is required'),
    ),
  team: Yup.string()
    .required('Select a team'),
});

const AddUser = () => (
  <Container>
    <Formik
      validationSchema={AddUserSchema}

      onSubmit={(values) => {
        console.log('Values: ', values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form>
          <Container>
            <FieldArray
              name="email"
              render={arrayHelpers => (
                <div>
                  {values.email && values.email.length > 0 ? (
                    values.email.map((email, index) => (
                      <div key={index.toString()}>
                        <Input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          type="email"
                          name={`email.${index}`}
                          className={errors.email && touched.email && errors.email[index] ? 'withError' : ''}
                        />

                        {errors.email && touched.email ? (
                          <InputError>
                            { touched.email.length > 0 ? errors.email[index] : '' }
                          </InputError>
                        ) : null}

                        <AddItemBtn label="X" handleClick={() => arrayHelpers.remove(index)} />

                        <AddItemBtn label="+" handleClick={() => arrayHelpers.insert(index + 1, '')} />

                      </div>
                    ))
                  ) : (
                    <SubmitBtn type="button" onClick={() => arrayHelpers.push('')}>
                      Add a user
                    </SubmitBtn>
                  )}
                </div>
              )}
            />
          </Container>

          <br />

          <Container>
            <Field component="select" name="team">
              <option value="" defaultValue>Select the team</option>
              <option value="team_1">Team 1</option>
              <option value="team_2">Team 2</option>
              <option value="team_3">Team 3</option>
              <option value="team_4">Team 4</option>
              <option value="team_5">Team 5</option>
              <option value="team_6">Team 6</option>
            </Field>

            {errors.team ? (
              <div>{errors.team}</div>
            ) : null}
          </Container>

          <SubmitBtn type="submit">
            Submit
          </SubmitBtn>
        </Form>
      )}
    </Formik>
  </Container>
);

export default AddUser;
