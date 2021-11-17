const getShadow = ({ size }) => {
  switch (size) {
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
