/*window.onload = function(){
var oChooseBtn = document.getElementById('chooseBtn');

oChooseBtn.onclick = chooseEvent;
}

var chooseEvent = function(){
var aCheckbox = document.getElementById('infoItem').getElementsByTagName('input');
var oFormpart = document.getElementById('formPart');
var oSubmitBtn = document.getElementById('submitBtn');

if (aCheckbox[0].checked) {
	oFormpart.innerHTML = arrItem[0];
	oFormpart.innerHTML += '<br/>';
	oFormpart.innerHTML +=arrItem[1];
};

formPart.style.display = 'block';
oSubmitBtn.style.display = 'inline-block';
}

var arrItem = ['<input></input>','<input></input>'];*/

//封装绑定事件函数
var addEventHandler = function(obj,sEventType,fnHandler){
	if (obj.addEventListener) {
		obj.addEventListener(sEventType,fnHandler,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+sEventType,fnHandler);
	}else{
		obj['on'+sEventType] = fnHandler;
	}
}


//所有验证规则
var check = (function(str){
	
	//保存提示用户的信息
	var userHints = ['不能为空哟','名字只能是中文，英文或数字哟','密码只能是数字和英文喂','密码不一致哟','格式错啦','太短啦','太长啦','It is ok'];

	//验证规则
	return{
		//验证名字的规则
		checkName:function(str){
			var count = 0;  //用于计算名字长度
			
			if(str == '') return userHints[0];
			if(/[^0-9a-zA-Z\u4e00-\u9fa5]/i.test(str)) return userHints[1];    //名字只能是中英文和数字
			else{
				for(var i=0;i<str.length;i++){
					if (/[0-9a-zA-Z]/.test(str)) count++;
					else{
						count = count+2;
					}
				}

				if (count < 4) return userHints[5];
				if(count > 12) return userHints[6];
			}
			console.log('haha');
			return userHints[7];
		},
	
		checkPw:function(str){
			var count = 0;  //用于计算名字长度
			
			if(str == '') return userHints[0];
			if(/[^0-9a-zA-Z]/i.test(str)) return userHints[1];    //密码只能是英文和数字
			else{
				for(var i=0;i<str.length;i++){
					if (/[0-9a-zA-Z]/.test(str)) count++;
				}

				if (count < 4) return userHints[5];
				if(count > 12) return userHints[6];
			}
			return userHints[7];
		},


		checkEmail:function(str){
			if(str == "") return userHints[0];
			else if(/^[\w]+@([a-z0-9]+\.)+[a-z0-9]{2,4}$/i.test(str)) return userHints[7];
			else return userHints[4];
		},

		checkPhone:function(str){
			if (str == "") return userHints[0];
			else if (/^[\d]{11}$/.test(str)) return userHints[7]; 
			else return userHints[4];
		}
	}

})();


//构造函数定义对象
function FormList(name,type,func,rules,success){
	this.label = name;
	this.type = type;
	this.validator = func;
	this.rules = rules;
	this.success = success;
}

//通过构造函数实例化对象
var nameInput = new FormList("name","text",check.checkName,"可以输入中,英文和数字，长度为4~12字符","名称合适");
var pwInput = new FormList("password","password",check.checkPw,"可以输入数字和字母，长度为6-12字符","密码合适");
var againInput = new FormList("again",'password',check.checkAgain,"再次确认密码","密码正确");
var emailInput = new FormList("email",'text',check.checkEmail,"需要输入正确的邮件格式","邮件正确");
var phoneInput = new FormList("phone","text",check.checkPhone,"输入正确的号码格式","号码正确");

//保存所有新建的对象
var infoArr ={
	0:[nameInput],
	1:[pwInput,againInput],
	2:[emailInput],
	3:[phoneInput]
};

function toString(obj){
	return "<tr><td><span>"+obj.label+":"+"</span></td><td><input type=\""+obj.type+"\" id=\"" + obj.label + "\"  placeholder=\""+obj.rules+"\" ></input></td></tr>";
}

window.onload= function(){
	var oChooseBtn = document.getElementById('chooseBtn');
	
	addEventHandler(oChooseBtn,'click',chooseEvent);
}


var chooseEvent = function(){
		var aInput = document.getElementById('infoItem').getElementsByTagName('input');
		var oForm = document.getElementById('form');
		var oSubmitBtn = document.getElementById('submitBtn');
		var oStyle2 = document.getElementById('style2');

		oForm.innerHTML = "";
		

		for(var i=0;i<aInput.length;i++){
			if (aInput[i].checked) {
				for(var j=0;j<infoArr[i].length;j++){
					oForm.innerHTML +=  toString(infoArr[i][j]);
				}
				oSubmitBtn.style.display = 'inline-block';
			}

		}

		if (oStyle2.checked) {
			oForm.innerHTML=oForm.innerHTML.replace(/<input/g,"<input style='width:380px;height:40px;'");
		};

		oForm.innerHTML +="<tr><td></td><td><span id=\"warn\" style=\"margin-left:-290px;\"></span></tr>";

		var oName = document.getElementById('name');
		var oPw = document.getElementById('password');
		var oPwAgain = document.getElementById('again');
		var oEmail = document.getElementById('email');
		var oPhone = document.getElementById('phone');
		var oWarn = document.getElementById('warn');

		oName&&addEventHandler(oName,'blur',function(){	
			oWarn.innerHTML = check.checkName(oName.value);
		});

		oName&&addEventHandler(oName,'focus',function(){	
			oWarn.innerHTML = "";
		});

		oPw&&addEventHandler(oPw,'focus',function(){	
			oWarn.innerHTML = "";
		});

		oPw&&addEventHandler(oPw,'blur',function(){	
			oWarn.innerHTML = check.checkPw(oPw.value);
		});

		oPwAgain&&addEventHandler(oPwAgain,'focus',function(){
			oWarn.innerHTML = "";
		});

		oPwAgain&&addEventHandler(oPwAgain,'blur',function(){
			if (oPwAgain.value == oPw.value) {
				oWarn.innerHTML = 'It is ok';
			}else{
				oWarn.innerHTML = 'wrong password';
			}
		});

		oEmail&&addEventHandler(oEmail,'focus',function(){
			oWarn.innerHTML = "";
		});

		oEmail&&addEventHandler(oEmail,'blur',function(){
			oWarn.innerHTML = check.checkEmail(oEmail.value);
		});
		
		oPhone&&addEventHandler(oPhone,'focus',function(){
			oWarn.innerHTML = "";
		});

		oPhone&&addEventHandler(oPhone,'blur',function(){
			oWarn.innerHTML = check.checkPhone(oPhone.value);
		});

		oSubmitBtn&&addEventHandler(oSubmitBtn,'click',function(){
			if (oWarn.innerHTML == "It is ok") alert('提交成功');
			else alert("信息填写有误");
		});

}


