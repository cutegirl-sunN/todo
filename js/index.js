$(function(){
	//添加按钮
	var add=$(".add");
	//输入框
	var input=$(".date input");
	//生成内容部分
	var ul=$(".todolist");
	//创建数组
	var todos=[];
//	接触其实位置
	var pos;
	
	
	//完成、未完成切换
	
	ul.on("touchstart",'li',function(e){
		 pos = e.originalEvent.changedTouches[0].clientX;
	});

	ul.on("touchend",'li',function(e){
		var now = e.originalEvent.changedTouches[0].clientX;
		if(now-pos>50){				
			$(this).addClass("down");
			todos[$(this).index()].state=1;
			localStorage.todo=JSON.stringify(todos);
		}
		if(now-pos<-50){
			$(this).removeClass("down");
			todos[$(this).index()].state=0;
			localStorage.todo=JSON.stringify(todos);
		}
	})
	
	
	//添加数据
	
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state)?'done':'';
			$('<li class="'+c+'"><div class="line"><p></p><div class="b"></div><p class="p"></p></div><div class="content">'+todos[i].name+'</div><div class="list">×</div></li>').appendTo(ul);
		}
		
	}
	
	//添加内容
	
	add.on("touchend",function(){
		var v=$.trim(input.val())
		if(!v){
			return;
		}
		var todo={
			name:v,
			state:0
		}
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos)
		$('<li><div class="line"><p></p><div class="b"></div><p class="p"></p></div><div class="content">'+todo.name+'</div><div class="list">×</div></li>').appendTo(ul);
		input.val('').focus();		
	})
	
	ul.on("touchend",".list",function(e){
		var m=$(this).closest('li').index();
		ul.find('li').eq(m).remove();
		todos.splice(m,1);
		localStorage.todos=JSON.stringify(todos);
	})

	var divs=$('.footer div');
	divs.each(function(index){
		$(this).on('touchend',function(){
			var role=$(this).attr('data-role');
			divs.removeClass('active');
			divs.eq(index).addClass('active');
			ul.find('li').show()
			if(role=='finish'){
				ul.find('li:not(.done)').hide()
			}else if(role=='unfinish'){
				ul.find('li.done').hide();
			}
		})
	})


})

