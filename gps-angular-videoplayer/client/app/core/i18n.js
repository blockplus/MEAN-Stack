(function () {

    angular.module('app.i18n', ['pascalprecht.translate'])
        .config(['$translateProvider', i18nConfig])
        .controller('LangCtrl', ['$scope', '$translate', LangCtrl]);

    // Note: Used on Header, Sidebar, Footer, Dashboard
    // English:            EN-US

    // Not used:
    // Italian:            Italiano IT-IT
    // Spanish:            Español ES-ES
    // Chinese:            简体中文 ZH-CN
    // Chinese:            繁体中文 ZH-TW
    // French:             français FR-FR
    // Portugal:         Portugal PT-BR
    // Russian:            Русский язык RU-RU
    // German:             Deutsch DE-DE
    // Japanese:         日本語 JA-JP
    // Korean:             한국어 KO-KR


    function i18nConfig($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escape');

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
    }

    function LangCtrl($scope, $translate) {
        $scope.lang = 'English';
        $scope.setLang = setLang;
        $scope.getFlag = getFlag;


        function setLang (lang) {
            switch (lang) {
                case 'English':
                    $translate.use('en');
                    break;
//                case 'Italian':
//                    $translate.use('it');
//                    break;
            }
            return $scope.lang = lang;
        };

        function getFlag() {
            var lang;
            lang = $scope.lang;
            switch (lang) {
                case 'English':
                    return 'flags-american';
                    break;
                case 'Italian':
                    return 'flags-italy';
                    break;
            }
        };

    }

})(); 
