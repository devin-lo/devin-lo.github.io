function luiCalc() {
    var a = document.getElementById("inputNum").value;
    var probNum = parseInt(a);
	
	if (a >= 0 && a <= 2147481599) { // -2147483648 but i'm having trouble with negative numbers rn OOPS
		var rem = probNum % 4096;
		var luiMod = 0;
		if (rem > 2047 && rem < 4096) {
			luiMod++;
		}
		else if (rem < -2048 && rem > -4096) {
			luiMod--;
		}
		var luiAmt = Math.floor(probNum / 4096) + luiMod;
		var addiAmt = rem;
		if (addiAmt < -2048) {
			addiAmt += 4096;
		}

		document.getElementById("lui").innerHTML = luiAmt;
		document.getElementById("addi").innerHTML = addiAmt;
	}
	else {
		document.getElementById("lui").innerHTML = "";
		document.getElementById("addi").innerHTML = "";
	}
}