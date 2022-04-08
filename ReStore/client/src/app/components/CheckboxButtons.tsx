import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

const CheckboxButtons: React.FC<Props> = ({ items, checked, onChange }) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const hangleChecked = (value: string) => {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) {
      newChecked = [...checkedItems, value];
    } else {
      newChecked = checkedItems.filter(item => item !== value);
    }
    setCheckedItems(newChecked);
    onChange(newChecked);
  };
  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={checkedItems.indexOf(item) !== -1}
              onClick={() => hangleChecked(item)}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxButtons;
