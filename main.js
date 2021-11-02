var id = null;

function myf()
{
    var elem = document.getElementById("bigearth");
  
    var w = 46;
    clearInterval(id);
    id = setInterval(frame, 70);

    function frame()
    {
        if (w == 40) {
        w = 46;  
        }
        else
        {
            w -= 1;
            elem.style.width = `${w}%`;
        }
    }
}