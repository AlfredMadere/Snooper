

function rightNow(){
	var now = new Date();
	var dd = now.getDate();
	var mm = now.getMonth()+1; 
	var yyyy = now.getFullYear();
	var time = now.getTime();

	if(dd<10) 
	{
	    dd='0'+dd;
	} 

	if(mm<10) 
	{
	    mm='0'+mm;
	} 

	now= mm+'-'+dd+'-'+yyyy+'-'+time;
	return now;
}

module.exports = rightNow;