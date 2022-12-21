import React from 'react';

const IconAdd = ({ size = '24' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      xmlSpace='preserve'
      width={size}
      height={size}
    >
      <path d='M480 224H288V32c0-17.673-14.327-32-32-32s-32 14.327-32 32v192H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h192v192c0 17.673 14.327 32 32 32s32-14.327 32-32V288h192c17.673 0 32-14.327 32-32s-14.327-32-32-32z' />
    </svg>
  );
};

export default IconAdd;
