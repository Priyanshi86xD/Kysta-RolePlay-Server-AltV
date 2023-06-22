# ParkedVehicleSpawner

This is a AltV resource to spawn vehicles randomly on the native parking spots of GTA 5.

## Installation

1. Copy the files of this repository into a new folder called "ParkedVehicleSpawner" in your resource folder
2. Add "ParkedVehicleSpawner" into the resource section of your server.cfg

## <a name="usage"></a> Usage

1. Add the following dependency into the resource.cfg in which you want to use the ParkedVehicleSpawner:

```
deps: [
	"ParkedVehicleSpawner"
]
```

**Usage in NodeJS**

2. Edit the `resource.cfg` and set the type to `js` and the main to `server/server.js`
3. Import the package by using `import * as ParkedVehicleSpawner from "ParkedVehicleSpawner";`
4. Spawn your desired amount of parked vehicled by using `ParkedVehicleSpawner.spawn(amount);`

**Usage in C-Sharp**

2. Use the following code:

```public class SampleResource : AsyncResource
{
  public override void OnStart()
  {
    Alt.Import("SetRandomParkedVehicleCount", "SetRandomParkedVehicleCount", out Action<int> SetRandomParkedVehicleCount);
    SetRandomParkedVehicleCount({NumbersOfVehiclesYouWantToSpawn}) //to set an approximately count of vehicle spawns

    Alt.Import("SpawnParkedVehicles", "SpawnParkedVehicles", out Action SpawnParkedVehicles);
    SpawnParkedVehicles() //to spawn the vehicles
  }
}
```

## Change Spawning Data

Look into the four JSONs to change spawning behaviour.

-   `CarColorsRGBs.json` - Colors in which the cars randomly spawn, format: `{r: 0, g: 0, b: 0, a: 1}`, set as empty array to let the resource select colors randomly
-   `CarGenerators.json` - Parking spots on which vehicles can spawn (can also be used for other purposes)
-   `PopGroup.json` - Some parking spots have a "popGroup" which is a group of vehicles which can be spawned on a specific parking spot. `none` is the standard popGroup if a CarGenerator spot doesn't have a specific carModel and no popGroup.
-   `ColorlessCars.json` - Vehicles which will not be colored randomly by this resource
