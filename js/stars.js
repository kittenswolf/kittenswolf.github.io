function draw_star(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();

    ctx.fillStyle='#ffff66';

    ctx.fill();
}

function paint_star_canvas(canvas_id, rating) {
    canvas = document.getElementById(canvas_id);
    ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // only for testing purposes

    x_index = 13;
    for(a=0; a < 5; a++) {
        draw_star(x_index, 14, 5, 14, 7);

        x_index += 26;
    }

    if (rating < 4.95) {
        rect_pos = 25 * rating;
        ctx.rect(rect_pos, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#'+Math.random().toString(16).substr(-6);
        ctx.fill();
    }
}

function average_rating(weighted_rating, num_votes) {
    var a = 10;
    var b = 2.5;

    if(num_votes == 0) {
        var c = 0;
    } else {
        var c = (weighted_rating - b * a / (num_votes + a)) / (num_votes / (num_votes + a));
    }

    return Math.min(5, Math.max(c, 0));
}

function paint_canvas(canvas_id, rating, num_votes) {
    var averaged_rating = average_rating(rating, num_votes);

    console.log(averaged_rating);

    paint_star_canvas(canvas_id, averaged_rating);
}


function on_ready() {
    var slider = document.getElementById("bepis");

    slider.oninput = function() {
        paint_star_canvas("star_canvas", this.value);
    } 
}