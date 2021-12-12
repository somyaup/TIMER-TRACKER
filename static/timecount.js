var mins=3;
//calculate the seconds
var heading=document.querySelector('h1');
var intro= document.querySelector('p');
var answer=document.getElementById('answer');
var form=document.getElementById('convert');
var form2=document.getElementById('unconvert');
var ftype=document.getElementById('type');


var Edate=document.getElementById('Edate');
console.log(Edate);
const currentDate  = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
console.log(`<b> ${cDay}/${cMonth }/${cYear}</b>`);
Edate.innerHTML = `<b> ${cDay}/${cMonth }/${cYear}</b>`;
const today=`${cDay}/${cMonth }/${cYear}`;
var Ecount=document.getElementById('Ecount');
var Emin=document.getElementById('Emin');
var Ebmin=document.getElementById('Ebmin');
var secs = mins * 60;
var stop=false;
var breaktime=false;

var temp_min;
var Fbreak=0,Fwork=0,Fcount=0;
var temp_stop;
var temp_work;
var temp_break;
var data = $.csv.toObjects("LOG.csv");
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data.txt",
        dataType: "text",
        success: function(data) {console.log(data);}
     });
});
function CSVupdate(text){
    var arr=convertArr(data);
    arr=AppendArr(arr,text);
    var File=ConvertCSV(arr);
    saveFile(File);
}
function intakeCSV(){
}
function convertArr(a){
    let csvData = [];
    let lbreak = a.split("\n");
        lbreak.forEach(res => {
            csvData.push(res.split(","));
        });
    return csvData;
}
function AppendArr(arr,text){
    arr.push(text);
}
function ConvertCSV(arr){
    var string=arr
    .map(e => e.join(","))
   .join("\n");
   return string;
}
function saveFile(File){
     var temp_link = document.createElement('a');
    fetch('/LOG', {
    // Specify the method
    method: 'POST', File
}).then(function (response) { // At this point, Flask has printed our JSON
    return response.text();
}).then(function (text) {
        console.log('GET response text:');
        console.log(text); // Print the greeting as text
});
}


/*function convertCSV(results){
    var table = "<table class='table'>";
	var data = results;
	for(i=0;i<data.length;i++){
		table+= "<tr>";
		var row = data[i];
		var cells = row.join(",").split(",");

		for(j=0;j<cells.length;j++){
			table+= "<td>";
			table+= cells[j];
			table+= "</th>";
		}
		table+= "</tr>";
	}
	table+= "</table>";
    return table;
}*/



form.addEventListener('submit',function(event){
    event.preventDefault();
    var distance=parseFloat(document.getElementById('distance').value);
    var word=document.getElementById('distance').value;
    stop=false;
    if (distance){
        mins = distance;
        answer.innerHTML=`<h2> ${mins} minute timer is on.</h2>`;
    }
    else{
        answer.innerHTML=`<h2> ${word} is farther than a butt moon but closer than a butt pinch.2 minutes</h2>`;
        mins=2;
    }
    secs = mins * 60;
    temp_min=secs;
    setTimeout('Decrement()', 60);
});

form2.addEventListener('submit',function(event){
    event.preventDefault();
    stop=true;
    var m=Math.floor(secs/60);
    var s=secs%60;
    temp_stop=secs;
    console.log(temp_min-temp_stop);
    update_tracker()
    answer.innerHTML=`<h2> ${m} min : ${s} seconds were left.</h2>`;
});

ftype.addEventListener('submit',function(event){
    event.preventDefault();
    stop=true;
    var work=breaktime==true?'break':'work';
    breaktime=!breaktime;
    var m=Math.floor(secs/60);
    var s=secs%60;
    answer.innerHTML=`<h2> ${m} min : ${s} seconds were left before ${work} end.</h2>`;
    if (breaktime) {
        ftype.innerHTML=`<input type="submit" name="breaktime" value="Work">`;}
    else{
        ftype.innerHTML=`<input type="submit" name="breaktime" value="Break">`;}
    temp_stop=secs;
    update_tracker();
});


//Decrement function decrement the value.
function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");

        //if less than a minute remaining
        //Display only seconds value.
        if (seconds < 59) {
            seconds.value = secs;
        }

        //Display both minutes and seconds
        //getminutes and getseconds is used to
        //get minutes and seconds
        else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        //when less than a minute remaining
        //colour of the minutes and seconds
        //changes to red
        if (mins < 1) {
            minutes.style.color = "red";
            seconds.style.color = "red";
        }
        if (mins > 1) {
            minutes.style.color = "black";
            seconds.style.color = "black";
        }
        //if seconds becomes zero,
        //then page alert time up
        if (mins < 0) {
            alert('time up');
            minutes.value = 0;
            seconds.value = 0;
            mins=0;
            secs=0;
            temp_stop=0;
            update_tracker();
        }
        //if seconds > 0 then seconds is decremented
        else {
            if (stop== true){
                minutes.value = 0;
                seconds.value = 0;
                secs=0;
                mins=0;
            }
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}

function getminutes() {
    //minutes is seconds divided by 60, rounded down
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    //take minutes remaining (as seconds) away 
    //from total seconds remaining
    return secs - Math.round(mins * 60);
}

function appendRow(text,ptext) {
    var tbl = document.getElementById('my-table'); // table reference
    if(ptext[0]!=text[0]||ptext[3]!=text[3] || ptext[2]!=text[2]){
        var row = tbl.insertRow(tbl.rows.length),      // append table row
        i;
        // insert table cells to the new row
        for (i = 0; i < tbl.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), text[i], 'row');
        }
        CSVupdate(text);
    }
    else{Fcount=ptext[2];}
}
function createCell(cell, text, style) {
    var div = document.createElement('div'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell
}
function update_tracker(){
    var ptext=[today,Fcount,Fwork,Fbreak];
    if(breaktime==false){
        Fcount+=1;
        console.log(Fcount+"=fcount");
        Fwork+=Math.round((temp_min-temp_stop)/60);
        temp_min=0;
        temp_stop=0;
    }
    else{Fbreak+=Math.round((temp_min-temp_stop)/60);
        temp_min=0;
        temp_stop=0;
    }
    appendRow([today,Fcount,Fwork,Fbreak],ptext);
    Ecount.innerHTML=`<b>${Fcount}</b>`;
    Emin.innerHTML=`<b>${Fwork}</b>`;
    Ebmin.innerHTML=`<b>${Fbreak}</b>`;
}
