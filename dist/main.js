var config = {
  apiKey: "AIzaSyBCJNIDz4N63CXNWpUKgDdPRB4R2-kKha4",
  authDomain: "map-ed688.firebaseapp.com",
  databaseURL: "https://map-ed688.firebaseio.com",
  projectId: "map-ed688",
  storageBucket: "map-ed688.appspot.com",
  messagingSenderId: "970302493554"
};
firebase.initializeApp(config);


var database = firebase.database();




function initMap() {
  // Map options

  var locationsForMakers = [
    ["Anderson", "IN", 40.1053196, -85.68025410000001, 1],
    ["Apple Valley", "CA", 34.5008311, -117.18587589999998, 2],
    ["Baltimore", "US", 39.2903848, -76.61218930000001, 3],
    ["Beaver Dam", "WI", 43.4577692, -88.83732900000001, 4],
    ["Brookhaven", "MS", 31.5790588, -90.44065060000003, 5],
    ["Brooksville", "FL", 28.5552719, -82.3878709, 6],
    ["Charlotte", "NC", 35.2270869, -80.84312669999997, 7],
    ["Des Moines", "WA", 47.4017661, -122.32429009999998, 8],
    ["Eastvale", "CA", 33.952463, -117.58480250000002, 9],
    ["Fort Worth", "TX", 32.7554883, -97.3307658, 10],
    ["Fresno", "CA", 36.7377981, -119.78712469999999, 11],
    ["Fresno", "CA", 36.7377981, -119.78712469999999, 12],
    ["Grain Valley", "MO", 39.0150069, -94.19855799999999, 13],
    ["Grove City", "OH", 39.88145189999999, -83.09296440000003, 14],
    ["Hope Mills", "NC", 34.9704419, -78.94530559999998, 15],
    ["Lenexa", "KS", 38.9536174, -94.73357090000002, 16],
    ["Moreno Valley", "CA", 33.9424658, -117.22967169999998, 17],
    ["North Randall", "OH", 41.4347758, -81.5256766, 18],
    ["Oklahoma City", "OK", 35.4675602, -97.51642759999999, 19],
    ["Opa-locka", "FL", 25.9023168, -80.25032709999999, 20],
    ["Palestine", "TX", 31.7621153, -95.63078910000002, 21],
    ["Perris", "CA", 33.7825194, -117.22864779999998, 22],
    ["Redlands", "CA", 34.0555693, -117.18253809999999, 23],
    ["Romulus", "MI", 42.2222614, -83.39659940000001, 24],
    ["Saint James", "MO", 37.9972645, -91.61432239999999, 25],
    ["Salt Lake City", "UT", 40.7607793, -111.89104739999999, 26],
    ["San Bernardino", "CA", 34.1083449, -117.28976520000003, 27],
    ["Sanger", "TX", 33.3631705, -97.17390269999999, 28],
    ["Shelby", "NC", 35.2923513, -81.5356463, 29],
    ["Smyrna", "DE", 39.2998339, -75.60464939999997, 30],
    ["Sparks", "NV", 39.5349112, -119.7526886, 31],
    ["Topeka", "KS", 39.0473451, -95.67515759999998, 32],
    ["Troutdale", "OR", 45.5392862, -122.38731330000002, 33],
    ["Stockton", "CA", 37.9577016, -121.29077960000001, 34]
  ];
  //New map
  var myMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {
      lat: 41.5902,
      lng: -95.7129
    }
  });

  // console.log(locationsForMakers);

  //sort locationsForMakers based on city names. forget about label.
  locationsForMakers.sort(function(a,b){
    if(a[0] < b[0]) return -1;
    if(a[0] > b[0]) return 1;
    return 0;
  });

  for (var i = 0; i < locationsForMakers.length; i++) {
    // locationsForMakers[i][4] = i+1;
    // console.log(locationsForMakers[i]);

    addMarker(locationsForMakers[i],i+1);
  }
  var locations2Ref = database.ref('locations2');
  locations2Ref.push(locationsForMakers);

  function addMarker(item, index) {
    var marker = new google.maps.Marker({
      position: {
        lat:item[2],
        lng:item[3]
      },
      map:myMap,
    });
    var infoWindow = new google.maps.InfoWindow({
      content: item[0] + ", "+ item[1]
    })
    marker.addListener('click', function(){
      infoWindow.open(myMap,marker);
    });

  }


  //get data from firebase
  var refJobs = database.ref('jobs');
  var jobsWithLabelsRef = database.ref('jobsWithLabels');

  refJobs.on('value', gotData, errData);

  function gotData(data) {

    var jobs = data.val();
    // console.log(jobs);
    // console.log(jobs[0]);
    //sort jobs based on city names.
    jobs.sort(function(a,b){
      if(a.city < b.city) return -1;
      if(a.city > b.city) return 1;
      return 0;
    });
    // console.log(jobs);


    var keys = Object.keys(jobs);
    // console.log(keys);
    var tableRef = document.getElementById('myTable');


    for (var i = 0; i < keys.length; i++) {

      var k = keys[i];
      var city = jobs[k].city;
      var state = jobs[k].state;
      var name = jobs[k].name;
      var workSite = jobs[k].workSite;
      var purchaseOrder = jobs[k].purchaseOrder;

      // debugger;
      //
      // for (var i = 0; i < locationsForMakers.length; i++) {
      //   debugger;
      //   console.log(city);
      //   // console.log(locationsForMakers[i][0]);
      //   if(city == locationsForMakers[i][0]){
      //     jobs[k].labelIndex = locationsForMakers[i][4];
      //
      //   }
      // }


      // console.log(name);
      var newRow = tableRef.insertRow(i+1);
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      cell1.innerHTML = city+ ', ' + state;
      cell2.innerHTML = name;
      cell3.innerHTML = workSite;
      cell4.innerHTML = purchaseOrder;


    }
    // var jobsWithLabels = jobs;
// jobsWithLabelsRef.push(jobs)
    // console.log(jobs);

    $(document).ready(function()
    {
        $("#myTable").tablesorter({widgets: ['zebra']});
    }
);

  }


  function errData(err) {
    console.log("error!");
    console.log(err);
  }




}
