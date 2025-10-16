import React from 'react';

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.11 18.27 3.655 14.51 3 11.75 2.016 8.08 4.76 5.25 8.25 5.25c1.766 0 3.355.63 4.5 1.688 1.145-1.058 2.734-1.688 4.5-1.688 3.49 0 6.234 2.83 5.25 6.5C20.345 14.51 15.89 18.27 13.51 20.531l-.265.234-.265-.234c-.11-.097-.22-.195-.33-.294Z" />
  </svg>
);
