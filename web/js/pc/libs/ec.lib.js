/** 
 * 核心方法库，请勿私自修改
 * @class 	allPage
 * @author  zhuzhengwei
 * @date	2014/05/08
 * @lastModified  2014/11/1
 * @dependon jquery-1.4.1.min.js or later
 */
var ol = {
	version : '0.1',
	domCompleted: false,
	mediaPath : '/images',
	debug: false //是否打开调试模式
};
/**
 * 调试模式下输出调试信息
 * @type {Object}
 */
var logger = {
    checkDebug: function (){
        return (ol.debug && typeof(console) != 'undefined') ? true : false;
    },
	info: function(b, a) {
		if(logger.checkDebug()) console.log(a ? ("[" + b + "]:" + a) : b)
	},
	warn: function(b, a) {
		if(logger.checkDebug()) console.warn(a ? ("[" + b + "]:" + a) : b)
	},
	error: function(b, a) {
		if(logger.checkDebug()) console.error(a ? ("[" + b + "]:" + a) : b)
	}
};

function log(b, a) { 
	logger.info(b, a);
}
function gid(id){
	return document.getElementById(id);
};

/**
 * [常用工具类]
 * @param  {Object} $ jQuery
 * @return {Object}
 */
ol.util = (function($){
	/**
     * 获取url参数
     * @param strParams　带参数的url字符串
	 * @return 返回参数对象集合
	 * Example: ol.util.parseHash('http://www.baidu.com/index.html?key=test'); 
	 * return {"key" : "test"}
     */
    var parseHash = function(hash){
        var tag,query,param={};
        var arr = hash.split('?');
        if(arr.length>1){
            var seg,s;
            query = arr[1];
            seg = query.split('&');
            for(var i=0;i<seg.length;i++){
                if(!seg[i])continue;
                s = seg[i].split('=');
                param[s[0]] = s[1];
            }
        }
        return param ;
    };

    /**
     * [格式化date]
     * @param  {Date} date   标准的时间戳
     * @param  {String} format 格式
     * @return {String}        输出格式化后的字符串
     * formatDate(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss');
     */
    var formatDate = function(date, format){
		var _this = date;
        var d = {
			"M+": _this.getMonth() + 1,
			"d+": _this.getDate(),
			"h+": _this.getHours() % 12 == 0 ? 12 : _this.getHours() % 12,
			"H+": _this.getHours(),
			"m+": _this.getMinutes(),
			"s+": _this.getSeconds(),
			"q+": Math.floor((_this.getMonth() + 3) / 3),
			S: _this.getMilliseconds()
		};
		var c = {
			"0": "\u65e5",
			"1": "\u4e00",
			"2": "\u4e8c",
			"3": "\u4e09",
			"4": "\u56db",
			"5": "\u4e94",
			"6": "\u516d"
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if (/(E+)/.test(format)) {
			format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + c[_this.getDay() + ""]);
		}
		for (var b in d) {
			if (new RegExp("(" + b + ")").test(a)) {
				format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (d[b]) : (("00" + d[b]).substr(("" + d[b]).length)));
			}
		}
		return format;
    };
	/**
     * 字符串格式化为date
     * @param str
     * @param k
	 * parseDate('2014-03-26 12:00:00', 'yyyy-MM-dd hh:mm:ss');
     */
	var parseDate = function(str, k) {
		var v = {
			"\\.": {
				v: "\\."
			},
			"\\?": {
				v: "\\?"
			},
			"M+": {
				v: "(0[1-9]|1[0-2]|[1-9])",
				k: "MM"
			},
			"d+": {
				v: "(3[01]|[12][0-9]|0[1-9]|[1-9])",
				k: "dd"
			},
			"y+": {
				v: "(\\d{4})",
				k: "yyyy"
			},
			"H+": {
				v: "(2[0-3]|[01][0-9]|[0-9])",
				k: "HH"
			},
			"m+": {
				v: "([0-5][0-9]|[0-9])",
				k: "mm"
			},
			"s+": {
				v: "([0-5][0-9]|[0-9])",
				k: "ss"
			},
			S: {
				v: "(\\d+)",
				k: "S"
			}
		};
		var p = [];
		var u = k;
		var w;
		var r;
		for (var t in v) {
			if ((w = k.search(new RegExp("(" + t + ")"))) != -1) {
				r = v[t];
				u = u.replace(RegExp.$1, r.v);
				if (r.k) {
					p.push({
						n: r.k,
						order: w
					})
				}
			}
		}
		p.sort(function(a, b) {
			return a.order - b.order
		});
		r = {};
		for (var q = 0; q < p.length; q++) {
			r[p[q].n] = q + 1
		}
		var x = str.match(new RegExp(u));
		if (!x) {
			throw "Invalid String for parse to Date!"
		}
		var o = new Date();
		if (r.yyyy) {
			o.setFullYear(x[r.yyyy])
		}
		if (r.dd) {
			var d = x[r.dd];
			o.setDate(d);
			o.setDate(d)
		} else {
			o.setDate(1);
			o.setDate(1)
		}
		if (r.MM) {
			o.setMonth(x[r.MM] - 1)
		}
		if (r.HH) {
			o.setHours(x[r.HH])
		} else {
			o.setHours(0)
		}
		if (r.mm) {
			o.setMinutes(x[r.mm])
		} else {
			o.setMinutes(0)
		}
		if (r.ss) {
			o.setSeconds(x[r.ss])
		} else {
			o.setSeconds(0)
		}
		if (r.S) {
			o.setMilliseconds(x[r.S])
		} else {
			o.setMilliseconds(0)
		}
		return o
	};

	 /**
	  * 生成模块对象名
	  * @return {Object} 返回生成后的对象
	  */
	var pkg = function() {
        var a=arguments, o=window, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=(""+a[i]).split(".");
            for (j=0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };

    /**
     * 模板简单替换方法
     * @param  {String} template 被替换的字符串
     * @param  {Object} o        对应的值
     * @return {String}
     */
    var replaceStr = function (template, o) {
        return template.replace(/\{([^{}]*)\}/g, function (a, b) {
                var r = o[b];
                return typeof r === 'string' ? r : a;
            }
        ); 
    };
	/**
     * 删除数组对象里指定的值
     * @param arr 数组对象
     * @param value　要删除的值
     * Example: var arr = [1,2,3,2,1,window,'a','c',window,'a'];
     *          arrReduce(arr, 'window'); //return [1,2,3,2,1,'a','c','a'];
     */
    var arrReduce = function (arr, value) {
        var len = arr.length;
        for (var i = 0; i < len; i += 1) {
            if (arr[i] === value) {
                arr.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    /**
     * 删除数组对象里的重复值，并返回所删除的值的列表
     * @arr    需要处理的数组对象
     * @fn     回调方法，可以接收一个参数，参数为数组对象里的每个值
     * @return 返回所删除的值
     * Example: var arr = [1,2,3,2,1,window,'a','c',window,'a'];
     *          var arr2 = [1,1,8,8,9,7,0];
     *          var fn = function (v) {return 'pre_' + v;};
     *          arrUnique(arr); //return [1,2,window,'a'], arr is [1,2,3,window,'a','c'];
     *          arrUnique(arr2, fn); //return [1,8], arr2 is ['pre_1','pre_8','pre_9','pre_7','pre_0'];
     */
    var arrUnique = function (arr, fn) {
        var arrSort,
            arrDup = [],
            nMatches,
            value;
        arrSort = arr.slice(0);
        arrSort.sort();
        for (var i = 0, len = arrSort.length; i < len; i += 1) {
            if (arrSort[i] === arrSort[i + 1]) {
                if (arrDup.length === 0 || (arrDup.length > 0 && arrDup[length - 1] !== arrSort[i])) {
                    arrDup.push(arrSort[i]);
                }
            }
        }
        for (var j = 0, len2 = arrDup.length; j < len2; j += 1) {
            nMatches = 0;
            value = arrDup[j];
            for (var k = 0; k < arr.length; k += 1) {
                if (value === arr[k]) {
                    nMatches += 1;
                    if (nMatches > 1) {
                        arr.splice(k, 1);
                        k -= 1;
                    }
                }
            }
        }
        if (fn && (toString.call(fn) === "[object Function]")) {
            for (var m = 0; m < arr.length; m += 1) {
                arr[m] = fn(arr[m]);  
            }
        }
        return arrDup;
    };
    /**
     * 自动转换html标签，
     * @param str　需要转换的对象
	 * Example: var str = '<script>alert(0)</script>';
     *          toHtml(str);
     */
	var escapeHtml = function(b) {
		if (typeof(b) != "string") {
			return b
		}
		if (b.trim().length < 1) {
			return ""
		}
		b = b.replaceAll("&", "&amp;");
		b = b.replaceAll('"', "&quot;");
		b = b.replaceAll(" ", "&nbsp;");
		b = b.replaceAll("<", "&lt;");
		b = b.replaceAll(">", "&gt;");
		b = b.replaceAll("'", "&#039;");
		b = b.replaceAll("\r\n", "<br/>");
		b = b.replaceAll("\n", "<br/>");
		b = b.replaceAll("\r", "<br/>");
		return b
	};
	/**
     * 反向转换html标签，
     * @param str　需要转换的对象
     * @param fn　要执行的方法
	 * Example: var fn = function () {alert(1)};
     *          scriptFilter({"ids" : ["mod1", "mod2", "mod3"]}, fn);
     */
	var unescapeHtml = function(str) {
		if (typeof(str) != "string") {
			return str
		}
		if (str.trim().length < 1) {
			return ""
		}
		str = str.replaceAll("&quot;", '"');
		str = str.replaceAll("&nbsp;", " ");
		str = str.replaceAll("&lt;", "<");
		str = str.replaceAll("&gt;", ">");
		str = str.replaceAll("&#039;", "'");
		str = str.replaceAll("<br>", "\n");
		str = str.replaceAll("<br/>", "\n");
		str = str.replaceAll("&#61;", "=");
		str = str.replaceAll("&amp;", "&");
		return b
	};
	/**
     * 生成唯一ID
     * @param prefix　id前缀　可选
	 * Example: genId('genId_');
     */
    var genId = function (prefix) {
        var prefix = prefix || 'guid_';
        var f = arguments.callee;
        if (typeof f.i === 'undefined') {
            f.i = 0;
            f.t = new Date().getTime();
        }
        f.i += 1;
        return prefix + f.t + '_' + f.i;
    };

	/*
		变量缓存方法
		缓存临时数据，用于提高页面性能
	*/
	var cache = {
		_cache: {},
		_size: 0,
		set: function(c, d) {
			if (!ol.util.cache.contains(c)) {
				ol.util.cache._size++
			}
			ol.util.cache._cache[c] = d;
			return d
		},
		get: function(h, g) {
			var f = ol.util.cache;
			var j = f._cache[h];
			if (j) {
				return j
			}
			if (typeof(g) == "function") {
				j = g();
				f._cache[h] = j
			} else {
				if (g) {
					j = g;
					f._cache[h] = j
				} else {
					j = $(h);
					f._cache[h] = j
				}
			}
			f._size++;
			return j
		},
		remove: function(b) {
			ol.util.cache._size--;
			ol.util.cache._cache[b] = null
		},
		contains: function(b) {
			return ol.util.cache._cache[b]
		}
	};
	//json 转换为字符串方法
	var stringify = function (O) {
	    //return JSON.stringify(jsonobj);
	    var S = [];
	    var J = "";
	    if ($.isArray(O)) {
	        for (var i = 0; i < O.length; i++)
	            S.push(ec.util.stringify(O[i]));
	        J = '[' + S.join(',') + ']';
	    }
	    else if (ec.util.isDate(O)) {
	        J = "new Date(" + O.getTime() + ")";
	    }
	    else if (ec.util.isRegExp(O) || $.isFunction(O)) {
	        J = O.toString();
	    }
	    else if (ec.util.isObject(O)) {
	        for (var i in O) {
	            O[i] = typeof (O[i]) == 'string' ? '"' + O[i] + '"' : (typeof (O[i]) === 'object' ? ec.util.stringify(O[i]) : O[i]);
	            S.push('"'+i + '":' + O[i]);
	        }
	        J = '{' + S.join(',') + '}';
	    }
	    return J;
	};
	var isRegExp = function (o) {return Object.prototype.toString.apply(o) === '[object RegExp]'};
	var isDate = function (o) {return Object.prototype.toString.apply(o) === '[object Date]'};
	var isUndefined = function(o) { return typeof o === 'undefined';};
	var isString = function(o) { return typeof o === 'string'; }; 
	var isFunction = function(o) { return typeof o === 'function';};
	var isObject = function(o, failfn) { 
		return (o && (typeof o === 'object' || (!failfn && (typeof o === 'function' || this.isFunction(o))))) || false;
	};

	//获取字符长度;中文为两个字符
	String.prototype.len = function() {
		return this.replace(/[^\x00-\xff]/g, "aa").length;
	};
	//替换字符串中所有指定的字符
	String.prototype.replaceAll = function(b, a) {
		return this.replace(new RegExp(b, "gm"), a);
	};
	//去除字符首尾空格
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^\s+/, "").replace(/\s+$/, "");
		};
	}
	return {
        parseHash : parseHash,
        formatDate : formatDate,
		parseDate : parseDate,
		pkg : pkg,
		replaceStr : replaceStr,
		arrReduce : arrReduce,
		arrUnique : arrUnique,
		escapeHtml : escapeHtml,
		unescapeHtml : unescapeHtml,
		genId : genId,
		cache : cache,
		stringify: stringify,

		isRegExp : isRegExp,
		isDate : isDate,
		isUndefined : isUndefined,
		isString : isString,
		isFunction : isFunction,
		isObject : isObject
    }

})(jQuery);

