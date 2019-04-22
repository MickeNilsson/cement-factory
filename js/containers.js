(function(){

   window.containers = {

   };

   createLever('bottomleftuplever', 22, 88, 10, 15, true);
   createLever('bottomleftdownlever', 25, 95, 10, 15, false);

   createLever('topleftuplever', 22, 54, 10, 15, true);
   createLever('topleftdownlever', 25, 61, 10, 15, false);

   createLever('bottomrightuplever', 223, 88, 10, 15, true);
   createLever('bottomrightdownlever', 219, 97, 10, 15, false);

   createLever('toprightuplever', 225, 52, 10, 15, true);
   createLever('toprightdownlever', 223, 61, 10, 15, false);

   function createLever(lever, x, y, w, h, show){
      const div = document.createElement('div');
      if(lever.indexOf('leftup') !== -1){
         div.style.backgroundImage = 'url("./images/leverleftup.png")';
      }else if(lever.indexOf('leftdown') !== -1){
         div.style.backgroundImage = 'url("./images/leverleftdown.png")';
      }else if(lever.indexOf('rightup') !== -1){
         div.style.backgroundImage = 'url("./images/leverrightup.png")';
      }else if(lever.indexOf('rightdown') !== -1){
         div.style.backgroundImage = 'url("./images/leverrightdown.png")';
      }

      
      
      if(show){
         div.style.backgroundSize = 'contain';
      }else{
         div.style.backgroundSize = '0 0';
      }
      div.style.backgroundRepeat = 'no-repeat';
      div.style.left = x + 'px';
      div.style.top = y + 'px';
      div.style.width = w + 'px';
      div.style.height = h + 'px';
      div.style.position = 'absolute';
      div.id = lever;
      $('factory').appendChild(div);
   }

   function $(id){
      return document.getElementById(id);
   }

}());