// This module creates the bingo cards

     var card = (function($, _, positions){
        var boardCookie = "board";
        var c = {};

        c.load = function(className, data){
          (boardExists()) ? retrieve(className) : create(className, data);
        }

        c.create = function(className, data){
          create(className, data);
        }

        function boardExists(){
          var result = false;
          var board = $.cookie(boardCookie);

          if (board) {
            result = true;
          }
          return result;
        }

        function retrieve(className) {
          var value =  $.cookie(boardCookie);
          var board = JSON.parse(value);
          var selected = positions.get();
          
          populate(className, board, selected);
        }

        function create(className, data){
          var board = select(data, 12 , "DFTBA");
          $.cookie(boardCookie, JSON.stringify(board), {expires: 365});
          var selected = positions.get();
          
          populate(className, board, selected);
        };

        function populate(className, data, selected){
          var selector = "." + className;
          var t = table(data, selected);
          $(selector).html(t);
        }

        function select(data, centerPosition, centerValue){
          var result = _.shuffle(data).splice(0, 24);  
          result.splice(centerPosition, 0, centerValue); 

          return result;
        }

        function table(data, selected){
          var result = "<table border='1'>";

          result += "<tr><th>D</th><th>F</th><th>T</th><th>B</th><th>A</th></tr>";
          result += grid(data, selected);
          result += "</table>";

          return result;
        }

        function td(data, className, position){
          return "<td class='" + className + 
            "' data-position='" + position +  "' >" + 
            data +  "</td>";
        }

        function classes(main, selected, index){
          var result = main;
          
          if (_.contains(selected, index.toString())){
             result += " selected";
          }

          return result;
        }

        function grid(data, selected){
          var result = "";
          var count = 0;
          
          for (var i = 0; i < data.length; i++){
            if (count % 5 == 0) {
              if (result != ""){
                result += "</tr>";
              }
              result += "<tr>";
              count  = 0;
            }
            
            result += (i == 12) ? 
                      td(data[i], "center") :
                      td(data[i], classes("cell", selected, i), i);
            count++;
          }

          result += "</tr>";

          return result;
        }

        return c;    
     }($,_, positions));  

