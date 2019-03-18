
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import styled, { keyframes } from 'styled-components';
import { Form, Formik } from 'formik';
import Button from './Buttons/Button';
import moment from 'moment';

import client from '../api';

import { allMoods } from "./Survey/surveyMock";
import { toast } from "react-toastify";

const pulse = keyframes`
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`;

const Pulse = styled.div`
  display: inline-block;
  margin-right: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #FEE5BF;
  box-shadow: 0 0 0 rgba(204,169,44, 0.4);
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h3`
  margin: 0;
  padding: 15px;
  font-weight: 300;
`;

const AnswerContainer = styled.div`
  position : absolute;
  right: 10px;
  top: 80px;
  width: 600px;
  min-height: 110px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  text-align: left;
  background-color: #ffffff;
  padding: 0 15px;
`;

const ChoiceContainer = styled.div`
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

class MoodForm extends React.Component {
  state = {
    moods: allMoods,
    moodScore: [],
    isHidden: false
  };

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  postMood = async (MoodScore) => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      const body = { mood: 100 /*MoodScore*/, date: moment().format('YYYY-MM-DD') };
      const response = await client.post(`/api/user/${loggedUser.id}/mood`, body, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      this.toggleHidden.bind(this)

      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error('error', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  render() {
    const { moods } = this.state;
    const { moodScore } = this.state;
    const { isHidden } = this.state;

    return (
     
      <div>
  
        <Formik 
          initialValues={{ moods: moods || '' }}
          onSubmit={async (values) => {

            console.log(moodScore);

             try {
               const loggedUser = JSON.parse(localStorage.getItem('user')); 
             
               const response = await client.post(`/api/user/${loggedUser.user.id}/mood`, moodScore[0], {
                 headers: {
                   Authorization: `Bearer ${loggedUser.token}`,
                   'Content-Type': 'application/json',
                 },
               });
              
      
               this.setState({isHidden : !isHidden})
               

              toast.success(response.data.msg, {
                 position: toast.POSITION.TOP_RIGHT,
               });

            
             } catch (error) {
               toast.error("error" + error, {
                 position: toast.POSITION.TOP_RIGHT,
               });
             }
 
          }}



          render={({ values, handleChange, handleSubmit }) => (
            <Form >
              <AnswerContainer className={ isHidden !== false ? "modal-out" : null} /*key={index.toString()}*/>
                <Title><Pulse />Quelle est votre humeur du jour ?</Title>
                <Col md={2}>

                </Col>



                <Row around="xs" className="mood-form">
                  {moods.map((mood, newIndex) => {
                    const isChecked = values.questions
                      && values.moods[newIndex]
                      && values.moods[newIndex].result === mood.mood;

                    return (
                      <Col xs={2} key={newIndex.toString()}>
                        <ChoiceContainer>
                          <input
                            name={`mood.${newIndex}`}
                            type="checkbox"
                            id={`checkbox_${newIndex}`}
                            onClick={event => {
                              moodScore.push({
                                mood: mood.mood,
                                date: moment().format('YYYY-MM-DD')
                              })
                            }
                          }
                            onChange={handleChange}
                            checked={isChecked}
                          />
                          <Label htmlFor={`checkbox_${newIndex}`}>
                            <Icon src={mood.icon} alt="poll answer" />
                            <ChoiceP>{mood.title}</ChoiceP>
                          </Label>
                        </ChoiceContainer>
                      </Col>
                    );
                  })}

                </Row>
                <Row around="xs">
                  <Col xs={4}>
                    <Button label="Soumettre" handleClick={handleSubmit} type="submit" />
                  </Col>
                </Row>


              </AnswerContainer>
            </Form>
          )}
        />
      </div>
    
      );
  }
}


export default MoodForm;





