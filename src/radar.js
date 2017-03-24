;(function(name, fun) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = fun();
    } else if (typeof define === 'function' && define.amd) {
        define(fun);
    } else {
        this[name] = fun();
    }
})('Radar', function() {
    var element,
        styles,
        borderStyle,
        splitLineStyle,
        titleStyle,
        valueRangeStyle,
        innerStyle,
        labelStyle;

    // init function
    function Radar(options) {
        getRealRatio();
        var opt = {
            styles: {
                offset: {
                    top: 8,
                    left: 0
                },
                border: {
                    width: 2,
                    color: '#deebff'
                },
                splitLine: {
                    color: '#dbeaff'
                },
                title: {
                    font: 'bold 52px Microsoft YaHei',
                    color: '#F56948'
                },
                valueRange: {
                    border: {
                        width: 2,
                        color: '#c2dbff'
                    },
                    background: 'rgba(194, 219, 255, 0.5)',
                    arrow: 2
                },
                inner: {
                    radius: 70,
                    background: '#fff'
                },
                label: {
                    image: '',
                    font: '16px Microsoft YaHei',
                    color: '#666'
                }
            }
        };
        this.options = extend(opt, options);
        this.dataLoc = [];
        styles = this.options.styles;
        borderStyle = styles.border;
        splitLineStyle = styles.splitLine;
        titleStyle = styles.title,
            valueRangeStyle = styles.valueRange,
            innerStyle = styles.inner;
        labelStyle = styles.label;

        element = typeof this.options.element == 'string' ? document.getElementById(this.options.element) : this.options.element;
        context = element.getContext('2d');
        var self = this;
        element.addEventListener('click', function(e) {
                var x, y;
                if(e.x || e.y == 0) {
                    x = e.x;
                    y = e.y;
                }
                else if (e.layerX || e.layerX == 0) {
                    x = e.layerX;
                    y = e.layerY;
                }else if (e.offsetX || e.offsetX == 0) { // Opera
                    x = e.offsetX;
                    y = e.offsetY;
                }
                for(var i = 0, l = self.dataLoc.length; i < l; i++) {
                    var item = self.dataLoc[i];
                    if(item.x < x && x < (item.x+item.w) && item.y < y && y < (item.y+item.h)) {
                        self.options.polar[i].clickHandler();
                        return;
                    }
                }
        });
    };

    // class of draw
    Radar.prototype.draw = function() {
            var w = element.offsetWidth,
                h = element.offsetHeight;

            var ofs = this.options.styles.offset;
            this.drawing([w / 2 + ofs.left, h / 2 + ofs.top], w, h);
        }
        // public of draw
    Radar.prototype.drawing = function(cp, w, h) {
        var self = this;

        var polar = this.options.polar,
            polarCount = polar.length,
            radius = this.options.radius,
            data = this.options.data;
        angles = [],
            borderLoc = [];


        var dataTemp = [];
        for (var i = 0; i < polarCount; i++) {
            dataTemp.push(0);

            var end = 1.5 + i * (2 / polarCount);
            angles.push(end);
            borderLoc.push(calcLocation(cp, radius, end));
        }

        context.fillStyle = "#fff";
        context.fillRect(0, 0, w, h);

        this.drawIcon(borderLoc, polar);

        var redrawPath = this.calcRedrawPath(borderLoc);

        var timer = setInterval(function() {

            var eqCount = 0,
                valueSum = 0,
                valueRangeLoc = [],
                innerLoc = [];

            for (var i = 0; i < polarCount; i++) {
                dataTemp[i] = dataTemp[i] + 5 > data[i] ? data[i] : dataTemp[i] + 5;
                if (dataTemp[i] === data[i]) {
                    ++eqCount;
                }

                var end = angles[i];

                // inner
                var ir = innerStyle.radius;
                innerLoc.push(calcLocation(cp, innerStyle.radius, end));

                // valueRange
                // var vr = dataTemp[i]/polar[i].max * (radius - ir) + ir;
                var vr = dataTemp[i] / polar[i].max * radius;
                valueRangeLoc.push(calcLocation(cp, vr, end));

                valueSum += dataTemp[i];
            }

            if (eqCount === polarCount) {
                clearInterval(timer);
            }

            context.clearRect(redrawPath.x, redrawPath.y, redrawPath.w, redrawPath.h);
            context.fillStyle = "#fff";
            context.fillRect(redrawPath.x, redrawPath.y, redrawPath.w, redrawPath.h);

            self.drawInner(cp, valueRangeLoc, borderLoc, innerLoc, valueSum);

        }, 10);
    };

    Radar.prototype.calcRedrawPath = function(borderLoc) {
        var startLoc = borderLoc[0];
        var minX = startLoc.x,
            minY = startLoc.y,
            maxX = startLoc.x,
            maxY = startLoc.y;

        for (var i = 1; i < borderLoc.length; i++) {
            var loc = borderLoc[i];
            minX = loc.x < minX ? loc.x : minX;
            minY = loc.y < minY ? loc.y : minY;
            maxX = loc.x > maxX ? loc.x : maxX;
            maxY = loc.y > maxY ? loc.y : maxY;
        }

        var borderW = borderStyle.width;
        return {
            x: minX - borderW,
            y: minY - borderW,
            w: maxX - minX + borderW * 2,
            h: maxY - minY + borderW * 2
        };
    };

    Radar.prototype.drawInner = function(cp, valueRangeLoc, borderLoc, innerLoc, valueSum) {
        this.drawLine({
            lines: borderLoc,
            style: borderStyle.color,
            width: borderStyle.width,
            fill: '#eaf2ff'
        });

        this.drawLine({
            lines: valueRangeLoc,
            style: valueRangeStyle.border.color,
            width: valueRangeStyle.border.width,
            fill: valueRangeStyle.background
        });

        for (var j = 0; j < borderLoc.length; j++) {
            this.drawLine({
                lines: [{ x: cp[0], y: cp[1] }, borderLoc[j]],
                style: splitLineStyle.color
            });
        }
    };

    Radar.prototype.drawIcon = function(borderLoc, polar) {
        var self = this;
        if(labelStyle.image) {
            var img = new Image();
            img.src = labelStyle.image;
            img.onload = function() {
                for (var n = 0; n < borderLoc.length; n++) {
                    var text = polar[n].text,
                        icon = polar[n].label,
                        loc = borderLoc[n],
                        x = loc.x + icon.l,
                        y = loc.y + icon.t;
                    context.drawImage(img, icon.sx, icon.sy, 2*icon.w, 2*icon.h, context.ratio*x, context.ratio*y, context.ratio*icon.w, context.ratio*icon.h);
                    self.dataLoc.push({
                        x: x,
                        y:y,
                        w: icon.w,
                        h: icon.h+20,
                    });
                    self.drawText({
                        font: labelStyle.font,
                        color: labelStyle.color,
                        text: text,
                        x: x + icon.w / 2,
                        y: y + icon.h + 10
                    });
                }
            }
        } else {
            for (var n = 0; n < borderLoc.length; n++) {
                    var text = polar[n].text,
                        icon = polar[n].label,
                        loc = borderLoc[n],
                        x = loc.x+icon.l,
                        y = loc.y+icon.t;
                    // context.drawImage(img, icon.sx, icon.sy, 2*icon.w, 2*icon.h, context.ratio*x, context.ratio*y, context.ratio*icon.w, context.ratio*icon.h);
                    self.dataLoc.push({
                        x: x,
                        y:y,
                        w: context.measureText(text).width,
                        h: 10,
                    });
                    self.drawText({
                        font: labelStyle.font,
                        color: labelStyle.color,
                        text: text,
                        x: x,
                        y: y
                    });
                }
        }

    };

    // draw text
    Radar.prototype.drawText = function(opts) {

        context.fillStyle = opts.color;
        context.textAlign = opts.align || 'center';
        context.textBaseline = opts.vertical || 'middle';
        context.moveTo(opts.x, opts.y);
        context.font = '12px sans-serif';
        context.fillText(opts.text, opts.x, opts.y);
    };

    // draw line
    Radar.prototype.drawLine = function(line) {
        var lines = line.lines;
        context.beginPath();
        context.moveTo(lines[0].x, lines[0].y);

        for (var i = 1; i < lines.length; i++) {
            context.lineTo(lines[i].x, lines[i].y);
        }

        context.closePath();

        if (line.style) {
            context.strokeStyle = line.style;
            context.lineWidth = line.width || 1;
            context.stroke();
        }

        if (line.fill) {
            context.fillStyle = line.fill;
            context.fill();

        }
    }
    return Radar;
});
