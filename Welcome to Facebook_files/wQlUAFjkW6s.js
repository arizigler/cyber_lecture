/*!CK:3606417397!*//*1405915855,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["xlI2H"]); }

__d("MFacewebAndroidLink",["DOM"],function(a,b,c,d,e,f,g){function h(){g.listen(document.documentElement,'click',null,function(i){var j=i.getNode('tag:a');if(!j)return;var k=j.getAttribute('href');if(k)if(k.indexOf('#')===0)i.prevent();});}f.setupListeners=h;},null);
__d("MLogoutClearCache",["MCache","Stratcom"],function(a,b,c,d,e,f,g,h){h.listen('click','logout',g.clear);},null);
__d("MVerifyCache",["MCache"],function(a,b,c,d,e,f,g){var h=function(i){var j=g.VIEWER_KEY,k=g.getItem(j);if(k!==i.viewer){k&&g.clear();g.setItem(j,i.viewer,true);}};f.main=h;},null);
__d("MPageError",["$","DOM","LoadingIndicator","MErrorCodes","MLogger","MPageController","Stratcom"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=g('mErrorView'),o=h.find(n,'div','error-message');m.listen('click','MPageError:retry',l.reload);m.listen('m:page:loading',null,function(p){h.hide(n);});m.listen('m:page:error',null,function(p){var q=p.getData(),r=j.getMessage(q);i.hide();h.setContent(o,r);h.show(n);k.warn('Error code: %s',q);});},null);
__d("IosWebapp",["Stratcom","MHistory","MURI","WebStorage"],function(a,b,c,d,e,f,g,h,i,j){var k=!!window.navigator.standalone;if(k){var l='last_visited_url',m=j.getLocalStorage();function n(p){if(p)return m.setItem(l,p);return m.removeItem(l);}function o(){return m.getItem(l);}g.listen('m:page:loading',null,function(p){n(p.getData());});g.listen('m:page:initialize',null,function(){var p=o();if(p)h.replaceState(new i(p).normalize().toString());});}},null);
__d("AddressBar",["setTimeoutAcrossTransitions","MViewport"],function(a,b,c,d,e,f,g,h){var i=0;function j(){clearTimeout(i);i=g(k,250);}function k(){i=0;if(h.getScrollTop()<60)h.scrollToHeader();}function l(){if(navigator.userAgent.indexOf('iPad')===-1)window.addEventListener('load',function m(){window.removeEventListener('load',m,false);k();},false);}f.setupLoadListener=l;},null);
__d("LogHistoryListeners",["Clock","ErrorUtils","LogHistory"],function(a,b,c,d,e,f,g,h){var i=b('LogHistory').getInstance('sys');g.addListener(g.ANOMALY,function(j){i.warn('clock_anomaly',g.getSamples());});h.addListener(function(j){i.error('error',JSON.stringify({guard:j.guard,line:j.line,message:j.message,script:j.script,stack:j.stack}));});},null);
__d("ScriptPathLogger",["Banzai","ScriptPath","isInIframe"],function(a,b,c,d,e,f,g,h,i){var j='script_path_change',k={scriptPath:null,categoryToken:null,impressionID:null},l={PAGE_LOAD:'load',PAGE_UNLOAD:'unload',TRANSITION:'transition'},m=false;function n(t,u,v){if(!m||i())return;var w=g.isEnabled('vital_navigations')?g.VITAL:g.BASIC,x={source_path:t.scriptPath,source_token:t.categoryToken,dest_path:u.scriptPath,dest_token:u.categoryToken,navigation:h.getNavigation(),impression_id:u.impressionID,cause:v};g.post(j,x,w);}function o(){n(k,h.getPageInfo(),l.PAGE_LOAD);}function p(t,u){n(t,u,l.TRANSITION);}function q(){n(h.getPageInfo(),k,l.PAGE_UNLOAD);}var r=h.subscribe(function(t){if(m){var u=t.source,v=t.dest;if(u){p(u,v);}else o();}});g.subscribe(g.SHUTDOWN,q);var s={startLogging:function(){m=true;if(h.getPageInfo())o();},stopLogging:function(){m=false;h.unsubscribe(r);}};s.CAUSE=l;s.BANZAI_LOGGING_ROUTE=j;e.exports=s;},null);
__d("ServerJS-upstream",["ErrorUtils","EventEmitter","ServerJSDefine","copyProperties","ex","ge","replaceTransportMarkers"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=0,o=new h(),p=0;function q(){this._moduleMap={};this._relativeTo=null;this._moduleIDsToCleanup={};}q.PRE_JS_CALL='pre-js-call';q.POST_JS_CALL='post-js-call';q.addListener=o.addListener.bind(o);j(q.prototype,{handle:function(u){if(u.__guard)throw new Error('ServerJS.handle called on data that has already been handled');u.__guard=true;r(u.define||[],this._handleDefine,this);r(u.markup||[],this._handleMarkup,this);r(u.elements||[],this._handleElement,this);r(u.instances||[],this._handleInstance,this);var v=r(u.require||[],this._handleRequire,this);return {cancel:function(){for(var w=0;w<v.length;w++)if(v[w])v[w].cancel();}};},handlePartial:function(u){(u.instances||[]).forEach(s.bind(null,this._moduleMap,3));(u.markup||[]).forEach(s.bind(null,this._moduleMap,2));(u.elements||[]).forEach(s.bind(null,this._moduleMap,2));return this.handle(u);},setRelativeTo:function(u){this._relativeTo=u;return this;},cleanup:function(){var u=[];for(var v in this._moduleMap)u.push(v);d.call(null,u,t);this._moduleMap={};function w(y){var z=this._moduleIDsToCleanup[y],aa=z[0],ba=z[1];delete this._moduleIDsToCleanup[y];var ca=ba?'JS::call("'+aa+'", "'+ba+'", ...)':'JS::requireModule("'+aa+'")',da=ca+' did not fire because it has missing dependencies.';throw new Error(da);}for(var x in this._moduleIDsToCleanup)g.applyWithGuard(w,this,[x],null,'ServerJS:cleanup'+' id: '+x);},_handleDefine:g.guard(function(u,v,w,x){i.handleDefine(u,v,w,x,this._relativeTo);},'JS::define'),_handleRequire:function(u,v,w,x){return g.applyWithGuard(function(){var y=[u].concat(w||[]),z=(v?'__call__':'__requireModule__')+n++;this._moduleIDsToCleanup[z]=[u,v];return define(z,y,g.guard(function(aa){delete this._moduleIDsToCleanup[z];x&&m(this._relativeTo,x);if(v){if(!aa[v])throw new TypeError(k('Module %s has no method "%s"',u,v));var ba={moduleName:u,method:v,sourceMeta:aa[v].__SMmeta};o.emit(q.PRE_JS_CALL,p,ba);aa[v].apply(aa,x||[]);o.emit(q.POST_JS_CALL,p,ba);p++;}}.bind(this),v?"JS::call('"+u+"', '"+v+"', ...)":"JS::requireModule('"+u+"')"),1,this,1);},this,null,null,v?'JS::call':'JS::requireModule');},_handleInstance:g.guard(function(u,v,w,x){var y=null;if(v)y=function(z){m(this._relativeTo,w);var aa=Object.create(z.prototype);z.apply(aa,w);return aa;}.bind(this);define(u,v,y,0,null,x);},'JS::instance'),_handleMarkup:g.guard(function(u,v,w){define(u,['HTML'],function(x){return x.replaceJSONWrapper(v).getRootNode();},0,null,w);},'JS::markup'),_handleElement:g.guard(function(u,v,w,x){if(v===null&&w){define(u,null,null,0,null,w);return;}var y=[],z=0;if(x){y.push(x);z=1;w++;}define(u,y,function(aa){var ba=l(v,aa);if(!ba){var ca='Could not find element "%s"';throw new Error(k(ca,v));}return ba;},z,null,w);},'JS::element')});function r(u,v,w){return u.map(function(x){v.apply(w,x);});}function s(u,v,w){var x=w[0];if(!(x in u))w[v]=(w[v]||0)+1;u[x]=true;}function t(){return {};}e.exports=q;},null);
__d("ServerJS",["ServerJS-upstream","StopwatchPool"],function(a,b,c,d,e,f,g,h){var i='__BUFFER__' in a,j={};g.addListener(g.PRE_JS_CALL,function(k){var l=h.acquire();j[k]=l;l.reset();});g.addListener(g.POST_JS_CALL,function(k,l){var m=j[k];if(m){var n=m.read(),o=l.sourceMeta||{};i&&a.__BUFFER__.write('server_js_performance',{functionMeta:{module:l.moduleName,name:l.method,line:o.line,column:o.column},time:n,context:"JS::call('"+l.moduleName+"', '"+l.method+"', ...)"});delete j[k];h.release(m);}});e.exports=g;},null);
__d("TimeSpentArray",["Banzai","pageID","setTimeoutAcrossTransitions"],function(a,b,c,d,e,f,g,h,i){var j=2,k=j*32,l,m,n,o,p,q,r,s,t,u={},v;function w(){return {timeoutDelayMap:u,nextDelay:v,timeoutInSeconds:n};}function x(){if(l){var fa=Date.now();if(fa>p)r=Math.min(k,Math.ceil((fa/1000)-o));var ga=ca();if(ga)l(ga,v);}ba();}function y(){z();m=i(x,n*1000);}function z(){if(m){clearTimeout(m);m=null;}}function aa(fa){o=fa;p=o*1000;q=[1];for(var ga=1;ga<j;ga++)q.push(0);r=1;s+=1;t+=1;var ha=t.toString()+'_delay';v=u[ha];if(typeof v=='undefined')v=u.delay;var ia=t.toString()+'_timeout',ja=u[ia];if(typeof ja=='undefined')ja=u.timeout;ja=Math.min(ja,k);n=ja||k;y();}function ba(){z();q=null;}function ca(){if(!q)return null;return {tos_id:h,start_time:o,tos_array:q.slice(0),tos_len:r,tos_seq:t,tos_cum:s};}function da(fa){if(fa>=p&&(fa-p)<1000)return;ea(Math.floor(fa/1000));}function ea(fa){var ga=fa-o;if(ga<0||ga>=k)x();if(!q){aa(fa);}else{q[ga>>5]|=(1<<(ga&31));r=ga+1;s+=1;p=fa*1000;}}e.exports={init:function(fa,ga,ha){s=0;t=-1;l=fa;if(typeof ga=='object'&&ga!==null){u=ga;}else u={};if(!ha)ha=Date.now();aa(Math.floor(ha/1000));g.subscribe(g.SHUTDOWN,x);},update:function(fa){da(fa);},get:function(){return ca();},ship:function(){x();},reset:function(){ba();},testState:function(){return w();}};},null);
__d("TimeSpentImmediateActiveSecondsLogger",["Banzai","ImmediateActiveSecondsConfig","ScriptPath"],function(a,b,c,d,e,f,g,h,i){var j='immediate_active_seconds',k={signal:true,retry:true},l=h.sampling_rate,m=h.ias_bucket,n=0;function o(q){if(l<=0)return false;var r=Math.floor(q/1000)%l;return r===m;}function p(q){if(q>=n&&q-n<1000)return;if(o(q)){var r={activity_time_ms:q,last_activity_time_ms:n,script_path:i.getScriptPath()};try{g.post(j,r,k);}catch(s){}}n=Math.floor(q/1000)*1000;}e.exports={maybeReportActiveSecond:p};},null);
__d("MWildeLink",["DOM","Stratcom","URI"],function(a,b,c,d,e,f,g,h,i){function j(){var k=null,l=function(n){if(k)document.body.removeChild(k);k=document.createElement('iframe');k.style.width=k.style.height='1px';k.style.position='absolute';k.style.borderStyle='none';if(n.getProtocol()!=='fb'){k.src=new i('fb://f').addQueryData('u',n.toString()).toString();}else k.src=n;document.body.appendChild(k);},m=function(n){return n&&n!=='http'&&n!=='https'&&n!=='fb';};g.listen(document.documentElement,'click',null,function(n){if(n.getPrevented())return;var o=n.getNode('tag:a');if(!o)return;var p=n.getRawEvent(),q=o.getAttribute('href'),r=o.getAttribute('target'),s=new i(q),t=s.getProtocol();if(!q||o.getAttribute('onclick')||(p.which||p.button)>=2||(r&&r!=='_blank')||m(t)){if(r==='_self'&&t==='fb'){n.prevent();window.location.href=s;return;}return;}n.prevent();if(q[0]==='#'){var u=document.getElementById(q.substr(1));u&&u.scrollIntoView();}else l(s);});h.listen('go',null,function(n){var o=new i(n.getData().uri);if(m(o.getProtocol()))return;n.prevent();l(o);});}f.setupListeners=j;},null);
__d("MExceptionHandler",["ex","ErrorUtils","MLogger"],function(a,b,c,d,e,f,g,h,i){if(window.onerror!==h.onerror)i.mustfix('ErrorUtils failed to assign window.onerror handler');function j(k,l){h.reportError(new Error(g('fwHandleException: %s, context: %s',k,l)));}a.fwHandleException=j;},null);
__d("MExceptionReportingMarauderLogger",["ErrorUtils"],function(a,b,c,d,e,f,g){function h(j){d(['MarauderLogger'],function(k){k.log('js_exception',undefined,j);j=null;});}function i(j,k,l){h({message:j,context:k,stack_trace:l});}g.addListener(function(j){h(j);});e.exports.log=i;},null);
__d("MNavigationEvent",["MarauderLogger","Stratcom"],function(a,b,c,d,e,f,g,h){var i=null,j=false;function k(l){if(!('ontouchstart' in window))return;i=l;h.listen('touchend','tag:a',function(m){if(j)return;var n=m.getNode('tag:a');if(n){var o=n.getAttribute('href'),p=o!=null?o.indexOf('_mn_='):-1;if(p!==-1){var q=o.indexOf('&',p),r=null;if(q!==-1){r=o.substring(p+5,q);}else r=o.substring(p+5);g.navigateTo(o,i[r]);}}});h.listen('MScrollArea:scrollstart',null,function(){j=true;});h.listen('MScrollArea:scrollend',null,function(){j=false;});}e.exports={init:k};},null);
__d("MOrientationMarauderLogger",["MarauderLogger","Stratcom","MViewport"],function(a,b,c,d,e,f,g,h,i){var j='orientation',k='landscape',l='portrait',m='orientation_change',n='foreground',o=null;function p(){q(m);}function q(r){var s=o;if(i.isLandscape()){o=k;}else o=l;g.log(j,undefined,{orientation_start:s,orientation_end:o,event_trigger:r});}h.listen('m:viewport:orientation-change',null,p);q(n);},null);
__d("MScrollingHooksLogger",["setTimeoutAcrossTransitions","Stratcom","MViewport","MarauderLogger"],function(a,b,c,d,e,f,g,h,i,j){var k=null,l=null,m=null;function n(p){var q={x:i.getScrollPos().x,y:i.getScrollPos().y};if(k===null)k=q;l=q;if(m!==null)clearTimeout(m);m=g(o,1000);}function o(){if(k.x!==l.x||k.y!==l.y)j.log('newsfeed_scroll',undefined,{end_pos:l.x,end_row:l.y,start_pos:k.x,start_row:k.y});k=null;l=null;m=null;}h.listen('scroll',null,n);},null);
__d("MCSSUtilizationDetector",["MarauderLogger","MStopNGo","Stratcom","setTimeoutAcrossTransitions","setIntervalAcrossTransitions"],function(a,b,c,d,e,f,g,h,i,j,k){var l=4,m=10000,n=100,o=400,p=40,q=null,r=[],s=0,t={},u={},v=[],w=[window.location.href],x=false,y=[],z={'>':true,'+':true,'~':true};function aa(ja){ja=ja.trim();var ka=ja.split(/[\[\]]/);for(var la in ka){if(la%2)continue;var ma=ka[la].split(/[\(\)]/);for(var na in ma)if(na%2==1)ma[na]='';ka[la]=ma;}ka=ka.map(function(pa){return typeof(pa)=='string'?'['+pa+']':pa;});ka=ka.map(function(pa){return Array.isArray(pa)?pa.map(function(qa){return qa.indexOf(':')?qa.split(':')[0]:qa;}).join(''):pa;});ka=ka.join('').split(' ');ka=ka.map(function(pa){return pa.replace(/\.touched([\.\s])?/,'$1');});var oa=true;while(oa){oa=false;if(ka.length&&(!ka[0]||ka[0] in z||!isNaN(parseInt(ka[0],10)))){ka.shift();oa=true;}if(ka.length&&(!ka[ka.length-1]||ka[ka.length-1] in z||!isNaN(parseInt(ka[ka.length-1],10)))){ka.pop();oa=true;}}return ka.join(' ');}var ba;function ca(ja){if(!y[ja]){y[ja]=[ba];v.push(ja);}else if(y[ja].indexOf(ba)<0)y[ja].push(ba);}function da(ja){var ka=ja.selectorText;if(ka){var la=ja.cssText,ma=la.indexOf('{');la=ma>=0?la.substring(ma+1):la;var na=la.lastIndexOf('}');la=na>=0?la.substring(0,na-1):la;ba=la.length;ka.split(',').map(aa).forEach(ca);}}function ea(ja){var ka=ja.rules||ja.cssRules;if(ka)Array.prototype.slice.call(ka).forEach(da);}function fa(ja,ka){var la=0;ja=ja||0;if(v.length)for(var ma=ja;ma<v.length;ma++){if(x||la==n){j(function(){fa(ma,ka);},o);return;}var na=v[ma],oa;try{oa=document.body.querySelector(na);}finally{if(oa){if(!u[na]){u[na]=y[na];delete t[na];}}else if(!u[na]&&!t[na])t[na]=y[na];}la++;}ka&&ka();}var ga=false;function ha(){var ja=document.styleSheets;if(!ja||!document.body.querySelector||ga)return;ga=true;Array.prototype.slice.call(ja).forEach(ea);fa(0,function(){ga=false;s++;if(s==l){if(q)clearTimeout(q);if(r)Array.prototype.slice.call(r).forEach(function(ka){ka&&ka.remove();});ia();}});}function ia(){var ja=Object.keys(t),ka=function(na){return na.reduce(function(oa,pa){return oa+pa;});},la=ja.map(function(na){return {selector:na,length:ka(t[na])};}).sort(function(na,oa){return oa.length-na.length;}),ma={pagehistory:w,stylesheets:document.styleSheets.length,used:Object.keys(u).length,unused:ja.length,checked:v.length,offenders:la.slice(0,p).reduce(function(na,oa){na[oa.selector]=oa.length;return na;},{})};g.log('css_utilization',undefined,ma);}q=k(ha,m);r=[i.listen('m:page:loading',null,function(){w.push(window.location.href);}),h.listen('go',function(){return x=false;}),h.listen('stop',function(){return x=true;})];e.exports={normalizeSelector:aa};},null);
__d("MRenderingScheduler",["DOM","ErrorUtils","EventEmitter","EventEmitterWithHolding","EventHolder","LogHistory","MRequest","Resource","ServerJS","Stratcom","ix","$","ge","invariant","MPageletUtilities"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u=b('MPageletUtilities').BreakPoint,v=b('MPageletUtilities').Visualization,w=[],x=[],y={},z=l.getInstance('scheduler');function aa(pa){if(y[pa]){y[pa].css=true;ca();}}function ba(pa){if(y[pa]){y[pa].js=true;da();}}function ca(){while(w.length){var pa=w[0].id;if(!y[pa].css)break;var qa=w.shift();h.guard(function(){var ra=s(pa);if(ra){z.log('insert',qa.pageletConfig.name);if(a.MPageletCavalry)a.MPageletCavalry.setEventTime(qa.pageletConfig.lid,qa.pageletConfig.name,"resources_ready");g.setContent(ra,qa.content);if(v&&v.isEnabled())v.addPagelet(qa.pageletConfig.name,qa.pageletConfig.pass,ra);if(a.MPageletCavalry)a.MPageletCavalry.setEventTime(qa.pageletConfig.lid,qa.pageletConfig.name,"dom_ready");y[pa].inserted=true;}else{z.log('discard',qa.pageletConfig.name);y[pa]=undefined;}},'scheduler')();}da();}function da(){while(x.length){var pa=x[0].id;if(!y[pa]){z.log('skip_js',x[0].pageletConfig.name,'pagelet was discarded before JS processing');x.shift();continue;}if(!y[pa].js||!y[pa].inserted)break;var qa=x.shift();if(!s(pa)){z.log('skip_js',qa.pageletConfig.name,'document element ('+pa+') was missing, possibly due to a page transition');continue;}ea(qa.pageletConfig);h.guard(function(){qa.callback();},'scheduler')();y[pa]=undefined;ia();}}function ea(pa){z.log('load',pa.name);q.add(pa.ixData);g.appendContent(r(pa.templateContainer),pa.templates);if(pa.onload)(new Function(pa.onload))();if(pa.onafterload)(new Function(pa.onafterload))();if(pa.serverJSData)(new o()).handle(pa.serverJSData);if(a.MPageletCavalry)a.MPageletCavalry.setTTI(pa.lid,pa.name);p.invoke('m:schedulable:loaded');}function fa(pa,qa,ra){if(u&&u.isEnabled()&&!ra){n.load(pa.css);n.load(pa.js);u.setBreakPoint(fa.bind(this,pa,qa,true),{name:pa.pageletConfig.name,pass:pa.pageletConfig.pass});return;}z.log('schedule',pa.pageletConfig.name);if(ma)ma.emitAndHold('m:schedulable:sync-pagelet',JSON.parse(JSON.stringify(pa)));w.push(pa);x.push({id:pa.id,callback:qa,pageletConfig:pa.pageletConfig});y[pa.id]={};if(pa.link){n.wait(pa.link,aa.bind(null,pa.id));}else n.load(pa.css,aa.bind(null,pa.id));n.load(pa.js,ba.bind(null,pa.id));}var ga,ha;function ia(){var pa=Object.keys(y),qa=true;if(ha&&ha==pa.length){pa.forEach(function(ra){if(y[ra])qa=false;});qa&&ga&&ga();}}function ja(pa){ha=pa;ia();}function ka(pa,qa,ra){t(a.MPageletCavalry);ja(ra);var sa=a.MPageletCavalry.pageletRunInfo(pa,qa,ra);for(var ta in sa)new m('/a/logs').setData({message:JSON.stringify(sa[ta])}).setMethod('POST').send();}var la=new k(),ma=new j(new i(),la);function na(pa){if(ma)return ma.addRetroactiveListener('m:schedulable:sync-pagelet',pa);}function oa(pa){ga=pa;}p.listen('m:page:unload',null,function(){ma.releaseHeldEventType('m:schedulable:sync-pagelet');ma.removeAllListeners();ma=null;la=null;p.removeCurrentListener();});e.exports={onPageletReady:ea,schedule:fa,setPageletCount:ja,pageletRunInfo:ka,attachListenerToSyncPageletLoader:na,attachListenerToSyncPageletComplete:oa};},null);
__d("MTimeSpentBitArrayLogger",["Banzai","BanzaiODS","Stratcom","MarauderLogger","TimeSpentArray","TimeSpentImmediateActiveSecondsLogger","Visibility","isInIframe"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){function o(){k.ship();}function p(){var t=Date.now();k.update(t);l.maybeReportActiveSecond(t);}function q(t){if(g.isEnabled('vital_navigations'))g.post('time_spent_mtouch_data_loss_isolation','',{delay:0,retry:true});j.log('time_spent_bit_array',undefined,t,undefined,undefined,undefined,Date.now());}function r(){return ['gesturestart','mousedown','touchstart','scroll','keydown'];}function s(){var t=r();i.listen(t,null,p);var u=('onpagehide' in window)?['pagehide','blur']:['blur'];i.listen(u,null,o);if(g.isEnabled('vital_navigations'))m.addListener('hidden',o);}e.exports={init:function(t){if(n())return;var u=Date.now();k.init(q,null,u);s();l.maybeReportActiveSecond(u);h.bumpEntityKey('ms.time_spent.qa.'+t,'time_spent.bits.js_initialized');},getMonitoredEvents:r};},null);
__d("MOpenable",["CSS","Stratcom"],function(a,b,c,d,e,f,g,h){var i='openable',j='opened',k;function l(n){k=n;g.conditionClass(k,j,true);}function m(){if(k){g.conditionClass(k,j,false);k=null;}}h.listen('touchstart',null,function(event){if(event.getNode(i)!=k)m();});h.listen('click',null,function(event){var n=event.getNode(i),o=k;m();if(n&&n!=o)l(n);});h.listen('touchcancel',null,m);f.main=function(){};},null);
__d("MModalDialogInit",["MModalDialog"],function(a,b,c,d,e,f,g){if(!a.FW_ENABLED)g.init();},null);