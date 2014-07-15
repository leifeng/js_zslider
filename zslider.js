   (function () {
        var addEvent = function (obj, etype, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(etype, fn, false);
            } else if (obj.attachEvent) {
                obj.attachEvent('on' + etype, fn);
            } else {
                obj['on' + etype] = fn;
            }
        }
        var removeEvent = function (obj, etype, fn) {
            if (obj.removeEventListener) {
                obj.removeEventListener(etype, fn, false);
            } else if (obj.detachEvent) {
                obj.detachEvent('on' + etype, fn);
            } else {
                obj['on' + etype] = null;
            }
        }
       //indexOf兼容ie8以下
       if(!Array.indexOf){
           Array.prototype.indexOf=function(obj){
               for(var i=0;i<this.length;i++){
                   if(this[i]===obj){
                       return i;
                   }
               }
               return -1;
           }
       }
        var zslider = function (obj, W, w) {
            return new zslider.prototype.init(obj, W, w);
        }
        zslider.prototype = {
            init: function (obj, W, w) {
                this.w = w;
                this.obj = obj;
                this.sliderC = obj.children;
                this.sliderC_Num = this.sliderC.length;
                this.avg = Math.ceil(W / this.sliderC_Num);
                this.make();
            },
            make: function () {
                var c = this.sliderC;
                var c_num = this.sliderC_Num;
                var avg = this.avg;
                var w = this.w;
                var obj = this.obj;
                var child = [];
                for (var i = 0; i < c_num; i++) {
                    c[i].style.left = (avg * i) + 'px';
                    c[i].style.zIndex = 20 * i;
                    child.push(c[i].children[0]);
                }
                var childL = child.length;
                addEvent(obj, 'mouseover', enter);
                function enter(e) {
                    e = e.event || window.event;
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    e.cancelBubble = true;
                    var target = e.target || e.srcElement;
                    if (target.nodeName === 'IMG') {
                        var index = child.indexOf(target);
                        for (var i = 0; i < childL; i++) {
                            var p = child[i].parentNode;
                            var pLeft = p.style.left.replace('px', '') - 0;                          
                            if (i != index) {
                                if (i < index) {
                                    if (i != 0) {
                                        animation(p, pLeft, i * 30);
                                    }

                                } else {
                                    animation(p, pLeft, w - (childL - i) * 30);
                                }
                            } else {
                                if (i != 0) {

                                    animation(p, pLeft, i * 30);
                                }
                            }
                        }
                    }
                    addEvent(obj, 'mouseleave', leave);
                }

                function leave(e) {
                    e = e.event || window.event;
                    var target = e.target || e.srcElement;
                    if (target.nodeName === 'DIV') {
                        for (var i = 0; i < c_num; i++) {
                            animation(c[i], c[i].style.left.replace('px', '') - 0, avg * i);
                        }
                        removeEvent(obj, 'mouseleave', leave);
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    e.cancelBubble = true;
                }

                function animation(obj, a, b) {
                    var temp = Math.ceil(Math.abs(a - b) / 10);
                    if (a < b) {
                        var t1 = setInterval(function () {
                            if (a >= b) {
                                clearInterval(t1);
                            } else {
                                a += temp;
                                obj.style.left = a + 'px';
                            }

                        }, 30)
                    } else {
                        var t2 = setInterval(function () {
                            if (a <= b) {
                                clearInterval(t2);
                            } else {
                                a -= temp;
                                obj.style.left = a + 'px';
                            }
                        }, 30)
                    }
                }
            }
        };
        window.zslider = zslider;
        zslider.prototype.init.prototype = zslider.prototype;
    })();