require([
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/views/MapView",
    "esri/widgets/ScaleBar",
  "esri/widgets/Expand", "esri/widgets/BasemapGallery",
      "dojo/domReady!"
    ], function(
      Map,
      FeatureLayer,
      MapView,
       ScaleBar,
       Expand,
       BasemapGallery
    ) {

      // Create the map
      var map = new Map({
        basemap: "gray"
      });

      // Create the MapView
      var view = new MapView({
        container: "viewDiv",
        map: map,
        center:[-91.1, 38.6],
        zoom: 9
      });
  
          var scaleBar = new ScaleBar({
          view: view,
          unit: "dual" // The scale bar displays both metric and non-metric units.
        });

        // Add the widget to the bottom left corner of the view
        view.ui.add(scaleBar, {
          position: "bottom-left"
        });
  
  var basemapGallery = new BasemapGallery({
          view: view,
          container: document.createElement("div")
        });

        // Create an Expand instance and set the content
        // property to the DOM node of the basemap gallery widget
        // Use an Esri icon font to represent the content inside
        // of the Expand widget

        var bgExpand = new Expand({
          view: view,
          content: basemapGallery
        });

        // close the expand whenever a basemap is selected
        basemapGallery.watch("activeBasemap", function() {
          var mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";

          if (mobileSize) {
            bgExpand.collapse();
          }
        });

        // Add the expand instance to the ui

        view.ui.add(bgExpand, "top-right");


      /*************************************************************
       * The PopupTemplate content is the text that appears inside the
       * popup. {fieldName} can be used to reference the value of an
       * attribute of the selected feature. HTML elements can be used
       * to provide structure and styles within the content. The
       * fieldInfos property is an array of objects (each object representing
       * a field) that is use to format number fields and customize field
       * aliases in the popup and legend.
       **************************************************************/

      var template = { // autocasts as new PopupTemplate()
        title: "Neighborhood {NHD_NAME}",
        content: [{
          // It is also possible to set the fieldInfos outside of the content
          // directly in the popupTemplate. If no fieldInfos is specifically set
          // in the content, it defaults to whatever may be set within the popupTemplate.
          type: "fields",
          fieldInfos: [{
            fieldName: "POP00",
            label: "2000 Population: ",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          }, {
            fieldName: "POP10",
            label: "2010 Population: ",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          }]
        }]
      };

      // Reference the popupTemplate instance in the
      // popupTemplate property of FeatureLayer
      var featureLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: template
      });
      map.add(featureLayer);
      
      /*featureLayer.renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
        size: 6,
        color: "red",
        outline: {  // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white"
        }
      }
    };*/
    });
