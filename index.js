!function r(n,t,e){function o(i,u){if(!t[i]){if(!n[i]){var c="function"==typeof require&&require;if(!u&&c)return c(i,!0);if(a)return a(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[i]={exports:{}};n[i][0].call(l.exports,function(r){var t=n[i][1][r];return o(t||r)},l,l.exports,r,n,t,e)}return t[i].exports}for(var a="function"==typeof require&&require,i=0;i<e.length;i++)o(e[i]);return o}({1:[function(r,n,t){function e(){function r(){var r=document.getElementById("source-canvas");u=n.width,r.width=n.width,r.height=n.height;!function(r,n,t){var e=n.width*t,a=n.height*t;r.drawImage(n,0,0,e,a);var i=r.getImageData(0,0,e,a);console.log(i.data),function({srcDataArray:r,scale:n=1,smallWidth:t,smallHeight:e}){var a=document.getElementById("target-canvas");a.width=t*n,a.height=e*n;for(var i=a.getContext("2d"),u={},c=0;c<r.length;c+=4){let e=o(r.slice(c,c+4)),a=u[e];a||(a=o([f.roll(256),f.roll(256),f.roll(256),255]),u[e]=a);let l=~~(~~(c/4)%t*n),s=~~(~~(c/4/t)*n);i.fillStyle=a,i.fillRect(l,s,n,n)}}({srcDataArray:Array.from(i.data),smallWidth:e,smallHeight:a,scale:u/e})}(r.getContext("2d"),n,1/32)}var n=new Image;n.addEventListener("load",r),n.src="data/fish.jpg"}function o(r){return console.log("array",r),`rgba(${r.slice(0,3).map(a).join(", ")}, ${r[3]/255})`}function a(r){return 16*~~(r/16)}function i(r,n,t,e,o){c(o)}var u,c=r("handle-error-web"),f=r("probable");window.onerror=i,e()},{"handle-error-web":2,probable:3}],2:[function(r,n,t){function e(r){if(r){console.error(r,r.stack);var n="";r.name&&(n+=r.name+": "),n+=r.message,r.stack&&(n+=" | "+r.stack.toString()),function(r){var n=document.getElementById("status-message");n.textContent=r,n.classList.remove("hidden")}(n)}}n.exports=e},{}],3:[function(r,n,t){function e(r){function n(r){return Math.floor(h()*r)}function t(r){function t(r){return function(r,n){n=+n;for(var t=0;t<r.length;++t){var e=r[t],o=e[0];if(n>=o[0]&&n<=o[1])return e[1]}}(e,r)}var e=r,o=e[e.length-1][0][1]-e[0][0][0]+1;return{outcomeAtIndex:t,roll:function(){var r=t(n(o));return"function"!=typeof r||"probable_rollOnTable"!==r.name&&"probable_pick"!==r.name?r:r()},length:o,getRangesAndOutcomesArray:function(){return e}}}function e(r){var n=[],t=-1,e=function(r){var n=[];for(var t in r){var e=r[t];n.push([e,t])}return n}(r);return(e=e.sort(o)).forEach(function(r){var e=r[0],o=r[1],a=t+1,i=a+e-1;n.push([[a,i],o]),t=i}),n}function o(r,n){return r[0]>n[0]?-1:1}function a(r){return t(function(r){var n=[];for(var t in r){var e=function(r){var n=r.split("-");if(n.length>2)return;return 1===n.length?[+r,+r]:[+n[0],+n[1]]}(t),o=r[t];if("object"==typeof o)if(Array.isArray(o))o=f(o);else{var u=a(o);"function"==typeof u.roll&&(o=u.roll)}n.push([e,o])}return n.sort(i)}(r))}function i(r,n){return r[0][0]<n[0][0]?-1:1}function u(r){return t(function(r){function n(r){var n=r[0],e=r[1],o=t+n-1,a=[t,o];if(t=o+1,Array.isArray(e))if(function(r){return Array.isArray(r)&&r.length>0&&Array.isArray(r[0])&&2===r[0].length&&"number"==typeof r[0][0]}(e)){var i=u(e);"function"==typeof i.roll&&(e=i.roll)}else e=f(e);return[a,e]}var t=0;return r.map(n)}(r))}function c(r,t){return!r||"number"!=typeof r.length||r.length<1?t:r[n(r.length)]}function f(r,n){return function(){return c(r,n)}}function l(r,n){var t=[];return r.forEach(function(r){n.forEach(function(n){Array.isArray(r)||Array.isArray(n)?t.push(r.concat(n)):t.push([r,n])})}),t}function s(r){for(var t,e=r.length,o=Array(e),a=0;a<e;a++)(t=n(a+1))!==a&&(o[a]=o[t]),o[t]=r[a];return o}var h=Math.random;return r&&r.random&&(h=r.random),{roll:n,rollDie:function(r){return 0===r?0:n(r)+1},createRangeTable:t,createRangeTableFromDict:function(r){return t(e(r))},createTableFromDef:a,createTableFromSizes:u,convertDictToRangesAndOutcomePairs:e,pickFromArray:c,crossArrays:l,getCartesianProduct:function(r){return r.slice(1).reduce(l,r[0])},shuffle:s,sample:function(r,n){return s(r).slice(0,n)},randomFn:h}}var o=e();"object"==typeof n&&(n.exports=o,n.exports.createProbable=e)},{}]},{},[1]);