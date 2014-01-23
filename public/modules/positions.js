
     var positions = (function($,_) { 
       var p = {};


       p.clear = function() {
          setCookie([]);
       }


       p.remove = function(position){
          removePosition(position);
       }

       p.add = function(position){
          addPosition(position);
       }

       p.get = function(){
          return getPositions(); 
       }


       function getPositions(){
          var result = [];
          
          var value = $.cookie("selectedCells");

          if (value != undefined){
            result  = JSON.parse(value);
          }

          return result;
       }

       function removePosition(position){
            var positions = getPositions();
            var newPositions = _.without(positions, position);

            setCookie(newPositions);
       }
       
       function addPosition(position){
         var positions = getPositions();
         positions.push(position);
         var newPositions = _.uniq(positions);
          setCookie(newPositions);
       }

       function setCookie(list){
         $.cookie("selectedCells", JSON.stringify(list.sort()), {expires: 30});
       }

       return p;
   }($,_));

