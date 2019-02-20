app.controller("chatController", function($rootScope, $scope, socket){
	$scope.link = {
		type:1,
		message:""
	}
	$scope.showFullscreen = {};
	if(Object.keys($rootScope.chatMessages).length <= 0){
		socket.emit("messages:loadOld", new Date().getTime());
	}

	$scope.loadOldMessages = function(){
		//socket.emit('messages:loadOld', $rootScope.chatMessages[Object.keys($rootScope.chatMessages)[0]].time);
		socket.emit('messages:loadOld', $rootScope.chatMessages[$rootScope.chatMessages.length -1 ].time);
	}
	$scope.sendMessage = function(link) {
		socket.emit('messages:add', {user:$rootScope.activeUser, add: link});
		$scope.link.message = "";
		$scope.link.type = "1";
	};
	$scope.openFullscreen = function(message){
		if($scope.showFullscreen[message.id] == (undefined || false)){
			$scope.showFullscreen[message.id] = true;
		}else{
			$scope.showFullscreen[message.id] = false;
		}
	}
});