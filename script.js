let header = document.getElementById('header');
let clicker = document.getElementById('clicker')
let click_button = document.getElementById('click_button');
let save_button = document.getElementById('save_button');
let load_button = document.getElementById('load_button');
let statistic_button = document.getElementById('statistic_button');
let wipe_button = document.getElementById('wipe_button');
let shop_open = document.getElementById('shop_open');
let shop_close = document.getElementById('shop_close');
let settings_open = document.getElementById('settings_open');
let settings_close = document.getElementById('settings_close');
let form_1 = document.getElementById('form_1');
let form_2 = document.getElementById('form_2');
let choose_color = document.getElementById('choose_color_id');
let submit_color = document.getElementById('submit_color');
let bg_volume = document.getElementById('bg_volume_id');
let upgrade_shop = document.getElementById('upgrade_shop');
let settings_menu = document.getElementById('settings_menu');
let ad_box = document.getElementById('advertisement_box');
let ad_text = document.getElementById('advertisement_text');
let upgrade_1_button = document.getElementById('upgrade_1');
let upgrade_2_button = document.getElementById('upgrade_2');
let upgrade_3_button = document.getElementById('upgrade_3');
let upgrade_4_button = document.getElementById('upgrade_4');
let upgrade_5_button = document.getElementById('upgrade_5');
let darkmode = document.getElementById('darkmode');
let pop_up = document.getElementById('pop_up');
let pop_up_text = document.getElementById('pop_up_text');
let style_massive = document.getElementsByClassName('changable_style');
let click_per_time_text = document.getElementById('click_per_time');
let session_time = document.getElementById('session_time');
let font_1 = document.getElementById('font_1');
let font_2 = document.getElementById('font_2');
let game_field = document.getElementById('game_field');

let clicker_info = document.getElementById('clicker_info');
 
let moved_object_data = [0,0,0,0]; // id, moving, x, y
let object_movement_state = [0, 0];
let moving_object_position = [0, 0];

let bg_music = new Audio('resourses/audio/background_1.mp3');

let ad_state;

let seconds = 0;
let minutes = 0;
let hours = 0;
let total_playtime_seconds = 0;
let click_per_time_amount = 0;

let mouse_position_x = 0,
    mouse_position_y = 0;

let tutorial_checked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let gold_amount = 0;
let total_gold = gold_amount;
let upgrade_tier = [0, 0, 0, 0, 0];
let base_upgrade_cost = [10, 50, 200, 500, 1000];
let upgrade_cost = [10, 50, 200, 500, 1000];
let base_click_power = 1;
let click_power_modifier = 0;
let click_power = 1;

// события в разработке



// События

document.addEventListener('DOMContentLoaded', function () {
    count_session_time();
    setInterval(count_clicks_per_time, 1000);
    ad_change(0);
})
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter') {
        click_button.blur();
        MouseEvent.movementX;
    }
    if (event.code == 'Escape') {
        close_pop_up();
        stop_movement(moved_object_data[0]);
        //shop_close
        shop_close.style.display = "none";
        shop_open.style.display = "inline";
        upgrade_shop.style.visibility = "hidden";
        //setting_close
        settings_close.style.display = "none";
        settings_open.style.display = "inline";
        settings_menu.style.visibility = "hidden"; x
    }
});

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
        play_sound(0);
    }
    play_sound(1);
});
click_button.addEventListener('mouseup', function () {
    click_button.style.width = '68px';
    click_button.style.height = '68px';
})
click_button.addEventListener('mouseout', function () {
    click_button.style.width = '64px';
    click_button.style.height = '64px';
})




