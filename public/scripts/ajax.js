/**
 * Syracuse
 *
 * @version     1.0 Beta 1
 * @author      Aeros Development
 * @copyright   2017-2018 Syracuse
 * @since       1.0 Beta 1
 *
 * @license     MIT
 */

/**
 * Peforms an ajax request
 * @param ajax_url, the url
 * @param data_to_send, the data that needs to be send
 * @param handler, the handler
 * @param get_or_post, GET or POST default GET
 * @param data_type, the data type default html
 */
function perform_request(ajax_url, data_to_send, handler, get_or_post = 'GET', data_type = 'html') {
    $.ajax({
        data: data_to_send,
        dataType: data_type,
        url: base_url + ajax_url,
        method: get_or_post,
        success: handler,
        error: function() {
            alert(could_not_load_module);
        }
    });
}

/**
 * Loads a module
 * @param element, the element that must be filled
 * @param url, the url
 */
function load_module(element, url) {
    request = perform_request(url, {}, function(message, data, response) {
        $(element).html(response.responseText);
    });
}

/**
 * loads the rain data for the top 10 table
 * @param url, the url
 */
function load_rain_data(url) {
    var tds = ['td1','td2','td3','td4','td5','td6','td7','td8','td9','td10'];
    var tdVals = ['td1Val','td2Val','td3Val','td4Val','td5Val','td6Val','td7Val','td8Val','td9Val','td10Val'];
    $("#td1").hide();
    $("#td2").hide();
    $("#td3").hide();
    $("#td4").hide();
    $("#td5").hide();
    $("#td6").hide();
    $("#td7").hide();
    $("#td8").hide();
    $("#td9").hide();
    $("#td10").hide();
    $("#td1Val").hide();
    $("#td2Val").hide();
    $("#td3Val").hide();
    $("#td4Val").hide();
    $("#td5Val").hide();
    $("#td6Val").hide();
    $("#td7Val").hide();
    $("#td8Val").hide();
    $("#td9Val").hide();
    $("#td10Val").hide();
    $("#stationHead").hide();
    $("#rainHead").hide();
    $("#tempHead").hide();
    $("#wspeedHead").hide();
    $("#station").hide();
    $("#rainVal").hide();
    $("#tempVal").hide();
    $("#wspeedVal").hide();
    perform_request(url, {}, function(message, data, response) {
        let i = 0;
        $.each(response.responseJSON, function() {
            //we know a bit weird but $("#tds[i]").show() somehow doesn't work
            $("#td1").show();
            $("#td2").show();
            $("#td3").show();
            $("#td4").show();
            $("#td5").show();
            $("#td6").show();
            $("#td7").show();
            $("#td8").show();
            $("#td9").show();
            $("#td10").show();
            $("#td1Val").show();
            $("#td2Val").show();
            $("#td3Val").show();
            $("#td4Val").show();
            $("#td5Val").show();
            $("#td6Val").show();
            $("#td7Val").show();
            $("#td8Val").show();
            $("#td9Val").show();
            $("#td10Val").show();
            if(this.station !== null) {
                document.getElementById(tds[i]).innerHTML = this.name + ':';
                //document.getElementById(tds[i]).show();
                document.getElementById(tdVals[i]).innerHTML = this.precipitation + " mm";
                //document.getElementById(tdVals[i]).show();
                i++;
            }
        });
    }, 'GET', 'json');

}

/**
 * Displays the rain data for the selected station
 * @param url, the url
 * @param station, the selected station
 */
function display_rain_data(url,station) {
    var stationNameDoc = station;
    perform_request(url, {}, function(message, data, response) {
        $.each(response.responseJSON, function() {
            if(stationNameDoc === this.name) {
                $("#stationHead").show();
                $("#rainHead").show();
                $("#tempHead").show();
                $("#wspeedHead").show();
                $("#station").show();
                $("#rainVal").show();
                $("#tempVal").show();
                $("#wspeedVal").show();

                var rainVal = document.getElementById("rainVal");
                var tempVal = document.getElementById("tempVal");
                var wspeedVal = document.getElementById("wspeedVal");
                var stationName = document.getElementById("station");

                rainVal.innerHTML = this.precipitation + " mm";
                tempVal.innerHTML = this.temperature + " °C";
                wspeedVal.innerHTML = this.wind_speed + " Km/H";
                stationName.innerHTML = this.name;
            }
        });
    }, 'GET', 'json');
}

