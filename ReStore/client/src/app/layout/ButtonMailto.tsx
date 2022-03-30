import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  email: string;
  label: string;
}

const ButtonMailto: React.FC<Props> = ({ email, label }) => {
  return (
    <Link
      color="inherit"
      to="#"
      onClick={(e) => {
        window.location.href = `mailto:${email}`;
        e.preventDefault();
      }}
    >
      {label}
    </Link>
  );
};

export default ButtonMailto;
