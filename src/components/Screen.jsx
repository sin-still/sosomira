import { useEffect } from 'react';

const Screen = (setVisibleCount) => { // Only receive the setter function
   useEffect(() => {
      function mediaProductCount() {
          const screenWidth = window.innerWidth;

          if (screenWidth <= 1023) {
            setVisibleCount(6); // Use the setter function to update visibleCount
          } else {
            setVisibleCount(8); // Use the setter function to update visibleCount
          }
      }

      mediaProductCount();
      window.addEventListener('resize', mediaProductCount);

      return () => {
          window.removeEventListener('resize', mediaProductCount);
      };
  }, [setVisibleCount]); // Use visibleCountSetter as a dependency
};

export default Screen;