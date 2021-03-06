(function() {

  setInterval(function() { createBubble('B1.png', 4); }, 400);
  setInterval(function() { createBubble('B2.png', 6); }, 300);
  setInterval(function() { createBubble('B3.png', 8); }, 200);
  setInterval(function() { createBubble('B4.png', 10); }, 100);

  requestAnimationFrame(animateBubbles);
})();

var bubbles = [];

function getDocSize() {
  return {
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
  };
}

function animateBubbles() {
  var newBubbles = [];

  bubbles.forEach(function(bubble, index) {
    if (index > 100) {
      document.body.removeChild(bubble.element);
      return;
    }

    bubble.currentPos = bubble.currentPos - bubble.speed;
    bubble.element.style.transform = 'translateY(' + bubble.currentPos + 'px)';

    if (bubble.currentPos > -(getDocSize().height + 33)) {
      newBubbles.push(bubble);
    } else {
      document.body.removeChild(bubble.element);
    }
  });

  bubbles = newBubbles;

  requestAnimationFrame(animateBubbles);
}

function createBubble(image, speed) {
  let size = getDocSize();

  var bubble = document.createElement('img');
  bubble.setAttribute('src', image);
  bubble.className = 'bubble';
  bubble.style.left = (Math.random() * size.width) + 'px';

  bubbles.push({
    element: bubble,
    speed: speed,
    currentPos: 0
  });

  document.body.appendChild(bubble);
}
