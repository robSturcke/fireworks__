const max_fireworks = 5,
      max_sparks = 50;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let fireworks = [];

for (let i = 0; i < max_fireworks; i++) {
  let firework = {
    sparks: []
  };

  for (let n = 0; n < max_sparks; n++) {
    let spark = {
      vx: Math.random() * 5 + .5,
      vy: Math.random() * 5 + .5,
      weight: Math.random() * .3 + .03,
      red: Math.floor(Math.random() * 2),
      green: Math.floor(Math.random() * 2),
      blue: Math.floor(Math.random() * 2)
    };

    if (Math.random() > .5) spark.vx = -spark.vx;
    if (Math.random() > .5) spark.vy = -spark.vy;

    firework.sparks.push(spark);
  }

  fireworks.push(firework);
  resetFirework(firework);
}

window.requestAnimationFrame(explode);

function resetFirework(firework) {
  firework.x = Math.floor(Math.random() * canvas.width);
  firework.y = canvas.height;
  firework.duration = 0;
  firework.phase = 'fly';
}

function explode() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    if (firework.phase == 'explode') {
      firework.sparks.forEach((spark) => {
        for (let i = 0; i < 10; i++) {
          let trailDuration = firework.duration + i;
          let x = firework.x + spark.vx * trailDuration;
          let y = firework.y + spark.vy * trailDuration + spark.weight * trailDuration * spark.weight * trailDuration;
          let fade = i * 20 - firework.duration * 2;
          let r = Math.floor(spark.red * fade);
          let g = Math.floor(spark.green * fade);
          let b = Math.floor(spark.blue * fade);
          context.beginPath();
          context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
          context.rect(x, y, 4, 4);
          context.fill();
        }
      });

      firework.duration++;

      if (firework.duration > 100  && Math.random() < .05) {
        resetFirework(firework);
      }
    } else {
      firework.y = firework.y - 10;
      for (let spark = 0; spark < 15; spark ++) {
        context.beginPath();
        context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
        context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
        context.fill();
      }

      if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
    }
  });

  window.requestAnimationFrame(explode);
}
