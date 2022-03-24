const getShadow = ({ size }) => {
  switch (size) {
    case 'SOFT_L':
      return 'box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.06);';
    case 'SM':
      return 'box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);';
    case 'MD':
      return 'box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.24);';
    case 'LG':
      return 'box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.24);';
    default:
      return 'box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);';
  }
};

export default getShadow;
