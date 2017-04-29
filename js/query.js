$.ajax({
    url: 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',
    //data: data,
    success: function(response) {
        var data = response.result.records;
        var ddlist = document.querySelector("#select");
        console.log(ddlist);
        var ddlItem = new Option("　　　　　--------請選擇---------　　　　　", "");
        ddlist.options.add(ddlItem);
        $.each(data, function(i, item) {
            // $("<img/>").attr("src", item.media.m).appendTo("#images");
            // if ( i == 3 ) return false;
            //console.log(item.Zone);
            var newddl = document.querySelector("option[value='" + item.Zone + "']");
            //console.log(newddl);
            if (!newddl) {
                ddlItem = new Option(item.Zone, item.Zone);
                ddlist.options.add(ddlItem);
            }
        });
    },
    dataType: 'json'
});

var chang = function() {
    $.ajax({
        url: 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',
        //data: data,
        success: function(response) {
            var data = response.result.records;
            var selected = "";
            //selected = document.querySelector("#selecedtitem").value;
            selected = localStorage.getItem("selecedtitem");
            var rooms = document.querySelector(".rooms");
            console.log(selected);
            var html = "";
            var htmltmp = "";
            for (var i = 0; i < data.length; i++) {
                if (selected == data[i].Zone || data[i].Zone) {
                    console.log(data[i].Zone)
                    var html = `
					 	<div class="col-xs-12 col-sm-6">
							<a href="#" class="thumbnail detail-data">
							    <div class="img">
									<img src="${data[i].Picture1}" alt="">
								</div>
								<div class="caption">
									<h2 class='pic_title'>
										<div class="name">${data[i].Name}</div> 
										<div class="zone">${data[i].Zone}</div>
									</h2>
									<p>
										<span class="glyphicon glyphicon-time icon_1" ></span>
										<span>${data[i].Opentime}</span>
									</p>
									<p>
										<span class="glyphicon glyphicon-map-marker icon_2" ></span>
										<span>${data[i].Add}</span>
									</p>
									<p>
										<span class="glyphicon glyphicon-phone-alt icon_3" ></span>
										<span>${data[i].Tel}</span>
									</p>
								</div>
							</a>
						</div>
						`
                    htmltmp += html
                }
                rooms.innerHTML = htmltmp;
            }
        },
        //dataType: json
    });

}

var ddl = document.querySelectorAll("#select");
ddl[0].addEventListener('change', function(e) {
    console.log("1----------------------------");
    console.log(e);
    console.log("2----------------------------");
    console.log(e.currentTarget.value);
    document.querySelector("#selecedtitem").value = e.currentTarget.value;
    localStorage.setItem("selecedtitem", e.currentTarget.value);
    chang()
}, false)


//綁定btn
var btn = document.querySelectorAll(".btn");
//console.log(btn);
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function(e) {
        console.log(e);
        console.log("----------------------------");
        console.log(e.srcElement.innerHTML);
        document.querySelector("#selecedtitem").value = e.srcElement.innerHTML;
        localStorage.setItem("selecedtitem", e.srcElement.innerHTML);
        chang()
    });
}
chang();