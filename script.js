jQuery(document).ready(function($){

var page={
	answer:[],
	score:{attempt:null,success:null,wrong:null},
	typetest:[],
	value:[],
	init: function(){

		$('#set-type').change(function(){
			page.typetest=[];
			$("#set-type :checked").each(function(){
				page.typetest.push($(this).val());
			});
			
		});
		$("form#set-type").unbind('submit').on('submit', function (e) {
		e.preventDefault();
		page.score={attempt:null,success:null,wrong:null};
		page.varnings('clean');
		
		if (page.typetest.length>0){
			$("#page-tabs li:eq(1) a").tab('show');	
			page.exam();
			$("form#math-form").unbind('submit').on('submit', function(e){
                        	e.preventDefault();
				var result=page.checkvals($("input#result").val());
			if (typeof result=='number'){
				if(result == page.value[2]){
                                	page.score.attempt+=1;
					page.score.success+=1;
					page.varnings('ok','правильно');
                        	}else{
                                        page.score.attempt+=1;
					page.score.wrong+=1;
					page.varnings('wrong','правильный ответ ' +page.value[2]+ '. попробуйте еще раз, все получится');
				}                     
			page.exam();
                	}
		});

				
		}else{
			page.varnings('wrong','Пожалуйста выбирите тест');
		}
		});
	},
	exam:function(){
		//console.log('starting new calculation');
		if(page.typetest.length>0){
			var select=page.typetest.length-1;
			select=page.random(0, select);
			select=page.typetest[select]
			var sign=null;
			switch (select){
				case 'add':
					page.getadd();
					sign='+';
					break
				case 'subtraction':
					page.getsub();
					sign='-';
					break
				case 'mult':
					page.getmult();
					sign='*';
					break
				case 'division':
					page.getdivis();
					sign=':';
					break
			}
			$("input#value1").val(page.value[0]);
                	$("input#value2").val(page.value[1]);
			$("p.sign").empty().append(sign);
			$("input#result").val('');
		}else{
                        $("input#value1").val('');
                        $("input#value2").val('');
			$("input#result").val('');
			var text='Выберите тип примеров: сложение, вычитание, умножение, деление';
                        page.varnings('wrong',text);
		}
	},
        checkvals:function(result){
		if (!result){
			var res=typeof result;
			page.varnings('wrong','Введите пожалуйста ответ от 1 до 100');
			return false;
		}else{
			result=parseInt(result);
			if(result<=100){
				return result;
			}else{
				page.varnings('wrong','Ответ может быть от 1 до 100');
				return false;
			}
		}
	},
	varnings:function(bell,msg){
                if(bell='ok' && msg!='undefined'){
			$("p#show-answer").removeClass('hidden').empty().append(msg);
		}else if(bell='wrong' && msg!='undefined'){
			$("p#show-answer").removeClass('hidden').empty().append(msg);
                }else if(bell='clean'){
			 $("p#show-answer").removeClass('hidden').empty();	
		}
      		if(page.score.attempt){
		$("p#show-score").removeClass('hidden').empty().append('Попыток: '+page.score.attempt+'. Верных ответов: '+page.score.success+'. Ошибок: '+page.score.wrong);
		}	
	},
	getadd:function(){
		var total=page.random(20,100);
		var first=page.random(10,total);
		if (total==first || second<2){
			total=page.random(20,100);
			first=page.random(10,total);
		}
		var second=total-first;
		page.value=[first,second,total];
	},
	getsub:function(){
		var first=page.random(20,100);
		var second=page.random(10,first);
		var total=first-second;
		if (first==second || total<2){
			first=page.random(20,100);
                        secod=page.random(10,first);
                        total=total-first;	
		}
		page.value=[first,second,total];
	},
	getmult:function(){
		var value=page.getablevals();
		var total=value[0];
		var length=value[1].length-1;
		var position=page.random(0, length);
		var second=value[1][position];
		var first=total / second;
		page.value=[first,second,total];
	},
	getdivis:function(){
		var value=page.getablevals();
		var first=value[0];
		var length=value[1].length-1;
		var position=page.random(0, length);
		var second=value[1][position];
		var total=first / second;
		page.value=[first,second,total];	
	},
	random:function(min,max){
		return Math.floor(Math.random() * (max-min + 1))+min;
	},
	getablevals:function(){
		var start=5;
                var x=null;
                var random=null;
                var able=[];
                while (start){
                        random=page.random(10,100);
                        for (i=2;i<10;i++){
                                x=random/i;
                                if (x-Math.floor(x)==0){
                                        able.push(i);
                                        able.push(x);
                                }
                        }
                        if (able.length!=0){
                                break;
                         }else { 

                        }
                        start--;
                }
		return new Array(random, able); 
	}
	}
	page.init();
});

