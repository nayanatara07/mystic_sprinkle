import { useEffect } from "react";

class PointerParticle {
  constructor(spread, speed, component) {
    const { ctx, pointer, hue } = component;

    this.ctx = ctx;
    this.x = pointer.x;
    this.y = pointer.y;
    this.mx = pointer.mx * 0.1;
    this.my = pointer.my * 0.1;
    this.size = Math.random() + 1;
    this.decay = 0.01;
    this.speed = speed * 0.08;
    this.spread = spread * this.speed;
    this.spreadX = (Math.random() - 0.5) * this.spread - this.mx;
    this.spreadY = (Math.random() - 0.5) * this.spread - this.my;
    this.color = `hsl(${hue}deg 90% 60%)`;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  collapse() {
    this.size -= this.decay;
  }

  trail() {
    this.x += this.spreadX * this.size;
    this.y += this.spreadY * this.size;
  }

  update() {
    this.draw();
    this.trail();
    this.collapse();
  }
}

const PointerParticles = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const sheet = new CSSStyleSheet();
    const pointerParticles = document.createElement("pointer-particles");

    const pointer = { x: 0, y: 0, mx: 0, my: 0 };
    let hue = 0;
    const particles = [];
    const fps = 60;
    const msPerFrame = 1000 / fps;
    let timePrevious;

    const setCanvasDimensions = () => {
      const rect = document.body.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const handleParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();

        if (particles[i].size <= 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }
    };

    const animateParticles = () => {
      requestAnimationFrame(animateParticles);

      const timeNow = performance.now();
      const timePassed = timeNow - timePrevious;

      if (timePassed < msPerFrame) return;

      const excessTime = timePassed % msPerFrame;
      timePrevious = timeNow - excessTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hue = hue > 360 ? 0 : (hue += 3);

      handleParticles();
    };

    const ctx = canvas.getContext("2d");
    setCanvasDimensions();
    document.body.appendChild(canvas);
    timePrevious = performance.now();
    animateParticles();

    document.addEventListener("click", (event) => {
      pointer.x = event.x - canvas.offsetLeft;
      pointer.y = event.y - canvas.offsetTop;
      pointer.mx = event.movementX;
      pointer.my = event.movementY;
      for (let i = 0; i < 300; i++) {
        particles.push(new PointerParticle(Math.random() + 50, Math.random() + 1, { ctx, pointer, hue }));
      }
    });

    document.addEventListener("pointermove", (event) => {
      pointer.x = event.x - canvas.offsetLeft;
      pointer.y = event.y - canvas.offsetTop;
      pointer.mx = event.movementX;
      pointer.my = event.movementY;
      const speed = Math.floor(Math.sqrt(event.movementX * event.movementX + event.movementY * event.movementY));
      for (let i = 0; i < 20; i++) {
        particles.push(new PointerParticle(1, speed, { ctx, pointer, hue }));
      }
    });

    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return null;
};

export default PointerParticles;
