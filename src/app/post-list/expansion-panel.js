const parentContainer = document.querySelector('.parent-container');
const childContainers = parentContainer.querySelectorAll('.child-container');

let minHeight = Infinity;

// Loop through child containers to find the minimum height
childContainers.forEach(container => {
  const containerHeight = container.offsetHeight;
  minHeight = Math.min(minHeight, containerHeight);
});

// Set the minimum height to the parent container
parentContainer.style.height = `${minHeight}px`;
