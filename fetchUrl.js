fetch('https://my.spline.design/scrollflower-fES1Kq0czZPkYW33alDpb3Eo/')
    .then(r => r.text())
    .then(t => console.log(t.match(/https:\/\/prod\.spline\.design\/[^"'\/]+\/scene\.splinecode/)[0]))
    .catch(console.error);
