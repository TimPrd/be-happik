import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: ${props => props.theme.height.height}px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.greyc1};
  padding: 8px;
  font-size: 12px;

  &.error {
    border: 1px solid ${props => props.theme.colors.rose85};
    color: ${props => props.theme.colors.rose85};

    &::placeholder {
      color: ${props => props.theme.colors.rose85};
    }
  }
`;

export default Input;
