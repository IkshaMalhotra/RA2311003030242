const scheduleTasks = (vehicles, limit) => {
  vehicles.sort((a, b) => (b.Impact / b.Duration) - (a.Impact / a.Duration));

  let time = 0, impact = 0, chosen = [];

  for (let v of vehicles) {
    if (time + v.Duration <= limit) {
      chosen.push(v);
      time += v.Duration;
      impact += v.Impact;
    }
  }

  return { selectedTasks: chosen, totalImpact: impact, totalTime: time };
};

module.exports = scheduleTasks;