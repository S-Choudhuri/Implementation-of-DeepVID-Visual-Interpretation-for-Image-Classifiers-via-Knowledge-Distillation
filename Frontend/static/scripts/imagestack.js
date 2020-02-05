jQuery(document).ready(function(){
    var backgroundImage1 = ["./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png",
    "./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png"];

    var backgroundImage2 = ["./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png",
    "./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png","./images/000000-num7.png"];

    function displayAllImages(backgroundImage,elem) {
        var i = 0, len = backgroundImage.length;        
        for (; i < backgroundImage.length; i++) {
            var img = new Image();
            img.src = backgroundImage[i];
            img.style.width = '28px';
            img.style.height = '28px';
            document.getElementById(elem).appendChild(img);
        }
    };

    $(function() {
        displayAllImages(backgroundImage1,'images'); 
        displayAllImages(backgroundImage2,'images2');   
        
    });
});

