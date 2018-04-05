var varList = document.querySelectorAll('.bar, .toggle-min, .toggle-max, .scale, .columns-1-3, .filters fieldset:first-of-type, [name="count_from"], [name="count_to"], [name="output_from"], [name="output_to"]');
var toggleMin = varList[6];
var toggleMax = varList[7];
var bar = varList[5];
var scale = varList[4];
var columns = varList[0];
var fieldset = varList[1];
var rangeFrom = varList[2];
var rangeTo = varList[3];
var outputFrom = varList[8];
var outputTo = varList[9];
var toggleMinX = toggleMin.offsetLeft;
var toggleMaxX = toggleMax.offsetLeft;

var flagMin = false;
var flagMax = false;
var flagFrom = false;
var flagTo = false;
var step = Math.ceil((rangeTo.max - rangeFrom.min)/196);

toggleMin.addEventListener('mousedown', function(event) {
  	event.preventDefault();
  	flagMin = true;
  	toggleMinX += event.offsetX - 2;
  	if (toggleMinX<0) {
  		toggleMinX = 0;
  	}
  	if (toggleMinX>toggleMaxX-22) {
  		toggleMinX = toggleMaxX-22;
  	}
  	toggleMin.style.left = toggleMinX + 'px';
  	bar.style.left = toggleMinX + 'px';
  	bar.style.width = toggleMaxX-toggleMinX + 'px';
  	rangeFrom.value = toggleMinX * step;
  	outputFrom.innerHTML = rangeFrom.value;
});

toggleMax.addEventListener('mousedown', function(event) {
  	event.preventDefault();
  	flagMax = true;
  	toggleMaxX += event.offsetX - 2;
  	if (toggleMaxX>196) {
  		toggleMaxX = 196;
  	}
  	if (toggleMaxX<toggleMinX+22) {
  		toggleMaxX = toggleMinX+22;
  	}
  	toggleMax.style.left = toggleMaxX + 'px';
  	bar.style.width = toggleMaxX-toggleMinX + 'px';
  	rangeTo.value = toggleMaxX * step;
  	outputTo.innerHTML = rangeTo.value;
});

document.addEventListener('mouseup', function(event) {
  	flagMax = false;
  	flagMin = false;
});

fieldset.addEventListener('mousemove', function(event) {
  	if (flagMin) {
  		toggleMinX = event.pageX - columns.offsetLeft - fieldset.offsetLeft - 22;
  		if (toggleMinX<0) {
  			toggleMinX = 0;
  		}
  		if (toggleMinX>toggleMaxX-22) {
  			toggleMinX = toggleMaxX-22;
  		}
  		toggleMin.style.left = toggleMinX + 'px';
  		bar.style.left = toggleMinX + 'px';
  		bar.style.width = toggleMaxX-toggleMinX + 'px';
  		rangeFrom.value = toggleMinX * step;
  		outputFrom.innerHTML = rangeFrom.value;
  	}
  	else if (flagMax) {
  		toggleMaxX = event.pageX - columns.offsetLeft - fieldset.offsetLeft - 22;
  		if (toggleMaxX>196) {
  			toggleMaxX = 196;
  		}
  		if (toggleMaxX<toggleMinX+22) {
  			toggleMaxX = toggleMinX+22;
  		}
  		toggleMax.style.left = toggleMaxX + 'px';
  		bar.style.width = toggleMaxX-toggleMinX + 'px';
  		rangeTo.value = toggleMaxX * step;
  		outputTo.innerHTML = rangeTo.value;
  	}
});

rangeFrom.addEventListener('focus', function(event) {
	flagFrom = true;
});

rangeFrom.addEventListener('focusout', function(event) {
	flagFrom = false;
});

rangeTo.addEventListener('focus', function(event) {
	flagTo = true;
});

rangeTo.addEventListener('focusout', function(event) {
	flagTo = false;
});

window.addEventListener("keydown", function (event) {
	if (flagFrom) {
		if (event.keyCode === 37 || event.keyCode === 40) {
			event.preventDefault();
    		toggleMinX -= 1;
    	}
    	else if (event.keyCode === 38 || event.keyCode === 39) {
    		event.preventDefault();
    		toggleMinX += 1;
    	}
    	if (toggleMinX < 0) {
    		toggleMinX = 0;
    	}
    	if (toggleMinX>toggleMaxX-22) {
  			toggleMinX = toggleMaxX-22;
  		}
    	toggleMin.style.left = toggleMinX + 'px';
  		bar.style.left = toggleMinX + 'px';
  		bar.style.width = toggleMaxX-toggleMinX + 'px';
  		rangeFrom.value = toggleMinX * step;
  		outputFrom.innerHTML = rangeFrom.value;
	}
	else if (flagTo) {
		if (event.keyCode === 37 || event.keyCode === 40) {
			event.preventDefault();
    		toggleMaxX -= 1;
    	}
    	else if (event.keyCode === 38 || event.keyCode === 39) {
    		event.preventDefault();
    		toggleMaxX += 1;
    	}
    	if (toggleMaxX > 196) {
    		toggleMaxX = 196;
    	}
    	if (toggleMaxX<toggleMinX+22) {
  			toggleMaxX = toggleMinX+22;
  		}
    	toggleMax.style.left = toggleMaxX + 'px';
  		bar.style.width = toggleMaxX-toggleMinX + 'px';
  		rangeTo.value = toggleMaxX * step;
  		outputTo.innerHTML = rangeTo.value;
	}
});