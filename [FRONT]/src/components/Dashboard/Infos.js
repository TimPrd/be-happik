import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import client from '../../api';
import UserNumber from '../../assets/img/icons/Icon-AddUser.svg';
import SpinIcon from '../../assets/img/icons/Icon-Spin.svg';


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 0 10%;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const InfosTitle = styled.h2`
  width: 100%;
  font-size: ${props => props.theme.custom.subtitle}px;
  text-align: left;
  margin: 0;
  font-weight: normal;
  border-bottom: 1px solid ${props => props.theme.colors.greyec};
  padding: 25px 0;
`;

const InfosSections = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.custom.bigtext}px 0;
  border-bottom: 1px solid ${props => props.theme.colors.greyec};

  &:last-child {
    border-bottom: 0;
  }
`;

const InfosSectionsText = styled.div`
  font-size: ${props => props.theme.custom.mediumtext}px;
  flex-grow: 1;
  text-align: left;
  padding: 0 ${props => props.theme.custom.bigtext}px;
`;

const InfosSectionsNumber = styled.div`
  font-weight: 600;
  font-size: ${props => props.theme.custom.bigtext}px;
`;

class GlobalInfo extends React.Component {

  state = {
    surveysDone: [],
    teams: [],
    collaborator: []
  };


  fetchData = async () => {

    const loggedUser = JSON.parse(localStorage.getItem('user'));
    console.log(loggedUser);
    try {
      let globalInfos = await client.get(`/api/analytic/count`, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

     return globalInfos

    } catch (error) {
      toast.error('error' + error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  componentDidMount = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser.user.RoleId === "1") {


      var globalInfos = await this.fetchData();

      this.setState({
        collaborator: globalInfos.data.collaborators,
        surveysDone: globalInfos.data.surveysDone,
        teams: globalInfos.data.teams
      });
    }
  }


  render() {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser.user.RoleId === "1") {
    const surveysDone = this.state.surveysDone;
    const teams = this.state.teams;
    const collaborators = this.state.collaborator

 

    return (
      <div>

        <Container>
          <InfosTitle>
            Informations générales
          </InfosTitle>

          <InfosSections>

            <Icon src={SpinIcon} />

            <InfosSectionsText>
              Nombre de sondages terminés
              </InfosSectionsText>
            <InfosSectionsNumber>
              {surveysDone["count"]}
            </InfosSectionsNumber>

          </InfosSections>

          <InfosSections>

            <Icon src={SpinIcon} />

            <InfosSectionsText>
              Nombre d'équipes
              </InfosSectionsText>
            <InfosSectionsNumber>
              {teams["count"]}
            </InfosSectionsNumber>

          </InfosSections>

          <InfosSections>

            <Icon src={UserNumber} />

            <InfosSectionsText>
              Nombre d'employés
            </InfosSectionsText>
            <InfosSectionsNumber>
              {collaborators["count"]}
            </InfosSectionsNumber>

          </InfosSections>


        </Container>


      </div>

    )

    } else {
      return false
    }
  }

}

export default GlobalInfo;
