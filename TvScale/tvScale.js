class tvFunction extends Application {
  constructor(app) {
    super(app);
    console.log("********* Loading the TvScale Module ***************");
    // <================== Class Variable Definition ====================>
    this.tvSize = 40;    // This is the tv size in inches
    this.tvXRes = 1920;  // This is the Tv Resolution in the X direction
    this.tvYRes = 1080;  // This is the Tv Resolution in the Y direction
    this.gridSize = 200;  // This is the Grid size in Pixels (place holder until it can be retrieved from the Map data)

  }

  hookActorList(t) {
    Hooks.on('renderSceneControls', html => {     //Here we hook onto the program rendering the SceneControls html. (Should be noted dont really know what this is doing but it worked)
      //console.log("**** Called the Scene Controls Hook ****");
      let cL = document.getElementsByClassName("scene-control active").item(0).attributes.getNamedItem("data-control").value;     //this returns an HTMLobject that we then reference to at position 0. call the attributes (which is a named node map) then get the value of the named item (data-control)
      if (cL == "token") {      //Checking if the scene-control active class item is = to token.
        let ul = document.getElementsByClassName("control-tools");      //getting the current control-tools HTMLobject
        const lockButton = $('<li class="control-tool " id="lock_canvas" title="Lock Canvas" data-tool="lock"><i class="fas fa-lock"></i></li>');     //Here we define how the button will look, I copied the existing buttons but added an ID and changed the icon.
        let findCont = $('.control-tools:last-child');      //here we find the last child in this HTMLobject
        findCont.append(lockButton);      //here we append the lockButton to the last spot in the list of buttons
        let btnLock = document.getElementById("lock_canvas")      //setting btnLock = to the elemtent of the buttons ID specified above (line 19)
        btnLock.addEventListener("click", function() {      //added an event listener to btnLock that when clicked will pass your TV X,Y,Size to the calcZoomLevel function
          let gS = canvas.scene.data.grid;      //gets the grid size for the current scene
          tvFunc.calcZoomLevel(tvFunc.tvXRes, tvFunc.tvYRes, gS, tvFunc.tvSize);
        });
      }     //Ending the if cl= statement
      //awwww ysssss
    });     //Ending Hooks.on
  }     //Ending hookActorList function


  //This function will define the Pixels-per-inch (ppi) for the tv when given the TV size in Inches and the Resolution Given in X and Y.
    ppiTV (tSize, tX, tY) {
    let d0 = Math.sqrt(Math.pow(tX,2)+ Math.pow(tY,2));
    //console.log(d0);
    let ppi = d0/tSize;
    //console.log(ppi);
    return ppi;
  }

  //This function will calculate the correct scale for the map given the size of the maps grid square (Assumed 1-in squares) and the Pixels-per-inch of the TV.
  scaleTV (mapGrid, ppi) {
    let normScale = 100/mapGrid;
    //console.log(normScale)
    let ppiScale = normScale * ppi;
    //console.log(ppiScale);
    return ppiScale
  }

      //This function calculates the correct zoom level then updates the canvas
  calcZoomLevel (tX,tY,gS,tS) {
    //console.log(tX + "" + tY + "" + gS + "" + tS);
    let pixelsPerInch = tvFunc.ppiTV(tS,tX,tY);
    //console.log(pixelsPerInch);
    let scaleValue =  Math.round(tvFunc.scaleTV(gS,pixelsPerInch) / .01);
    //console.log(scaleValue);
    let scaleValue2 = .01 * .01 * scaleValue;
    //console.log(scaleValue2);
    canvas.stage.scale.set(scaleValue2 ,scaleValue2);     //This when called sets the scale for the canvas given X and Y
  }

}

//OK DUMB ASSS WHEN CALLING FUNCTIONS MAKE SURE TO USE THE DECLARED VARIABLE FOR THIS CLASS. EG func1.testFunc1(); ASSHOLE

let tvFunc = new tvFunction();
tvFunc.hookActorList();
console.log("##### Finished loading the TvScale Module #####");
