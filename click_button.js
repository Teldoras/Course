click_button.addEventListener('mouseover', function () {
    click_button.style.width = '68px';
    click_button.style.height = '68px';
})
click_button.addEventListener('mousedown', function () {
    gold_amount += click_power;
    total_gold += click_power;
    header.textContent = 'Золота: ' + gold_amount;
    clicks_per_time_increasing(0);
    click_button.style.width = '60px';
    click_button.style.height = '60px';
    if (tutorial_checked[0] == 0) {
        tutorial(0);
    }
    play_sound(1)
});
click_button.addEventListener('mouseup', function () {
    click_button.style.width = '68px';
    click_button.style.height = '68px';
})
click_button.addEventListener('mouseout', function () {
    click_button.style.width = '64px';
    click_button.style.height = '64px';
})

function play_sound(index)
{
    var sound = new Audio ();
    switch(index)
    {
        case 0:
            var bg_music = new Audio ('resourses/audio/background_1.mp3')
            bg_music.autoplay = true;
            break;
        case 1:
            switch (Math.floor(Math.random() * 2)) {
                case 0:
                    sound.src = 'resourses / audio / coin_1.mp3';
                    sound.play();
                    break;
                case 1:
                    sound.src = 'resourses / audio / coin_2.mp3';
                    sound.play();
                    break;
            }
        case 2:
    }
}