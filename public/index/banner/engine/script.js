// -----------------------------------------------------------------------------------
// http://wowslider.com/
// JavaScript Wow Slider is a free software that helps you easily generate delicious 
// slideshows with gorgeous transition effects, in a few clicks without writing a single line of code.
// Last updated: 2010-29-11
//
function ws_seven(t,e,i){function a(t,e){return Math.abs((e%2?1:0)+(e-e%2)/2-t)/e}function n(t,e,i,a){var n=e>=a?a/e:1,o=t>=i?i/t:1;return{l:o,t:n,m:Math.min(o,n)}}function o(t,e,i,o,r){var s=M.width(),h=M.height(),c=l*s/f,w=l*h/g,u=p*(o?4:5)/(f*g),m=o?"easeInExpo":"easeOutQuart",v=T.h+T.t-h/g,x=T.w+T.l-s/f,b=M.offset().top+M.height(),y=M.offset().left+M.width();return b>v&&(v=b),y>x&&(x=y),d(t).each(function(t){var e=t%f,r=Math.floor(t/f),b=.2*p*(45*a(e,f)+4*r)/(f*g),y=M.offset().left+T.l+c*e-s*l/2+c,I=M.offset().top+T.t+w*r-h*l/2+w,z=n(y,I,x,v),C={opacity:1,left:s*e/f,top:h*r/g,width:s/f,height:h/g,zIndex:Math.ceil(100-100*a(e,f))},E={opacity:0,left:(c*e-s*l/2)*z.l,top:(w*r-h*l/2)*z.t,width:c*z.m,height:w*z.m},L={left:-(s*e/f)+i.marginLeft,top:-(h*r/g)+i.marginTop,width:i.width,height:i.height},Q={left:-l*(s/f*e-i.marginLeft)*z.m,top:-l*(h/g*r-i.marginTop)*z.m,width:l*i.width*z.m,height:l*i.height*z.m};if(!o){var _=C;C=E,E=_,_=L,L=Q,Q=_}d(this).css(C).delay(b).animate(E,u,m,o?function(){d(this).hide()}:{}),d(this).find("img").css(L).delay(b).animate(Q,u,m)}),o&&(d(e).each(function(t){var e=t%f,n=Math.floor(t/f),o=.2*p+.15*p*(35*a(e,f)+4*n)/(f*g);d(this).css({left:s/2,top:h/2,width:0,height:0,zIndex:Math.ceil(100-100*a(e,f))}).delay(o).animate({left:s*e/f,top:h*n/g,width:s/f+1,height:h/g+1},4*p/(f*g),"easeOutBack"),d(this).find("img").css({left:0,top:0,width:0,height:0}).delay(o).animate({left:-s*e/f+i.marginLeft,top:-h*n/g+i.marginTop,width:i.width,height:i.height},4*p/(f*g),"easeOutBack")}),I.delay(.1*p).animate({opacity:1},.2*p,"easeInCirc")),setTimeout(r,o?.5*p:.4*p),{stop:function(){r()}}}function r(t,e,i,a){var n=(parseInt(t.parent().css("z-index"))||0)+1;if(y){var o=a.getContext("2d");return o.drawImage(t.get(0),0,0,e.width,e.height),s(o,0,0,a.width,a.height,i)?d(a):0}for(var r=d("<div></div>").css({position:"absolute","z-index":n,left:0,top:0,overflow:"hidden"}).css(e).appendTo(x),h=(Math.sqrt(5)+1)/2,c=1-h/2,l=0;i>c*l;l++){var f=Math.PI*h*l,g=c*l+1,p=g*Math.cos(f),w=g*Math.sin(f);d(document.createElement("img")).attr("src",t.attr("src")).css({opacity:1/(l/1.8+1),position:"absolute","z-index":n,left:Math.round(p)+"px",top:Math.round(w)+"px",width:"100%",height:"100%"}).appendTo(r)}return r}function s(t,e,i,a,n,o){if(!(isNaN(o)||1>o)){o|=0;var r;try{r=t.getImageData(e,i,a,n)}catch(s){return console.log("error:unable to access image data: "+s),!1}var d,c,l,f,g,p,w,u,m,v,x,b,y,M,I,T,z,L,Q,_,O=r.data,j=o+o+1,D=a-1,k=n-1,q=o+1,A=q*(q+1)/2,B=new h,F=B;for(l=1;j>l;l++)if(F=F.next=new h,l==q)var N=F;F.next=B;var P=null,G=null;w=p=0;var H=C[o],J=E[o];for(c=0;n>c;c++){for(M=I=T=u=m=v=0,x=q*(z=O[p]),b=q*(L=O[p+1]),y=q*(Q=O[p+2]),u+=A*z,m+=A*L,v+=A*Q,F=B,l=0;q>l;l++)F.r=z,F.g=L,F.b=Q,F=F.next;for(l=1;q>l;l++)f=p+((l>D?D:l)<<2),u+=(F.r=z=O[f])*(_=q-l),m+=(F.g=L=O[f+1])*_,v+=(F.b=Q=O[f+2])*_,M+=z,I+=L,T+=Q,F=F.next;for(P=B,G=N,d=0;a>d;d++)O[p]=u*H>>J,O[p+1]=m*H>>J,O[p+2]=v*H>>J,u-=x,m-=b,v-=y,x-=P.r,b-=P.g,y-=P.b,f=w+((f=d+o+1)<D?f:D)<<2,M+=P.r=O[f],I+=P.g=O[f+1],T+=P.b=O[f+2],u+=M,m+=I,v+=T,P=P.next,x+=z=G.r,b+=L=G.g,y+=Q=G.b,M-=z,I-=L,T-=Q,G=G.next,p+=4;w+=a}for(d=0;a>d;d++){for(I=T=M=m=v=u=0,p=d<<2,x=q*(z=O[p]),b=q*(L=O[p+1]),y=q*(Q=O[p+2]),u+=A*z,m+=A*L,v+=A*Q,F=B,l=0;q>l;l++)F.r=z,F.g=L,F.b=Q,F=F.next;for(g=a,l=1;o>=l;l++)p=g+d<<2,u+=(F.r=z=O[p])*(_=q-l),m+=(F.g=L=O[p+1])*_,v+=(F.b=Q=O[p+2])*_,M+=z,I+=L,T+=Q,F=F.next,k>l&&(g+=a);for(p=d,P=B,G=N,c=0;n>c;c++)f=p<<2,O[f]=u*H>>J,O[f+1]=m*H>>J,O[f+2]=v*H>>J,u-=x,m-=b,v-=y,x-=P.r,b-=P.g,y-=P.b,f=d+((f=c+q)<k?f:k)*a<<2,u+=M+=P.r=O[f],m+=I+=P.g=O[f+1],v+=T+=P.b=O[f+2],P=P.next,x+=z=G.r,b+=L=G.g,y+=Q=G.b,M-=z,I-=L,T-=Q,G=G.next,p+=a}return t.putImageData(r,e,i),!0}}function h(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var d=jQuery,c=d(this),l=t.distance||5,f=t.cols,g=t.rows,p=2*t.duration,w=t.blur||50,u=(i.find(".ws_list"),[]),m=[],v=d("<div>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:t.responsive>1?"hidden":"visible"}),x=v.clone().css("overflow","hidden");v.addClass("ws_effect"),i=i.parent();var b,y=!t.noCanvas&&!window.opera&&!!document.createElement("canvas").getContext,M=d("<div>").addClass("ws_parts"),I=d("<div>").addClass("ws_zoom");v.append(M,I,x).appendTo(i);var T={t:d(window).scrollTop(),l:d(window).scrollLeft(),w:d(window).width(),h:d(window).height()};jQuery.extend(jQuery.easing,{easeOutQuart:function(t,e,i,a,n){return-a*((e=e/n-1)*e*e*e-1)+i},easeInExpo:function(t,e,i,a,n){return 0==e?i:a*Math.pow(2,10*(e/n-1))+i},easeInCirc:function(t,e,i,a,n){return-a*(Math.sqrt(1-(e/=n)*e)-1)+i}});var z;this.go=function(a,n){if(z)return n;var s=0==n&&a!=n+1||a==n-1?!1:!0;T.t=d(window).scrollTop(),T.l=d(window).scrollLeft(),T.w=d(window).width(),T.h=d(window).height();var h=Math.max((t.width||M.width())/(t.height||M.height())||3,3);f=f||Math.round(1>h?3:3*h),g=g||Math.round(1>h?3/h:3);var l=d(e.get(n));l={width:l.width(),height:l.height(),marginTop:parseFloat(l.css("marginTop")),marginLeft:parseFloat(l.css("marginLeft"))},M.css({position:"absolute",width:i.width(),height:i.height(),left:0,top:0,zIndex:8,transform:"translate3d(0,0,0)"}),I.css({position:"absolute",width:i.width(),height:i.height(),top:0,left:0,zIndex:2,transform:"translate3d(0,0,0)"});for(var p=0;f*g>p;p++){{Math.floor(p/f)}d(u[p]=document.createElement("div")).css({position:"absolute",overflow:"hidden",transform:"translate3d(0,0,0)"}).appendTo(M).append(d("<img>").css({position:"absolute",transform:"translate3d(0,0,0)"}).attr("src",e.get(s?n:a).src)),s&&d(m[p]=document.createElement("div")).css({position:"absolute",overflow:"hidden",transform:"translate3d(0,0,0)"}).appendTo(I).append(d("<img>").css({position:"absolute",transform:"translate3d(0,0,0)"}).attr("src",e.get(a).src))}u=d(u),s&&(m=d(m));var C=0;if(s){if(I.css("opacity",0),y){try{document.createElement("canvas").getContext("2d").getImageData(0,0,1,1)}catch(E){y=0}b='<canvas width="'+v.width+'" height="'+v.height+'"/>',b=d(b).css({"z-index":1,position:"absolute",left:0,top:0}).css(l).appendTo(x),C=r(d(e.get(n)),l,w,b.get(0))}y&&C||(y=0,C=r(d(e.get(n)),l,8),b&&(b.remove(),b=0))}else I.append(d("<img>").css({position:"absolute",top:0,left:0}).css(l).attr("src",e.get(n).src));z=new o(u,m,l,s,function(){c.trigger("effectEnd"),M.empty().removeAttr("style"),I.empty().removeAttr("style"),b?b.remove():C&&C.remove(),z=0})};var C=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],E=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24]};
function ws_cube(t,e,i){function s(t,e,i,s){return"inset "+-s*t*1.2/90+"px "+i*e*1.2/90+"px "+(t+e)/20+"px rgba("+(s>i?"0,0,0,.6":i>s?"255,255,255,0.8":"0,0,0,.0")+")"}var n=jQuery,o=n(this),r=/iPhone|iPod|iPad|Android|BlackBerry/.test(navigator.userAgent),a=n(".ws_list",i),d=t.perspective||2e3,h={position:"absolute",backgroundSize:"cover",left:0,top:0,width:"100%",height:"100%",backfaceVisibility:"hidden"},c=n("<div>").addClass("ws_effect").css(h).css({transformStyle:"preserve-3d",perspective:g?"none":d,zIndex:8,overflow:t.responsive>1?"hidden":"visible"});n("<div>").addClass("ws_effect").css(h).append(c).appendTo(i.parent());var p={domPrefixes:" Webkit Moz ms O Khtml".split(" "),testDom:function(t){for(var e=this.domPrefixes.length;e--;)if("undefined"!=typeof document.body.style[this.domPrefixes[e]+t])return!0;return!1},cssTransitions:function(){return this.testDom("Transition")},cssTransforms3d:function(){var t="undefined"!=typeof document.body.style.perspectiveProperty||this.testDom("Perspective");if(t&&/AppleWebKit/.test(navigator.userAgent)){var e=document.createElement("div"),i=document.createElement("style"),s="Test3d"+Math.round(99999*Math.random());i.textContent="@media (-webkit-transform-3d){#"+s+"{height:3px}}",document.getElementsByTagName("head")[0].appendChild(i),e.id=s,document.body.appendChild(e),t=3===e.offsetHeight,i.parentNode.removeChild(i),e.parentNode.removeChild(e)}return t},webkit:function(){return/AppleWebKit/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)}},f=p.cssTransitions()&&p.cssTransforms3d(),g=p.webkit();if(!f&&t.fallback)return new t.fallback(t,e,i);var u;this.go=function(p,l){function m(e,i,o,a,c,p,f,u,l,m){e.parent().css("perspective",d);var v=e.width(),w=e.height();if(i.front.css({transform:"rotateY(0deg) rotateX(0deg)"}),i.back.css({opacity:1,transform:"rotateY("+f+"deg) rotateX("+p+"deg)"}),!r)var b=n("<div>").css(h).css("boxShadow",s(v,w,0,0)).appendTo(i.front),x=n("<div>").css(h).css("boxShadow",s(v,w,p,f)).appendTo(i.back);g&&e.css({transform:"translateZ(-"+o+"px)"});var T=setTimeout(function(){var e="all "+t.duration+"ms cubic-bezier(0.645, 0.045, 0.355, 1.000)";i.front.css({transition:e,boxShadow:r?"":s(v,w,u,l),transform:"rotateX("+u+"deg) rotateY("+l+"deg)",zIndex:0}),i.back.css({transition:e,boxShadow:r?"":s(v,w,0,0),transform:"rotateY(0deg) rotateX(0deg)",zIndex:20}),r||(b.css({transition:e,boxShadow:s(v,w,u,l)}),x.css({transition:e,boxShadow:s(v,w,0,0)})),T=setTimeout(m,t.duration)},20);return{stop:function(){clearTimeout(T),m()}}}var v=n(e[l]);if(v={width:v.width(),height:v.height(),marginTop:parseFloat(v.css("marginTop")),marginLeft:parseFloat(v.css("marginLeft"))},f){u&&u.stop();var w=i.width(),b=i.height(),x={left:[w/2,w/2,0,0,90,0,-90],right:[w/2,-w/2,0,0,-90,0,90],down:[b/2,0,-b/2,90,0,-90,0],up:[b/2,0,b/2,-90,0,90,0]}[t.direction||["left","right","down","up"][Math.floor(4*Math.random())]],T=n("<img>").css(v),y=n("<img>").css(v).attr("src",e.get(p).src),k=n("<div>").css({overflow:"hidden",transformOrigin:"50% 50% -"+x[0]+"px",zIndex:20}).css(h).append(T).appendTo(c),z=n("<div>").css({overflow:"hidden",transformOrigin:"50% 50% -"+x[0]+"px",zIndex:0}).css(h).append(y).appendTo(c);T.on("load",function(){a.hide()}),T.attr("src",e.get(l).src).load(),c.parent().show(),u=new m(c,{front:k,back:z},x[0],x[1],x[2],x[3],x[4],x[5],x[6],function(){o.trigger("effectEnd"),c.empty().parent().hide(),u=0})}else{c.css({position:"absolute",display:"none",zIndex:2,width:"100%",height:"100%"}),c.stop(1,1);var C=!!((p-l+1)%e.length)^t.revers?"left":"right",k=n("<div>").css({position:"absolute",left:"0%",right:"auto",top:0,width:"100%",height:"100%"}).css(C,0).append(n(e[l]).clone().css({width:100*v.width/i.width()+"%",height:100*v.height/i.height()+"%",marginLeft:100*v.marginLeft/i.width()+"%"})).appendTo(c),I=n("<div>").css({position:"absolute",left:"100%",right:"auto",top:0,width:"0%",height:"100%"}).append(n(e[p]).clone().css({width:100*v.width/i.width()+"%",height:100*v.height/i.height()+"%",marginLeft:100*v.marginLeft/i.width()+"%"})).appendTo(c);c.css({left:"auto",right:"auto",top:0}).css(C,0).show(),c.show(),a.hide(),I.animate({width:"100%",left:0},t.duration,"easeInOutExpo",function(){n(this).remove()}),k.animate({width:0},t.duration,"easeInOutExpo",function(){o.trigger("effectEnd"),c.empty().hide()})}}};// -----------------------------------------------------------------------------------
function ws_brick(t,e,a){function r(a){for(var r={},n=e.get(a),o=t.width/f,i=t.height/h,d=0;f*h>d;d++){var a=d%f,l=Math.floor(d/f);r[d]=s(n,{x:a*o,y:l*i,w:o,h:i})}return r}function n(t,e,a,r,n){for(var o in e)e[o].topEdge.css({width:r,height:t,background:a[o],transform:"rotateX(90deg) translate3d(0,-"+t/2+"px,"+t/2+"px)"}),e[o].bottomEdge.css({width:r,height:t,background:a[o],transform:"rotateX(90deg) translate3d(0,-"+t/2+"px,"+(-n+t/2)+"px)"}),e[o].leftEdge.css({width:t,height:n,background:a[o],transform:"rotateY(90deg) translate3d("+t/2+"px,0,-"+t/2+"px)"}),e[o].rightEdge.css({width:t,height:n,background:a[o],transform:"rotateY(90deg) translate3d("+t/2+"px,0,"+(r-t/2)+"px)"})}function o(t,e){var a,r,n,o,i,s=(new Date).getTime(),l=function(){var f=(new Date).getTime();for(var h in t)if(!(s+t[h].animate.delay>f)){var c=(f-(s+t[h].animate.delay))/t[h].animate.duration;if(i={},o="",c>1){if(t[h].part[0].ws_delay[1])return cancelAnimationFrame(l),void e()}else{.5>=c?(a=d.easing.easeInBack(1,2*c,0,1,1,1).toFixed(3),r=d.easing.easeInBackQ(1,2*c,0,1,1,1).toFixed(3),n=d.easing.easeInBackQ2(1,2*c,0,1,1,1).toFixed(3),t[h].back.css("backfaceVisibility","hidden")):(a=d.easing.easeOutBack(1,2*(c-.5),0,1,1,1).toFixed(3),r=d.easing.easeOutBackQ(1,2*(c-.5),0,1,1,1).toFixed(3),n=d.easing.easeOutBackQ2(1,2*(c-.5),0,1,1,1).toFixed(3),t[h].back.css("backfaceVisibility","visible"));for(var p in t[h].animate[.5>=c?"half":"end"]){var g=t[h].animate[.5>=c?"begin":"half"][p]||0,m=t[h].animate[.5>=c?"half":"end"][p]||0;"object"!=typeof m&&(m="scale"===p||"rotateX"===p||"rotateY"===p?g+(m-g)*r:"left"===p||"top"===p?g+(m-g)*n:g+(m-g)*a),"rotateX"===p||"rotateY"===p||"rotateZ"===p?o+=p+"("+m+"deg) ":"scale"===p?o+=p+"("+m+") ":"translate3d"===p?o+=p+"("+(g[0]+(m[0]-g[0])*a).toFixed(3)+"px,"+(g[1]+(m[1]-g[1])*a).toFixed(3)+"px,"+(g[2]+(m[2]-g[2])*a).toFixed(3)+"px) ":i[p]=m}t[h].wrapper.css({transform:"translate3d("+(i.left?i.left:0).toFixed(3)+"px,"+(i.top?i.top:0).toFixed(3)+"px,0)"}),delete i.left,delete i.top,o&&(i.transform=o),t[h].part.css(i)}}requestAnimationFrame(l)};l()}function i(e,r,i,s){var d=a.width(),l=a.height(),c=d/f,p=l/h,g=.4*t.duration>1e3?1e3:.4*t.duration,m=.6*t.duration,u=[0,0];n(w,e,v[r],c,p),x.css({transformOrigin:d/2+"px "+l/2+"px 0",width:d,height:l});for(var b in e){var k=T[b].delay*g;u[1]<=k&&(u[0]=b,u[1]=k),e[b].part[0].ws_delay=[k,0]}e[u[0]].part[0].ws_delay[1]=1;for(var b in e){{var F=e[b];Math.floor(b/f)}F.animate={delay:F.part[0].ws_delay[0],duration:m,begin:{left:0,top:0,width:c,height:p,scale:1,rotateX:0,rotateY:0,translate3d:[0,0,y?w:0]},half:{left:T[b].halfLeft*c,top:T[b].halfTop*p,scale:T[b].halfScale,rotateX:T[b].rotateX/2,rotateY:T[b].rotateY/2,translate3d:[0,0,(y?1:.5)*w]},end:{left:0,top:0,scale:1,rotateX:T[b].rotateX,rotateY:T[b].rotateY,translate3d:[0,0,w]}},F.front.find("img").css(i),F.back.css("backfaceVisibility","hidden").find("img").css(i),F.part.css({width:F.animate.begin.width,height:F.animate.begin.height,left:F.animate.begin.left,top:F.animate.begin.top})}o(e,s)}function s(t,e){e=e||{};{var a,r=1,n=e.exclude||[],o=document.createElement("canvas"),i=o.getContext("2d");o.width=t.naturalWidth,o.height=t.naturalHeight}i.drawImage(t,0,0,t.naturalWidth,t.naturalHeight);try{a=i.getImageData(e.x?e.x:0,e.y?e.y:0,e.w?e.w:t.width,e.h?e.h:t.height).data}catch(s){return console.log("error:unable to access image data: "+s),"#ccc"}for(var d=(e.w?e.w:t.width*e.h?e.h:t.height)||a.length,l={},f="",h=[],c={dominant:{name:"",count:0}},p=0;d>p;){if(h[0]=a[p],h[1]=a[p+1],h[2]=a[p+2],f=h.join(","),l[f]=f in l?l[f]+1:1,-1===n.indexOf(["rgb(",f,")"].join(""))){var g=l[f];g>c.dominant.count&&(c.dominant.name=f,c.dominant.count=g)}p+=4*r}return["rgb(",c.dominant.name,")"].join("")}var d=jQuery,l=d(this),f=t.cols||4,h=t.rows||3,c=2.5,p=2,g=t.perspective||2e3,m=a.find(".ws_list"),u=[],w=30,v={},x=d("<div>").addClass("ws_effect").css("overflow",t.responsive>1?"hidden":"visible"),b=t.support.transform&&t.support.transition&&t.support.perspective,y=/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent),k=/Firefox/.test(navigator.userAgent);a=a.parent().append(x);var T=[{zIndex:0,rotateX:360,rotateZ:-360,rotateY:180,halfScale:.5,halfLeft:.7,halfTop:.7,delay:.36},{zIndex:1,rotateX:-360,rotateZ:360,rotateY:180,halfScale:.5,halfLeft:.2,halfTop:.4,delay:.81},{zIndex:1,rotateX:360,rotateZ:-360,rotateY:-180,halfScale:.5,halfLeft:-.2,halfTop:.4,delay:.45},{zIndex:0,rotateX:-360,rotateZ:360,rotateY:-180,halfScale:.5,halfLeft:-.7,halfTop:.7,delay:.63},{zIndex:1,rotateX:-360,rotateZ:360,rotateY:-180,halfScale:.5,halfLeft:.7,halfTop:0,delay:.54},{zIndex:2,rotateX:360,rotateZ:-360,rotateY:180,halfScale:.5,halfLeft:.2,halfTop:0,delay:.38},{zIndex:2,rotateX:360,rotateZ:-360,rotateY:-180,halfScale:.5,halfLeft:-.2,halfTop:0,delay:0},{zIndex:1,rotateX:-360,rotateZ:360,rotateY:180,halfScale:.5,halfLeft:-.7,halfTop:0,delay:.72},{zIndex:0,rotateX:-360,rotateZ:360,rotateY:180,halfScale:.5,halfLeft:.7,halfTop:-.7,delay:1},{zIndex:1,rotateX:-360,rotateZ:360,rotateY:-180,halfScale:.5,halfLeft:.2,halfTop:-.4,delay:.7},{zIndex:1,rotateX:360,rotateZ:-360,rotateY:180,halfScale:.5,halfLeft:-.2,halfTop:-.4,delay:.57},{zIndex:0,rotateX:360,rotateZ:-360,rotateY:-180,halfScale:.5,halfLeft:-.7,halfTop:-.7,delay:.9}];x.css({position:"absolute",top:0,left:0,width:a.width(),height:a.height(),transform:"translate3d(0,0,0)",transformOrigin:t.width/2+"px "+t.height/2+"px 0",perspective:g}).hide(),function(){for(var t=0,e=["ms","moz","webkit","o"],a=0;a<e.length&&!window.requestAnimationFrame;++a)window.requestAnimationFrame=window[e[a]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[a]+"CancelAnimationFrame"]||window[e[a]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var a=(new Date).getTime(),r=Math.max(0,16-(a-t)),n=window.setTimeout(function(){e(a+r)},r);return t=a+r,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}();var F;this.go=function(n,o){function s(t,e){return Math.random()*(e-t+1)+t}if(F)return o;for(var g=0;f*h>g;g++){var Y=g%f,X=Math.floor(g/f),I=d("<div>").css({position:"absolute",left:100*Y/f+"%",top:100*X/h+"%",outline:"1px solid transparent",transformStyle:y||k?"flat":"preserve-3d",zIndex:T[g].zIndex,overflow:b?"visible":"hidden"}).appendTo(x),_=d("<div>").css({transform:"scale(1) rotateX(0) rotateY(0) translate3d(0,0,0)",outline:"1px solid transparent",transformStyle:"preserve-3d"}).appendTo(I),S=d("<div>").addClass("ws_front_image").appendTo(_),z=b?d("<div>").addClass("ws_back_image").appendTo(_):0;S.css({position:"absolute",width:"100%",height:"100%",overflow:"hidden",backfaceVisibility:"hidden",transform:"translate3d(0,0,0)"}).append(d("<img>").css({left:100*-Y+"%",top:100*-X+"%",position:"absolute",outline:"1px solid transparent"})),b&&z.css({position:"absolute",width:"100%",height:"100%",overflow:"hidden",backfaceVisibility:"hidden",transform:"rotateY(180deg) translate3d(0,0,"+w+"px)"}).append(d("<img>").css({left:100*-Y+"%",top:100*-X+"%",position:"absolute",outline:"1px solid transparent"}));var A={position:"absolute",outline:"1px solid transparent"};u[g]={part:_,front:S,back:z,wrapper:I,leftEdge:b?d("<div>").addClass("ws_left_edge").css(A).appendTo(_):0,rightEdge:b?d("<div>").addClass("ws_right_edge").css(A).appendTo(_):0,topEdge:b?d("<div>").addClass("ws_top_edge").css(A).appendTo(_):0,bottomEdge:b?d("<div>").addClass("ws_bottom_edge").css(A).appendTo(_):0}}x.show();var L=d(e.get(o));if(L={width:L.width(),height:L.height(),marginTop:parseFloat(L.css("marginTop")),marginLeft:parseFloat(L.css("marginLeft"))},b){u[0].front.find("img").on("load",function(){m.hide()});for(var Z in u)u[Z].front.find("img").attr("src",e.get(o).src),u[Z].back.find("img").attr("src",e.get(n).src);v[o]||(v[o]=r(o)),F=new i(u,o,L,function(){m.show(),l.trigger("effectEnd"),x.hide().empty();for(var t in u)u[t].part.css({transition:"",transform:"rotateX(0) rotateY(0) translate3d(0,0,0)"});F=0})}else{F=!0;var B=a.width(),C=a.height(),E=B/f,Q=C/h;x.css({width:B,height:C});var O=0;for(var Z in u){var Y=Z%f,X=Math.floor(Z/f);u[Z].front.find("img").attr("src",e.get(n).src).css(L);var j=t.duration*(1-Math.abs((p*c-Y*X)/(2*h*f))),q=s(-1,1)>0?1:-1,M=s(-1,1)>0?1:-1;u[Z].wrapper.css({width:E,height:Q}),u[Z].part.css({position:"absolute",top:q*Q,left:M*E,opacity:0,width:E,height:Q}).animate({top:0,left:0,opacity:1},j,function(){O++,O==h*f&&(m.stop(1,1),F=!1,l.trigger("effectEnd"),x.empty())})}}}}jQuery.extend(jQuery.easing,{easeInBack:function(t,e,a,r,n,o){return void 0==o&&(o=1.70158),r*(e/=n)*e*((o+1)*e-o)+a},easeOutBack:function(t,e,a,r,n,o){return void 0==o&&(o=1.70158),r*((e=e/n-1)*e*((o+1)*e+o)+1)+a},easeInBackQ:function(t,e,a,r,n){var o=(e/=n)*e;return a+r*o*(4*e*o-8*o+8*e-3)},easeOutBackQ:function(t,e,a,r,n){var o=(e/=n)*e;return a+r*(4*o*e*o-12*o*o+16*o*e-13*o+6*e)},easeInBackQ2:function(t,e,a,r,n){var o=(e/=n)*e;return a+r*o*(1.5*e*o-2.5*o+5*e-3)},easeOutBackQ2:function(t,e,a,r,n){var o=(e/=n)*e;return a+r*(1.5*o*e*o-5*o*o+10*o*e-12*o+6.5*e)}});
function ws_blinds(t,i,e){function n(i,e,n,o,s){t.support.transform&&t.support.transition?(e.transform||(e.transform=""),e.left&&(e.transform+=" translate3d("+(e.left?e.left:0)+"px,0,0)"),delete e.left,(n||o)&&(e.transition=n+"ms all "+o+"ms ease-in-out"),i.css(e),s&&i.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",s)):n?i.animate(e,n,"swing",s):i.css(e)}for(var o=jQuery,s=o(this),d=t.parts||3,r=o("<div>").addClass("ws_effect").css({position:"absolute",width:"100%",height:"100%",left:0,top:0,"z-index":8}).hide().appendTo(e.parent()),a=o("<div>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"}).appendTo(r),f=[],l=0;d>l;l++)f[l]=o("<div>").css({position:"absolute",height:"100%",width:(100/d).toFixed(3)+"%",border:"none",margin:0,overflow:"hidden",top:0,left:(100*l/d).toFixed(3)+"%"}).appendTo(r);this.go=function(l,h,p){var g=h>l?1:0;if(p)if(-1>=p)l=(h+1)%i.length,g=0;else{if(!(p>=1))return-1;l=(h-1+i.length)%i.length,g=1}r.find("img").stop(!0,!0),r.show();var u=o(".ws_list",e);t.fadeOut&&u.fadeOut((1-1/d)*t.duration);var w=o(i[h]),c={width:w.width()||t.width,height:w.height()||t.height},v=w.clone().css(c).appendTo(a);n(v,{left:0}),n(v,{left:(g?-1:1)*v.width()*.5},t.duration,.1*t.duration);for(var m=0;m<f.length;m++){var T=f[m],b=o(i[l]).clone().css({position:"absolute",top:0}).css(c).appendTo(T);n(b,{left:g?b.width()-T.position().left:-b.width()}),n(b,{left:-T.position().left},t.duration/(f.length+1)*(g?f.length-m+1:m+2),0,!g&&m==f.length-1||g&&!m?function(){s.trigger("effectEnd"),r.hide().find("img").remove(),v.remove()}:!1)}}};



// extend wowslider for effect support
(function($){

	var effects = ['ws_seven', 'ws_cube', 'ws_brick'];
	var duration = 1700, delay = 4500;
	var cSlide, bkpCont, wowInstance, timeout;
	
	/*
	// if(effects[curEffect] == 'brick') duration = 5500;

	// rewrite slider
	// window.wowReInitor = function (wow,options){
	var default_wowSlider = $.fn.wowSlider;
	$.fn.wowSlider = function (options) {
		var wow = $(this);
		// add current effect if no in effects list
		if (options.effect && (effects.join("|").indexOf(options.effect)<0))
			effects[effects.length] = options.effect;
		
		options.support = default_wowSlider.support;

		// change duration in brick effect
		if(options.effect == 'brick') options.duration = 5500;
		else options.duration = 1700;

		// recreate html or init effects
		if(!bkpCont) {//first start
			bkpCont = $(document.createElement("div")).append(wow.clone()).html();
		} else {
			wow.get(0).wsStop();
			wow = $(bkpCont).replaceAll(wow);
		}
		
		wowInstance = wow; // save instance for effect
		
		var new_opt = $.extend({
			startSlide:cSlide,
			onStep:function(num){
				cSlide=num;

				// set new effect
					var new_o = $.extend({},options);
					curEffect = (curEffect>=(effects.length-1)?0:(curEffect+1));
					new_o.effect = effects[curEffect] || 'blinds';
					wowReInitor(wowInstance, new_o);
			}
		},options);
		
		// run slider
		//var result = wow.wowSlider(new_opt); 
		var result = default_wowSlider.apply(wow, [new_opt]); 
		
		if (isNaN(cSlide))
			cSlide = 0;
		else
			wow.get(0).wsStart(cSlide+1);
		
		return result;
	}
	
	// for old compability
	window.wowReInitor = function (wow,options){
		$(wow).wowSlider(options);
	};
	*/

	var wowSlider = $("#wowslider-container").wowSlider({effect: effects || "blinds",prev:"",next:"",fallback:ws_blinds,duration:duration,delay:delay,width:960,height:350,fullScreen:true,autoPlay:true,autoPlayVideo:false,stopOnHover:false,loop:false,bullets:true,caption:true,captionEffect:"move",controls:true});

	// change slider size
	var sliderCont = $('.slideshow > .holder'),
		curResponsive = 1;
	function resizeWnd() {
		// apply after transition
		if(curResponsive > 1)
			sliderCont.css('width', '100%');

		$(window).resize();
	}
	$('#devices').on('click', 'a', function(e) {
		var thisClass = this.className;
		e.preventDefault();

		if(/laptop|tablet|mobile/g.test(thisClass)) {
			$('#devices').find('.laptop, .tablet, .mobile').removeClass('checked');

			if(curResponsive > 1) {
				wowSlider[0].wsResponsive(1);
				curResponsive = 1;
				$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');
				$('#devices .boxed').addClass('checked');
			}
			
			wowSlider[0].wsHideEffect();
			wowSlider[0].wsRestart();
			if(/laptop/g.test(thisClass)) {
				sliderCont.css('maxWidth', sliderCont.width()).animate({
					maxWidth: curResponsive>1?$(window).width():960
				}, resizeWnd);
			} else if(/tablet/g.test(thisClass)) {
				sliderCont.css('maxWidth', sliderCont.width()).animate({
					maxWidth: 700
				}, resizeWnd);
			} else if(/mobile/g.test(thisClass)) {
				sliderCont.css('maxWidth', sliderCont.width()).animate({
					maxWidth: 500
				}, resizeWnd);
			}
			$(this).addClass('checked');
		}

		else {
			wowSlider[0].wsHideEffect();
			wowSlider[0].wsRestart();
			if(/boxed/g.test(thisClass)) {
				wowSlider[0].wsResponsive(1);
				curResponsive = 1;
			} else if(/fullwidth/g.test(thisClass)) {
				sliderCont.css('maxWidth', 'none');
				wowSlider[0].wsResponsive(2);
				curResponsive = 2;
			} else if(/fullscreen/g.test(thisClass)) {
				/*
				wowSlider[0].wsResponsive(3);
				curResponsive = 3;
				*/
				sliderCont.css('maxWidth', 'none');
				if(wowSlider[0].wsToggleFS)
					wowSlider[0].wsToggleFS();
				return;
			}
			$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');

			if(curResponsive > 1) {
				$('#devices').find('.tablet, .mobile').removeClass('checked');
				$('#devices .laptop').addClass('checked');
				resizeWnd();
			}

			$(this).addClass('checked');
		}
	});
})(jQuery);