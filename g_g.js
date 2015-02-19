$(document).ready(function(){
	var mynum=Math.floor((Math.random() * 100) + 1);
	var guessarray=[];
	var guesscount=0;
	var hintrepeat=false;
//larger function to call on either button click or return
	var ggmain=function(){
		var x=document.getElementById("numinput").value;
		var guessnum=Number(x);
		var dupguess=false;
		for (var i in guessarray){
			if (guessarray[i]===guessnum){
				dupguess=true;
			}
		}
		if (guessnum%1===0&&guessnum>0&&guessnum<=100&&dupguess===false&&hintrepeat===false){
		guessarray.push(guessnum);
		var diff=guessnum-mynum;
		var newdiff=Math.abs(guessarray[guessarray.length-1]-mynum);
		var olddiff=Math.abs(guessarray[guessarray.length-2]-mynum);
		
		//defines hottel/colder text to add to feedback string
		if (guessarray.length===1){
			var hottercolder="";
		} else {
			if (newdiff>olddiff){
				var hottercolder=" and getting colder";	
			} else if (newdiff<olddiff){
				var hottercolder=" and getting hotter";
			}
		}
		//tells player to guess higher or lower
		if(guessnum>mynum){
			var higherlower="guess lower";
		} else if (guessnum<mynum){
			var higherlower="guess higher";
		}

		//what happens is they guess right
		if (diff===0&&guessarray.length<=5){
			$("body").append("<p>"+x+" is Correct!</p>");
			$("body").css({"background-color":"#CC0099"});
		} else if (Math.abs(guessnum-mynum)>10){
			var hotcold="cold";
			$("body").append("<p>Guess: "+x+", you are "+hotcold+""+hottercolder+", "+higherlower+"!</p>");	
		} else {
			var hotcold="hot";
			$("body").append("<p>Guess: "+x+", you are "+hotcold+""+hottercolder+", "+higherlower+"!</p>");
		}
		//$("body").append("<p>You guessed "+x+" and you are "+hotcold+"!</p>");
		
		if(guessarray.length>=5){
			$("p").remove();
			$("body").append("<p>Game Over! Please Restart Game!</p>");
			$("body").css({"background-color":"#444444"});
		}
		//var guesstext=$("<p>You guessed "+x+" and you are "+hotcold+"!</p>");
		//$("body").append("<p>You guessed "+x+" and you are "+hotcold+"!</p>");
		$('#numinput').val('');//.placeholder();
		} else if (dupguess===true) {
			alert("You have alredy guessed that number!");
			$('#numinput').val('');//.placeholder();
		//$("body").append("<p>You have already guessed that number!</p>");
		} else if (hintrepeat===true){
			alert("Please restart the game!");
		} else {
			alert("Please Enter a Valid Integer 1-100");
			$("#numinput").val('');//.placeholder();
		//$("body").append("<p>Please Enter a Valid Integer 1-100</p>");
		}
		$("#numinput").focus();
	}
	//what happens when enter is pressed
	$(document).keypress(function(event){
 		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			ggmain();	
		}
	})
	
	//what happens when "submit your guess" button is pressed
	$("#button1").on("click", ggmain);

	// Defining action of "Give me a hint" button
	$("#button2").on("click",function(){
		var youlose=$("<p>The Correct Number is "+mynum+"!<p/>");
		if (hintrepeat===false){
			$("body").append(youlose);
			hintrepeat=true;
		}
		$("#numinput").focus();
	})

	//defining action of "Play Again" button
	$("#button3").on("click",function(){
		$("p").remove();
		mynum=Math.floor((Math.random() * 100) + 1);
		guessarray=[];
		guesscount=0;
		$("body").css({"background-color":"#444444"});
		hintrepeat=false;
		$("#numinput").val('');
		$("#numinput").focus();
	})
})

