import React from 'react';
import Button from "react-bootstrap/Button";

const ButtonComponent = ({text, onClick}) => {
  const handleOnClick = () => {
    onClick()
  }

  return(
    <Button onClick={handleOnClick} data-testid="button-container">
      {text}
    </Button>
  )
};

export default ButtonComponent;