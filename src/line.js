;(function(name, fun) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = fun();
    } else if (typeof define === 'function' && define.amd) {
        define(fun);
    } else {
        this[name] = fun();
    }
})('Line', function() {
    var element, context, width, height;
    var clear = function(c) {
        c.clearRect(0, 0, width, height);
    };
    var animationOptions = {
        linear: function(t) {
            return t;
        },
        easeInQuad: function(t) {
            return t * t;
        },
        easeOutQuad: function(t) {
            return -1 * t * (t - 2);
        },
        easeInOutQuad: function(t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
            return -1 / 2 * ((--t) * (t - 2) - 1);
        },
        easeInCubic: function(t) {
            return t * t * t;
        },
        easeOutCubic: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1);
        },
        easeInOutCubic: function(t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
            return 1 / 2 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function(t) {
            return t * t * t * t;
        },
        easeOutQuart: function(t) {
            return -1 * ((t = t / 1 - 1) * t * t * t - 1);
        },
        easeInOutQuart: function(t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
            return -1 / 2 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function(t) {
            return 1 * (t /= 1) * t * t * t * t;
        },
        easeOutQuint: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
        },
        easeInOutQuint: function(t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
            return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function(t) {
            return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2));
        },
        easeInOutSine: function(t) {
            return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
        },
        easeInExpo: function(t) {
            return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
        },
        easeOutExpo: function(t) {
            return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
        },
        easeInOutExpo: function(t) {
            if (t == 0) return 0;
            if (t == 1) return 1;
            if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
            return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function(t) {
            if (t >= 1) return t;
            return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
        },
        easeOutCirc: function(t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
        },
        easeInOutCirc: function(t) {
            if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
            return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0) return 0;
            if ((t /= 1) == 1) return 1;
            if (!p) p = 1 * .3;
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
        },
        easeOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0) return 0;
            if ((t /= 1) == 1) return 1;
            if (!p) p = 1 * .3;
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
        },
        easeInOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0) return 0;
            if ((t /= 1 / 2) == 2) return 1;
            if (!p) p = 1 * (.3 * 1.5);
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
        },
        easeInBack: function(t) {
            var s = 1.70158;
            return 1 * (t /= 1) * t * ((s + 1) * t - s);
        },
        easeOutBack: function(t) {
            var s = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
        },
        easeInOutBack: function(t) {
            var s = 1.70158;
            if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
            return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
        },
        easeInBounce: function(t) {
            return 1 - animationOptions.easeOutBounce(1 - t);
        },
        easeOutBounce: function(t) {
            if ((t /= 1) < (1 / 2.75)) {
                return 1 * (7.5625 * t * t);
            } else if (t < (2 / 2.75)) {
                return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
            } else if (t < (2.5 / 2.75)) {
                return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
            } else {
                return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
            }
        },
        easeInOutBounce: function(t) {
            if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
            return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
        }
    };

    function calculateOffset(val, calculatedScale, scaleHop) {
        var outerValue = calculatedScale.steps * calculatedScale.stepValue;
        var adjustedValue = val - calculatedScale.graphMin;
        var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
        return (scaleHop * calculatedScale.steps) * scalingFactor;
    }

    function animationLoop(config, drawScale, drawData, ctx) {
        var animFrameAmount = (config.animation) ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1,
            easingFunction = animationOptions[config.animationEasing],
            percentAnimComplete = (config.animation) ? 0 : 1;



        if (typeof drawScale !== "function") drawScale = function() {};

        requestAnimFrame(animLoop);

        function animateFrame() {
            var easeAdjustedAnimationPercent = (config.animation) ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
            clear(ctx);
            if (config.scaleOverlay) {
                drawData(easeAdjustedAnimationPercent);
                drawScale();
            } else {
                drawScale();
                drawData(easeAdjustedAnimationPercent);
            }
        }

        function animLoop() {
            //We need to check if the animation is incomplete (less than 1), or complete (1).
            percentAnimComplete += animFrameAmount;
            animateFrame();
            //Stop the loop continuing forever
            if (percentAnimComplete <= 1) {
                requestAnimFrame(animLoop);
            } else {
                if (typeof config.onAnimationComplete == "function") {
                    config.onAnimationComplete();
                }
            }

        }

    }

    //Declare global functions to be called within this namespace here.


    // shim layer with setTimeout fallback
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                var timer = window.setTimeout(callback, 1000 / 60);
                return timer;
            };
    })();
    var cancelRequestFrame = (function() {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            function(id) {
                clearTimeout(id);
            };
    })();

    function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
        var graphMin, graphMax, graphRange, stepValue, numberOfSteps, valueRange, rangeOrderOfMagnitude, decimalNum;

        valueRange = maxValue - minValue || 10;

        rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

        graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

        graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

        graphRange = graphMax - graphMin || 10;

        stepValue = Math.pow(10, rangeOrderOfMagnitude);

        numberOfSteps = Math.round(graphRange / stepValue);
        //Compare number of steps to the max and min for that size graph, and add in half steps if need be.
        while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
            if (numberOfSteps < minSteps) {
                stepValue /= 2;
                numberOfSteps = Math.round(graphRange / stepValue);
            } else {
                stepValue *= 2;
                numberOfSteps = Math.round(graphRange / stepValue);
            }
        };
        var labels = [];
        populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);

        return {
            steps: numberOfSteps,
            stepValue: stepValue,
            graphMin: graphMin,
            labels: labels

        }

        function calculateOrderOfMagnitude(val) {
            return Math.floor(Math.log(val) / Math.LN10);
        }


    }

    //Populate an array of all the labels by interpolating the string.
    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) {
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i = 1; i < numberOfSteps + 1; i++) {
                labels.push(tmpl(labelTemplateString, { value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue)) }));
            }
        }
    }

    //Max value from array
    function Max(array) {
        return Math.max.apply(Math, array);
    };
    //Min value from array
    function Min(array) {
        return Math.min.apply(Math, array);
    };
    //Default if undefined
    function Default(userDeclared, valueIfFalse) {
        if (!userDeclared) {
            return valueIfFalse;
        } else {
            return userDeclared;
        }
    };
    //Is a number function
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    //Apply cap a value at a high or low number
    function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue)) {
            if (valueToCap > maxValue) {
                return maxValue;
            }
        }
        if (isNumber(minValue)) {
            if (valueToCap < minValue) {
                return minValue;
            }
        }
        return valueToCap;
    }

    function getDecimalPlaces(num) {
        var numberOfDecimalPlaces;
        if (num % 1 != 0) {
            return num.toString().split(".")[1].length
        } else {
            return 0;
        }

    }

    //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
    var cache = {};

    function tmpl(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +

                // Convert the template into pure JavaScript
                str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    };

    function dashedLineTo(fromX, fromY, toX, toY, pattern) {
        // default interval distance -> 5px
        if (typeof pattern === "undefined") {
            pattern = 5;
        }
        // calculate the delta x and delta y
        var dx = (toX - fromX);
        var dy = (toY - fromY);
        var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));
        var dashlineInteveral = (pattern <= 0) ? distance : (distance / pattern);
        var deltay = (dy / distance) * pattern;
        var deltax = (dx / distance) * pattern;

        // draw dash line
        context.beginPath();
        for (var dl = 0; dl < dashlineInteveral; dl++) {
            if (dl % 2) {
                context.lineTo(fromX + dl * deltax, fromY + dl * deltay);
            } else {
                context.moveTo(fromX + dl * deltax, fromY + dl * deltay);
            }
        }
        context.stroke();
    };


    function Line(options) {
        getRealRatio();
        var opt = {
            scaleOverlay: false,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: true,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            dubleCircleBorder: true,
            bezierCurve: true,
            pointDot: true,
            pointDotBorderWidth: 5,
            pointDotRadius: 4,
            pointDotStrokeWidth: 2,
            pointColor: '#7077f2',
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animation: true,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        }
        this.options = extend(opt, options);
        this.options.dataLoc = [];
        element = typeof this.options.element == 'string' ? document.getElementById(this.options.element) : this.options.element;
        context = element.getContext('2d');
        width = parseFloat(element.style.width);
        height = parseFloat(element.style.height);
    }
    Line.prototype.draw = function() {
        var data = this.options.data;
        this.drawing(data, this.options, context);
    };

    Line.prototype.drawing = function(data, config, ctx) {
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, rotateLabels = 0;

        calculateDrawingSizes();

        valueBounds = getValueBounds();
        //Check and set the scale
        labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : "";
        if (!config.scaleOverride) {

            calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
        } else {
            calculatedScale = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            }
            populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth);
        }

        scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config, drawScale, drawLines, ctx);

        function drawLines(animPc) {
            for (var i = 0; i < data.datasets.length; i++) {
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.beginPath();
                ctx.moveTo(yAxisPosX, xAxisPosY - animPc * (calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop)) - 2)

                for (var j = 1; j < data.datasets[i].data.length; j++) {
                    if (config.bezierCurve) {
                        ctx.bezierCurveTo(xPos(j - 0.5), yPos(i, j - 1)-2, xPos(j - 0.5), yPos(i, j)-2, xPos(j), yPos(i, j)-2);
                    } else {
                        ctx.lineTo(xPos(j), yPos(i, j)-2);
                    }
                }
                ctx.stroke();
                if (config.datasetFill) {
                } else {
                    ctx.closePath();
                }
                if(config.pointDot){
                    ctx.fillStyle = '#7077f2';
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotBorderWidth;
                    var labelX,labelY;
                    for (var k=0; k<data.datasets[i].data.length; k++){
                        ctx.beginPath();
                        ctx.strokeStyle = '#7077f2';
                        labelX = yAxisPosX + (valueHop *k);
                        labelY = xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop));
                        if(config.dubleCircleBorder) {
                            ctx.arc(labelX,labelY-2,4,0,Math.PI*2,true);
                        }
                        ctx.stroke();
                        ctx.closePath();
                        ctx.beginPath();
                        ctx.strokeStyle = '#fff';
                        ctx.arc(labelX,labelY-2,3,0,Math.PI*2,true);
                        ctx.stroke();
                        ctx.fill();
                        ctx.font = '12px Arial';
                        ctx.fillStyle = '#7077f2';
                        if(labelY < 19) {
                            ctx.fillText(data.datasets[i].data[k], labelX+10, labelY+10);
                        } else {
                            ctx.fillText(data.datasets[i].data[k], labelX+10, labelY-14);
                        }
                    }
                }
            }

            function yPos(dataSet, iteration) {
                return xAxisPosY - animPc * (calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop));
            }

            function xPos(iteration) {
                return yAxisPosX + (valueHop * iteration);
            }
        }

        function drawScale() {
            //X axis line
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
            ctx.lineTo(width - (widestXLabel / 2) - xAxisLength - 5, xAxisPosY);
            ctx.stroke();


            if (rotateLabels > 0) {
                ctx.save();
                ctx.textAlign = "right";
            } else {
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            for (var i = 0; i < data.labels.length; i++) {
                ctx.save();
                ctx.font = '11px'
                if (rotateLabels > 0) {
                    ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI / 180)));
                    ctx.fillText(data.labels[i], 0, 0);
                    ctx.restore();
                } else {
                    ctx.font = '12px Arial';
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(data.labels[i], yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize + 3);
                }
            }

            //Y axis
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(yAxisPosX, xAxisPosY + 5);
            // ctx.lineTo(yAxisPosX, 5);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j = 0; j < calculatedScale.steps; j++) {
                ctx.beginPath();
                ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
                if (config.scaleShowGridLines) {
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    dashedLineTo(yAxisPosX - 3,xAxisPosY - ((j + 1) * scaleHop),yAxisPosX + xAxisLength + 5,xAxisPosY - ((j + 1) * scaleHop), 5);
                    // ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop));
                } else {
                    ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop));
                }

                ctx.stroke();

                if (config.scaleShowLabels) {
                    ctx.font = '12px Arial';
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop));
                }
            }


        }

        function calculateXAxisSize() {
            var longestText = 1;
            //if we are showing the labels
            if (config.scaleShowLabels) {
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                for (var i = 0; i < calculatedScale.labels.length; i++) {
                    var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                    longestText = (measuredText > longestText) ? measuredText : longestText;
                }
                //Add a little extra padding from the y axis
                longestText += 10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength / (data.labels.length - 1));

            yAxisPosX = width - widestXLabel / 2 - xAxisLength;
            xAxisPosY = scaleHeight + config.scaleFontSize / 2;
        }

        function calculateDrawingSizes() {
            maxSize = height;

            //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i = 0; i < data.labels.length; i++) {
                var textLength = ctx.measureText(data.labels[i]).width;
                //If the text length is longer - make that equal to longest text!
                widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
            }
            if (width / data.labels.length < widestXLabel) {
                rotateLabels = 45;
                if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
                    rotateLabels = 90;
                    maxSize -= widestXLabel;
                } else {
                    maxSize -= Math.sin(rotateLabels) * widestXLabel;
                }
            } else {
                maxSize -= config.scaleFontSize;
            }

            //Add a little padding between the x line and the text
            maxSize -= 5;


            labelHeight = config.scaleFontSize;

            maxSize -= labelHeight;
            //Set 5 pixels greater than the font size to allow for a little padding from the X axis.

            scaleHeight = maxSize;

            //Then get the area above we can safely draw on.

        }

        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i = 0; i < data.datasets.length; i++) {
                lowerValue = upperValue = parseFloat(data.datasets[i].data[0]);
                for (var j = 0; j < data.datasets[i].data.length; j++) {
                    if (parseFloat(data.datasets[i].data[j]) > upperValue) { upperValue = parseFloat(data.datasets[i].data[j]); };
                    if (parseFloat(data.datasets[i].data[j]) < lowerValue) { lowerValue = parseFloat(data.datasets[i].data[j]); };
                }
            };

            // var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
            // var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));

            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: 5,
                minSteps: 3
            };


        }
    };

    Line.prototype.destroy = function() {
    	clear(context);
    	return this;
    }

    return Line;
});
