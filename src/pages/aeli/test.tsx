import React, { useEffect } from 'react';

function MyComponent() {
  const handleScroll = (props:any) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById('targetElement');
      if (element) {
        const offset = 100;
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div>
      {/* Konten komponen */}

        <button onClick={handleScroll}>Scroll to Element</button>
   
      <div className='mt-[1000px]' id='targetElement'>Target Element</div>
    </div>
  );
}

export default MyComponent;
