var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');
	points = [],
	mouse = {
		x: 0,
		y: 0
	},
	loc = {
		x: 0,
		y: 0
	},
	pos = {
		x: 0,
		y: 0
	},
	lastmouse = {
		x: 0,
		y: 0
	},
	size = 10,
	h = 50,
	w = 50
	var CursorMode = 0;
window.addEventListener('resize', function() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	setup()
})

window.dispatchEvent(new Event('resize'))

var timer;
var resetMode = 0;

window.addEventListener('mousemove', function(e) {
	mouse.x = e.clientX
	mouse.y = e.clientY
	resetMode = 0;
	if(CursorMode<1){
		CursorMode = CursorMode + 0.003;
	}

	clearTimeout(timer);
    timer=setTimeout(mouseStopped,100);
})



function setup() {
	
	points = []
	var cw = canvas.width
	var ch = canvas.height
	
	var rw = cw / w
	var rh = ch / h

	for (var y = 0; y < rh; y++) {
		for (var x = 0; x < rw; x++) {
			var pad = 4
			var point = {
				x: ((cw - size) / (rw + pad)) * x + (cw / rw) * (pad / 2),
				y: ((ch - size) / (rh + pad)) * y + (ch / rh) * (pad / 2),
				size: size
			}

			points.push(point)
		}
	}
}

// function render() {
	
	
// 	ctx.clearRect(0, 0, canvas.width, canvas.height)

// 	ctx.fillStyle = "#710106"
// 	ctx.fillRect(0, 0, canvas.width, canvas.height)

// 	for (var i = 0; i < points.length; i++) {
// 		var point = points[i]
		
// 		var scale = getDistance(point, mouse) / 200
			
// 		scale = 5 - scale
	
// 		scale /= 5
		
// 		var newScale = point.size * scale * 2
		
// 		if(newScale < 0) newScale = 0.5
		
// 		ctx.beginPath()
// 		ctx.arc(point.x, point.y, newScale, 0, 2*Math.PI, false)
// 		ctx.fillStyle = "#C0B79C";
// 		ctx.fill()
// 	}
// }
var c = 1;
var c2 = 0;


function render() {
	
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ctx.fillStyle = "#7C0A02"
	ctx.fillRect((0), (0), (canvas.width), (canvas.height))

	for (var i = 0; i < points.length; i++) {
		
		var point = points[i]
		
		

		//var scale = getDistanceSin(point, mouse) / 200
		
		
		//var scale = getDistance(pos,point) / 350
		
		var scale = CursorMode * (getDistanceSin(point, mouse) / 200) + (1-CursorMode) *  (getDistance(pos,point) / 350)

		//var scale = getDistanceLin(point, mouse) / 500
	
		

		scale = 4 - scale
	
		scale /= 5
		
		var newScale = point.size * scale * 3
		
		if(newScale < 0) newScale = 0.5
		
		ctx.beginPath()
		ctx.arc(point.x, point.y, newScale, 0, 2*Math.PI, false)
		ctx.fillStyle = "#D1C097";
		ctx.fill()
		
	}
	
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60)
		}
})()

;




(function animloop() {
	requestAnimFrame(animloop)
	
	loc = {
		x: canvas.width/2 + canvas.width/2 * Math.sin(c*0.004/(canvas.width/1250)),
		//x : canvas.width/2,
		y: canvas.height/2 + canvas.height/2 * Math.cos(c*0.002/(canvas.height/1250))
		//y: canvas.height/2
	};
	pos = {
		x: 0,
		y: canvas.height*Math.sin(3*c/canvas.height)+canvas.height*0.2
	};
	
	
	if(resetMode == 1 & CursorMode > 0){
		CursorMode = CursorMode - 0.003;
	}

	render()


	c++
})()

function getDistanceSin(obj1, obj2) {
	var dx = obj1.x - obj2.x;
	var dy = obj1.y - obj2.y;
	return Math.sqrt(dx * dx + dy * dy) * (Math.sin(Math.sqrt(dx * dx + dy * dy)/(210*(canvas.width/1250)))+0.9) ;
}

function getDistance(obj1, obj2) {
	
	var dy = obj1.y - obj2.y;
	var dx = obj1.y - obj2.y;
	return 0.5*Math.sqrt(dx * dx + dy * dy) * (Math.sin(Math.sqrt(dx * dx + dy * dy)/500)+0.9);
}

function getDistanceLin(obj1, obj2) {
	
	var dy = obj1.y - obj2.y;
	var dx = obj1.x - obj2.x;
	return Math.sqrt(dx * dx + dy * dy);
}

function mouseStopped(){                                 // the actual function that is called
    resetMode = 1;
}