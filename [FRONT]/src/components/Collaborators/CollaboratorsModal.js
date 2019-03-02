import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';

const ModalHeader = styled.div`
  margin-bottom: ${props => props.theme.custom.bigtext}px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${props => props.theme.custom.subtitle}px;
  font-weight: 300;
  text-align: left;
  color: ${props => props.theme.colors.greyd4}greyd4;
  padding-bottom: ${props => props.theme.custom.subtitle}px;
  margin-bottom: ${props => props.theme.custom.subtitle}px;

  border-bottom: 1px solid ${props => props.theme.colors.greyd4};
`;

const Label = styled.label`
  display: inline-block;
  margin: ${props => props.theme.custom.text}px 0;
`;

const FormContainer = styled.div`
  overflow: auto;
  max-height: 40vh;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled(Row)`
  display: flex;
  margin: 8px 0;
`;

const CloseIcon = styled.img`
  width: ${props => props.theme.custom.bigtext}px;
  heiht: ${props => props.theme.custom.bigtext}px;
  position: absolute;
  top: ${props => props.theme.height.height}px;
  right: ${props => props.theme.height.height}px
`;

export {
  ModalHeader, Title, Label, FormContainer, CloseIcon, InputContainer,
};