upgrade_1_button.addEventListener('click', function () {
    buy__basic_upgrade(this, 0);
    play_sound(2);
});
upgrade_2_button.addEventListener('click', function () {
    buy__basic_upgrade(this, 1);
    play_sound(2);
});
upgrade_3_button.addEventListener('click', function () {
    buy__basic_upgrade(this, 2);
    play_sound(2);
});
upgrade_4_button.addEventListener('click', function () {
    if (gold_amount >= upgrade_cost[3]) {
        gold_amount -= upgrade_cost[3];
        upgrade_tier[3]++;
        refresh_data();
        this.textContent = 'Улучшить печь: +5% (+' + Math.floor(base_click_power * 0.05) + ') - ' + upgrade_cost[3] + ' з.';
    }
    else {
        error(1);
    }
    play_sound(2);
});
upgrade_5_button.addEventListener('click', function () {
    if (gold_amount >= upgrade_cost[4]) {
        gold_amount -= upgrade_cost[4];
        upgrade_tier[4]++;
        refresh_data();
        this.textContent = 'Нанять работника - ' + upgrade_cost[4] + ' з. (Сейчас ' + upgrade_tier[4] + ', +' + upgrade_tier[4] * click_power + ' з./мин.)';
        if (tutorial_checked[5] == 0) {
            tutorial(5);
            auto_click();
        }
    }
    else {
        error(1);
    }
    play_sound(2);
});

shop_open.addEventListener('click', function () {

    this.style.display = "none";
    shop_close.style.display = "inline";
    upgrade_shop.style.visibility = "visible";
    if (tutorial_checked[1] == 0) {
        tutorial(1);
    }
})
shop_close.addEventListener('click', function () {
    shop_close.style.display = "none";
    shop_open.style.display = "inline";
    upgrade_shop.style.visibility = "hidden";
})
settings_open.addEventListener('click', function () {
    this.style.display = "none";
    settings_close.style.display = "inline";
    settings_menu.style.visibility = "visible";
})
settings_close.addEventListener('click', function () {
    settings_close.style.display = "none";
    settings_open.style.display = "inline";
    settings_menu.style.visibility = "hidden";
})
submit_color.addEventListener('click', function (choosed_color) {
    choosed_color.preventDefault();
    for (let i = 0; i < style_massive.length; i++) {
        let r = parseInt((choose_color.value).slice(1, 3), 16);
        r_l = r + ((255 - r) / 3);
        r_d = r - (r / 3);
        let g = parseInt((choose_color.value).slice(3, 5), 16);
        g_l = g + ((255 - g) / 3);
        g_d = g - (g / 3);
        let b = parseInt((choose_color.value).slice(5, 7), 16);
        b_l = b + ((255 - b) / 3);
        b_d = b - (b / 3);
        style_massive[i].style.backgroundColor = choose_color.value;
        style_massive[i].style.backgroundColor = "rgb(" + r_l + "," + g_l + "," + b_l + ")";
        style_massive[i].style.color = "rgb(" + r_d + "," + g_d + "," + b_d + ")";
        style_massive[i].style.border = "3px solid rgb(" + r_d + "," + g_d + "," + b_d + ")";
    }
})

font_1.addEventListener('click', function () {
    game_field.style.fontFamily = '"Courier"';
})
font_2.addEventListener('click', function () {
    game_field.style.fontFamily = '"Times New Roman"';
})

save_button.addEventListener('click', function () {
    if (tutorial_checked[7] == 0) {
        tutorial(7)
    }
    temp_bool = confirm('Вы уверены что хотите перезаписать сохранение?')
    if (temp_bool == true) {
        save_data();
    }
})
load_button.addEventListener('click', function () {
    load_data();
})
statistic_button.addEventListener('click', function () {
    pop_up_text.textContent = 'Канарейка накромлена ' + upgrade_tier[0] + ' раз. \r\n';
    pop_up_text.textContent += 'Тележка смазана ' + upgrade_tier[1] + ' раз \r\n';
    pop_up_text.textContent += 'Кирка закалена ' + upgrade_tier[2] + ' раз' + '\r\n';
    pop_up_text.textContent += 'Печь улучшена ' + upgrade_tier[3] + ' раз' + '\r\n';
    pop_up_text.textContent += 'Работников нанято: ' + upgrade_tier[4] + ' ';
    pop_up_text.textContent += 'Всего добыто ' + total_gold + ' золота.';
    go_dark();
})
wipe_button.addEventListener('click', function () {
    result = confirm('Вы уверены что хотите удалить сохранения?');
    if (result == true) {
        localStorage.clear();
        total_gold = 0;
        gold_amount = 0;
        upgrade_tier = [0, 0, 0, 0, 0];
        refresh_data();
    }
})

