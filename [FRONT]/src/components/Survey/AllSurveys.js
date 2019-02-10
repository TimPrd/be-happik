import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

import client from '../../api';

class CreateSurvey extends React.Component {
  state = {
    surveys: null,
  };

  fetchSurvey = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    try {
      const surveys = await client.get('/api/surveys?page=1', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(surveys);

      return surveys.data.result;
    } catch (err) {
      return null;
    }
  };

  componentDidMount = async () => {
    const surveys = await this.fetchSurvey();

    this.setState({ surveys });
  };

  render() {
    const { surveys } = this.state;

    return (
      <div>
        HELLO WORLD

        {surveys && surveys.map((question, index) => (
          <Row key={index.toString()}>
            <Col>
              <Link to={`/survey/reply/${question.id}`}>
                <h3>{question.title}</h3>
                <p>
                  {question.open ? 'En attente' : 'Expiré'}
                </p>
              </Link>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

export default CreateSurvey;
