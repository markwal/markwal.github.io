(()=>{"use strict";var __webpack_modules__={117:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{im:()=>Wrapper,CQ:()=>cwrap,d5:()=>ccall});var _types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(291),_encoding__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(470),_misc__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(907),_demangle__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(792);const numbers=new Set(["int8","int16","int32","int64","uint8","uint16","uint32","uint64","float","double","u8","u16","u32","u64","i8","i16","i32","i64","f32","f64","schar","short","int","long","char","uchar","ushort","uint","ulong","size_t","usize"]);function areValid(t){return t.every((t=>null==t||"void"===t||"number"===t||"boolean"===t||"bool"===t||"string"===t||"array"===t||numbers.has(t)||t.isStruct||t.isPointer))}let fs;function fetch_polyfill(file){return new Promise(((resolve,reject)=>{(fs||(fs=eval("equire".replace(/^/,"r"))("fs"))).readFile(file,(function(t,e){return t?reject(t):resolve({arrayBuffer:()=>Promise.resolve(e),ok:!0})}))}))}const fetchFn="function"==typeof fetch&&fetch||fetch_polyfill;function fetchAndInstantiate(t,e){return fetchFn(t).then((r=>{if(!r.ok)throw new Error(`Got a ${r.status} fetching wasm @ ${t}`);const i=r.headers&&r.headers.get("content-type");return WebAssembly.instantiateStreaming&&"application/wasm"===i?WebAssembly.instantiateStreaming(r,e):r.arrayBuffer().then((t=>WebAssembly.instantiate(t,e)))})).then((t=>t.instance))}const DATA="undefined"!=typeof Symbol?Symbol.for("wrapper-data"):"__data";class Wrapper{constructor(t,e={}){const r=e.dialect&&e.dialect.toLowerCase();this[DATA]={instance:null,imports:null,signatures:new Set,allocations:new Map,memory:e.memory,debug:!!e.debug,isAssemblyScript:"assemblyscript"===r},Object.entries(t).forEach((([t,[e,r=[]]])=>{["exports","imports","utils","fetch","use"].forEach((e=>(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(t!==e,"`%s` is a reserved wrapper name",e))),(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(r.every((t=>!!t)),"`%s` has undefined types",t),(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(areValid([e]),"`%s` has invalid types",t),(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(areValid(r),"`%s` has invalid types",t),this[DATA].signatures.add({fnName:t,returnType:e,argTypes:r})})),this.utils={encodeString:this.__encodeString.bind(this),decodeString:this.__decodeString.bind(this),readStringView:this.__readStringView.bind(this),readString:this.__readString.bind(this),writeString:this.__writeString.bind(this),writeArray:this.__writeArray.bind(this),readStruct:this.__readStruct.bind(this),writeStruct:this.__writeStruct.bind(this),readPointer:this.__readPointer.bind(this),writePointer:this.__writePointer.bind(this),allocate:function(t){(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)("function"==typeof t.ref,"Can't allocate '%s' This method is for Pointer & Structs",t),t instanceof _types__WEBPACK_IMPORTED_MODULE_0__.gb||t instanceof _types__WEBPACK_IMPORTED_MODULE_0__.x7?this.__writePointer(t):this.__writeStruct(t)}.bind(this),free:function(t){"function"==typeof t.ref?this.__free(t.ref()):this.__free(t)}.bind(this)},this.exports=null}imports(t,e=!0){const r=(...t)=>{const e=t.pop(),[r,i=[]]=Array.isArray(t[0])?t[0]:[null,t];return(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(areValid(i),`Import has invalid types: ${i}`),(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(areValid([r]),`Import has invalid types: ${r}`),(...t)=>{const n=i.map(((e,r)=>this.__out(t[r],e)));t.length>i.length&&n.push(...t.slice(i.length-t.length));const s=e(...n);if(r&&"void"!==r)return this.__in(s,r)}},i={print:r("string",((t,...e)=>console.log(t,...e))),eprint:r("string",((t,...e)=>console.error(t,...e))),trace:r("string",(t=>{throw new Error(t)})),abort:r("string","string","number","number",((t,e,r,i)=>{throw new Error(`${t} @ ${e}:${r}:${i}`)})),_abort(t){throw new Error(`Aborting, error code: ${t}`)},_exit(t){if(t)throw new Error(`Exit error code: ${t}`)},_grow(){}},n="function"==typeof t?t(r):t;return e&&(n.env=Object.assign(i,n.env)),this[DATA].imports=n,n}fetch(t){return fetchAndInstantiate(t,this[DATA].imports||this.imports({})).then((t=>(this.__link(t),this)))}use(t){return(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(t instanceof WebAssembly.Instance,".use(instance) requires a WebAssembly.Instance"),this.__link(t),this}__link(t){const e=this[DATA].memory||t.exports.memory||this[DATA].imports.env&&this[DATA].imports.env.memory;(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!e,"Wrapper needs access to your WebAssemmbly memory. It looks for this ineither your `imports.env.memory` or `exports.env.memory`. If you don'tuse either, you need to add it in the options with `new Wrapper`"),this.exports=t.exports,this[DATA].instance=t,this[DATA].memory=e,this[DATA].signatures.forEach((({fnName:t,returnType:e,argTypes:r})=>{const i=this.exports[t];(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!i,`Fn '${t}' missing from wasm exports`),this[t]=this.__wrap(i,r,e)}))}__wrap(t,e,r){return function(...i){const n=[],s=e.map(((t,e)=>this.__in(i[e],t,n)));let o;i.length>e.length&&s.push(...i.slice(e.length-i.length));try{o=t(...s)}catch(t){throw(0,_demangle__WEBPACK_IMPORTED_MODULE_2__.Z)(t)}if(n.forEach((t=>this.__free(t))),r&&"void"!==r)return this.__out(o,r)}}__in(t,e,r){if((0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!e,"No arg type was specified for this function"),"number"===e||numbers.has(e))return t;if("boolean"===e||"bool"===e)return!!t;if("string"===e)return this.__writeString(t,r);if("array"===e)return this.__writeArray(t,r);if(e.isStruct)return this.__writeStruct(t,e);if(e.isPointer)return this.__writePointer(t);throw new Error(`Unknown type: \n${JSON.stringify(e)}`)}__out(t,e){if((0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!e,"No arg type was specified for this function"),"number"===e||numbers.has(e))return t;if("boolean"===e||"bool"===e)return!!t;if("string"===e)return this.__readString(t);if(e.isStruct)return this.__readStruct(t,e);if(e.isPointer)return this.__readPointer(t,e);throw new Error(`Unknown type: \n${JSON.stringify(e)}`)}__allocate(t){(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!this.exports.allocate&&!!this.exports.deallocate,"Missing allocate/deallocate fns in wasm exports, can't allocate memory");const e=this.exports.allocate(t);return(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!e,"allocate failed"),this[DATA].debug&&console.log("Alloc: %s (size=%s)",e,t),this[DATA].allocations.set(e,t),e}__free(t,e){const r=e||this[DATA].allocations.get(t);this[DATA].debug&&console.log("Free: %s (size=%s)",t,r),this.exports.deallocate(t,r),this[DATA].allocations.delete(t)}__view(t,e){return new DataView(this[DATA].memory.buffer,t,e)}__encodeString(t){const e=this[DATA].isAssemblyScript?(0,_encoding__WEBPACK_IMPORTED_MODULE_3__.cv)(t,"utf-16"):(0,_encoding__WEBPACK_IMPORTED_MODULE_3__.cv)(t),r=this[DATA].isAssemblyScript?e.byteLength+4:e.byteLength+1,i=new Uint8Array(new ArrayBuffer(r));if(this[DATA].isAssemblyScript){const t=e.byteLength/2;new DataView(i.buffer).setUint32(0,t,!0),i.set(e,4)}else i.set(e,0),i[r-1]=0;return i}__decodeString(t){const e=(0,_misc__WEBPACK_IMPORTED_MODULE_1__._f)(t);return this[DATA].isAssemblyScript?(0,_encoding__WEBPACK_IMPORTED_MODULE_3__.Jx)(e.subarray(4),"utf-16"):(0,_encoding__WEBPACK_IMPORTED_MODULE_3__.Jx)(e.subarray(0,-1))}__readStringView(t){if(this[DATA].isAssemblyScript){const e=4+2*this.__view().getUint32(t,!0);return this.__view(t,e)}const e=new Uint8Array(this[DATA].memory.buffer);let r=t;for(;e[r];)++r;return this.__view(t,r-t+1)}__readString(t){return this.__decodeString(this.__readStringView(t))}__writeString(t,e){const r=this.__encodeString(t),i=this.__allocate(r.byteLength);e&&e.push(i);return new Uint8Array(this[DATA].memory.buffer).set(r,i),i}__writeArray(t,e){(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(t instanceof ArrayBuffer||ArrayBuffer.isView(t),"Argument must be an ArrayBuffer or a TypedArray (like Uint8Array)");const r=ArrayBuffer.isView(t)?t:new Uint8Array(t),i=this[DATA].isAssemblyScript?r.byteLength+16:r.byteLength,n=this.__allocate(i);e&&e.push(n);const s=new Uint8Array(this[DATA].memory.buffer),o=(0,_misc__WEBPACK_IMPORTED_MODULE_1__._f)(r);return this[DATA].isAssemblyScript?(this.__view().setUint32(n+0,n+8,!0),this.__view().setUint32(n+4,r.length,!0),this.__view().setUint32(n+8,r.byteLength,!0),s.set(o,n+16)):s.set(o,n),n}__readStruct(t,e){(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!e,"No struct StructType given");const r=this.__view(t,e.width);return e.read(r,this.utils)}__writeStruct(t,e){if(!(0,_misc__WEBPACK_IMPORTED_MODULE_1__.kK)(t)&&t.ref&&t.ref())return t.ref();const r=e||t.constructor,i=this.__allocate(r.width),n=this.__view(i,r.width);return r.write(n,t,this.utils),i}__readPointer(t,e){(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(!!e,"No pointer type given");const r=this.__view(t,e.type.width);if(e.type.isStruct||e.type.isPointer)return e.read(r,this.utils);const i=new _types__WEBPACK_IMPORTED_MODULE_0__.gb(e.type);return i.view=r,i.wrapper=this.utils,i}__writePointer(t){if(t.ref())return t.ref();t.wrapper=this.utils;const e=t.size(),r=this.__allocate(e),i=this.__view(r,e);return t.view=i,t.commit(),r}}function cwrap(t,e,r=null,i=[]){(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(t instanceof WebAssembly.Instance,".cwrap() requires a ready WebAssembly.Instance");const n=new Wrapper({[e]:[r,i]});return n.use(t),n[e].bind(n)}function ccall(t,e,r=null,i=[],...n){(0,_misc__WEBPACK_IMPORTED_MODULE_1__.hu)(t instanceof WebAssembly.Instance,".ccall() requires a ready WebAssembly.Instance");const s=new Wrapper({[e]:[r,i]});return s.use(t),s[e].call(s,...n)}},792:(t,e,r)=>{r.d(e,{Z:()=>s});const i=[[/^_\$/,"$"],[/\$C\$/g,","],[/\$SP\$/g,"@"],[/\$BP\$/g,"*"],[/\$RF\$/g,"&"],[/\$LT\$/g,"<"],[/\$GT\$/g,">"],[/\$LP\$/g,"("],[/\$RP\$/g,")"],[/\$u7e\$/g,"~"],[/\$u20\$/g," "],[/\$u27\$/g,"'"],[/\$u5b\$/g,"["],[/\$u5d\$/g,"]"],[/\$u7b\$/g,"{"],[/\$u7d\$/g,"}"],[/\$u3b\$/g,";"],[/\$u2b\$/g,"+"],[/\$u22\$/g,'"'],[/\.\./g,"::"]];function n(t){return i.reduce(((t,[e,r])=>t.replace(e,r)),t)}function s(t){const e=/(?:at (.+) \()|(?:(.+)<?@)/;return t.stack=t.stack.split("\n").map((t=>t.replace(e,((t,e,r)=>`at ${function(t=""){const e=e=>0===t.indexOf(e);let r;if(i="E",t.slice(-1)!==i)return t;var i;if(e("ZN")?r=t.slice(2,-1):e("_ZN")?r=t.slice(3,-1):e("__ZN")&&(r=t.slice(4,-1)),!r)return t;const s=r.split(""),o=[];let a="",u="",_=0;var c;return s.forEach((t=>{_?(a+=t,_--):(a&&(o.push(a),a=""),/[0-9]/.test(t)?u+=t:(_=parseInt(u,10),u="",a+=t,_--))})),o.push(a),(c=o.slice(-1)[0]).length&&"h"===c[0]&&c.split("").slice(1).every((t=>/[0-9a-f]/i.test(t)))&&o.pop(),o.map(n).join("::")}(e||r)} (`)))).join("\n"),t}},470:(t,e,r)=>{function i(t){let e,r=null,i=1/0;const n=[];for(let s=0;s<t.length;++s){if(e=t.charCodeAt(s),e>55295&&e<57344){if(!r){if(e>56319){(i-=3)>-1&&n.push(239,191,189);continue}if(s+1===t.length){(i-=3)>-1&&n.push(239,191,189);continue}r=e;continue}if(e<56320){(i-=3)>-1&&n.push(239,191,189),r=e;continue}e=65536+(r-55296<<10|e-56320)}else r&&(i-=3)>-1&&n.push(239,191,189);if(r=null,e<128){if((i-=1)<0)break;n.push(e)}else if(e<2048){if((i-=2)<0)break;n.push(e>>6|192,63&e|128)}else if(e<65536){if((i-=3)<0)break;n.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((i-=4)<0)break;n.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return Uint8Array.from(n)}function n(t){const e=t.length,r=[];let i=0;for(;i<e;){const n=t[i];let s=null,o=n>239?4:n>223?3:n>191?2:1;if(i+o<=e){let e,r,a,u;switch(o){case 1:n<128&&(s=n);break;case 2:e=t[i+1],128==(192&e)&&(u=(31&n)<<6|63&e,u>127&&(s=u));break;case 3:e=t[i+1],r=t[i+2],128==(192&e)&&128==(192&r)&&(u=(15&n)<<12|(63&e)<<6|63&r,u>2047&&(u<55296||u>57343)&&(s=u));break;case 4:e=t[i+1],r=t[i+2],a=t[i+3],128==(192&e)&&128==(192&r)&&128==(192&a)&&(u=(15&n)<<18|(63&e)<<12|(63&r)<<6|63&a,u>65535&&u<1114112&&(s=u))}}null===s?(s=65533,o=1):s>65535&&(s-=65536,r.push(s>>>10&1023|55296),s=56320|1023&s),r.push(s),i+=o}if(r.length<=4096)return String.fromCharCode.call(String,...r);let n="",s=0;for(;s<r.length;)n+=String.fromCharCode.call(String,...r.slice(s,s+=4096));return n}function s(t,e){return"utf-16"===e?function(t){const e=new ArrayBuffer(2*t.length),r=new Uint16Array(e);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return new Uint8Array(e)}(t):"undefined"!=typeof TextEncoder?(new TextEncoder).encode(t):i(t)}function o(t,e){return"utf-16"===e?function(t){const e=t.byteLength,r=e%2?(e+1)/2:e/2,i=new Uint16Array(t.buffer,t.byteOffset,r);return String.fromCharCode(...i)}(t):"undefined"!=typeof TextDecoder?(new TextDecoder).decode(t):n(t)}r.d(e,{cv:()=>s,Jx:()=>o,Wj:()=>i,CZ:()=>n})},907:(t,e,r)=>{function i(t,e,...r){if(t)return;if(!r||!r.length)throw new Error(e);let i,n="";try{i=r.map((t=>JSON.stringify(t,null,2)))}catch(t){throw new Error(e)}throw e.split("%s").forEach((t=>{n+=t,i.length&&(n+=i.pop())})),new Error(n)}function n(t,e,r){return new DataView(t.buffer,t.byteOffset+e,r)}function s(t){return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}function o(t){return null==t}r.d(e,{hu:()=>i,R5:()=>n,_f:()=>s,kK:()=>o,K6:()=>_,WT:()=>c,xl:()=>h});const a=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),u=t=>"function"==typeof t;function _(t){i(!!a(t.prototype,"value"),"Missing `value` property"),Object.getOwnPropertyNames(String.prototype).forEach((e=>{a(t.prototype,e)||u(String.prototype[e])&&(t.prototype[e]=function(...t){return this.value[e](...t)})}))}function c(t){i(!!a(t.prototype,"values"),"Missing `values` property"),Object.getOwnPropertyNames(Array.prototype).forEach((e=>{a(t.prototype,e)||u(Array.prototype[e])&&(t.prototype[e]=function(...t){return this.values[e](...t)})}))}function h(t){i(!!a(t.prototype,"values"),"Missing `values` property"),i(!!a(t.prototype,"length"),"Missing `length` property"),t.prototype[Symbol.iterator]=function(){const t=this.values,e=this.length;let r=0;return{next:()=>r<e?{value:t[r++],done:!1}:{done:!0}}}}},291:(t,e,r)=>{r.d(e,{V5:()=>a,Wu:()=>n,gb:()=>u,x7:()=>_,gZ:()=>l});var i=r(907);class n{constructor(t,e={}){(0,i.hu)(!isNaN(t),"Type size must be a number, given: %s",t),this.width=t,this.alignment="alignment"in e?e.alignment:t,e.read&&(this.read=e.read),e.write&&(this.write=e.write)}read(t){return t}write(t,e){(0,i.hu)(e instanceof ArrayBuffer||ArrayBuffer.isView(e),"Value must be an `ArrayBuffer` or a `DataView` (like `Uint8Array`)"),(0,i._f)(t).set((0,i._f)(e))}}class s{constructor(t){this.width=t,this.alignment=t;const e="getInt"+8*t,r="setInt"+8*t;this.read=t=>t[e](0,!0),this.write=(t,e)=>t[r](0,e,!0)}}class o{constructor(t){this.width=t,this.alignment=t;const e="getUint"+8*t,r="setUint"+8*t;this.read=t=>t[e](0,!0),this.write=(t,e)=>t[r](0,e,!0)}}const a={void:{width:0,alignment:0,read:()=>null,write:()=>{}}};a.int8=new s(1),a.int16=new s(2),a.int32=new s(4),a.uint8=new o(1),a.uint16=new o(2),a.uint32=new o(4),a.int64=new n(8),a.uint64=new n(8),a.float={width:4,alignment:4,read:t=>t.getFloat32(0,!0),write(t,e){t.setFloat32(0,e,!0)}},a.double={width:8,alignment:8,read:t=>t.getFloat64(0,!0),write(t,e){t.setFloat64(0,e,!0)}},a.bool={width:1,alignment:1,read:t=>!!t.getInt8(0),write(t,e){t.setInt8(0,e?1:0)}};class u{constructor(t,e){this.type=l(t),this.view=null,this.wrapper=null,this._temp=e}size(){return this.type.width}commit(){this._temp&&this.type.write(this.view,this._temp,this.wrapper)}ref(){return this.view?this.view.byteOffset:0}deref(){return(0,i.hu)(this.view,"Trying to deref an unallocated pointer"),this.type.read(this.view,this.wrapper)}set(t){this.view?this.type.write(this.view,t,this.wrapper):this._temp=t}free(){(0,i.hu)(this.view,"Cant free pointer: unallocated / already freed"),this.wrapper.free(this.ref(),this.type.width),this.view=null}toString(){return this.ref()?`Pointer( ${this.deref()} )`:"Pointer( null )"}}a.pointer=function(t){const e=l(t);return{type:e,width:4,alignment:4,isPointer:!0,read(t,r){const i=t.getUint32(0,!0),n=new DataView(t.buffer,i,e.width),s=new u(e);return s.view=n,s.wrapper=r,s},write(t,e,r){(0,i.hu)(e instanceof u,`Trying to write ${e} as a pointer`),e.ref()||r.writePointer(e),t.setUint32(0,e.ref(),!0)}}};class _{constructor(t){this.view=null,this.wrapper=null,this._tempStr=t,this._tempBuf=null,this._width=null}size(){return this._tempBuf=this.wrapper.encodeString(this._tempStr),this._width=this._tempBuf.byteLength,this._width}commit(){if((0,i.hu)(!!this.view,"Cant commit StringPointer, no view!"),this._tempBuf){new Uint8Array(this.view.buffer).set(this._tempBuf,this.view.byteOffset)}}ref(){return this.view?this.view.byteOffset:0}deref(){return(0,i.hu)(this.view,"Trying to deref an unallocated StringPointer"),this.wrapper.decodeString(this.view)}free(){(0,i.hu)(!!this.view,"Cant free StringPointer: unallocated / already freed"),this.wrapper.free(this.ref(),this._width),this.view=null}}Object.defineProperty(_.prototype,"value",{enumerable:!0,get(){return this.deref()}}),(0,i.K6)(_),a.string={width:4,alignment:4,isPointer:!0,read(t,e){const r=t.getUint32(0,!0),i=new _;return i.view=e.readStringView(r),i.wrapper=e,i},write(t,e,r){"string"==typeof e&&(e=new _(e)),e.ref()||r.writePointer(e),t.setUint32(0,e.ref(),!0)}};class c{constructor(t,e){this.type=t,this.length=e,this.width=t.width*e,this.alignment=t.alignment}read(t,e){const r=[];for(let n=0;n<=this.length-1;n++){const s=(0,i.R5)(t,n*this.type.width,this.type.width);r.push(this.type.read(s,e))}return r}write(t,e,r){(0,i.hu)(e.length===this.length,"Values length does not match struct array length"),e.forEach(((e,n)=>{const s=(0,i.R5)(t,n*this.type.width,this.type.width);this.type.write(s,e,r)}))}}const h={u8:a.uint8,u16:a.uint16,u32:a.uint32,u64:a.uint64,i8:a.int8,i16:a.int16,i32:a.int32,i64:a.int64,f32:a.float,f64:a.double,char:a.uint8,uchar:a.uint8,schar:a.int8,short:a.int16,ushort:a.uint16,int:a.int32,uint:a.uint32,long:a.int32,ulong:a.uint32,longlong:a.uint64,ulonglong:a.uint64,size_t:a.uint32,usize:a.uint32};function l(t){if("string"==typeof t)return function(t){const e=t.toLowerCase();if(e in a)return a[e];if(e in h)return h[e];throw new Error(`Parsing unknown type '${t}'`)}(t);if(Array.isArray(t)){(0,i.hu)(2===t.length,"Array type needs 2 arguments: [type, length], given: \n%s",t);const e=l(t[0]),r=t[1];return new c(e,r)}const e="Given argument type isn't a proper 'type' interface: \n%s";return(0,i.hu)("width"in t,e,t),(0,i.hu)("alignment"in t,e,t),(0,i.hu)("read"in t,e,t),(0,i.hu)("write"in t,e,t),t}}},__webpack_module_cache__={};function __webpack_require__(t){if(__webpack_module_cache__[t])return __webpack_module_cache__[t].exports;var e=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](e,e.exports,__webpack_require__),e.exports}__webpack_require__.d=(t,e)=>{for(var r in e)__webpack_require__.o(e,r)&&!__webpack_require__.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=__webpack_require__(117),e=__webpack_require__(291),r=__webpack_require__(907);const i="undefined"!=typeof Symbol?Symbol.for("struct-data"):"__data";const n=class{constructor(t={},n={}){const s=Object.getOwnPropertyNames(t);["ref","free","dataview"].forEach((t=>(0,r.hu)(!(s in s),`Field '${t}' is a reserved method name`)));class o extends class{constructor(t){this[i]={temp:{},view:null,wrapper:null},t&&Object.entries(t).forEach((([t,e])=>{(0,r.hu)(t in this,`Can't set value, struct missing field '${t}'`),this[t]=e}))}ref(){return this[i].view?this[i].view.byteOffset:0}free(t=!1){(0,r.hu)(!!this[i].wrapper,"Cant free struct, either: unallocated / already freed / sub-struct");const e=t=>{t.constructor.fields.forEach(((r,i)=>{r.type.isPointer&&t[i].free(),r.type.isStruct&&e(t[i])}))};t&&e(this),this[i].wrapper.free(this.ref(),this.constructor.width),this[i].wrapper=null,this[i].view=null}toString(){let t="{\n";return(e=>{const r=e.constructor.fields,i=e.constructor.prototype;r.forEach(((r,i)=>{t+=`  ${i}: ${e[i]},\n`})),Object.getOwnPropertyNames(i).forEach((i=>{if(r.has(i))return;const n=e[i];"function"!=typeof n&&(t+=`  ${i}: ${n},\n`)}))})(this),t.length<=80&&(t=t.replace(/\n/g,"").replace(/ {2}/g," ").replace(/,$/g," ")),t+="}",t}dataview(t){const e=this[i].view;if((0,r.hu)(!!e,"Struct hasn't been written yet, can't get dataview"),!t)return e;const n=this.constructor.fields.get(t);return(0,r.hu)(!!n,`Field '${t}' doesn't exist on struct`),(0,r.R5)(e,n.offset,n.type.width)}static read(t,e){const r=new this;return r[i].view=t,r[i].wrapper=e,r}static write(t,e,n){const s=this;!(0,r.kK)(e)&&e.constructor.isStruct||(e=new s(e)),s.fields.forEach(((i,s)=>{const o=i.type;let a=e[s];if(void 0!==a){!o.isStruct||!(0,r.kK)(a)&&a.constructor.isStruct||(a=new o(a));const e=(0,r.R5)(t,i.offset,o.width);o.write(e,a,n)}})),e[i].view=t,e[i].wrapper=n}}{}o.fields=new Map,o.packed="packed"in n&&!!n.packed,o.alignment=n.alignment||0,o.isStruct=!0;let a=0;return s.forEach((r=>{const i=(0,e.gZ)(t[r]);!n.alignment&&i.alignment>o.alignment&&(o.alignment=i.alignment),o.packed||a%i.alignment==0||(a+=i.alignment-a%i.alignment),o.fields.set(r,{name:r,offset:a,type:i}),a+=i.width})),o.width=a%o.alignment?a+o.alignment-a%o.alignment:a,o.fields.forEach(((t,e)=>{Object.defineProperty(o.prototype,e,{enumerable:!0,get(){if(!this[i].view)return this[i].temp[e];const n=(0,r.R5)(this[i].view,t.offset,t.type.width);return t.type.read(n,this[i].wrapper)},set(n){if(!this[i].view)return void(this[i].temp[e]=n);const s=(0,r.R5)(this[i].view,t.offset,t.type.width);t.type.write(s,n,this[i].wrapper)}})})),o}};var s=__webpack_require__(792),o=__webpack_require__(470);const a="undefined"!=typeof Symbol?Symbol.for("struct-data"):"__data";function u(t,r){const i={};t.forEach(((t,r)=>{i[r]=(0,e.gZ)(t)}));const s=new n(i);return r?new s(r):s}function _(t,i){const s=(0,e.gZ)(t),o=new n({ptr:e.V5.pointer(s),cap:"usize",length:"usize"});Object.defineProperty(o.prototype,"values",{enumerable:!0,get(){const t=this[a].view.buffer,r=this[a].wrapper,i=(0,e.gZ)([s,this.length]),n=new DataView(t,this.ptr.ref(),i.width);return i.read(n,r)},set(t){this.ptr=new e.gb([s,t.length],t),this.length=t.length,this.cap=t.length}}),(0,r.WT)(o),(0,r.xl)(o);class u extends o{constructor(t){super(),t&&(this.values=t)}free(){super.free(!0)}}return i?new u(i):u}function c(t,i){const s=(0,e.gZ)(t),o=new n({ptr:e.V5.pointer(s),length:"usize"});Object.defineProperty(o.prototype,"values",{enumerable:!0,get(){const t=this[a].view.buffer,r=this[a].wrapper,i=(0,e.gZ)([s,this.length]),n=new DataView(t,this.ptr.ref(),i.width);return i.read(n,r)},set(t){this.ptr=new e.gb([s,t.length],t),this.length=t.length}}),(0,r.WT)(o),(0,r.xl)(o);class u extends o{constructor(t){super(),t&&(this.values=t)}free(){super.free(!0)}}return i?new u(i):u}function h(){const t=new n({ptr:e.V5.pointer("u8"),length:"usize",cap:"usize"});Object.defineProperty(t.prototype,"value",{enumerable:!0,get(){const t=this[a].view.buffer,e=new Uint8Array(t,this.ptr.ref(),this.length);return(0,o.Jx)(e)},set(t){const r=(0,o.cv)(t);this.ptr=new e.gb(["u8",r.length],r),this.length=r.length,this.cap=r.length}}),(0,r.K6)(t);return class extends t{constructor(t){super(),t&&(this.value=t)}free(){super.free(!0)}}}function l(){const t=new n({ptr:e.V5.pointer("u8"),length:"usize"});Object.defineProperty(t.prototype,"value",{enumerable:!0,get(){const t=this[a].view.buffer,e=new Uint8Array(t,this.ptr.ref(),this.length);return(0,o.Jx)(e)},set(t){const r=(0,o.cv)(t);this.ptr=new e.gb(["u8",r.length],r),this.length=r.length}}),(0,r.K6)(t);return class extends t{constructor(t){super(),t&&(this.value=t)}free(){super.free(!0)}}}function p(t,i=!1,s){const o=(0,e.gZ)(t);let a;a=s?e.V5["uint"+8*s]:1===o.alignment?"uint8":2===o.alignment?"uint16":"uint32";const u=i?{value:o}:{discriminant:a,value:o},_=new n(u);class c extends _{constructor(t){super(),this.value=t,this.discriminant=(0,r.kK)(t)?0:1}static some(t){return new c(t)}static none(){return new c}isSome(){return"discriminant"in u?!!this.discriminant:!!this.value}isNone(){return!this.isSome()}expect(t){if(!this.isSome())throw new Error(t);return this.value}unwrap(){if(!this.isSome())throw new Error("Error unwrapping none");return this.value}unwrapOr(t){return this.isSome()?this.value:t}unwrapOrElse(t){return this.isSome()?this.value:t()}}return c}const f={tuple:u,vector:_,slice:c,string:h(),str:l(),enum:function(t,i=4){const s=Object.getOwnPropertyNames(t),o=s.map((r=>(0,e.gZ)(t[r]))),u=e.V5["uint"+8*i],_=new n({discriminant:u});class c extends _{constructor(t){super(),t&&this._set(t)}_set(t){(0,r.hu)(1===Object.keys(t).length,"Enum value must be a variant");const[e,i]=Object.entries(t)[0];this.discriminant=s.indexOf(e),this.value=i}tag(){const t=this.discriminant;return(0,r.hu)(t<=s.length,"Enum discriminant > than # of variants"),t}free(t=!1){const e=o[this.tag()];(t&&e.isPointer||e.isStruct)&&this.value.free(t),this[a].wrapper.free(this.ref(),c.width),this[a].wrapper=null,this[a].view=null}name(){return s[this.tag()]}is(t){return s.indexOf(t)===this.tag()}match(t){const e=s[this.tag()],r=this.value;return e in t?"function"==typeof t[e]?t[e](r):t[e]:"_"in t?"function"==typeof t._?t._(r):t._:void 0}static write(t,e,i){!(0,r.kK)(e)&&e.constructor.isStruct||(e=new c(e));const n=e.tag(),s=o[n];let _=e.ref()?e.value:e[a].temp.value;!s.isStruct||!(0,r.kK)(_)&&_.constructor.isStruct||(_=new s(_));const h=(0,r.R5)(t,0,u.width);u.write(h,n);const l=(0,r.R5)(t,u.width,s.width);s.write(l,_,i),e[a].view=t,e[a].wrapper=i}}Object.defineProperty(c.prototype,"value",{enumerable:!0,get(){const t=this[a].view.buffer,e=this[a].wrapper,r=o[this.tag()],i=this.ref()+u.width,n=new DataView(t,i,r.width);return r.read(n,e)},set(t){this[a].temp.value=t}});const h=u.width+Math.max(...o.map((t=>t.width))),l=Math.max(...o.map((t=>t.alignment)),u.alignment);return c.width=h%l?h+l-h%l:h,c},option:p,some:function(t,e,...r){return new(p(t,...r))(e)},none:function(t,...e){return new(p(t,...e))},Tuple:u,Vector:_,Slice:c,String:h(),Str:l(),Option:function(t,e,...r){return new(p(t,...r))(e)},Some:function(t,e,...r){return new(p(t,...r))(e)},None:function(t,...e){return new(p(t,...e))}};"undefined"!=typeof Symbol&&Symbol.for("struct-data");o.Wj,o.CZ,e.x7,t.im,t.CQ,t.d5,e.V5,e.Wu,e.gb,e.x7,s.Z;const w="/encrusted/web.wasm";console.log("wasmURL ",w);let d=null;function g(t,e){postMessage({type:t,msg:e})}const m=new t.im({create:[null,["number","number"]],feed:[null,["string"]],step:["bool"],undo:["bool"],redo:["bool"],get_updates:[],restore:[null,["string"]],load_savestate:[null,["string"]],enable_instruction_logs:[null,["bool"]],get_object_details:[f.string,["number"]],flush_log:[]});function y(){m.step()&&g("quit")}function b(){return m.exports?Promise.resolve():m.fetch(w)}m.imports((t=>({env:{js_message:t("string","string",g),trace:t("string",(t=>{const e=new Error(t);setTimeout((()=>{m.flush_log()}),200),postMessage({type:"error",msg:{msg:t,stack:e.stack}})})),rand:function(){return Math.floor(65535*Math.random())}}}))),onmessage=t=>{if("instantiate"===t.data.type&&b().catch((t=>setTimeout((()=>{console.log("Error starting wasm: ",t,t.stack)})))),"load"===t.data.type&&b().then((()=>{d=new Uint8Array(t.data.msg.file);const e=m.utils.writeArray(d);m.create(e,d.length),g("loaded")})).catch((t=>setTimeout((()=>{console.log("Error starting wasm: ",t,t.stack)})))),"start"===t.data.type&&y(),"restart"===t.data.type){const t=m.utils.writeArray(d);m.create(t,d.length),g("loaded")}if("input"===t.data.type&&(m.feed(t.data.msg),y()),"restore"===t.data.type&&(m.restore(t.data.msg),y()),"load_savestate"===t.data.type&&(m.load_savestate(t.data.msg),y(),m.feed("look"),y(),m.undo()),"undo"===t.data.type){g("undo",m.undo()),m.get_updates()}if("redo"===t.data.type){g("redo",m.redo()),m.get_updates()}if("enable:instructions"===t.data.type&&m.enable_instruction_logs(!!t.data.msg),"getDetails"===t.data.type){const e=m.get_object_details(t.data.msg);g("getDetails",e.value),e.free()}}})()})();
//# sourceMappingURL=worker.map