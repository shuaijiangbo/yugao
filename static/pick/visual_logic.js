/**
 * Generated by Verge3D Puzzles v.2.13.0
 * Tue Jul 16 2019 18:00:39 GMT+0800 (中国标准时间)
 * Do not edit this file - your changes may get overridden when Puzzles are saved.
 * Refer to https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for information on how to add your own JavaScript to Verge3D apps.
 */

"use strict";

(function() {

// global variables/constants used by puzzles' functions
var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.objClickCallbacks = [];
_pGlob.pickedObject = '';
_pGlob.objHoverCallbacks = [];
_pGlob.hoveredObject = '';
_pGlob.objMovementInfos = {};
_pGlob.objDragOverCallbacks = [];
_pGlob.objDragOverInfoByBlock = {}
_pGlob.dragMoveOrigins = {};
_pGlob.dragScaleOrigins = {};
_pGlob.mediaElements = {};
_pGlob.loadedFiles = {};
_pGlob.loadedFile = '';
_pGlob.animMixerCallbacks = [];
_pGlob.arHitPoint = new v3d.Vector3(0, 0, 0);
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.animateParamUpdate = null;
_pGlob.openedFile = '';
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();
_pGlob.timers = {};

var _pPhysics = {};

_pPhysics.syncList = [];

// internal info
_pPhysics.collisionData = [];

// goes to collision callback
_pPhysics.collisionInfo = {
    objectA: '',
    objectB: '',
    distance: 0,
    positionOnA: [0, 0, 0],
    positionOnB: [0, 0, 0],
    normalOnB: [0, 0, 0]
};

var PL = v3d.PL = v3d.PL || {};

PL.legacyMode = false;

PL.execInitPuzzles = function() {

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }
    
// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != "WINDOW" && ids[0] != "DOCUMENT" && ids[0] != "BODY") {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == "WINDOW") {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == "DOCUMENT") {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == "BODY") {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}



// setHTMLElemAttribute puzzle
function setHTMLElemAttribute(attr, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;
        elem[attr] = value;
    }
}



// setHTMLElemStyle puzzle
function setHTMLElemStyle(prop, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem || !elem.style)
            continue;
        elem.style[prop] = value;
    }
}




// initSettings puzzle
_initGlob.output.initOptions.fadeAnnotations = true;
_initGlob.output.initOptions.useBkgTransp = true;
_initGlob.output.initOptions.preserveDrawBuf = false;
_initGlob.output.initOptions.useCompAssets = true;
_initGlob.output.initOptions.useFullscreen = false;


// initPreloader puzzle
_initGlob.output.initOptions.useCustomPreloader = true;
_initGlob.output.initOptions.preloaderStartCb = function() {
    _initGlob.percentage = 0;
    (function() {})();
};
_initGlob.output.initOptions.preloaderProgressCb = function(percentage) {
    _initGlob.percentage = percentage;
    (function() {
  setHTMLElemAttribute('innerHTML', String(Math.round(_initGlob.percentage)) + String('%'), 'percent', false);
})();
};
_initGlob.output.initOptions.preloaderEndCb = function() {
    _initGlob.percentage = 100;
    (function() {
  setHTMLElemStyle('display', 'none', 'preloader-div', false);
})();
};

    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}

// autoRotateCamera puzzle
function autoRotateCamera(enabled, speed) {

    if (appInstance.controls && appInstance.controls instanceof v3d.OrbitControls) {
        appInstance.controls.autoRotate = enabled;
        appInstance.controls.autoRotateSpeed = speed;
    } else {
        console.error('autorotate camera: Wrong controls type');
    }
}



autoRotateCamera(true, 3);

} // end of PL.init function

if (window.v3dApp) {
    // backwards compatibility for old player projects
    PL.legacyMode = true;
    PL.init(window.v3dApp);
}

})(); // end of closure

/* ================================ end of code ============================= */
