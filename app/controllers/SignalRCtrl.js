angular.module("app")    
    .constant("baseurl", "#")
    .controller("SignalRCtrl", ['$scope', '$http', '$rootScope','baseurl',
	function ($scope, $http, $rootScope,  baseurl) {
	
		var m = "";

		$.connection.hub.url = '//localhost:57004/signalr';
		//$.connection.hub.logging = true;					   
		connection = $.connection.signalHub;
		connection.client.broadMessage = function (data) {	    				
           	 $rootScope.$apply(function () {                    
           	 		 m += data;
                     $scope.message = m;
                });           
		};
 		
		$.connection.hub.start().done(function () {		         
			connection.server.hello();
		}).fail(function (failreason) {
			console.log(failreason);
		});

	}
]);