/* 加载外部js专用 */
ol.loadApi = function (src, id) {
    if (!src || id && gid(id)) return;
    var d = document;
    var s = 'script';
    var js, fjs = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.id = id || '';
    js.src = src;
    js.async = true;
    fjs.parentNode.insertBefore(js, fjs);
};

/* ui 相关插件 */
ol.ui = {
    masker : function (options){
        var _default = {
            opacity : 0, //透明度
            maskId  : "olMask", //id
            maskClass : "ol_mask" //class
        };
        var maskerResize = function (mask) {
            var doc = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;
            var css = {
                    width: Math.max( doc.scrollWidth, doc.clientWidth || 0 ) - 1,
                    height: Math.max( doc.scrollHeight, doc.clientHeight || 0 ) - 1
            };

            mask.css(css);

        };
        var opt = $.extend(_default, options);
        var $maskObj = $('#' + opt.maskId);
        return {
            show : function () {
                //显示蒙层效果
                if(!$maskObj[0]){
                    var $div = $('<div id="'+ opt.maskId +'" class="'+ opt.maskClass +'"></div>');
                    $maskObj = $div.css({"height":$(document).height()+'px', "width":"100%"}).appendTo('body');
                }
                $maskObj.css('opacity', opt.opacity).show();
                $(window).on("resize", function () {
                    maskerResize($maskObj);
                });
            },
            hide : function () {
                 //隐藏蒙层效果
                 if(!$maskObj[0]) return;
                 $maskObj.hide();
            }
        };
    },
	//loading效果
	loading : {
		_default : {
				loadId	: "ol_load",
				loadingImg : '/images/common/other/loading/60_60.gif',
				text : '',
				masker : true
		},
		setPosition : function () {
			var $win = $(window),
				w_t = $win.scrollTop(),
				w_l = $win.scrollLeft(),
				w_h = $win.height(),
				w_w = $win.width(),
				$loadObj = $('#'+ this._default.loadId),
				box_w = $loadObj.outerWidth(true),
				box_h = $loadObj.outerHeight(true);

			var offset={
				x:(w_w-box_w)/2,
				y:(w_h-box_h)/2
			};
			var css={
				position:"fixed"
			};

			//窗口可视面积比box大
			if(offset.x<0)
			{
				css.width=w_w;//重新调整大小
				offset.x=0;
			}
			if(offset.y<0)
			{
				css.height = w_h;
				offset.y = 0;
			}

			css.top = offset.y;
			css.left = offset.x;

			/*if(ol.isIE6)
			{
				css.position="absolute";

				var h=$("html");
				if(!h.css("background-image")||h.css("background-image")=="none")h.css("background-image","url(about:blank)");

				$loadObj[0].style.setExpression('left', '(document.documentElement || document.body).scrollLeft+'+css.left+'+"px"');
				$loadObj[0].style.setExpression('top', '(document.documentElement || document.body).scrollTop+'+css.top+'+"px"');
				delete css["top"];
				delete css["left"];
			}*/
			$loadObj.css(css);

		},
		show : function (options) {

			var thix = this,
				opt = $.extend(thix._default, options),
				css = {},
				$load_ui = $('<p id="'+ opt.loadId +'" class="'+ opt.loadId + '">'+ (opt.text || '<img src="'+opt.loadingImg+'" />') +'</p>');
			if(opt.text && opt.text.trim().length > 0) {
				css = {
					"border" : "#eee solid 1px",
					"background-color" : "#fff",
					"box-shadow" : "0 0 3px #888888"
				};
			}

            //加载蒙层效果
            ol.ui.masker({"opacity" : (opt.masker ? .3 : 0)}).show();

			//加载loading图标
			if(gid(opt.loadId)){
				$('#'+ opt.loadId).show();
				return;
			}
			$load_ui.appendTo('body').css(css).show();

			$(window).on("resize", function () {
				thix.setPosition();
			});

		},
		hide : function () {
			var opt = this._default;
			$('#'+opt.loadId).hide();
            ol.ui.masker().hide();
		}
	},
	scrollTo : function(selector, offsetY) {
		var top = 0;
		if(typeof(selector) == 'string' && $(selector).length > 0) {
			top = $(selector).offset().top;
		}

		if (typeof(selector) == 'number') {
			offsetY = selector;
		}

		if (offsetY && offsetY > 0) {
			top = top + offsetY
		}
		$('body,html').animate({
			scrollTop: top
		}, 200);
	}
};
/*!
 * artTemplate - Template Engine
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */
!(function (global) {


	/**
	 * 模板引擎
	 * @name    template
	 * @param   {String}            模板名
	 * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
	 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
	 */
	var template = function (filename, content) {
	    return typeof content === 'string'
	    ?   compile(content, {
	            filename: filename
	        })
	    :   renderFile(filename, content);
	};


	template.version = '3.0.0';


	/**
	 * 设置全局配置
	 * @name    template.config
	 * @param   {String}    名称
	 * @param   {Any}       值
	 */
	template.config = function (name, value) {
	    defaults[name] = value;
	};



	var defaults = template.defaults = {
	    openTag: '<%',    // 逻辑语法开始标签
	    closeTag: '%>',   // 逻辑语法结束标签
	    escape: true,     // 是否编码输出变量的 HTML 字符
	    cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
	    compress: false,  // 是否压缩输出
	    parser: null      // 自定义语法格式器 @see: template-syntax.js
	};


	var cacheStore = template.cache = {};


	/**
	 * 渲染模板
	 * @name    template.render
	 * @param   {String}    模板
	 * @param   {Object}    数据
	 * @return  {String}    渲染好的字符串
	 */
	template.render = function (source, options) {
	    return compile(source, options);
	};


	/**
	 * 渲染模板(根据模板名)
	 * @name    template.render
	 * @param   {String}    模板名
	 * @param   {Object}    数据
	 * @return  {String}    渲染好的字符串
	 */
	var renderFile = template.renderFile = function (filename, data) {
	    var fn = template.get(filename) || showDebugInfo({
	        filename: filename,
	        name: 'Render Error',
	        message: 'Template not found'
	    });
	    return data ? fn(data) : fn;
	};


	/**
	 * 获取编译缓存（可由外部重写此方法）
	 * @param   {String}    模板名
	 * @param   {Function}  编译好的函数
	 */
	template.get = function (filename) {

	    var cache;
	    if (cacheStore[filename]) {
	        // 使用内存缓存
	        cache = cacheStore[filename];
	    } else if (typeof document === 'object') {
	        // 加载模板并编译
	        var elem = document.getElementById(filename);
	        if (elem) {
	            var source = (elem.value || elem.innerHTML)
	            .replace(/^\s*|\s*$/g, '');
	            cache = compile(source, {
	                filename: filename
	            });
	        }
	    }

	    return cache;
	};


	var toString = function (value, type) {

	    if (typeof value !== 'string') {

	        type = typeof value;
	        if (type === 'number') {
	            value += '';
	        } else if (type === 'function') {
	            value = toString(value.call(value));
	        } else {
	            value = '';
	        }
	    }

	    return value;

	};


	var escapeMap = {
	    "<": "&#60;",
	    ">": "&#62;",
	    '"': "&#34;",
	    "'": "&#39;",
	    "&": "&#38;"
	};


	var escapeFn = function (s) {
	    return escapeMap[s];
	};

	var escapeHTML = function (content) {
	    return toString(content)
	    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	};


	var isArray = Array.isArray || function (obj) {
	    return ({}).toString.call(obj) === '[object Array]';
	};


	var each = function (data, callback) {
	    var i, len;
	    if (isArray(data)) {
	        for (i = 0, len = data.length; i < len; i++) {
	            callback.call(data, data[i], i, data);
	        }
	    } else {
	        for (i in data) {
	            callback.call(data, data[i], i);
	        }
	    }
	};


	var utils = template.utils = {

		$helpers: {},

	    $include: renderFile,

	    $string: toString,

	    $escape: escapeHTML,

	    $each: each
	};/**
	 * 添加模板辅助方法
	 * @name    template.helper
	 * @param   {String}    名称
	 * @param   {Function}  方法
	 */
	template.helper = function (name, helper) {
	    helpers[name] = helper;
	};

	var helpers = template.helpers = utils.$helpers;




	/**
	 * 模板错误事件（可由外部重写此方法）
	 * @name    template.onerror
	 * @event
	 */
	template.onerror = function (e) {
	    var message = 'Template Error\n\n';
	    for (var name in e) {
	        message += '<' + name + '>\n' + e[name] + '\n\n';
	    }

	    if (typeof console === 'object') {
	        console.error(message);
	    }
	};


	// 模板调试器
	var showDebugInfo = function (e) {

	    template.onerror(e);

	    return function () {
	        return '{Template Error}';
	    };
	};


	/**
	 * 编译模板
	 * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
	 * @name    template.compile
	 * @param   {String}    模板字符串
	 * @param   {Object}    编译选项
	 *
	 *      - openTag       {String}
	 *      - closeTag      {String}
	 *      - filename      {String}
	 *      - escape        {Boolean}
	 *      - compress      {Boolean}
	 *      - debug         {Boolean}
	 *      - cache         {Boolean}
	 *      - parser        {Function}
	 *
	 * @return  {Function}  渲染方法
	 */
	var compile = template.compile = function (source, options) {
	    // 合并默认配置
	    options = options || {};
	    for (var name in defaults) {
	        if (options[name] === undefined) {
	            options[name] = defaults[name];
	        }
	    }


	    var filename = options.filename;


	    try {

	        var Render = compiler(source, options);

	    } catch (e) {

	        e.filename = filename || 'anonymous';
	        e.name = 'Syntax Error';

	        return showDebugInfo(e);

	    }

	    // 对编译结果进行一次包装

	    function render (data) {

	        try {

	            return new Render(data, filename) + '';

	        } catch (e) {

	            // 运行时出错后自动开启调试模式重新编译
	            if (!options.debug) {
	                options.debug = true;
	                return compile(source, options)(data);
	            }

	            return showDebugInfo(e)();

	        }

	    }


	    render.prototype = Render.prototype;
	    render.toString = function () {
	        return Render.toString();
	    };


	    if (filename && options.cache) {
	        cacheStore[filename] = render;
	    }

	    return render;

	};




	// 数组迭代
	var forEach = utils.$each;


	// 静态分析模板变量
	var KEYWORDS =
	    // 关键字
	    'break,case,catch,continue,debugger,default,delete,do,else,false'
	    + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
	    + ',throw,true,try,typeof,var,void,while,with'

	    // 保留字
	    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
	    + ',final,float,goto,implements,import,int,interface,long,native'
	    + ',package,private,protected,public,short,static,super,synchronized'
	    + ',throws,transient,volatile'

	    // ECMA 5 - use strict
	    + ',arguments,let,yield'

	    + ',undefined';

	var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g;
	var SPLIT_RE = /[^\w$]+/g;
	var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
	var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
	var BOUNDARY_RE = /^,+|,+$/g;


	// 获取变量
	function getVariable (code) {
	    return code
	    .replace(REMOVE_RE, '')
	    .replace(SPLIT_RE, ',')
	    .replace(KEYWORDS_RE, '')
	    .replace(NUMBER_RE, '')
	    .replace(BOUNDARY_RE, '')
	    .split(/^$|,+/);
	};


	// 字符串转义
	function stringify (code) {
	    return "'" + code
	    // 单引号与反斜杠转义
	    .replace(/('|\\)/g, '\\$1')
	    // 换行符转义(windows + linux)
	    .replace(/\r/g, '\\r')
	    .replace(/\n/g, '\\n') + "'";
	}


	function compiler (source, options) {

	    var debug = options.debug;
	    var openTag = options.openTag;
	    var closeTag = options.closeTag;
	    var parser = options.parser;
	    var compress = options.compress;
	    var escape = options.escape;



	    var line = 1;
	    var uniq = {$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1};



	    var isNewEngine = ''.trim;// '__proto__' in {}
	    var replaces = isNewEngine
	    ? ["$out='';", "$out+=", ";", "$out"]
	    : ["$out=[];", "$out.push(", ");", "$out.join('')"];

	    var concat = isNewEngine
	        ? "$out+=text;return $out;"
	        : "$out.push(text);";

	    var print = "function(){"
	    +      "var text=''.concat.apply('',arguments);"
	    +       concat
	    +  "}";

	    var include = "function(filename,data){"
	    +      "data=data||$data;"
	    +      "var text=$utils.$include(filename,data,$filename);"
	    +       concat
	    +   "}";

	    var headerCode = "'use strict';"
	    + "var $utils=this,$helpers=$utils.$helpers,"
	    + (debug ? "$line=0," : "");

	    var mainCode = replaces[0];

	    var footerCode = "return new String(" + replaces[3] + ");"

	    // html与逻辑语法分离
	    forEach(source.split(openTag), function (code) {
	        code = code.split(closeTag);

	        var $0 = code[0];
	        var $1 = code[1];

	        // code: [html]
	        if (code.length === 1) {

	            mainCode += html($0);

	        // code: [logic, html]
	        } else {

	            mainCode += logic($0);

	            if ($1) {
	                mainCode += html($1);
	            }
	        }


	    });

	    var code = headerCode + mainCode + footerCode;

	    // 调试语句
	    if (debug) {
	        code = "try{" + code + "}catch(e){"
	        +       "throw {"
	        +           "filename:$filename,"
	        +           "name:'Render Error',"
	        +           "message:e.message,"
	        +           "line:$line,"
	        +           "source:" + stringify(source)
	        +           ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')"
	        +       "};"
	        + "}";
	    }

	    try {

	        var Render = new Function("$data", "$filename", code);
	        Render.prototype = utils;

	        return Render;

	    } catch (e) {
	        e.temp = "function anonymous($data,$filename) {" + code + "}";
	        throw e;
	    }


	    // 处理 HTML 语句
	    function html (code) {

	        // 记录行号
	        line += code.split(/\n/).length - 1;

	        // 压缩多余空白与注释
	        if (compress) {
	            code = code
	            .replace(/[\n\r\t\s]+/g, ' ')
	            .replace(/<!--.*?-->/g, '');
	        }

	        if (code) {
	            code = replaces[1] + stringify(code) + replaces[2] + "\n";
	        }

	        return code;
	    }

	    // 处理逻辑语句
	    function logic (code) {

	        var thisLine = line;

	        if (parser) {

	             // 语法转换插件钩子
	            code = parser(code, options);

	        } else if (debug) {

	            // 记录行号
	            code = code.replace(/\n/g, function () {
	                line ++;
	                return "$line=" + line +  ";";
	            });

	        }

	        // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
	        // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
	        if (code.indexOf('=') === 0) {

	            var escapeSyntax = escape && !/^=[=#]/.test(code);

	            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

	            // 对内容编码
	            if (escapeSyntax) {

	                var name = code.replace(/\s*\([^\)]+\)/, '');

	                // 排除 utils.* | include | print
	                if (!utils[name] && !/^(include|print)$/.test(name)) {
	                    code = "$escape(" + code + ")";
	                }

	            // 不编码
	            } else {
	                code = "$string(" + code + ")";
	            }


	            code = replaces[1] + code + replaces[2];

	        }

	        if (debug) {
	            code = "$line=" + thisLine + ";" + code;
	        }

	        // 提取模板中的变量名
	        forEach(getVariable(code), function (name) {

	            // name 值可能为空，在安卓低版本浏览器下
	            if (!name || uniq[name]) {
	                return;
	            }

	            var value;

	            // 声明模板变量
	            // 赋值优先级:
	            // [include, print] > utils > helpers > data
	            if (name === 'print') {

	                value = print;

	            } else if (name === 'include') {

	                value = include;

	            } else if (utils[name]) {

	                value = "$utils." + name;

	            } else if (helpers[name]) {

	                value = "$helpers." + name;

	            } else {

	                value = "$data." + name;
	            }

	            headerCode += name + "=" + value + ",";
	            uniq[name] = true;

	        });

	        return code + "\n";
	    }

	};



	// 定义模板引擎的语法


	defaults.openTag = '{{';
	defaults.closeTag = '}}';


	var filtered = function (js, filter) {
	    var parts = filter.split(':');
	    var name = parts.shift();
	    var args = parts.join(':') || '';

	    if (args) {
	        args = ', ' + args;
	    }

	    return '$helpers.' + name + '(' + js + args + ')';
	}


	defaults.parser = function (code, options) {
	    code = code.replace(/^\s/, '');

	    var split = code.split(' ');
	    var key = split.shift();
	    var args = split.join(' ');

	    switch (key) {

	        case 'if':

	            code = 'if(' + args + '){';
	            break;

	        case 'else':

	            if (split.shift() === 'if') {
	                split = ' if(' + split.join(' ') + ')';
	            } else {
	                split = '';
	            }

	            code = '}else' + split + '{';
	            break;

	        case '/if':

	            code = '}';
	            break;

	        case 'each':

	            var object = split[0] || '$data';
	            var as     = split[1] || 'as';
	            var value  = split[2] || '$value';
	            var index  = split[3] || '$index';

	            var param   = value + ',' + index;

	            if (as !== 'as') {
	                object = '[]';
	            }

	            code =  '$each(' + object + ',function(' + param + '){';
	            break;

	        case '/each':

	            code = '});';
	            break;

	        case 'echo':

	            code = 'print(' + args + ');';
	            break;

	        case 'print':
	        case 'include':

	            code = key + '(' + split.join(',') + ');';
	            break;

	        default:

	            // 过滤器（辅助方法）
	            // {{value | filterA:'abcd' | filterB}}
	            // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
	            if (args.indexOf('|') !== -1) {

	                var escape = options.escape;

	                // {{#value | link}}
	                if (code.indexOf('#') === 0) {
	                    code = code.substr(1);
	                    escape = false;
	                }

	                var i = 0;
	                var array = code.split('|');
	                var len = array.length;
	                var pre = escape ? '$escape' : '$string';
	                var val = pre + '(' + array[i++] + ')';

	                for (; i < len; i ++) {
	                    val = filtered(val, array[i]);
	                }

	                code = '=#' + val;

	            // 即将弃用 {{helperName value}}
	            } else if (template.helpers[key]) {

	                code = '=#' + key + '(' + split.join(',') + ');';

	            // 内容直接输出 {{value}}
	            } else {

	                code = '=' + code;
	            }

	            break;
	    }

	    return code;
	};



	// RequireJS && SeaJS
	if (typeof define === 'function') {
	    define(function() {
	        return template;
	    });

	// NodeJS
	} else if (typeof exports !== 'undefined') {
	    module.exports = template;
	} else {
	    global.template = template;
	}

})(ol.ui);

ol.form = {
	//验证正则
	regex : {
		decmal			:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
		decmal1			:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）
		intel			:"^[0-9]+$", //数字
		number			:"^[1-9]\\d*$", //正整数
		intege			:"^-[1-9]\\d*$", //负整数
		ascii			:"^[\\x00-\\xFF]+$", //仅ACSII字符
		zh				:"^[\\u4e00-\\u9fa5]+$", //仅中文
		color			:"^[a-fA-F0-9]{6}$", //颜色
		date			:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期,如2012-08-25
		email			:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
		idcard			:"^[1-9]([0-9]{14}|[0-9]{17})$", //身份证
		ip4				:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
		letter			:"^[A-Za-z]+$", //字母
		mobile			:"^(1[3458])[0-9]{9}$|(^(\+|00)852[9865])[0-9]{7}", //支持香港手机号
		mobilezh		:"^0?(13|14|15|18)[0-9]{9}$", //国内手机号
		phone			:"^((0[0-9]{2,3}\-)?[2-9][0-9]{6,7}|((00852|\+852)\-)?([2-3][0-9]{7}))+(\-[0-9]{1,4})?$", //固定电话（支持香港固话）
		tel				:"^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$", //固定电话
		tel1			:"^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
		empty			:"^\\S+$", //非空
		password		:"^.*[A-Za-z0-9\\w_-]+.*$", //密码
		picture			:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
		qq				:"^[1-9]([0-9]){4,10}$", //QQ号码
		rar				:"(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
		url				:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
		nickname		:"^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户昵称
		realname		:"^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
		zipcode			:"^\\d{6}$", //邮编
		companyname		:"^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
		address			:"^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
		file			:"^(.*)(\.)(.{1,8})$" //文件类型
	},

	validator : function (selector, config) {
		var msgSuccessCss = 'icon-success',
			msgErrorCss = 'icon-error',
			eleErrorCss = 'error';

		var fields = [], item, _this = $(selector),
			regex = function (reg) { 
				return new RegExp(ol.form.regex[reg]); 
			};

		var test = {
			password: function (val) {
				return regex('password').test(val);
			},
			nickname: function (val) {
				return regex('nickname').test(val);
			},
			realname: function (val) {
				return regex('realname').test(val);
			},
			zipcode: function (val) {
				return regex('zipcode').test(val);
			},
			companyname: function (val) {
				return regex('companyname').test(val);
			},
			phone: function (val) {
				return regex('phone').test(val);
			},
			mobile: function (val) {
				return regex('phone').test(val);
			},
			mobilezh: function (val) {
				return regex('mobilezh').test(val);
			},
			zh: function (val) {
				return regex('zh').test(val);
			},
			picture: function (val) {
				return regex('picture').test(val);
			},
			qq: function (val) {
				return regex('qq').test(val);
			},
			url: function (val) {
				return regex('url').test(val);
			},
			date: function (val) {
				return regex('date').test(val);
			},
			email: function (val) {
				return regex('email').test(val);
			},
			number : function (val, arg) {
				return regex('number').test(val);
			},
			length : function (val, arg) {

				if((!arg.min || parseInt(arg.min) <= 0 ) && (!arg.max || parseInt(arg.max) <= 0)) return true;
				if(arg.min && parseInt(arg.min) > 0) return (val.length < parseInt(arg.min));
				if(arg.max && parseInt(arg.max) > 0) return (val.length > parseInt(arg.max));
				return true;
			}, 
			eq: function (val1, val2) {
				return (val1 == val2);
			}
		};
		function trim(el) {
			return (''.trim) ? el.val().trim() : $.trim(el.val());
		}
		function getError(errorId) {
		  return $('<span id="'+errorId+'" class="'+ msgErrorCss +'"></span>');
		}
		function handleSubmit() {
		  var errors = false, i, l;
		  for (i = 0, l = fields.length; i < l; i += 1) {
			if (!fields[i].testValid(true)) {
			  errors = true;
			}
		  }
		  if (errors) {
			return false;
		  }else if (config.testMode) {
			logger.warn('would have submitted');
			return false;
		  }
		  return true;
		}

		function processField(opts, selector) {
		  var field = $(selector),
			error = {
			  message: opts.msg,
			  id: selector.slice(1) + '_msg'
			},
			errorEl = $(error.id).length > 0 ? $(error.id) : getError(error.id);

		  fields.push(field);
		  field.testValid = function (submit) {
			var val,
			  el = $(this),
			  gotFunc,
			  error = false,
			  temp,
			  errorMsg,
			  required = !!el.get(0).attributes.getNamedItem('required') || opts.required,
			  password = (field.attr('type') === 'password'),
			  arg = ol.util.isFunction(opts.arg) ? opts.arg() : opts.arg;

			// clean it or trim it
			if (ol.util.isFunction(opts.clean)) {
				val = opts.clean(el.val());
			} else if (!opts.trim && !password) {
				val = trim(el);
			} else {
				val = el.val();
			}

			// write it back to the field
			el.val(val);

			// check if we've got an error on our hands
			if (submit === true && required === true && val.length === 0) {
				error = true;
			} else if (opts.type && opts.type.length > 0) {
				for(var i = 0; i < opts.type.length; i += 1) {
					var typeName = opts.type[i];

					gotFunc = ((val.length > 0 || required === 'sometimes') && ol.util.isFunction(test[typeName]));
					if(gotFunc){
						error = !test[typeName](val, arg);
					}
					alert(error+','+typeName);
					if(error) {
						errorMsg = opts.msg[typeName] || opts.msg['default'] || ''; 
						break;
					}

				}

			}

			if (error) {
				el.addClass(eleErrorCss).after(errorEl.html(errorMsg));
				if (ol.util.isFunction(opts.successFunction)) opts.successFunction();
				return false;
			} else {
				temp = errorEl.get(0);
				// this is for zepto
				//if (temp.parentNode) {
				//	temp.parentNode.removeChild(temp);
				//}
				temp.setAttribute('class',msgSuccessCss);
				temp.innerHTML = '';
				el.removeClass(eleErrorCss);
				if (ol.util.isFunction(opts.errorFunction)) opts.errorFunction();
				return true;
			}
		  };
		  field.bind(config.when || 'blur', field.testValid);
		}

		for (item in config.fields) {
		  processField(config.fields[item], item);
		}

		if (config.submitButton) {
		  $(config.submitButton).click(handleSubmit);
		} else {
		  _this.bind('submit', handleSubmit);
		}
		return _this;
	},
	//文本框默认提示信息
	tips : {
		label : function (obj, msg, opt) {
			var html = [];
			var $obj = $(obj);
			var css = {
				"width" : $obj.outerWidth(true) - 6,
				"height" : 'auto'
			};
			var show = function (dom) {
				var thisVal = $.trim($obj.val());
				if(!thisVal){
					dom.show();
				}
			};
			html.push('<label style="cursor:text" class="input_tips">');
			html.push('<input readonly="true" tabindex="-1" />');
			html.push('</label>');
			html = $(html.join(''));

			html.css(css).children('input').val(msg || $obj.attr('data-value'));

			if(opt) {
				html.children('input').css(opt);
			}

			html.click(function () {
				$obj.focus();
				$(this).hide();
			});
			$obj.on('focus', function() { html.hide(); });
			$obj.on('blur', function () { show(html); });
			$obj.parent().prepend(html);
			show(html);

			return this;
		}
	}
};
/*	cookie设置;
	ol.cookie.set('name','value'); 设置
	ol.cookie.get('name'); 获取
	ol.cookie.remove('name'); 移除
*/
ol.cookie = {
	//shortcuts
	defaults: {
		NULL		: null,
		encode      : encodeURIComponent,
		decode      : decodeURIComponent,
		doc         : window.document
	},

	validateCookieName: function (name){
		if (!ol.util.isString(name) || name === ""){
			log("Cookie name must be a non-empty string.");
		}
	},
	validateSubcookieName : function (subName){
		if (!ol.util.isString(subName) || subName === ""){
			log("Subcookie name must be a non-empty string.");
		}
	},
	_createCookieString : function (name /*:String*/, value /*:Variant*/, encodeValue /*:Boolean*/, options /*:Object*/) /*:String*/ {

		options = options || {};

		var text /*:String*/ = this.defaults.encode(name) + "=" + (encodeValue ? this.defaults.encode(value) : value),
			expires = options.expires,
			path    = options.path,
			domain  = options.domain,
			util = ol.util;

		if (util.isObject(options)){
			//expiration date
			if (expires instanceof Date){
				text += "; expires=" + expires.toUTCString();
			}

			//path
			if (util.isString(path) && path !== ""){
				text += "; path=" + path;
			}

			//domain
			if (util.isString(domain) && domain !== ""){
				text += "; domain=" + domain;
			}

			//secure
			if (options.secure === true){
				text += "; secure";
			}
		}

		return text;
	},
	_createCookieHashString : function (hash /*:Object*/) /*:String*/ {
		if (!ol.util.isObject(hash)){
			log("cookie._createCookieHashString(): Argument must be an object.");
		}

		////var text /*:Array*/ = [];
		var text /*:Array*/ = [],key,value;

		for(key in hash){
			value = hash[key];
			if (!ol.util.isFunction(value) && !ol.util.isUndefined(value)){
				text.push(this.defaults.encode(key) + "=" + this.defaults.encode(String(value)));
			}
		}

		return text.join("&");
	},
	_parseCookieHash : function (text) {

		var hashParts   = text.split("&"),
			hashPart    = null,
			hash        = {};

		if (text.length){
			for (var i=0, len=hashParts.length; i < len; i++){
				hashPart = hashParts[i].split("=");
				hash[this.defaults.decode(hashPart[0])] = this.defaults.decode(hashPart[1]);
			}
		}

		return hash;
	},
	_parseCookieString : function (text /*:String*/, shouldDecode /*:Boolean*/) /*:Object*/ {

		var cookies /*:Object*/ = {};

		if (ol.util.isString(text) && text.length > 0) {

			var decodeValue = (shouldDecode === false ? function(s){return s;} : this.defaults.decode),  
				cookieParts = text.split(/;\s/g),
				cookieName  = null,
				cookieValue = null,
				cookieNameValue = null;

			for (var i=0, len=cookieParts.length; i < len; i++){

				//check for normally-formatted cookie (name-value)
				cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
				if (cookieNameValue instanceof Array){
					try {
						cookieName = this.defaults.decode(cookieNameValue[1]);
						cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length+1));
					} catch (ex){
						//intentionally ignore the cookie - the encoding is wrong
					}
				} else {
					//means the cookie does not have an "=", so treat it as a boolean flag
					cookieName = this.defaults.decode(cookieParts[i]);
					cookieValue = "";
				}
				cookies[cookieName] = cookieValue;
			}

		}

		return cookies;
	},
	exists: function(name) {

		this.validateCookieName(name);   //throws error

		var cookies = this._parseCookieString(this.defaults.doc.cookie, true);

		return cookies.hasOwnProperty(name);
	},
	get : function (name, options) {

		this.validateCookieName(name);   //throws error

		var cookies,
			cookie,
			converter;

		//if options is a function, then it's the converter
		if (ol.util.isFunction(options)) {
			converter = options;
			options = {};
		} else if (ol.util.isObject(options)) {
			converter = options.converter;
		} else {
			options = {};
		}

		cookies = this._parseCookieString(this.defaults.doc.cookie, !options.raw);
		cookie = cookies[name];

		//should return null, not undefined if the cookie doesn't exist
		if (ol.util.isUndefined(cookie)) {
			return null;
		}

		if (!ol.util.isFunction(converter)){
			return cookie;
		} else {
			return converter(cookie);
		}
	},
	remove : function (name, options) {

		this.validateCookieName(name);   //throws error

		//set options
		options = $.extend(options || {}, {
			expires: new Date(0)
		});

		//set cookie
		return this.set(name, "", options);
	},

	set : function (name, value, options) {

		this.validateCookieName(name);   //throws error

		if (ol.util.isUndefined(value)){
			log("cookie.set(): Value cannot be undefined.");
		}

		options = options || {};
		var text = this._createCookieString(name, value, !options.raw, options);
		this.defaults.doc.cookie = text;
		return text;
	}
};