darkmode.addEventListener('click', function () {
    close_pop_up();
})
ad_text.addEventListener('click', function () {
    redirect('adv');
})
bg_volume.addEventListener('change', function () {

    bg_music.volume = parseInt(this.value) / 100;

})
document.addEventListener('keydown', function () {

})

//Функции

function buy__basic_upgrade(button_id, number) {
    if (gold_amount >= upgrade_cost[number]) {
        gold_amount -= upgrade_cost[number];
        upgrade_tier[number]++;
        refresh_data();
        switch (number) {
            case 0:
                button_id.textContent = 'Покормить канарейку: +' + (number + 1) + ' (+' + ((number + 1) + upgrade_tier[3] * (number + 1) * 5 / 100) + ') - ' + upgrade_cost[number] + ' з.';
                break;
            case 1:
                button_id.textContent = 'Смазать тележку: +' + (number + 1) + ' (+' + ((number + 1) + upgrade_tier[3] * (number + 1) * 5 / 100) + ') - ' + upgrade_cost[number] + ' з.';
                break;
            case 2:
                button_id.textContent = 'Закалить кирку: +' + (number + 1) + ' (+' + ((number + 1) + upgrade_tier[3] * (number + 1) * 5 / 100) + ') - ' + upgrade_cost[number] + ' з.';
                break;
        }
    }
    else {
        error(1);
    }
}

