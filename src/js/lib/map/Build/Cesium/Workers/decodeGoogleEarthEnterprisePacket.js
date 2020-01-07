/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
!function(){define("Core/defined",[],function(){"use strict";function e(e){return void 0!==e&&null!==e}return e}),define("Core/DeveloperError",["./defined"],function(e){"use strict";function t(e){this.name="DeveloperError",this.message=e;var t;try{throw new Error}catch(r){t=r.stack}this.stack=t}return e(Object.create)&&(t.prototype=Object.create(Error.prototype),t.prototype.constructor=t),t.prototype.toString=function(){var t=this.name+": "+this.message;return e(this.stack)&&(t+="\n"+this.stack.toString()),t},t.throwInstantiationError=function(){throw new t("This function defines an interface and should not be called directly.")},t}),define("Core/Check",["./defined","./DeveloperError"],function(e,t){"use strict";function r(e){return e+" is required, actual value was undefined"}function n(e,t,r){return"Expected "+r+" to be typeof "+t+", actual typeof was "+e}var i={};return i.typeOf={},i.defined=function(n,i){if(!e(i))throw new t(r(n))},i.typeOf.func=function(e,r){if("function"!=typeof r)throw new t(n(typeof r,"function",e))},i.typeOf.string=function(e,r){if("string"!=typeof r)throw new t(n(typeof r,"string",e))},i.typeOf.number=function(e,r){if("number"!=typeof r)throw new t(n(typeof r,"number",e))},i.typeOf.number.lessThan=function(e,r,n){if(i.typeOf.number(e,r),r>=n)throw new t("Expected "+e+" to be less than "+n+", actual value was "+r)},i.typeOf.number.lessThanOrEquals=function(e,r,n){if(i.typeOf.number(e,r),r>n)throw new t("Expected "+e+" to be less than or equal to "+n+", actual value was "+r)},i.typeOf.number.greaterThan=function(e,r,n){if(i.typeOf.number(e,r),n>=r)throw new t("Expected "+e+" to be greater than "+n+", actual value was "+r)},i.typeOf.number.greaterThanOrEquals=function(e,r,n){if(i.typeOf.number(e,r),n>r)throw new t("Expected "+e+" to be greater than or equal to"+n+", actual value was "+r)},i.typeOf.object=function(e,r){if("object"!=typeof r)throw new t(n(typeof r,"object",e))},i.typeOf.bool=function(e,r){if("boolean"!=typeof r)throw new t(n(typeof r,"boolean",e))},i.typeOf.number.equals=function(e,r,n,o){if(i.typeOf.number(e,n),i.typeOf.number(r,o),n!==o)throw new t(e+" must be equal to "+r+", the actual values are "+n+" and "+o)},i}),define("Core/RuntimeError",["./defined"],function(e){"use strict";function t(e){this.name="RuntimeError",this.message=e;var t;try{throw new Error}catch(r){t=r.stack}this.stack=t}return e(Object.create)&&(t.prototype=Object.create(Error.prototype),t.prototype.constructor=t),t.prototype.toString=function(){var t=this.name+": "+this.message;return e(this.stack)&&(t+="\n"+this.stack.toString()),t},t}),define("Core/decodeGoogleEarthEnterpriseData",["./Check","./RuntimeError"],function(e,t){"use strict";function r(o,a){if(r.passThroughDataForTesting)return a;e.typeOf.object("key",o),e.typeOf.object("data",a);var s=o.byteLength;if(0===s||s%4!==0)throw new t("The length of key must be greater than 0 and a multiple of 4.");var u=new DataView(a),f=u.getUint32(0,!0);if(f===n||f===i)return a;for(var c,h=new DataView(o),d=0,p=a.byteLength,l=p-p%8,v=s,g=8;l>d;)for(g=(g+8)%24,c=g;l>d&&v>c;)u.setUint32(d,u.getUint32(d,!0)^h.getUint32(c,!0),!0),u.setUint32(d+4,u.getUint32(d+4,!0)^h.getUint32(c+4,!0),!0),d+=8,c+=24;if(p>d)for(c>=v&&(g=(g+8)%24,c=g);p>d;)u.setUint8(d,u.getUint8(d)^h.getUint8(c)),d++,c++}var n=1953029805,i=2917034100;return r.passThroughDataForTesting=!1,r}),define("Core/isBitSet",[],function(){"use strict";function e(e,t){return 0!==(e&t)}return e}),define("Core/GoogleEarthEnterpriseTileInformation",["./defined","./isBitSet"],function(e,t){"use strict";function r(e,t,r,n,i,o){this._bits=e,this.cnodeVersion=t,this.imageryVersion=r,this.terrainVersion=n,this.imageryProvider=i,this.terrainProvider=o,this.ancestorHasTerrain=!1,this.terrainState=void 0}var n=[1,2,4,8],i=15,o=16,a=64,s=128;return r.clone=function(t,n){return e(n)?(n._bits=t._bits,n.cnodeVersion=t.cnodeVersion,n.imageryVersion=t.imageryVersion,n.terrainVersion=t.terrainVersion,n.imageryProvider=t.imageryProvider,n.terrainProvider=t.terrainProvider):n=new r(t._bits,t.cnodeVersion,t.imageryVersion,t.terrainVersion,t.imageryProvider,t.terrainProvider),n.ancestorHasTerrain=t.ancestorHasTerrain,n.terrainState=t.terrainState,n},r.prototype.setParent=function(e){this.ancestorHasTerrain=e.ancestorHasTerrain||this.hasTerrain()},r.prototype.hasSubtree=function(){return t(this._bits,o)},r.prototype.hasImagery=function(){return t(this._bits,a)},r.prototype.hasTerrain=function(){return t(this._bits,s)},r.prototype.hasChildren=function(){return t(this._bits,i)},r.prototype.hasChild=function(e){return t(this._bits,n[e])},r.prototype.getChildBitmask=function(){return this._bits&i},r}),define("Core/freezeObject",["./defined"],function(e){"use strict";var t=Object.freeze;return e(t)||(t=function(e){return e}),t}),define("Core/defaultValue",["./freezeObject"],function(e){"use strict";function t(e,t){return void 0!==e&&null!==e?e:t}return t.EMPTY_OBJECT=e({}),t}),define("Core/formatError",["./defined"],function(e){"use strict";function t(t){var r,n=t.name,i=t.message;r=e(n)&&e(i)?n+": "+i:t.toString();var o=t.stack;return e(o)&&(r+="\n"+o),r}return t}),define("Workers/createTaskProcessorWorker",["../Core/defaultValue","../Core/defined","../Core/formatError"],function(e,t,r){"use strict";function n(n){var i,o=[],a={id:void 0,result:void 0,error:void 0};return function(s){var u=s.data;o.length=0,a.id=u.id,a.error=void 0,a.result=void 0;try{a.result=n(u.parameters,o)}catch(f){f instanceof Error?a.error={name:f.name,message:f.message,stack:f.stack}:a.error=f}t(i)||(i=e(self.webkitPostMessage,self.postMessage)),u.canTransferArrayBuffer||(o.length=0);try{i(a,o)}catch(f){a.result=void 0,a.error="postMessage failed with error: "+r(f)+"\n  with responseMessage: "+JSON.stringify(a),i(a)}}}return n}),define("Workers/decodeGoogleEarthEnterprisePacket",["../Core/decodeGoogleEarthEnterpriseData","../Core/GoogleEarthEnterpriseTileInformation","../Core/RuntimeError","./createTaskProcessorWorker"],function(e,t,r,n){"use strict";function i(t,r){var n=h.fromString(t.type),i=t.buffer;e(t.key,i);var u=s(i);i=u.buffer;var f=u.length;switch(n){case h.METADATA:return o(i,f,t.quadKey);case h.TERRAIN:return a(i,f,r);case h.DBROOT:return r.push(i),{buffer:i}}}function o(e,n,i){function o(e,t,r){var n=!1;if(4===r){if(t.hasSubtree())return;n=!0}for(var i=0;4>i;++i){var a=e+i.toString();if(n)P[a]=null;else if(4>r)if(t.hasChild(i)){if(S===v)return void console.log("Incorrect number of instances");var s=E[S++];P[a]=s,o(a,s,r+1)}else P[a]=null}}var a=new DataView(e),s=0,h=a.getUint32(s,!0);if(s+=c,h!==d)throw new r("Invalid magic");var p=a.getUint32(s,!0);if(s+=c,1!==p)throw new r("Invalid data type. Must be 1 for QuadTreePacket");var l=a.getUint32(s,!0);if(s+=c,2!==l)throw new r("Invalid QuadTreePacket version. Only version 2 is supported.");var v=a.getInt32(s,!0);s+=f;var g=a.getInt32(s,!0);if(s+=f,32!==g)throw new r("Invalid instance size.");var y=a.getInt32(s,!0);s+=f;var w=a.getInt32(s,!0);s+=f;var b=a.getInt32(s,!0);if(s+=f,y!==v*g+s)throw new r("Invalid dataBufferOffset");if(y+w+b!==n)throw new r("Invalid packet offsets");for(var E=[],m=0;v>m;++m){var T=a.getUint8(s);++s,++s;var O=a.getUint16(s,!0);s+=u;var k=a.getUint16(s,!0);s+=u;var C=a.getUint16(s,!0);s+=u,s+=u,s+=u,s+=f,s+=f,s+=8;var U=a.getUint8(s++),I=a.getUint8(s++);s+=u,E.push(new t(T,O,k,C,U,I))}var P=[],S=0,D=0,V=E[S++];return""===i?++D:P[i]=V,o(i,V,D),P}function a(e,t,r){for(var n=new DataView(e),i=0,o=[];t>i;){for(var a=i,s=0;4>s;++s){var u=n.getUint32(i,!0);i+=c,i+=u}var f=e.slice(a,i);r.push(f),o.push(f)}return o}function s(e){return}var u=Uint16Array.BYTES_PER_ELEMENT,f=Int32Array.BYTES_PER_ELEMENT,c=Uint32Array.BYTES_PER_ELEMENT,h={METADATA:0,TERRAIN:1,DBROOT:2};h.fromString=function(e){return"Metadata"===e?h.METADATA:"Terrain"===e?h.TERRAIN:"DbRoot"===e?h.DBROOT:void 0};var d=32301;return n(i)})}();