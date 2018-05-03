!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=8)}([function(t,e){!function(){"use strict";function t(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,i),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,e+=1}var e=0,n={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var i in n)e.push(n[i]);for(var o=0,r=e.length;r>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){for(var e in t.Context.refreshAll(),n)n[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,i[t.waypointContextKey]=this,n+=1,o.windowContext||(o.windowContext=!0,o.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,i={},o=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),n=this.element==this.element.window;t&&e&&!n&&(this.adapter.off(".waypoints"),delete i[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var i=e[n],o=i.newScroll>i.oldScroll?i.forward:i.backward;for(var r in this.waypoints[n]){var s=this.waypoints[n][r];if(null!==s.triggerPoint){var a=i.oldScroll<s.triggerPoint,l=i.newScroll>=s.triggerPoint;(a&&l||!a&&!l)&&(s.queueTrigger(o),t[s.group.id]=s.group)}}}for(var h in t)t[h].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var i=0,o=t.length;o>i;i++)t[i].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),i={};for(var r in this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var s=t[r];for(var a in this.waypoints[r]){var l,h,c,u,d=this.waypoints[r][a],f=d.options.offset,p=d.triggerPoint,m=0,g=null==p;d.element!==d.element.window&&(m=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(m+l-f),h=p<s.oldScroll,c=d.triggerPoint>=s.oldScroll,u=!h&&!c,!g&&(h&&c)?(d.queueTrigger(s.backward),i[d.group.id]=d.group):!g&&u?(d.queueTrigger(s.forward),i[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),i[d.group.id]=d.group)}}return o.requestAnimationFrame(function(){for(var t in i)i[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in i)i[t].refresh()},e.findByElement=function(t){return i[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},o.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function n(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},o=window.Waypoint;n.prototype.add=function(t){this.waypoints.push(t)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],o="up"===n||"left"===n;i.sort(o?e:t);for(var r=0,s=i.length;s>r;r+=1){var a=i[r];(a.options.continuous||r===i.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n===this.waypoints.length-1?null:this.waypoints[n+1]},n.prototype.previous=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},n.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(t){return i[t.axis][t.name]||new n(t)},o.Group=n}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function n(t){this.element=t,this.handlers={}}var i=window.Waypoint;n.prototype.innerHeight=function(){return t(this.element)?this.element.innerHeight:this.element.clientHeight},n.prototype.innerWidth=function(){return t(this.element)?this.element.innerWidth:this.element.clientWidth},n.prototype.off=function(t,e){function n(t,e,n){for(var i=0,o=e.length-1;o>i;i++){var r=e[i];n&&n!==r||t.removeEventListener(r)}}var i=t.split("."),o=i[0],r=i[1],s=this.element;if(r&&this.handlers[r]&&o)n(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var a in this.handlers)n(s,this.handlers[a][o]||[],e),this.handlers[a][o]=[];else if(r&&this.handlers[r]){for(var l in this.handlers[r])n(s,this.handlers[r][l],e);this.handlers[r]={}}},n.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,n=e(this.element.ownerDocument),i={top:0,left:0};return this.element.getBoundingClientRect&&(i=this.element.getBoundingClientRect()),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}},n.prototype.on=function(t,e){var n=t.split("."),i=n[0],o=n[1]||"__default",r=this.handlers[o]=this.handlers[o]||{};(r[i]=r[i]||[]).push(e),this.element.addEventListener(i,e)},n.prototype.outerHeight=function(e){var n,i=this.innerHeight();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginTop,10),i+=parseInt(n.marginBottom,10)),i},n.prototype.outerWidth=function(e){var n,i=this.innerWidth();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginLeft,10),i+=parseInt(n.marginRight,10)),i},n.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},n.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},n.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}for(var e=Array.prototype.slice.call(arguments),n=1,i=e.length;i>n;n++)t(e[0],e[n]);return e[0]},n.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},n.isEmptyObject=function(t){for(var e in t)return!1;return!0},i.adapters.push({name:"noframework",Adapter:n}),i.Adapter=n}()},function(t,e){!function(t,e){"use strict";if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];o.prototype.THROTTLE_TIMEOUT=100,o.prototype.POLL_INTERVAL=null,o.prototype.USE_MUTATION_OBSERVER=!0,o.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},o.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},o.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},o.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},o.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},o.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},o.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(r(t,"resize",this._checkForIntersections,!0),r(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},o.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},o.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),n=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(o){var r=o.element,s=a(r),l=this._rootContainsTarget(r),h=o.entry,c=e&&l&&this._computeTargetAndRootIntersection(r,n),u=o.entry=new i({time:t.performance&&performance.now&&performance.now(),target:r,boundingClientRect:s,rootBounds:n,intersectionRect:c});h?e&&l?this._hasCrossedThreshold(h,u)&&this._queuedEntries.push(u):h&&h.isIntersecting&&this._queuedEntries.push(u):this._queuedEntries.push(u)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},o.prototype._computeTargetAndRootIntersection=function(n,i){if("none"!=t.getComputedStyle(n).display){for(var o,r,s,l,c,u,d,f,p=a(n),m=h(n),g=!1;!g;){var y=null,v=1==m.nodeType?t.getComputedStyle(m):{};if("none"==v.display)return;if(m==this.root||m==e?(g=!0,y=i):m!=e.body&&m!=e.documentElement&&"visible"!=v.overflow&&(y=a(m)),y&&(o=y,r=p,void 0,void 0,void 0,void 0,void 0,void 0,s=Math.max(o.top,r.top),l=Math.min(o.bottom,r.bottom),c=Math.max(o.left,r.left),u=Math.min(o.right,r.right),f=l-s,!(p=(d=u-c)>=0&&f>=0&&{top:s,bottom:l,left:c,right:u,width:d,height:f})))break;m=h(m)}return p}},o.prototype._getRootRect=function(){var t;if(this.root)t=a(this.root);else{var n=e.documentElement,i=e.body;t={top:0,left:0,right:n.clientWidth||i.clientWidth,width:n.clientWidth||i.clientWidth,bottom:n.clientHeight||i.clientHeight,height:n.clientHeight||i.clientHeight}}return this._expandRectByRootMargin(t)},o.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},o.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,i=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==i)for(var o=0;o<this.thresholds.length;o++){var r=this.thresholds[o];if(r==n||r==i||r<n!=r<i)return!0}},o.prototype._rootIsInDom=function(){return!this.root||l(e,this.root)},o.prototype._rootContainsTarget=function(t){return l(this.root||e,t)},o.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},o.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=o,t.IntersectionObserverEntry=i}function i(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,i=this.intersectionRect,o=i.width*i.height;this.intersectionRatio=n?o/n:this.isIntersecting?1:0}function o(t,e){var n,i,o,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),i=this.THROTTLE_TIMEOUT,o=null,function(){o||(o=setTimeout(function(){n(),o=null},i))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function r(t,e,n,i){"function"==typeof t.addEventListener?t.addEventListener(e,n,i||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,i){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,i||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function a(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function l(t,e){for(var n=e;n;){if(n==t)return!0;n=h(n)}return!1}function h(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}}(window,document)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.modal=document.querySelector(".modal"),this.modalInner=document.querySelector(".modal__inner"),this.modalTrigger=document.querySelectorAll(".my-work__thumbnail__button"),this.modalCloseButton=document.querySelector(".modal__close"),this.modalHeader=document.querySelector(".modal__info h3"),this.modalBody=document.querySelector(".modal__info p"),this.modalImage=document.querySelector(".modal__image"),this.modalButton=document.querySelector(".modal__button"),this.body=document.querySelector("body"),this.events=this.events.bind(this),this.openModal=this.openModal.bind(this),this.closeModal=this.closeModal.bind(this),this.events()}return i(t,[{key:"events",value:function(){for(var t=this,e=0;e<this.modalTrigger.length;e++)this.modalTrigger[e].addEventListener("click",function(e){console.log(e.target.getAttribute("data-matching-link")),t.injectContent(e)});this.modal.addEventListener("click",function(e){e.target===t.modal&&t.closeModal()}),this.modalCloseButton.addEventListener("click",this.closeModal)}},{key:"injectContent",value:function(t){switch(t.srcElement.getAttribute("data-matching-link")){case"pump-watch":this.modalHeader.innerHTML="Pump Watch",this.modalBody.innerHTML="A React application design to monitor Binance exchange crypto currency price fluctuations within a short time frame. Application utilizes React, Reacharts, websockets and the fetch api",this.modalImage.src="images/pump-watch.png",this.modalButton.href="https://tamn1988.github.io/pump-watch/",this.modalButton.innerHTML="View";break;case"pomodoro":this.modalHeader.innerHTML="Pomodoro Timer",this.modalBody.innerHTML="A Pomodoro timer created in pure javascript. It includes start, stop, reset, and time interval changing functions",this.modalImage.src="images/pomodoro-medium.jpg",this.modalButton.href="https://codepen.io/Tamn1988/full/NwNGpa/",this.modalButton.innerHTML="View on CodePen";break;case"travel-site":this.modalHeader.innerHTML="Travel Site",this.modalBody.innerHTML="A Mock Travel Agency website created using grunt, postcss, JQuery, ES6 class modules, and BEM naming practices.",this.modalImage.src="images/travel-site-medium.jpg",this.modalButton.href="https://tamn1988.github.io/travel-site/",this.modalButton.innerHTML="View";break;case"wikipedia":this.modalHeader.innerHTML="Wikipedia Viewer",this.modalBody.innerHTML="A Wikipedia Viewer created using JQuery. Search string is parsed and the wikipedia api is called to return the result",this.modalImage.src="images/wikipedia-medium.jpg",this.modalButton.href="https://codepen.io/Tamn1988/pen/QdjJqO",this.modalButton.innerHTML="View on CodePen";break;case"nail-site":this.modalHeader.innerHTML="Miro Nails",this.modalBody.innerHTML="A clone of Miro Nails built with pure javascript, ES6 class modules, flexbox and BEM naming practices. It has minor layout changes to better accommodate mobile and large viewports for a better responsive layout",this.modalImage.src="images/nail-site-medium.jpg",this.modalButton.href="https://tamn1988.github.io/Nails/",this.modalButton.innerHTML="View"}this.openModal()}},{key:"openModal",value:function(){this.modal.classList.remove("animations--close-modal"),this.modalInner.classList.remove("animations--close-modal--inner"),this.modal.classList.add("animations--open-modal"),this.modalInner.classList.add("animations--open-modal--inner"),this.body.classList.add("modal--body-prevent-scroll")}},{key:"closeModal",value:function(){this.modal.classList.add("animations--close-modal"),this.modalInner.classList.add("animations--close-modal--inner"),this.modal.classList.remove("animations--open-modal"),this.modalInner.classList.remove("animations--open-modal--inner"),this.body.classList.remove("modal--body-prevent-scroll")}}]),t}();e.default=o},function(t,e,n){var i,o,r;o=[],i=function(){"use strict";var t=function(t){return t&&"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,i){var o;n=n||999,i||0===i||(i=9);var r=function(t){o=t},s=function(){clearTimeout(o),r(0)},a=function(t){return Math.max(0,e.getTopOf(t)-i)},l=function(i,o,a){if(s(),0===o||o&&o<0||t(e.body))e.toY(i),a&&a();else{var l=e.getY(),h=Math.max(0,i)-l,c=(new Date).getTime();o=o||Math.min(Math.abs(h),n),function t(){r(setTimeout(function(){var n=Math.min(1,((new Date).getTime()-c)/o),i=Math.max(0,Math.floor(l+h*(n<.5?2*n*n:n*(4-2*n)-1)));e.toY(i),n<1&&e.getHeight()+i<e.body.scrollHeight?t():(setTimeout(s,99),a&&a())},9))}()}},h=function(t,e,n){l(a(t),e,n)};return{setup:function(t,e){return(0===t||t)&&(n=t),(0===e||e)&&(i=e),{defaultDuration:n,edgeOffset:i}},to:h,toY:l,intoView:function(t,n,o){var r=t.getBoundingClientRect().height,s=e.getTopOf(t)+r,c=e.getHeight(),u=e.getY(),d=u+c;a(t)<u||r+i>c?h(t,n,o):s+i>d?l(s-c+i,n,o):o&&o()},center:function(t,n,i,o){l(Math.max(0,e.getTopOf(t)-e.getHeight()/2+(i||t.getBoundingClientRect().height/2)),n,o)},stop:s,moving:function(){return!!o},getY:e.getY,getTopOf:e.getTopOf}},n=document.documentElement,i=function(){return window.scrollY||n.scrollTop},o=e({body:document.scrollingElement||document.body,toY:function(t){window.scrollTo(0,t)},getY:i,getHeight:function(){return window.innerHeight||n.clientHeight},getTopOf:function(t){return t.getBoundingClientRect().top+i()-n.offsetTop}});if(o.createScroller=function(t,i,o){return e({body:t,toY:function(e){t.scrollTop=e},getY:function(){return t.scrollTop},getHeight:function(){return Math.min(t.clientHeight,window.innerHeight||n.clientHeight)},getTopOf:function(t){return t.offsetTop}},i,o)},"addEventListener"in window&&!window.noZensmooth&&!t(document.body)){var r="history"in window&&"pushState"in history,s=r&&"scrollRestoration"in history;s&&(history.scrollRestoration="auto"),window.addEventListener("load",function(){s&&(setTimeout(function(){history.scrollRestoration="manual"},9),window.addEventListener("popstate",function(t){t.state&&"zenscrollY"in t.state&&o.toY(t.state.zenscrollY)},!1)),window.location.hash&&setTimeout(function(){var t=o.setup().edgeOffset;if(t){var e=document.getElementById(window.location.href.split("#")[1]);if(e){var n=Math.max(0,o.getTopOf(e)-t),i=o.getY()-n;0<=i&&i<9&&window.scrollTo(0,n)}}},9)},!1);var a=new RegExp("(^|\\s)noZensmooth(\\s|$)");window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){if(s){var n=history.state&&"object"==typeof history.state?history.state:{};n.zenscrollY=o.getY();try{history.replaceState(n,"")}catch(t){}}var i=e.getAttribute("href")||"";if(0===i.indexOf("#")&&!a.test(e.className)){var l=0,h=document.getElementById(i.substring(1));if("#"!==i){if(!h)return;l=o.getTopOf(h)}t.preventDefault();var c=function(){window.location=i},u=o.setup().edgeOffset;u&&(l=Math.max(0,l-u),r&&(c=function(){history.pushState({},"",i)})),o.toY(l,null,c)}}},!1)}return o}(),void 0===(r="function"==typeof i?i.apply(e,o):i)||(t.exports=r)},function(t,e){!function(e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var o,r=!1;e.getComputedStyle?(o=n.createElement("div"),["","-webkit-","-moz-","-ms-"].some(function(t){try{o.style.position=t+"sticky"}catch(t){}return""!=o.style.position})&&(r=!0)):r=!0;var s="undefined"!=typeof ShadowRoot,a={top:null,left:null},l=[];function h(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}function c(t){return parseFloat(t)||0}function u(t){for(var e=0;t;)e+=t.offsetTop,t=t.offsetParent;return e}var d=function(){function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!(e instanceof HTMLElement))throw new Error("First argument must be HTMLElement");if(l.some(function(t){return t._node===e}))throw new Error("Stickyfill is already applied to this node");this._node=e,this._stickyMode=null,this._active=!1,l.push(this),this.refresh()}return i(t,[{key:"refresh",value:function(){if(!r&&!this._removed){this._active&&this._deactivate();var t=this._node,i=getComputedStyle(t),o={top:i.top,display:i.display,marginTop:i.marginTop,marginBottom:i.marginBottom,marginLeft:i.marginLeft,marginRight:i.marginRight,cssFloat:i.cssFloat};if(!isNaN(parseFloat(o.top))&&"table-cell"!=o.display&&"none"!=o.display){this._active=!0;var a=t.parentNode,l=s&&a instanceof ShadowRoot?a.host:a,d=t.getBoundingClientRect(),f=l.getBoundingClientRect(),p=getComputedStyle(l);this._parent={node:l,styles:{position:l.style.position},offsetHeight:l.offsetHeight},this._offsetToWindow={left:d.left,right:n.documentElement.clientWidth-d.right},this._offsetToParent={top:d.top-f.top-c(p.borderTopWidth),left:d.left-f.left-c(p.borderLeftWidth),right:-d.right+f.right-c(p.borderRightWidth)},this._styles={position:t.style.position,top:t.style.top,bottom:t.style.bottom,left:t.style.left,right:t.style.right,width:t.style.width,marginTop:t.style.marginTop,marginLeft:t.style.marginLeft,marginRight:t.style.marginRight};var m=c(o.top);this._limits={start:d.top+e.pageYOffset-m,end:f.top+e.pageYOffset+l.offsetHeight-c(p.borderBottomWidth)-t.offsetHeight-m-c(o.marginBottom)};var g=p.position;"absolute"!=g&&"relative"!=g&&(l.style.position="relative"),this._recalcPosition();var y=this._clone={};y.node=n.createElement("div"),h(y.node.style,{width:d.right-d.left+"px",height:d.bottom-d.top+"px",marginTop:o.marginTop,marginBottom:o.marginBottom,marginLeft:o.marginLeft,marginRight:o.marginRight,cssFloat:o.cssFloat,padding:0,border:0,borderSpacing:0,fontSize:"1em",position:"static"}),a.insertBefore(y.node,t),y.docOffsetTop=u(y.node)}}}},{key:"_recalcPosition",value:function(){if(this._active&&!this._removed){var t=a.top<=this._limits.start?"start":a.top>=this._limits.end?"end":"middle";if(this._stickyMode!=t){switch(t){case"start":h(this._node.style,{position:"absolute",left:this._offsetToParent.left+"px",right:this._offsetToParent.right+"px",top:this._offsetToParent.top+"px",bottom:"auto",width:"auto",marginLeft:0,marginRight:0,marginTop:0});break;case"middle":h(this._node.style,{position:"fixed",left:this._offsetToWindow.left+"px",right:this._offsetToWindow.right+"px",top:this._styles.top,bottom:"auto",width:"auto",marginLeft:0,marginRight:0,marginTop:0});break;case"end":h(this._node.style,{position:"absolute",left:this._offsetToParent.left+"px",right:this._offsetToParent.right+"px",top:"auto",bottom:0,width:"auto",marginLeft:0,marginRight:0})}this._stickyMode=t}}}},{key:"_fastCheck",value:function(){this._active&&!this._removed&&(Math.abs(u(this._clone.node)-this._clone.docOffsetTop)>1||Math.abs(this._parent.node.offsetHeight-this._parent.offsetHeight)>1)&&this.refresh()}},{key:"_deactivate",value:function(){var t=this;this._active&&!this._removed&&(this._clone.node.parentNode.removeChild(this._clone.node),delete this._clone,h(this._node.style,this._styles),delete this._styles,l.some(function(e){return e!==t&&e._parent&&e._parent.node===t._parent.node})||h(this._parent.node.style,this._parent.styles),delete this._parent,this._stickyMode=null,this._active=!1,delete this._offsetToWindow,delete this._offsetToParent,delete this._limits)}},{key:"remove",value:function(){var t=this;this._deactivate(),l.some(function(e,n){if(e._node===t._node)return l.splice(n,1),!0}),this._removed=!0}}]),t}(),f={stickies:l,Sticky:d,addOne:function(t){if(!(t instanceof HTMLElement)){if(!t.length||!t[0])return;t=t[0]}for(var e=0;e<l.length;e++)if(l[e]._node===t)return l[e];return new d(t)},add:function(t){if(t instanceof HTMLElement&&(t=[t]),t.length){for(var e=[],n=function(n){var i=t[n];return i instanceof HTMLElement?l.some(function(t){if(t._node===i)return e.push(t),!0})?"continue":void e.push(new d(i)):(e.push(void 0),"continue")},i=0;i<t.length;i++)n(i);return e}},refreshAll:function(){l.forEach(function(t){return t.refresh()})},removeOne:function(t){if(!(t instanceof HTMLElement)){if(!t.length||!t[0])return;t=t[0]}l.some(function(e){if(e._node===t)return e.remove(),!0})},remove:function(t){if(t instanceof HTMLElement&&(t=[t]),t.length)for(var e=function(e){var n=t[e];l.some(function(t){if(t._node===n)return t.remove(),!0})},n=0;n<t.length;n++)e(n)},removeAll:function(){for(;l.length;)l[0].remove()}};r||function(){function t(){e.pageXOffset!=a.left?(a.top=e.pageYOffset,a.left=e.pageXOffset,f.refreshAll()):e.pageYOffset!=a.top&&(a.top=e.pageYOffset,a.left=e.pageXOffset,l.forEach(function(t){return t._recalcPosition()}))}t(),e.addEventListener("scroll",t),e.addEventListener("resize",f.refreshAll),e.addEventListener("orientationchange",f.refreshAll);var i=void 0;function o(){i=setInterval(function(){l.forEach(function(t){return t._fastCheck()})},500)}var r=void 0,s=void 0;"hidden"in n?(r="hidden",s="visibilitychange"):"webkitHidden"in n&&(r="webkitHidden",s="webkitvisibilitychange"),s?(n[r]||o(),n.addEventListener(s,function(){n[r]?clearInterval(i):o()})):o()}(),void 0!==t&&t.exports?t.exports=f:e.Stickyfill=f}(window,document)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(0);(i=r)&&i.__esModule;var s=function(){function t(e,n,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.offset=e,this.classToAdd=o,this.elementToHighlight=document.querySelectorAll(n),this.attributeSelector=i,this.pageSection=document.querySelectorAll(".page-section"),this.landingSection=document.querySelector(".large-hero"),this.addHighlights=this.addHighlights.bind(this),this.addHighlightsLanding=this.addHighlightsLanding.bind(this),this.addHighlightsLanding(),this.addHighlights()}return o(t,[{key:"removeHighlight",value:function(){for(var t=0;t<this.elementToHighlight.length;t++)this.elementToHighlight[t].classList.remove(this.classToAdd)}},{key:"addHighlightsLanding",value:function(){var t=this,e=this.landingSection,n=this.landingSection.getAttribute(this.attributeSelector);new Waypoint({element:e,handler:function(e){"down"===e&&(t.removeHighlight(),document.getElementById(n).classList.add(t.classToAdd))},offset:this.offset}),new Waypoint({element:e,handler:function(e){"up"&&(t.removeHighlight(),document.getElementById(n).classList.add(t.classToAdd))},offset:"-40%"})}},{key:"addHighlights",value:function(){for(var t=this,e=function(e){var n=t.pageSection[e],i=t.pageSection[e].getAttribute(t.attributeSelector);new Waypoint({element:n,handler:function(e){"down"===e&&(t.removeHighlight(),document.getElementById(i).classList.add(t.classToAdd))},offset:t.offset}),new Waypoint({element:n,handler:function(e){"up"&&(t.removeHighlight(),document.getElementById(i).classList.add(t.classToAdd))},offset:"-40%"})},n=0;n<this.pageSection.length;n++)e(n)}}]),t}();e.default=s},function(t,e,n){"use strict";var i,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(0);(i=r)&&i.__esModule;function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var h=function(){function t(e,n,i,o){l(this,t),this.elToAnimate=e,this.offset=n,this.classToHide=i,this.classToAdd=o,this.hideInitially=this.hideInitially.bind(this),this.hideInitially(),this.createWaypoints=this.createWaypoints.bind(this),this.createWaypoints()}return o(t,[{key:"hideInitially",value:function(){for(var t=0;t<this.elToAnimate.length;t++)this.elToAnimate[t].classList.add(this.classToHide)}},{key:"createWaypoints",value:function(){for(var t=this,e=function(e){var n=t.elToAnimate[e];new Waypoint({element:n,handler:function(){n.classList.add(t.classToAdd)},offset:t.offset})},n=0;n<this.elToAnimate.length;n++)e(n)}}]),t}(),c=function(t){function e(t,n,i,o){return l(this,e),s(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i,o))}return a(e,h),o(e,[{key:"createWaypoints",value:function(){var t=this;new Waypoint({element:this.elToAnimate[0],handler:function(e){if("down"===e)for(var n=0;n<t.elToAnimate.length;n++)t.elToAnimate[n].classList.add(t.classToAdd)},offset:this.offset})}}]),e}(),u=function(t){function e(t,n,i,o){return l(this,e),s(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i,o))}return a(e,h),o(e,[{key:"createWaypoints",value:function(){var t=this;new Waypoint({element:this.elToAnimate[0],handler:function(e){if("down"===e)for(var n=function(e){setTimeout(function(){t.elToAnimate[e].classList.add(t.classToAdd)},200*e)},i=0;i<t.elToAnimate.length;i++)n(i)},offset:this.offset})}}]),e}();t.exports={SingleElement:h,MultipleElements:c,DelayAnimate:u}},function(t,e,n){t.exports=function(){"use strict";var t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},e=document.documentMode,n={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var n=document.createElement("img");e&&t.getAttribute("data-iesrc")&&(n.src=t.getAttribute("data-iesrc")),t.appendChild(n)}t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&(t.srcset=t.getAttribute("data-srcset")),t.getAttribute("data-background-image")&&(t.style.backgroundImage="url("+t.getAttribute("data-background-image")+")")},loaded:function(){}};function i(t){t.setAttribute("data-loaded",!0)}var o=function(t){return"true"===t.getAttribute("data-loaded")};return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".lozad",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=t({},n,r),a=s.rootMargin,l=s.threshold,h=s.load,c=s.loaded,u=void 0;return window.IntersectionObserver&&(u=new IntersectionObserver(function(t,e){return function(n,r){n.forEach(function(n){n.intersectionRatio>0&&(r.unobserve(n.target),o(n.target)||(t(n.target),i(n.target),e(n.target)))})}}(h,c),{rootMargin:a,threshold:l})),{observe:function(){for(var t=function(t){return t instanceof Element?[t]:t instanceof NodeList?t:document.querySelectorAll(t)}(e),n=0;n<t.length;n++)o(t[n])||(u?u.observe(t[n]):(h(t[n]),i(t[n]),c(t[n])))},triggerLoad:function(t){o(t)||(h(t),i(t),c(t))}}}}()},function(t,e,n){"use strict";n(15),n(10);var i=l(n(7)),o=l(n(6)),r=l(n(5)),s=l(n(4)),a=(l(n(3)),l(n(2)));l(n(1));function l(t){return t&&t.__esModule?t:{default:t}}(0,i.default)().observe(),new o.default.SingleElement(document.querySelectorAll(".generic-title"),"80%","animations--opacity--hide","animations__generic-title--slidein"),new o.default.SingleElement(document.querySelectorAll(".generic-title__hr"),"85%","animations--opacity--hide","animations__generic-hr--slidein"),new o.default.SingleElement(document.querySelectorAll(".about__me"),"80%","animations--translate-right--hide","animations__about-me--slidein-right"),new o.default.SingleElement(document.querySelectorAll(".skills-bar__container"),"80%","animations--translate-left--hide","animations__skills-bar--slidein"),new o.default.MultipleElements(document.querySelectorAll(".skills-bar--fill"),"80%","animations--width--hide","animations__skills-bar--fill"),new o.default.SingleElement(document.querySelectorAll(".about-item"),"85%","animations--ease-out","animations--ease-out--is-visible"),new o.default.DelayAnimate(document.querySelectorAll(".my-work__thumbnail"),"65%","animations--opacity--hide","animations--delay-stack"),new r.default("10%",".primary-nav li","data-matching-li","primary-nav--li-is-highlighted"),new r.default("10%",".primary-nav a","data-matching-a","primary-nav--a-is-highlighted"),new a.default;var h=document.querySelectorAll(".sticky");s.default.add(h)},,function(t,e){},,,,,function(t,e){}]);