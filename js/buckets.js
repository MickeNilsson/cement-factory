(function(){
   window.buckets = {
      start: start,
      stop: stop
   };
   var LEFT = -1;
   var RIGHT = 1;
   var bucketsIntervalId;
   var speed = 1000;
   var distanceX = 30;
   var leftStartPosition = 65;
   var rightStartPosition = 165;
   var y = 100;
   var buckets = [
      {
         position: 0,
         direction: LEFT,
         id: 1
      },
      {
         position: 0,
         direction: RIGHT,
         id: 2
      }
   ];
   var numOfBuckets = buckets.length;
   init();

   function draw(bucket){
      var x;
      if(bucket.direction === LEFT){
         x = leftStartPosition - distanceX * bucket.position;
      }else{
         x = rightStartPosition + distanceX * bucket.position;
      }
      if(Math.abs(bucket.position) === 2){
         $('bucket' + bucket.id).style.backgroundImage = 'url("./images/bucket02.png")';
      } else if(bucket.position === 0) {
         $('bucket' + bucket.id).style.backgroundImage = 'url("./images/bucket01.png")';
      }
      $('bucket' + bucket.id).style.left = x + 'px';
   }

   function init(){
      for(var i = 0; i < numOfBuckets; i++){
         const div = document.createElement('div');
         div.style.backgroundImage = 'url("./images/bucket01.png")';
         div.style.backgroundSize = 'contain';
         div.style.backgroundRepeat = 'no-repeat';
         div.style.left = '-100px';
         div.style.top = '10px';
         div.style.width = '30px';
         div.style.height = '30px';
         div.style.position = 'absolute';
         div.id = 'bucket' + buckets[i].id;
         $('factory').appendChild(div);
      }

      const div = document.createElement('div');
      
   }

   function start(){
      bucketsIntervalId = setInterval(function(){
         for(var i = 0; i < numOfBuckets; i++){
            var bucket = buckets[i];
            bucket.position++;
            if(Math.abs(bucket.position) === 3){
               bucket.position = 0;
            }
            draw(bucket);
         }
      }, speed);
   }

   function stop(){
      clearInterval(bucketsIntervalId);
   }

   function $(id){
      return document.getElementById(id);
   }



}());