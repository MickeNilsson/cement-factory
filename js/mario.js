(function(){
   window.mario = {
      crush: crush,
      draw: draw,
      fall: fall,
      start: start,
      get x(){
         return x;
      },
      get y(){
         return y;
      },
      set y(newYPosition){
         y = newYPosition;
      }
   };
   let controlsAreActive = false;
   let x;
   let y;
   let isPushingLever = false;
   const tiles = [
      {
         x: 0,
         y: 1
      },{
         x: 0,
         y: 2
      },{
         x: 1,
         y: 1
      },{
         x: 1,
         y: 2
      },{
         x: 1,
         y: 3
      },{
         x: 2,
         y: 0
      },{
         x: 2,
         y: 1
      },{
         x: 2,
         y: 2
      },{
         x: 2,
         y: 3
      },{
         x: 3,
         y: 0
      },{
         x: 3,
         y: 1
      },{
         x: 3,
         y: 2
      },{
         x: 3,
         y: 3
      },{
         x: 4,
         y: 1
      },{
         x: 4,
         y: 2
      },{
         x: 5,
         y: 1
      },{
         x: 5,
         y: 2
      }
   ];

   function createArm(arm, x, y, w, h){
      const div = document.createElement('div');
      div.style.backgroundImage = 'url("./images/' + arm + '.png")';
      div.style.backgroundSize = '0 0';
      div.style.backgroundRepeat = 'no-repeat';
      div.style.left = x + 'px';
      div.style.top = y + 'px';
      div.style.width = w + 'px';
      div.style.height = h + 'px';
      div.style.position = 'absolute';
      div.id = arm;
      $('factory').appendChild(div);
   }

   function crush(){
      controlsAreActive = false;
      window.elevators.stop();
      draw('top');
      setTimeout(function(){
         start();
         window.elevators.start();
         controlsAreActive = true;
      }, 2000);
   }

   function draw(location){
      // First "erase" all marios on the screen, i.e. don't show background image on any tile that
      // Mario can move to.
      for(let i = 0; i < tiles.length; i++){
         hide(tiles[i].x + 1 + '' + tiles[i].y);
      }
      hide(34, 44, 30, 40);
      // "Draw" Mario at the current location.
      if(location === 'bottom'){
         show(34, 44)
      }else if(location === 'top'){
         show(30, 40);
      }else{
         show(x + '' + y);
      }
      // Erase all Marios arms.
      hide('topleftup', 'bottomleftup', 'toprightup', 'bottomrightup');
      // Draw eventual arms.
      if(x === 1 && y === 1){
         show('topleftup');
      }else if(x === 1 && y === 2){
         show('bottomleftup');
      }else if(x === 6 && y === 1){
         show('toprightup');
      }else if(x === 6 && y === 2){
         show('bottomrightup');
      }
   }

   function fall(){
      controlsAreActive = false;
      window.elevators.stop();
      draw('bottom');
      setTimeout(function(){
         start();
         window.elevators.start();
         controlsAreActive = true;
      }, 2000);
   }

   function init(){
      // Set background image for all tiles in the playing area that Mario is able to move to.
      for(let i = 0; i < tiles.length; i++){
         const x = tiles[i].x, y = tiles[i].y;
         $(x + 1 + '' + y).style.backgroundImage = 'url("./images/mario' + x + '' + y + '.png")';
         // Initially hide the background image.
         hide(x + 1 + '' + y);
      }
      // Set Mario arms.
      createArm('topleftup', 30, 50, 15, 8);
      createArm('topleftdown', 30, 55, 15, 8);
      createArm('bottomleftup', 30, 85, 15, 8);
      createArm('bottomleftdown', 30, 90, 15, 8);
      
      createArm('toprightup', 215, 50, 15, 8);
      createArm('toprightdown', 215, 55, 15, 8);
      createArm('bottomrightup', 215, 85, 15, 8);
      createArm('bottomrightdown', 215, 90, 15, 8);
      // Set bottom mario tiles.
      let leftFloorTile = $('34');
      leftFloorTile.style.backgroundImage = 'url("./images/mariobottomleft.png")';
      leftFloorTile.style.backgroundPosition = 'center bottom';
      hide(leftFloorTile);
      let rightFloorTile = $('44');
      rightFloorTile.style.backgroundImage = 'url("./images/mariobottomright.png")';
      rightFloorTile.style.backgroundPosition = 'center bottom';
      hide(rightFloorTile);
      // Set top mario tiles.
      let leftRoofTile = $('30');
      leftRoofTile.style.backgroundImage = 'url("./images/mariotopleft.png")';
      leftRoofTile.style.backgroundPosition = 'center bottom';
      hide(leftFloorTile);
      let rightRoofTile = $('40');
      rightRoofTile.style.backgroundImage = 'url("./images/mariotopright.png")';
      rightRoofTile.style.backgroundPosition = 'center bottom';
      hide(rightFloorTile);
      // Mario move event handler.
      window.addEventListener('keypress', function(e){
         if(controlsAreActive){
            if(!isPushingLever){
               let tempX = x;
               switch(e.which){
                  case 97: tempX--; break;
                  case 115: tempX++; break;
               };
               // Check if Mario is able to move to the tile that the player wants him to go.
               let goToTile = $(tempX + '' + y);
               if(goToTile && goToTile.style.backgroundImage.indexOf('mario') !== -1){
                  x = tempX;
                  if(goToTile.style.borderBottomColor === 'red'){
                     fall();
                  }else{
                     draw();
                  }
               } else {
                  // If Mario is next to a lever, pull that lever.
                  if ( x === 1 && y === 1 ) {
                     pushLever( 'topleft' );
                  }else if ( x === 1 && y === 2 ) {
                     pushLever( 'bottomleft' );
                  }else if(x === 6 && y === 1){
                     pushLever('topright');
                  }else if(x === 6 && y === 2){
                     pushLever('bottomright');
                  }
               }
            }
         }
      });
      controlsAreActive = true;
   }

   function hide(){
      for(let i = 0; i < arguments.length; i++){
         switch(typeof arguments[i]){
            case 'number': $(arguments[i] + '').style.backgroundSize = '0 0'; break;
            case 'object': arguments[i].style.backgroundSize = '0 0'; break;
            case 'string': $(arguments[i]).style.backgroundSize = '0 0'; break;
         }
      }
   }

   function pushLever( lever ) {
      hide( lever + 'up' );
      hide(lever + 'uplever');
      show( lever + 'down' );
      show(lever + 'downlever');
      isPushingLever = true;
      setTimeout(function(){
         hide( lever + 'down' );
         hide(lever + 'downlever');
         show( lever + 'up' );
         show(lever + 'uplever');
         isPushingLever = false;
      }, 200)
   }

   function show(){
      for(let i = 0; i < arguments.length; i++){
         switch(typeof arguments[i]){
            case 'number': $(arguments[i] + '').style.backgroundSize = 'contain'; break;
            case 'object': arguments[i].style.backgroundSize = 'contain'; break;
            case 'string': $(arguments[i]).style.backgroundSize = 'contain'; break;
         }
      }
   }

   function $(id){
      return document.getElementById(id);
   }

   function start(){
      // Set start position.
      x = 1; y = 2;
      // "Draw" Mario at start position.
      draw();
   }

   init();
}());

























