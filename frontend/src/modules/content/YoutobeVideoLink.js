import React, { useState } from 'react';
import { TextField } from "@mui/material";

const YoutobeVideoLink = () => {
  const [inputs, setInputs] = useState(['']);

  const handleAddInput = () => {
    if (inputs.length < 3) {
      setInputs([...inputs, '']);
    }
  };

  const handleRemoveInput = (index) => {
    if (inputs.length > 1) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index} style={{ display: 'grid' }}>
          <TextField
            type="text"
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            variant="outlined"
            label="Youtobe Video"
            autoComplete="off"
          />
          {inputs.length > 1 && <button onClick={() => handleRemoveInput(index)} style={{ marginBottom: 10 }} >Eliminar</button>}
        </div>
      ))}
      <div style={{ display: 'grid' }}>
        {inputs.length < 3 && <button onClick={handleAddInput}>Agregar</button>}
      </div>
    </div>
  );
};

export default YoutobeVideoLink;