var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
	if(!started)
	{
		$("h1").text("level " + level);
		
		nextSequence();
		started = true;
	}
});

$(".btn").click(function(event){
	var userChosenColour = event.target.id;
	userClickedPattern.push(userChosenColour);
	//console.log(userClickedPattern);
	
	playSound(userChosenColour);
	animatePress(userChosenColour);
	
	checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
	userClickedPattern = [];
	//checkAnswer(level);
	level++;
	$("h1").text("level " + level);
	
	var randomNumber= Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);
	
	$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	
	playSound(randomChosenColour);
	
}

function playSound(name)
{
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor)
{
	$("."+currentColor).addClass("pressed");
	
	setTimeout (function(){
		$("."+currentColor).removeClass("pressed");
	} , 100 );
}


function checkAnswer(currentLevel){
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
	{
		console.log("success!");
		
		if(gamePattern.length === userClickedPattern.length)
		setTimeout (function(){nextSequence();}, 1000);
	}
	else 
	{
		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout (function(){
			$("body").removeClass("game-over");} , 200);
		
		$("h1").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver()
{
		gamePattern =[];
		level = 0;
		started = false;
};
