// JavaScript Document
var p = {
	0: "1km",
	1: "2km",
	2: "3km",
	3: "4km",
	4: "5km",
	5: "10km",
	6: "15km",
	7: "20km",
	8: "30km",
	9: "40km",
	10: "50km",
	11: "60km",
	12: "70km",
	13: "80km",
	14: "90km",
	15: "100km",
	16: "120km",
	17: "140km",
	18: "160km",
	19: "180km",
	20: "200km",
	21: "300km",
	22: "400km",
	23: "500km",
	24: "600km",
	25: "700km",
	26: "800km",
	27: "900km",
	28: "1000km",
};

var t = {
	0: "1",
	1: "2",
	2: "3",
	3: "4",
	4: "5",
	5: "10",
	6: "10",
	7: "20",
	8: "30",
	9: "40",
	10: "50",
	11: "60",
	12: "70",
	13: "80",
	14: "90",
	15: "100",
	16: "120",
	17: "140",
	18: "160",
	19: "180",
	20: "200",
	21: "300",
	22: "400",
	23: "500",
	24: "600",
	25: "700",
	26: "800",
	27: "900",
	28: "1000",
};

var v = {
	0: "5 km / h",
	1: "10 km / h",
	2: "15 km / h",
	3: "20 km / h",
	4: "25 km / h",
	5: "30 km / h",
	6: "35 km / h",
	7: "40 km / h",
	8: "45 km / h",
	9: "50 km / h",
	10: "55 km / h",
	11: "60 km / h",
	12: "65 km / h",
	13: "70 km / h",
	14: "75 km / h",
	15: "80 km / h",
	16: "85 km / h",
	17: "90 km / h",
	18: "95 km / h",
	19: "100 km / h",
	20: "105 km / h",
	21: "110 km / h",
	22: "115 km / h",
	23: "120 km / h",
};

var s = {
	0: "5",
	1: "10",
	2: "15",
	3: "20",
	4: "25",
	5: "30",
	6: "35",
	7: "40",
	8: "45",
	9: "50",
	10: "55",
	11: "60",
	12: "65",
	13: "70",
	14: "75",
	15: "80",
	16: "85",
	17: "90",
	18: "95",
	19: "100",
	20: "105",
	21: "110",
	22: "115",
	23: "120",
};

var cars = {
	carA: "3.0",
	carB: "3.5",
	carC: "4.0",
};

var lastDist;
var lastSpd1;
var lastSpd2;

$(document).ready(function () {
	$("#time1").val("10000");         //TODO: INVESTIGATE!!!!!!!!!!!!!!!!!!

	$("#slider_amirol_dist").slider({
		range: "min",
		animate: true,

		min: 0,
		max: 28,
		step: 1,
		slide: function (event, ui) {
			lastDist = ui.value;
			update(1, ui.value); //changed
			consumptionCalculator(ui.value, lastSpd1, lastSpd2);
		},
	});

	$(".car").on("click", function (event) {
		var id = $(this).attr("id");

		$(".car").removeClass("selected-car");
		$(this).addClass("selected-car");
		$(".car").removeClass("active-car");
		$(this).addClass("active-car");

		$("#car").val(id);

		consumptionCalculator(lastDist, lastSpd1, lastSpd2);
	});

	$("#slider_amirol_spd1").slider({
		range: "min",
		animate: true,

		min: 0,
		max: 23,
		step: 1,
		slide: function (event, ui) {
			lastSpd1 = ui.value;
			updateSpd1(1, ui.value); //changed
			consumptionCalculator(lastDist, ui.value, lastSpd2);
		},
	});

	$("#slider_amirol_spd2").slider({
		range: "min",
		animate: true,

		min: 0,
		max: 23,
		step: 1,
		slide: function (event, ui) {
			lastSpd2 = ui.value;
			updateSpd2(1, ui.value); //changed
			consumptionCalculator(lastDist, lastSpd1, ui.value);
		},
	});

	update();
	updateSpd1();
	updateSpd2();
	consumptionCalculator();
});

function updateSpd1(slider, val) {
	if (undefined === val) val = 0;
	var amount = v[val];

	$("#sliderVal").val(val);

	$("#slider_amirol_spd1 a").html(
		'<label><span class="glyphicon glyphicon-chevron-left"></span> ' +
			amount +
			' <span class="glyphicon glyphicon-chevron-right"></span></label>'
	);
}

function updateSpd2(slider, val) {
	if (undefined === val) val = 0;
	var amount = v[val];

	$("#sliderVal").val(val);

	$("#slider_amirol_spd2 a").html(
		'<label><span class="glyphicon glyphicon-chevron-left"></span> ' +
			amount +
			' <span class="glyphicon glyphicon-chevron-right"></span></label>'
	);
}

function update(slider, val) {
	if (undefined === val) val = 0;
	var amount = p[val];

	$("#sliderVal").val(val);

	$("#slider_amirol_dist a").html(
		'<label><span class="glyphicon glyphicon-chevron-left"></span> ' +
			amount +
			' <span class="glyphicon glyphicon-chevron-right"></span></label>'
	);
}

// val is the index of value in p/t array
function consumptionCalculator(dist, spd1, spd2) {
	if (undefined === dist) {
		dist = 0;
	}

	if (undefined === spd1) {
		spd1 = 0;
	}

	if (undefined === spd2) {
		spd2 = 0;
	}

	var car = $("#car").val();
	var consumption1 = (cars[car] / 100) * t[dist] * (1 + 0.009 * s[spd1]);
	var consumption2 = (cars[car] / 100) * t[dist] * (1 + 0.009 * s[spd2]);
  var time1 = t[dist] / s[spd1] * 60 * 60;
  var time2 = t[dist] / s[spd2] * 60 * 60;
  var t1 = new Date(time1 * 1000).toISOString().substr(11, 8)
  var t2 = new Date(time2 * 1000).toISOString().substr(11, 8)

	$("#time1").val(t1);
	$("#time2").val(t2);
	$("#cons1").val(consumption1.toFixed(2) + "L");
	$("#cons2").val(consumption2.toFixed(2) + "L");
}