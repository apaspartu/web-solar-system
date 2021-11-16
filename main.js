var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  document.querySelector("body").style.overflow = "hidden";
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  document.querySelector("body").style.overflow = "visible";
}

disableScroll();

let angle = [0, 0, 40, 80, 120, 160, 200, 260, 300];


let speed = [0.04, 0.03, 0.02, 0.01, 0.008, 0.007, 0.006, 0.005];

let radiuses = [[150, 80], [190, 140], [240, 200], [300, 250],
                [350, 300], [420, 300], [490, 320], [560, 320]];

let planet_ids = ['mer', 'ven', 'ear', 'mar', 'jup', 'sat', 'urn', 'nep']


let load_anim = setInterval(function () {
    document.querySelector("#load_screen > #sun").setAttribute("style", "transform: rotate(" + angle[0] + "deg)");

    let p_number = 0;
    for (let p_id of planet_ids)
    {
        let elem = document.querySelector(`#load_screen > #${p_id}`);
        elem.style.left = radiuses[p_number][0] * Math.cos(angle[p_number + 1]) + window.innerWidth / 2 - 30 + "px";
        elem.style.top = radiuses[p_number][1] * Math.sin(angle[p_number + 1]) + window.innerHeight / 2 - 30 + "px";
        
        angle[p_number + 1] = (angle[p_number + 1] + speed[p_number]);
        p_number++;
    }
    
    angle[0] = (angle[0] + 1) % 360;
    window.scrollTo(0, 0);
}, 20);

window.setTimeout(function () {
    document.querySelector("#load_screen").style.animationPlayState = "running";
    enableScroll();
    clearInterval(load_anim);
    window.setTimeout(function () {
        change_quote();
        $("#load_screen").hide();
    }, 860);
}, 2800);

quotes = ["Якщо космос має безмежний запас часу, це не просто означає, що може статися все, що завгодно. Це означає, що все коли-небудь дійсно станеться.",
          "Астрономія змушує душу дивитися вгору і веде нас із цього світу до іншого.",
          "Людство не залишиться вічно на Землі, але в гонитві за світлом і простором спочатку несміливо проникне за межі атмосфери, а потім завоює собі весь навколосонячний простір.",
          "Космонавтика має безмежне майбутнє, і її перспективи неосяжні, як сам Всесвіт.",
          "Наука ніколи не була і не буде закінченою книгою. Кожен важливий успіх ставить нові питання. Будь-який розвиток виявляє з часом усе нові й глибші труднощі.",
          "Космос - це все, що є, було колись, і коли-небудь буде.",
          "Найбільш незрозуміле у нашому світі є те, що він усе-таки зрозумілий."];

authors = ["", "Платон", "Констянтин Ціолковський", "Сергій Корольов", "Альберт Ейнштейн", "Карл Саган", "Альберт Ейнштейн"];

let quote_number = Math.floor(Math.random() * 7);

function change_quote()
{
    document.querySelector("#quote-author").innerHTML = "";

    quote_number += 1;
    if (quote_number == 7)
    {
        quote_number = 0;
    }

    let author_prefix = "";
    if (authors[quote_number] != "")
    {
        author_prefix = "- ";
    }

    let chars = 0;
    let timer = setInterval(function() {
        if (chars > quotes[quote_number].length + authors[quote_number].length)
        {
            clearInterval(timer);
            return;
        }
        chars += 1;
        if (chars <= quotes[quote_number].length)
        {
            document.querySelector("#quote-text").innerHTML = quotes[quote_number].slice(0, chars);
        }
        else
        {        
            document.querySelector("#quote-author").innerHTML = author_prefix + authors[quote_number].slice(0, chars - quotes[quote_number].length - 1);
        } 
    }, 20);
}

document.querySelector("#quote > h4").addEventListener("mousedown", change_quote);