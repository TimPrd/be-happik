import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  margin: 5px;
  padding: 0;
  border: 2px solid #000;
  border-radius: 3px;
  box-sizing: border-box;
`;


const AddItem = ({ label, handleClick }) => (
  <Button type="button" onClick={handleClick}>
    {label}
  </Button>
);

export default AddItem;
