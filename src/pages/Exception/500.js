import React from 'react';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception500 = () => ( <Exception type ="500"
  desc ='500'
  linkElement= {
    Link
  }
  backText= 'back'
/>
);

export default Exception500;
