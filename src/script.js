$(document).ready(function() {
  var breakTime = parseInt($("#break").html()); // turns the time into an integer
  var workTime = parseInt($("#work").html());
  var time = 25 * 60000;
  var milisec = 5 * 60000;
  // If the button is pressed then the breaktime  and worktime will go up by one
  $("#upBreak").click(function() {
    
    milisec += 60000;
    $("#break").html(breakTime++);
  });

  $("#upWork").click(function() {
    if(workTime === 26){
      $("#work , #time").html(workTime++);
    }else{
          time += 60000;
      $("#work , #time").html(workTime++);
    }

    
  });
  // If the button is pressed the worktime and breaktime will go up by on
  $("#downWork").click(function() {
    if (workTime <= 1) {
      workTime = 1;
      time = 60000;
      $("#work , #time").html(workTime);
    } else {
      workTime--;
      time -= 60000;
      $("#work , #time").html(workTime);
    }
  });

  $("#downBreak").click(function() {
    $("#break").html(function() {
      if (breakTime <= 1) {
        milisec = 60000;
        return 1;
      } else {
        milisec -= 60000;
        return breakTime--;
      }
    });
  });

  // Will start the countdown when a button is clicked
  $("#start").on("click", function() {
    $("#start , #upWork, #downWork, #upBreak, #downBreak").prop(
      "disabled",
      true
    );

    var stuff = setInterval(function() {
      var minutes = Math.floor(time % (1000 * 60 * 60) / (1000 * 60));
      var seconds = function(s) {
        if (s < 10) {
          s = "0" + s;
          return s;
        } else {
          return s;
        }
      };
      var countDown =
        minutes + ":" + seconds(Math.floor(time % (1000 * 60) / 1000));
      time -= 1000;
      $("#time").html(countDown);
      $("#reset").on("click", function() {
        milisec = 60000 * 5;
        time = 25 * 60000;
        workTime = 25;
        breakTime = 5;
        $("#break").html(breakTime);
        $("#work , #time").html(workTime);
        clearInterval(stuff);
         $("title2").html("Work Time");
        $("#start , #upWork, #downWork, #upBreak, #downBreak").prop(
          "disabled",
          false
        );
      });
      $("#stop").on("click", function() {
        clearInterval(stuff);
        $("#start").prop("disabled", false); // Stops the timer went is clicked
      });

      if (countDown.toString() === "0:00") {
        clearInterval(stuff);
        $("#title2").html("Break Time");
        var b = setInterval(function() {
          var minutes = Math.floor(milisec % (1000 * 60 * 60) / (1000 * 60));
          var seconds = function(s) {
            if (s < 10) {
              s = "0" + s;
              return s;
            } else {
              return s;
            }
          };
          var countDown =
            minutes + ":" + seconds(Math.floor(milisec % (1000 * 60) / 1000));
          milisec -= 1000;
          $("#time").html(countDown);
          $("#start, #stop").hide();
          $("#reset").on("click", function() {
            milisec = 60000 * 5;
            time = 25 * 60000;
            workTime = 25;
            breakTime = 5;
            $("#break").html(breakTime);
            $("#work , #time").html(workTime);
            $("#title2").html("Work Time");
            clearInterval(stuff);
            clearInterval(b);
            $("#start, #upWork, #downWork, #upBreak, #downBreak").prop(
              "disabled",
              false
            );
            $("#start, #stop").show();
          });
          if (countDown.toString() === "0:00") {
            clearInterval(b);
            
            alert("Reset Timer!!!!!!!!");
          }
        }, 1000);
      }
    }, 1000);
  });
}); // end document
