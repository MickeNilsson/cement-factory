(function(){
   const factoryHeight = 6, factoryWidth = 8;
   const factory = document.getElementById('factory');
   for(let y = 0; y < factoryHeight; y++){
      for(let x = 0; x < factoryWidth; x++){
         let tile = document.createElement('div');
         tile.id = x + '' + y;
         tile.classList.add('tile');
         if(x === 3 || x === 4){
            tile.style.borderBottomColor = 'red';
         }else{
            tile.style.borderBottomColor = 'black';
         }
         factory.appendChild(tile);
      }
   }
}());