require('./utils/monitorCPU');
const os = require('os');
const { exec } = require('child_process');

setInterval(() => {
    const cpus = os.cpus();
    let idle = 0, total = 0;

    cpus.forEach(cpu => {
        for (let type in cpu.times) {
            total += cpu.times[type];
        }
        idle += cpu.times.idle;
    });

    const usage = 100 - (idle / total) * 100;
    if (usage > 70) {
        console.log('High CPU usage. Restarting...');
        exec('pm2 restart all'); // 
    }
}, 10000); 
