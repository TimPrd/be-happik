import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import client from '../../api';
import Button from '../Buttons/Button';
import { UserContext } from '../../contexts';

const Items = styled(Link)`
  width: 100%;
  min-height: ${props => props.theme.height.xlHeight}px;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #f1f1f3;
  font-size: ${props => props.theme.custom.bigtext}px;
  font-weight: 300;
  text-align: left;
  color: #4d4d4d;

  text-decoration: none;
  padding: 10px 0;

  &:hover h3 {
    font-weight: 600;
  }
`;

const PageTitle = styled.h2`
  font-size: ${props => props.theme.custom.subtitle}px;
  margin: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 300;
`;

const Status = styled.div`
  width: 70px;
  height: ${props => props.theme.height.xsHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.black};
  border-radius: 14px;
  background-color: ${props => props.theme.colors.greyd4};
  text-align: center;
  font-size: ${props => props.theme.custom.text}px;
  opacity: 0.3;

  &.done {
    background-color: ${props => props.theme.colors.greena6};
  }
  &.waiting {
    background-color: ${props => props.theme.colors.orange83};
  }
`;

class CreateSurvey extends React.Component {
  state = {
    surveys: null,
  };

  fetchSurvey = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const wantedPage = 1;
    try {
      let surveys = await client.get(`/api/surveys?page=${wantedPage}&open=true`, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      return surveys

    } catch (err) {
      return null;
    }
  };

  componentDidMount = async () => {
    const surveys = await this.fetchSurvey();


    this.setState({ surveys });
  };

  getStatus = (survey, type) => {
    const expired = moment().isAfter(survey.endDate);

    if (type === 'class') {
      if (expired) { return ''; }

      return survey.status === 'done' ? 'done' : 'waiting';
    }

    if (survey.status === 'done') { return 'Terminé'; }
    if (survey.status === 'waiting') { return 'En attente'; }
    return expired && 'Expiré';
  };

  render() {
    const { surveys } = this.state;
    const { history } = this.props;

    return (
      <UserContext.Consumer>
        {user => (
          <div>
            <Row>
              <Col xs={6} sm={10}>
                <Row start="xs">
                  <Col xs={12}>
                    <PageTitle>Liste des sondages</PageTitle>
                  </Col>

                  <Col xs={12}>
                    <p style={{ margin: 0 }}>Voici les derniers sondages terminés ou à effectuer</p>
                  </Col>
                </Row>
              </Col>

              {user.RoleId === 1 && (
                <Col xs={6} sm={2}>
                  <Button label="Créer un sondage" handleClick={() => history.push('/survey/create')} type="submit" />
                </Col>
              )}
            </Row>

            {surveys && surveys.data['surveys'].map((survey, index) => (

              <Row key={index.toString()}>
            
                  <Items to={survey.status === 'done'? `/survey/${survey.id}/answers` : `/survey/reply/${survey.id}`}>
               
                  <Col xs={10} sm={10} md={6}>
                    <Title>{survey.title}</Title>

                  </Col>
                  <Col xs={2} sm={2} md={2}>
                    <Status className={this.getStatus(survey, 'class')}>
                      {this.getStatus(survey, 'noClass')}
                      </Status>
                  </Col>
                  <Col xs={12} sm={4} md={2}>
                    <p>
                      Auteur :&nbsp;
                        {survey.author}
                    </p>
                  </Col>
                  <Col xs={12} sm={8} md={2}>
                    <Row>
                      <Col xs={12} sm={6} md={12}>
                        Création : &nbsp;
                        {moment(survey.createdAt).format('D MMMM YYYY')}
                      </Col>
                      <Col xs={12} sm={6} md={12}>
                        Expire : &nbsp;
                        {moment(survey.endDate).format('D MMMM YYYY')}
                      </Col>
                    </Row>
                  </Col>
                </Items>
              </Row>

            ))}
          </div>
        )}

      </UserContext.Consumer>
    );
  }
}

CreateSurvey.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(CreateSurvey);
