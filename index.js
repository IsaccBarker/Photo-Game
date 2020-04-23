var api_string = 'https://www.flickr.com/services/rest/?format=json&api_key=13620b81a60dab5d4f91dd67ccd6b526&method=flickr.interestingness.getList';
var urls = [];

function getImages() {
	jQuery.ajaxSetup({async:false});
	$.get(api_string, function (data) {
		data = data.replace("jsonFlickrApi(", "");
		data = data.substr(0, data.length-1);
		var obj = JSON.parse(data);
		var i;

		// console.log(obj['photos']['photo'])

		for (i = 0; i < 100; i++) {
			var url = "https://farm" + obj['photos']['photo'][i]['farm'] +
				".staticflickr.com/" + obj['photos']['photo'][i]['server'] +
				"/" + obj['photos']['photo'][i]['id'] + "_" +
				obj['photos']['photo'][i]['secret'] + ".jpg";

			urls.push(url);
		}
	});

	jQuery.ajaxSetup({async:true});
}

function chooseUrl() {
	return urls[Math.trunc(Math.random() * 100)];
}

console.log("Getting images....");
getImages();

console.log("Choosing random image....");
window.addEventListener('load', function () {
	document.getElementById("img").src = chooseUrl();
	// document.getElementById('img').style = "";

	var slider = document.getElementById("bar");
	slider.oninput = function() {
		var gray = this.value;
		var blur = this.value;

		document.getElementById('img').style =
			"filter: grayscale(" + gray + "%); filter: blur(" + blur + "px);";
		console.log(this.value)
	}
})
