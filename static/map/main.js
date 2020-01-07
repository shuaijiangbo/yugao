var developMode = false;

if (developMode) {
    require.config({
        baseUrl: 'static/map/'
    });
} else {
    require.config({
        waitSeconds: 600,
        paths: {
            'Cesium': 'Build/Cesium2/Cesium'
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
