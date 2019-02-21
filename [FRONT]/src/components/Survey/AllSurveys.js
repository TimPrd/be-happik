import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import client from '../../api';
import { allUserSurvey } from './surveyMock';
import Button from '../Buttons/Button';
import { UserContext } from '../../contexts';

const Items = styled(Link)`
  width: 100%;
  height: ${props => props.theme.height.xlHeight}px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #f1f1f3;
  font-size: ${props => props.theme.custom.bigtext}px;
  font-weight: 300;
  text-align: left;
  color: #4d4d4d;

  text-decoration: none;

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
  width: 100%;
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

    try {
      let surveys = await client.get(`/api/user/${loggedUser.user.id}/surveys/`, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      surveys = allUserSurvey;

      return surveys;
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

              {user.RoleId === 2 && (
                <Col xs={6} sm={2}>
                  <Button label="Créer un sondate" handleClick={() => history.push('/survey/create')} type="submit" />
                </Col>
              )}
            </Row>

            {surveys && surveys.map((survey, index) => (
              <Row key={index.toString()}>
                <Col xs={12}>
                  <Items to={`/survey/reply/${survey.id}`}>
                    <Col sm={6}>
                      <Title>{survey.title}</Title>
                    </Col>
                    <Col sm={1}>
                      <Status className={this.getStatus(survey, 'class')}>
                        {this.getStatus(survey, 'noClass')}
                      </Status>
                    </Col>
                    <Col sm={2}>
                      <p>
                        Auteur :&nbsp;
                        {survey.author}
                      </p>
                    </Col>
                    <Col sm={3}>
                      <Col sm={12}>
                        Création : &nbsp;
                        {moment(survey.createdAt).format('D MMMM YYYY')}
                      </Col>
                      <Col sm={12}>
                        Expire : &nbsp;
                        {moment(survey.endDate).format('D MMMM YYYY')}
                      </Col>
                    </Col>
                  </Items>
                </Col>
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