/* 异步加载插件, JS, css */
(function() {
	var loadList = {};
	var isLoad = {};
	var loadFile = function (key, opt) {
		this.init(key, opt);
	};
	loadFile.prototype = {
		loadCss : function (urls) {
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			var len = urls.list.length;
			var lst = null;
			var url = '';

			for(var i=0; i<len; i+=1){
				lst = urls.list[i];
				url = lst.uri || lst.url;
				url = (url.indexOf('http') == 0 || url.indexOf('https') == 0) ? url : (ol.libPath + url);
				link.href = url;
				link.rel = 'stylesheet';
				head.appendChild(link);
			}
		},
		loadJs : function (urls, opt) {
			var me = this;
			$.when(me.getScript(urls)).then(function() {
		        if(opt.onload && ol.util.isFunction(opt.onload)) {
		        	opt.onload(); //插件加载完成后执行回调
		        }
			}, function() {
			    logger.warn(opt.plugName + ' load error.');
			});
		},
		getScript : function (urls) {
			var len = urls.list.length;
			var def = null;
			var lst = null;
			var url = null;
			var me = this;

			if(len > 0){
				for(var i=0; i<len; i+=1){
					lst = urls.list[i];
					url = lst.url || lst.uri;
					url = (url.indexOf('http') == 0 || url.indexOf('https') == 0) ? url : ol.libPath + url;
					if(lst.mark && isLoad[lst.mark]) continue;
					def = $.ajax({
							"type": "GET",
							"url": url,
							"dataType": "script",
							"ifModified": true,
							"cache": true
						}).done(function () {
							if(lst.mark) {
								isLoad[lst.mark] = true;
								log(lst.mark + ' load done');
							}
						});
				}
				return def;
			}
		},
		init : function (plugName, opt) {
			if(!ol.util.isString(plugName) && !ol.util.isObject(plugName)) return;

			var plugs = null;
			var newPlugsArray = [];
			var jsList = [];
			var cssList = [];
			var len = 0;
			var lst = null;
			var me = this;

			if(ol.util.isObject(plugName)) {
				var url = plugName.uri || plugName.url;

				if(url && (url.indexOf('http') == 0 || url.indexOf('https') == 0)){
					if(plugName.type == 'js'){
						jsList.push(plugName);
						plugName.plugName = url;
						me.loadJs({"list" : jsList}, plugName);
					} else if(plugName.type == 'css'){
						cssList.push(plugName);
						me.loadCss({"list" : cssList});
					}

				}

				return;
			}

			plugs = loadList[plugName];
			if(!plugs) return;


			if(isLoad[plugName]) {
				if(opt.onload && ol.util.isFunction(opt.onload)) {
		        	opt.onload(); //插件加载完成后执行回调
		        }
				return;
			}

			len = plugs.length;
			for(var i=0; i<len; i+=1){
				if(ol.util.isString(plugs[i])) {
					if(loadList[plugs[i]] && !isLoad[plugs[i]]) {
						ec.load(plugs[i],{
							onload : function () {
								setTimeout(function (){ ec.load(plugName, opt); }, 100);
							}
						});
						return;
						//newPlugsArray.push(loadList[plugs[i]][0]);
					}
				} else if (ol.util.isObject(plugs[i])){
					newPlugsArray.push(plugs[i]);
				}
			}

			len = newPlugsArray.length;

			for(i=0; i<len; i+=1) {
				lst = newPlugsArray[i];
				if(lst.type == 'js') {
					jsList.push(lst);
				} else {
					cssList.push(lst);
				}
			}


			me.loadCss({"list":cssList});

			opt.plugName = plugName;
			me.loadJs({"list": jsList}, opt);

		}
	};
	ol.load = function(key, opt) {
		if ("function" == typeof(opt)) {
			opt = { onload : opt };
		} else if (!opt){
			opt = {};
		}
		if (opt.loadType == "lazy") {
			$(document).ready(function() {
				new loadFile(key, opt);
			})
		} else {
			new loadFile(key, opt);
		}
	};
	ol.ready = function(fn) {
		if (typeof(fn) != "function") {
			return;
		}
		if(ol.domCompleted) {
			fn.call(document);
		} else {
			$(document).ready(function(){ fn.call(document);});
		}
	};
	ol.load.define = function(key, value) {
		loadList[key] = value;
	};
	ol.load.remove = function(key) {
		delete loadList[key]
	};
})();


(function () {
	ol.pkg = ol.util.pkg;

	var scriptArr = document.getElementsByTagName("script"),
		thix = scriptArr[scriptArr.length - 1];
	var i = thix.src.lastIndexOf("/");
	if (i > 0) {
		ol.libPath = thix.src.substring(0, i + 1)
	}
	var name = thix.getAttribute("namespace");
	if (name) {window[name] = ol;}

})();


$(document).ready(function() {
	ol.domCompleted = true;
	logger.info("Dom", "Load Complete!");
	log(jQuery.fn.jquery);
});
