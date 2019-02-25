import React from 'react';
import { Col } from 'react-flexbox-grid';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import {
  Formik, Form, FieldArray,
} from 'formik';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Close from '../../assets/img/icons/Icon-Close.svg';
import Input from '../inputs';
import Button from '../Buttons/Button';
import client from '../../api';

import {
  ModalHeader, Title, Label, FormContainer, CloseIcon, InputContainer,
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

class Addcollaborators extends React.Component {
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
    const { collaborators } = this.props;

    const teams = collaborators.teams.map(team => ({ value: team.id, label: team.teamName }));

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
              Ajouter des collaborateurs
            </Title>

            Vous pouvez ajouter entre 1 et 10 collaborateurs à la fois,
            un e-mail d’invitation sera envoyé aux adresses renseignées
          </Col>
        </ModalHeader>

        <Formik
          initialValues={{ collaborators: new Array(10).fill({ email: '', team: null }) }}
          onSubmit={async (values) => {
            const loggedUser = JSON.parse(localStorage.getItem('user'));

            try {
              const response = await client.post('/api/user/register', values, {
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
            values, handleBlur, handleSubmit,
          }) => (
            <Form>
              <FieldArray
                name="collaborators"
                render={arrayHelpers => (
                  <FormContainer>
                    {values.collaborators && values.collaborators.length > 0 && (
                      values.collaborators.map((collaborator, index) => (
                        <Col xs={12} key={index.toString()}>
                          <InputContainer>
                            <Col xs={12}>
                              <Label>
                                Collaborateur #
                                {index + 1}
                              </Label>
                            </Col>

                            <Col xs={6}>
                              <Input
                                onBlur={handleBlur}
                                onChange={e => arrayHelpers.replace(index, {
                                  ...collaborator,
                                  email: e.target.value,
                                })}
                                name={`collaborators.${index}.email`}
                                value={collaborator.email}
                                type="email"
                                placeholder="Email du collaborateur"
                              />
                            </Col>

                            <Col xs={6}>
                              <Select
                                options={teams}
                                onChange={option => arrayHelpers.replace(index, {
                                  ...collaborator,
                                  team: option.value,
                                })}
                                name={`collaborators.${index}.team`}
                                // styles={colourStyles}
                              />
                            </Col>
                          </InputContainer>
                        </Col>
                      ))
                    )}
                  </FormContainer>
                )}
              />
              <Col xsOffset={3} xs={6}>
                <Button type="submit" label="Envoyer une invitation" handleClick={handleSubmit} />
              </Col>
            </Form>
          )}
        />
      </Modal>
    );
  }
}

Addcollaborators.propTypes = {
  closeModal: PropTypes.func.isRequired,
  collaborators: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default Addcollaborators;
