import React, { useState } from 'react';
import { Button } from 'reactstrap';

function ButtonAdd(props) {
    const { text, btnAddChange } = props;
    return (
        <Button onClick={() => btnAddChange()} color="success">{text}</Button>
    )
}

export default ButtonAdd;