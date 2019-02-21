import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import styled from 'styled-components';
import Select from 'react-select';

import AddTeams from './AddTeams';
import AddCollaborators from './AddCollaborators';
import CollaboratorCard from './CollaboratorCard';
import client from '../../api';
import Button from '../Buttons/Button';
import BorderedButton from '../Buttons/BorderedButton';

const Title = styled.h1`
  margin: 0;
  font-size: ${props => props.theme.custom.subtitle}px;
  font-weight: 600;
  text-align: left;
  color: ${props => props.theme.colors.grey4d};
`;
class Collaborators extends React.Component {
  state = {
    addUserModalOpen: false,
    addTeamsModalOpen: false,
    collaborators: null,
  }

  fetchCollaborators = async (team) => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const selectedTeam = team || 'ALL';

    try {
      const collaborators = await client.get(`/api/collaborators?team=${selectedTeam}`, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      return collaborators.data;
    } catch (err) {
      return null;
    }
  };

  componentDidMount = async () => {
    const collaborators = await this.fetchCollaborators();

    this.setState({ collaborators });
  };

  updateTeams = async (team) => {
    const collaborators = await this.fetchCollaborators(team);

    this.setState({ collaborators });
  };

  render() {
    const { addTeamsModalOpen, addUserModalOpen, collaborators } = this.state;
    let teams = collaborators
      && collaborators.teams.map(team => ({ value: team.teamName, label: team.teamName }));

    teams = teams && [{ value: 'ALL', label: 'Tous les collaborateurs' }, ...teams];

    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12} md={5}>
              <Title>Liste des collaborateurs</Title>
            </Col>
            <Col xs={6} md={2}>
              <BorderedButton label="Ajouter une équipe" handleClick={() => this.setState({ addTeamsModalOpen: true })} />
            </Col>

            <Col xs={6} md={2}>
              <Button label="Ajouter un collaborateur" handleClick={() => this.setState({ addUserModalOpen: true })} />
            </Col>

            {collaborators && (
              <Col xs={12} md={2}>
                <Select
                  options={teams}
                  onChange={option => this.updateTeams(option.value)}
                />
              </Col>
            )}
          </Row>
        </Col>

        <Col xs={12}>
          <Row>
            {collaborators && collaborators.employees.map((collaborator, index) => (
              <Col sm={6} md={4} lg={3} key={index.toString()}>
                <CollaboratorCard user={collaborator} />
              </Col>
            ))}
          </Row>
        </Col>

        {addTeamsModalOpen && (
          <AddTeams closeModal={() => this.setState({ addTeamsModalOpen: false })} />
        )}

        {addUserModalOpen && (
          <AddCollaborators
            closeModal={() => this.setState({ addUserModalOpen: false })}
            collaborators={collaborators}
          />
        )}
      </Row>
    );
  }
}

export default Collaborators;
