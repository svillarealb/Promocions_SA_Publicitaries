const statsData = [
    { selector: "[data-target='experience']", value: 40 },
    { selector: "[data-target='visitors']", value: 10000000 },
    { selector: "[data-target='clients']", value: 100 },
    { selector: "[data-target='projects']", value: 200 }
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const duration = 2000;
  
    const animateValue = (el, target, duration) => {
      const startTime = performance.now();
  
      const step = currentTime => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
  
        el.innerText = value.toLocaleString();
  
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
  
      requestAnimationFrame(step);
    };
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statsData.forEach(stat => {
            const el = document.querySelector(stat.selector);
            if (el) {
              el.innerText = "0"; // 🔄 Reset a 0
              animateValue(el, stat.value, duration);
            }
          });
        }
      });
    }, {
      threshold: 0.6 // activa quan el 60% del bloc està visible
    });
  
    const section = document.querySelector(".stats-section");
    if (section) observer.observe(section);
  });
