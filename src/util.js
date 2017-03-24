/**
 * HiDPI Canvas 适配高分辨率显示 (1.0.10)
 *
 * Homepage: https://github.com/jondavidjohn/hidpi-canvas-polyfill
*/
var flag = 1;
function getRealRatio() {
    if(flag !== 1) {
        return;
    }
    ++flag;
    var prototype = CanvasRenderingContext2D.prototype;
    var pixelRatio = (function() {
            var canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d'),
                    backingStore = context.backingStorePixelRatio ||
                        context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1;

            return (window.devicePixelRatio || 1) / backingStore;
        })(),

        forEach = function(obj, func) {
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    func(obj[p], p);
                }
            }
        },

        ratioArgs = {
            'fillRect': 'all',
            'clearRect': 'all',
            'strokeRect': 'all',
            'moveTo': 'all',
            'lineTo': 'all',
            'arc': [0,1,2],
            'arcTo': 'all',
            'bezierCurveTo': 'all',
            'isPointinPath': 'all',
            'isPointinStroke': 'all',
            'quadraticCurveTo': 'all',
            'rect': 'all',
            'translate': 'all',
            'createRadialGradient': 'all',
            'createLinearGradient': 'all'
        };

    if (pixelRatio === 1) return;

    forEach(ratioArgs, function(value, key) {
        prototype[key] = (function(_super) {
            return function() {
                var i, len,
                    args = Array.prototype.slice.call(arguments);

                if (value === 'all') {
                    args = args.map(function(a) {
                        return a * pixelRatio;
                    });
                }
                else if (Array.isArray(value)) {
                    for (i = 0, len = value.length; i < len; i++) {
                        args[value[i]] *= pixelRatio;
                    }
                }

                return _super.apply(this, args);
            };
        })(prototype[key]);
    });

    prototype.ratio = pixelRatio;
     // Stroke lineWidth adjustment
    prototype.stroke = (function(_super) {
        return function() {
            this.lineWidth *= pixelRatio;
            _super.apply(this, arguments);
            this.lineWidth /= pixelRatio;
        };
    })(prototype.stroke);

    // Text
    //
    prototype.fillText = (function(_super) {
        return function() {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(prototype.fillText);

    prototype.strokeText = (function(_super) {
        return function() {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(prototype.strokeText);
}


///////////////////////////
// in order to meet the requirements of the product on the chart, the development of this icon plug-in //
// At present, the main realization of the radar map, instrument panel, line chart   //
///////////////////////////

function extend(robj, sobj) {
    for (var k in sobj) {
        if (robj.hasOwnProperty(k) && typeof robj[k] == 'object') {
            extend(robj[k], sobj[k]);
        } else {
            robj[k] = sobj[k];
        }
    }
    return robj;
}

function calcLocation(cp, r, end) {

    return {
        x: cp[0] + r * Math.cos(Math.PI * end),
        y: cp[1] + r * Math.sin(Math.PI * end)
    };
}
