js_zslider
==========
how to use:
----------
    #slider{width:980px;height:460px;position:relative;overflow: hidden;}
    .slider_c{float: left;list-style: none;position: absolute;}

    <div id='slider1'>
    <div class='slider_c'><img src='xx' width='950'></div>
    <div class='slider_c'><img src='xx' width='950'></div>
    <div class='slider_c'><img src='xx' width='950'></div>
    </div>

    <script src='zslider.js'></scirpt>
    <script>
    zslider(document.getElementById('slider1'),980,950)
    </script>
