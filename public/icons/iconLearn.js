import React from 'react';

const IconLearn = ({ size = '24', color = 'black' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      xmlSpace='preserve'
      width={size}
      height={size}
    >
      <path
        fill={color}
        d='M468.096 107.435c-.875-.512-153.301-70.869-153.301-70.869a121.877 121.877 0 0 0-117.589 0S44.801 106.923 43.905 107.435c-40.813 22.217-55.888 73.314-33.671 114.127a84.139 84.139 0 0 0 33.671 33.671c.896.512 62.763 29.099 62.763 29.099v100.843c.06 43.435 28.345 81.789 69.824 94.677a275.838 275.838 0 0 0 79.509 10.816 275.833 275.833 0 0 0 79.509-10.816c41.479-12.889 69.764-51.243 69.824-94.677V284.331L448 264.661V416c0 17.673 14.327 32 32 32s32-14.327 32-32V180.501c-.846-31.457-15.879-59.413-43.904-73.066zM341.333 385.173c.078 15.245-9.754 28.774-24.277 33.408a235.617 235.617 0 0 1-122.112 0 34.88 34.88 0 0 1-24.277-33.408v-71.317l26.539 12.245a121.597 121.597 0 0 0 117.589 0l26.539-12.245v71.317zm95.68-185.92s-152.085 70.187-152.939 70.699a56.788 56.788 0 0 1-56.149 0c-.853-.512-152.939-70.699-152.939-70.699-9.897-5.049-13.827-17.165-8.778-27.062a20.12 20.12 0 0 1 8.778-8.778s152.085-70.187 152.939-70.699a56.788 56.788 0 0 1 56.149 0c.853.512 152.939 70.699 152.939 70.699 9.897 5.049 13.827 17.165 8.778 27.062a20.11 20.11 0 0 1-8.778 8.778z'
      />
    </svg>
  );
};

export default IconLearn;