function save_data() {
    localStorage.setItem('saved_gold', gold_amount);
    localStorage.setItem('saved_tiers', JSON.stringify(upgrade_tier));
    localStorage.setItem('saved_playtime', total_playtime_seconds);
    localStorage.setItem('saved_tutorial', JSON.stringify(tutorial_checked));
    localStorage.setItem('saved_total_score', total_gold);
    pop_up_text.textContent = 'Прогресс сохранён.';
    pop_up_slide(0);
}
function autosave() {
    save_data();
    setTimeout(autosave, 300000)
}
function load_data() {
    if (tutorial_checked[0] == 0) {
        play_sound(0);
    }
    if (tutorial_checked[7] == 0) {
        setTimeout(autosave, 300000);
    }
    if (localStorage.getItem('saved_gold') != null) {
        gold_amount = parseInt(localStorage.getItem('saved_gold'));
        header.textContent = 'Золота: ' + gold_amount;
    }
    else {
        error(2);
        return;
    }
    if (localStorage.getItem('saved_gold') != null) {
        total_gold = parseInt(localStorage.getItem('saved_total_score'));
    }
    else {
        error(2);
        return;
    }
    if (localStorage.getItem('saved_tiers') != null) {
        upgrade_tier = JSON.parse(localStorage.getItem('saved_tiers'));
        refresh_data();
        upgrade_1_button.textContent = 'Покормить канарейку: +1 (+' + (1 + upgrade_tier[3] * 5 / 100) + ') - ' + upgrade_cost[0] + ' з.';
        upgrade_2_button.textContent = 'Смазать тележку: +2 (+' + (2 + upgrade_tier[3] * 10 / 100) + ') - ' + upgrade_cost[1] + ' з.';
        upgrade_3_button.textContent = 'Закалить кирку: +3 (+' + (3 + upgrade_tier[3] * 15 / 100) + ') - ' + upgrade_cost[2] + ' з.';
        auto_click();
    }
    else {
        error(2);
        return;
    }
    if (localStorage.getItem('saved_playtime') != null) {
        total_playtime_seconds = parseInt(localStorage.getItem('saved_playtime')); session_time.textContent = 'Время сессии (все секунды): ' + total_playtime_seconds + '\n';
        seconds = total_playtime_seconds % 60;
        minutes = Math.floor(total_playtime_seconds / 60) % 60;
        hours = Math.floor(Math.floor(total_playtime_seconds / 60) / 60);
        session_time.textContent = 'Время сессии: ' + hours + ':' + minutes + ':' + seconds;
    }
    else {
        error(2);
        return;
    }
    if (localStorage.getItem('saved_tutorial') != null) {
        tutorial_checked = JSON.parse(localStorage.getItem('saved_tutorial'));
    }
    else {
        error(2);
        return;
    }
}
function refresh_data() {
    for (let i = 0; i < 5; i++) {
        upgrade_cost[i] = Math.floor(base_upgrade_cost[i] * Math.pow(1.20 + i * 0.05, upgrade_tier[i]));
    }
    base_click_power = 1 + upgrade_tier[0] * 1 + upgrade_tier[1] * 2 + upgrade_tier[2] * 3;
    click_power_modifier = upgrade_tier[3] * 0.05;
    click_power = Math.floor(base_click_power * (1 + click_power_modifier));
    click_button.textContent = click_power;
    upgrade_5_button.textContent = textContent = 'Нанять работника - ' + upgrade_cost[4] + ' з. (Сейчас ' + upgrade_tier[4] + ', +' + upgrade_tier[4] * click_power + ' з./мин.)';
    header.textContent = 'Золота: ' + gold_amount;
    upgrade_4_button.textContent = 'Улучшить печь: +5% (+' + Math.floor(base_click_power * 0.05) + ') - ' + upgrade_cost[3] + ' з.';
}
function count_clicks_per_time() {
    click_per_time_text.textContent = 'Кликов в минуту: ' + (click_per_time_amount / 10 * 60).toFixed(2);
}
function clicks_per_time_increasing(index) {
    click_per_time_amount += 1;
    setTimeout(clicks_per_time_reducing, 10000);
}
function clicks_per_time_reducing(index) {
    click_per_time_amount -= 1;
}
function count_session_time() {
    total_playtime_seconds += 1;
    seconds += 1;
    if (seconds == 60) {
        seconds -= 60;
        minutes += 1;
        if (minutes == 60) {
            minutes -= 60;
            hours += 1;
        }
    }
    session_time.textContent = 'Время сессии: ';
    if (hours < 10) session_time.textContent += '0' + hours + ':';
    else session_time.textContent += hours + ':';
    if (minutes < 10) session_time.textContent += '0' + minutes + ':';
    else session_time.textContent += minutes + ':';
    if (seconds < 10) session_time.textContent += '0' + seconds;
    else session_time.textContent += seconds;
    setTimeout(count_session_time, 1000);
}
function auto_click() {
    if (upgrade_tier[4] != 0) {
        auto_click_time = Math.floor(60000 / upgrade_tier[4]);
        setTimeout(auto_click, auto_click_time);
        gold_amount += click_power;
        total_gold += click_power;
        header.textContent = 'Золота: ' + gold_amount;
    }
}
function ad_change(index) {
    let rnd = 0;
    do {
        rnd = Math.floor(Math.random() * 4);
    }
    while (rnd == index)
    switch (rnd) {
        case 0:
            ad_text.textContent = 'Здесь могла быть ваша реклама!'
            ad_box.style.backgroundImage = "url(resourses/graphics/ad_0_64.png)";
            ad_state = 0;
            break;
        case 1:
            ad_text.textContent = 'Так-же попробуйте: Minecraft!'
            ad_box.style.backgroundImage = 'url(resourses/graphics/ad_1_64.png)';
            ad_state = 1;
            break;
        case 2:
            ad_text.textContent = 'Так-же попробуйте: Terraria!'
            ad_box.style.backgroundImage = 'url(resourses/graphics/ad_2_64.png)';
            ad_state = 2;
            break;
        case 3:
            ad_text.textContent = 'Так-же попробуйте: CookieClicker!'
            ad_box.style.backgroundImage = 'url(resourses/graphics/ad_3_64.png)';

            ad_state = 3;
            break;
    }
    setTimeout(ad_change, 15000, rnd)
}
function redirect(index) {
    if (index == 'adv') {
        switch (ad_state) {
            case 0:
                window.open('placeholder.html', '_blank');
                break;
            case 1:
                window.open('https://www.minecraft.net/ru-ru', '_blank');
                break;
            case 2:
                window.open('https://www.terraria.org/', '_blank');
                break;
            case 3:
                window.open('https://cookieclicker2.neocities.org/', '_blank');
                break;
        }
    }
}

