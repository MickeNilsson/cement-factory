(function(){
   window.elevators = {
      start: start,
      stop: stop,
   };
   const TOP = 0;
   const BOTTOM = 4;
   const UP = -1;
   const DOWN = 1;
   let elevators;
   let elevatorsIntervalId;

   function stop(){
      clearInterval(elevatorsIntervalId);
   }

   function start(){
      // "Erase" elevators.
      for(let y = 0; y <= 4; y++){
         $(3 + '' + y).style.borderBottomColor = 'red';
         $(4 + '' + y).style.borderBottomColor = 'red';
      }
      // Set initial position, direction and speed on all elevators.
      elevators = [
         {
            x:3,
            y:1,
            direction: DOWN
         },{
            x:3,
            y:3,
            direction: DOWN
         },{
            x:4,
            y:1,
            direction: UP
         },{
            x:4,
            y:3,
            direction: UP
         }
      ];
      elevators.speed = 1000;
      // "Draw" elevators at initial position.
      for(let i = 0; i <= 3; i++){
         $(elevators[i].x + '' + elevators[i].y).style.borderBottomColor = 'black';
      }
      // Set elevators into motion.
      elevatorsIntervalId = window.setInterval(function(){
         for(let i = 0; i <= 3; i++){
            let marioIsOnPlatform = false;
            if(window.mario.x === elevators[i].x && window.mario.y === elevators[i].y){
               marioIsOnPlatform = true;
            }
            // "Erase" elevator from old position.
            $(elevators[i].x + '' + elevators[i].y).style.borderBottomColor = 'red';
            // Update elevator position.
            elevators[i].y += elevators[i].direction;
            // Update Mario position if he is on this elevator.
            if(marioIsOnPlatform){
               window.mario.y = elevators[i].y;
            }
            if(elevators[i].direction === UP && elevators[i].y === TOP){
               if(marioIsOnPlatform){
                  window.mario.crush();
                  return;
               }else{
                  elevators[i].y = BOTTOM;
               }
            }else if(elevators[i].direction === DOWN && elevators[i].y === BOTTOM){
               if(marioIsOnPlatform){
                  window.mario.fall();
                  return;
               }else{
                  elevators[i].y = TOP;
               }
            }
            // "Draw" elevator at new position.
            $(elevators[i].x + '' + elevators[i].y).style.borderBottomColor = 'black';
            // "Draw" Mario at new position.
            if(marioIsOnPlatform){
               window.mario.draw();
            }  
         }
      }, elevators.speed);
   }
   function $(id){
      return document.getElementById(id);
   }
}());