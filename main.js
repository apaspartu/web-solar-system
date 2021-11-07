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

window.onload = change_quote;