function tutorial(tutorial_code) {
    switch (tutorial_code) {
        case 0:
            pop_up_text.textContent = 'Вы сделали свой первый клик!  Добро пожаловать в обучение! Добывайте золото в шахте, покупайте улучшения и добывайте ещё больше золота! Игра поддерживает сохранения, так что вы, вероятно, больше не увидите это сообщение. А теперь попробуйте открыть магазин.';
            tutorial_checked[0] = 1;
            go_dark();
            break;
        case 1:
            pop_up_text.textContent = 'Это - магазин. Здесь вы можете покупать улучшения, чтобы эффективнее добывать золото. Возвращайтесь, когда накопите на корм для вашей канарейки!';
            tutorial_checked[1] = 1;
            go_dark();
            break;
        case 5:
            pop_up_text.textContent = 'Вы наняли своего первого работника! Каждый работник будет раз в минуту добывать для вас золото! Больше работников - чаще доход!';
            tutorial_checked[5] = 1;
            go_dark();
            break;
        case 6:
            pop_up_text.textContent = 'Недостаточно денег для покупки улучшения! Обидно! Вот вам небольшой подарок, тратьте наздоровье! +1000 золота.';
            gold_amount += 1000;
            header.textContent = 'Золота: ' + gold_amount;
            tutorial_checked[6] = 1;
            go_dark();
            break;
        case 7:
            pop_up_text.textContent = 'Поздравляю, вы впервые сохранили свой прогресс! С этого момента, игра будет автоматически сохраняться каждые 5 минут.';
            setTimeout(autosave, 300000);
            break;

    }
}

function error(error_id) {

    switch (error_id) {
        case 1:
            if (tutorial_checked[6] == 0) {
                tutorial(6);
                break;
            }
            else {
                pop_up_text.textContent = 'Недостаточно золота для покупки улучшения.';
                pop_up_slide(0);
                shop_blur();
                break;
            }
        case 2:
            pop_up_text.textContent = 'Упс! Недостаточно данных для загрузки! Похоже, вы ещё не сохраняли свой прогресс, или почтовый голубь заблудился... Простите :(';
            go_dark();
            break;
    }
}

function go_dark() {
    darkmode.style.visibility = "visible";
    pop_up.style.visibility = "visible";
}
function pop_up_slide(counter) {

    if (counter < 100) {
        if (counter == 0) {
            pop_up.style.left = 100 + '%';
            pop_up.style.transform = 'translate(-100%, -100%)';
        }
        pop_up.style.top = (clicker.offsetHeight - counter) + 'px';
        console.log(pop_up.style.bottom);
        pop_up.style.visibility = "visible";
        setTimeout(pop_up_slide, 20, counter + 1);
    }
    else {
        pop_up.style.left = 50 + '%';
        pop_up.style.top = 50 + '%';
        pop_up.style.transform = 'translate(-50%, -50%)';
        pop_up.style.visibility = "hidden";
    }
}
function shop_blur() {
    upgrade_1_button.disabled = true;
    upgrade_2_button.disabled = true;
    upgrade_3_button.disabled = true;
    upgrade_4_button.disabled = true;
    upgrade_5_button.disabled = true;
    setTimeout(shop_unblur, 2200)
}
function shop_unblur() {
    upgrade_1_button.disabled = false;
    upgrade_2_button.disabled = false;
    upgrade_3_button.disabled = false;
    upgrade_4_button.disabled = false;
    upgrade_5_button.disabled = false;
}
function close_pop_up() {
    darkmode.style.visibility = "hidden";
    pop_up.style.visibility = "hidden";
}
function play_sound(index) {
    switch (index) {
        case 0:
            bg_music.loop = true;
            bg_music.volume = 0.3;
            bg_music.play();
            break;
        case 1:
            let click_sound = new Audio();
            switch (Math.floor(Math.random() * 2)) {
                case 0:
                    click_sound.src = 'resourses/audio/coin_1.mp3';
                    break;
                case 1:
                    click_sound.src = 'resourses/audio/coin_2.mp3';
                    break;
            }
            click_sound.play();
            break;
        case 2:
            let shop_sound = new Audio('resourses/audio/shop_coins_1.mp3');
            shop_sound.play();
            break;
    }
}

