export const handleTiltMouseMove = (e, target) => {
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const maxTilt = 15;

  const tiltX = (maxTilt * y) / (rect.height / 2);
  const tiltY = -(maxTilt * x) / (rect.width / 2);

  target.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
};

export const handleTiltMouseLeave = (target) => {
  target.style.transform = `rotateX(0deg) rotateY(0deg)`;
};
