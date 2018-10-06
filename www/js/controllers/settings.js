'use strict'

app.controller('settingCtrl', function(Auth, $ionicPopup){
	var sett = this;

	sett.maxAge = window.localStorage.getItem('maxAge') || 25;
	sett.men = JSON.parse(window.localStorage.getItem('men'));
	sett.men = sett.men === null ? false : sett.men;
	sett.women = JSON.parse(window.localStorage.getItem('women'));
	sett.women = sett.women === null ? false : sett.women;

	sett.changeMaxAge = function(){
		window.localStorage.setItem('maxAge', sett.maxAge);
	};

	sett.selectMen = function() {
		window.localStorage.setItem('men', sett.men);
	};

	sett.selectWomen = function() {
		window.localStorage.setItem('women', sett.women);
	};

	sett.logout = function() {
		$ionicPopup.confirm({
			title: 'Déconnexion',
			template: 'Êtes vous sur de vouloir vous déconnecter ?'
		}).then(function(res){
			if(res){
				Auth.logout();
			}
		});
	};
});