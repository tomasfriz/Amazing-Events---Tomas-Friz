
for (let i = 0; i < data.events.length; i++) {
    if (data.events[i].date > data.currentDate) {
        for (let key in data.events[i]) {
            console.log(`${key}: ${data.events[i][key]}`);
        }
    }
}
