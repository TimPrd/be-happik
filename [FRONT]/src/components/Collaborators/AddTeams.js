import React from 'react';
import { Col } from 'react-flexbox-grid';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import {
  Formik, Form, FieldArray,
} from 'formik';
import PropTypes from 'prop-types';

import Close from '../../assets/img/icons/Icon-Close.svg';
import Input from '../inputs';
import Button from '../Buttons/Button';
import client from '../../api';

import {
  ModalHeader, Title, Label, FormContainer, CloseIcon,
} from './CollaboratorsModal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    padding: '36px',
  },
};

class AddTeams extends React.Component {
  state = {
    modalIsOpen: false,
  };

  componentDidMount = () => {
    this.openModal();
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    const { closeModal } = this.props;

    this.setState({ modalIsOpen: false });
    closeModal();
  };

  render() {
    const { modalIsOpen } = this.state;

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalHeader>
          <Col xs={12}>
            <CloseIcon src={Close} onClick={this.closeModal} />
          </Col>

          <Col xs={12}>
            <Title>
              Ajouter des équipes
            </Title>

            Vous pouvez ajouter entre 1 et 10 équipes à la fois, ainsi, vos
            collaborateurs pourront être assignés à ces équipes
          </Col>
        </ModalHeader>

        <Formik
          initialValues={{ teams: new Array(10).fill('') }}
          onSubmit={async (teams) => {
            const loggedUser = JSON.parse(localStorage.getItem('user'));

            try {
              const response = await client.post('/api/team/', teams, {
                headers: {
                  Authorization: `Bearer ${loggedUser.token}`,
                  'Content-Type': 'application/json',
                },
              });

              this.closeModal();

              toast.success(response.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
              });
            } catch (error) {
              toast.error('error', {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          }}
          render={({
            values, handleBlur, handleChange, handleSubmit,
          }) => (
            <Form>
              <FieldArray
                name="teams"
                render={() => (
                  <FormContainer>
                    {values.teams && values.teams.length > 0 && (
                      values.teams.map((team, index) => (
                        <Col xs={12} smOffset={3} sm={6} key={index.toString()}>
                          <Label>Nom de l’équipe</Label>
                          <Input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name={`teams.${index}`}
                          />
                        </Col>
                      ))
                    )}
                  </FormContainer>
                )}
              />
              <Col xsOffset={3} xs={6} smOffset={4} sm={4}>
                <Button type="submit" label="Envoyer une invitation" handleClick={handleSubmit} />
              </Col>
            </Form>
          )}
        />
      </Modal>
    );
  }
}

AddTeams.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddTeams;
