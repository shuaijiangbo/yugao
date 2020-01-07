var developMode = false;

if (developMode) {
    require.config({
        baseUrl: '../map/static'
    });
} else {
    require.config({
        waitSeconds: 600,
        paths: {
            'Cesium': 'static/map/Build/Cesium2/Cesium'
        },
        shim: {
            Cesium: {
                exports: 'Cesium'
            }
        }
    });
}

if (typeof Cesium !== "undefined") {
	superMap.init(Cesium);
} else if (typeof require === "function") {
    require(["Cesium"], superMap.init);
}
