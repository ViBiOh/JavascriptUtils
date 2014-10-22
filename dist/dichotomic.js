/*
	JavaScriptUtils v0.0.1 - 2014-10-22
	by Vincent Boutour under ISC license
	Javascript Utils Functions
*/
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b:a.Dichotomic=b()}(this,function(){"use strict";function a(a,b){return b>a?-1:a===b?0:1}function b(b){return"function"==typeof b?b:a}function c(a,c,d){if(!c)return void 0;var e,f,g=b(d),h=0,i=c.length-1;if(i>=0)for(;i>=h;){if(f=Math.floor((h+i)/2),e=g(a,c[f]),0===e)return{found:!0,index:f};0>e?i=f-1:h=f+1}return{found:!1,index:h}}return{checkSort:function(a,c){if(!a)return void 0;for(var d=b(c),e=a.length-2;e>=0;e-=1)if(d(a[e],a[e+1])>0)return!1;return!0},insert:function(a,b,d){var e=c(a,b,d);return e?(b.splice(e.index,0,a),e.index):void 0},search:function(a,b,d){var e=c(a,b,d);return e&&e.found?b[e.index]:void 0}}});