clicker_info.addEventListener('mouseover', function () {
    clicker_info.style.opacity = '100%';
})
clicker_info.addEventListener('mouseout', function () {
    clicker_info.style.opacity = '75%';
})
clicker_info.addEventListener('mousedown', function () {

    moved_object_data[0] = this;
    moved_object_data[1] = 1;

    //let abstract_element_data = this.getBoundingClientRect()

    moved_object_data[2] = (Math.floor(this.getBoundingClientRect().x) + Math.floor(this.getBoundingClientRect().width / 2) - (Math.floor(window.innerWidth) - Math.floor(clicker.offsetWidth)));
    moved_object_data[3] = (Math.floor(this.getBoundingClientRect().y) + Math.floor(this.getBoundingClientRect().height / 2));

    clicker_info.style.cursor = 'grabbing';
    clicker_info.style.zIndex = '170';
})
document.addEventListener('mousemove', function (event) {
    if ((moved_object_data[0] != 0) && (moved_object_data[1] == 1)) {
        moved_object_data[2] = moved_object_data[2] + event.movementX;
        moved_object_data[3] = moved_object_data[3] + event.movementY;
        moved_object_data[0].style.left = moved_object_data[2] + 'px';
        moved_object_data[0].style.top = moved_object_data[3] + 'px';
    }
})
clicker_info.addEventListener('mouseup', function () {
    stop_movement(this);
})

function move_object(object_id) {

}

function stop_movement(object_id) {
    if (moved_object_data[0] == object_id) {
        object_id.style.cursor = 'grab';
        object_id.style.zIndex = 'auto';
        moved_object_data[1] = 0;
    }
    correct_object_position(object_id);
}

function correct_object_position(object_id) {
    if ((moved_object_data[0] == object_id) && (moved_object_data[1] == 0)) {
        let object_propereties = object_id.getBoundingClientRect()
        let x_pos = (Math.floor(object_propereties.x) + Math.floor(object_propereties.width / 2) - (Math.floor(window.innerWidth) - Math.floor(clicker.offsetWidth)));
        let y_pos = (Math.floor(object_propereties.y) + Math.floor(object_propereties.height / 2));

        switch (true)
        {
            case(x_pos > (Math.floor(clicker.offsetWidth) - Math.floor(object_propereties.width / 2))):
            {
                x_pos -= Math.ceil((x_pos - (Math.round(clicker.offsetWidth) - Math.round(object_propereties.width / 2))) /4);
                object_id.style.left = x_pos + 'px';
                break;
            }
            case((x_pos - Math.floor(object_propereties.width / 2)) < 0):
            {
                x_pos += Math.ceil((0 - (x_pos - Math.floor(object_propereties.width / 2))) /4);
                object_id.style.left = (x_pos +2) + 'px';
                break;
            }
            case(y_pos > (Math.floor(clicker.offsetHeight) - Math.floor(object_propereties.height / 2))):
            {
                y_pos -= Math.ceil((y_pos - (Math.round(clicker.offsetHeight) - Math.round(object_propereties.height / 2))) /4);
                object_id.style.top = y_pos + 'px';
                break;
            }
            case((y_pos - Math.floor(object_propereties.height / 2)) < 0):
            {
                y_pos += Math.ceil((0 - (y_pos - Math.floor(object_propereties.height / 2))) /4);
                object_id.style.top = (y_pos + 2) + 'px';
                break;
            }
            default:
                moved_object_data[0] = 0;
        }
        setTimeout(correct_object_position, 20, object_id);
    }
}