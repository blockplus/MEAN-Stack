/*eslint */
/*global angular */
( function() {
	"use strict";

	angular.module("com.mondayreplay.libs.CheckinUtils", [])
		.factory("CheckinUtils", function () {
			var utils = {};

            utils.SportTypes = {};
            utils.SportTypes._SNOWBOARD = "SNOWBOARD";
            utils.SportTypes._KITESURF = "KITESURF";
            utils.SportTypes._SURF = "SURF";
            utils.SportTypes._WINDSURF = "WINDSURF";
            utils.SportTypes._KAYAK = "KAYAK";
            utils.SportTypes._SKI = "SKI";
            utils.SportTypes._MTB = "MTB";
            utils.SportTypes._RAFTING = "RAFTING";
            utils.SportTypes._HIKE = "HIKE";

            utils.getSportIcon = function(sport) {
                if (utils.SportTypes._SNOWBOARD == sport) {
                    return "ic_sport_snowboard";

                } else if (utils.SportTypes._KITESURF == sport) {
                    return "ic_sport_kitesurf";

                } else if (utils.SportTypes._SURF == sport) {
                    return "ic_sport_surf";

                } else if (utils.SportTypes._WINDSURF == sport) {
                    return "ic_sport_windsurf";

                } else if (utils.SportTypes._KAYAK == sport) {
                    return "ic_sport_kayak";

                } else if (utils.SportTypes._SKI == sport) {
                    return "ic_sport_ski";

                } else if (utils.SportTypes._MTB == sport) {
                    return "ic_sport_mtb";

                } else if (utils.SportTypes._RAFTING == sport) {
                    return "ic_sport_rafting";

                } else if (utils.SportTypes._HIKE == sport) {
                    return "ic_sport_hike";

                } else {
                    return 0;
                }
            };

            utils.getSportConditionIcon = function(sport, condition) {
                if (utils.SportTypes._KAYAK == sport
                    || utils.SportTypes._SURF == sport
                    || utils.SportTypes._RAFTING == sport) {
                    switch (condition) {
                        case 0:
                            return "ic_waves_0_checked";
                        case 1:
                            return "ic_waves_1_checked";
                        case 2:
                            return "ic_waves_2_checked";
                        case 3:
                            return "ic_waves_3_checked";
                        default:
                            return "ic_waves_0_checked";
                    }

                } else if (utils.SportTypes._SNOWBOARD == sport
                    || utils.SportTypes._SKI == sport) {
                    switch (condition) {
                        case 0:
                            return "ic_snow_0_checked";
                        case 1:
                            return "ic_snow_1_checked";
                        case 2:
                            return "ic_snow_2_checked";
                        case 3:
                            return "ic_snow_3_checked";
                        default:
                            return "ic_snow_0_checked";
                    }

                } else if (utils.SportTypes._WINDSURF == sport
                    || utils.SportTypes._KITESURF == sport) {
                    switch (condition) {
                        case 0:
                            return "ic_wind_0_checked";
                        case 1:
                            return "ic_wind_1_checked";
                        case 2:
                            return "ic_wind_2_checked";
                        case 3:
                            return "ic_wind_3_checked";
                        default:
                            return "ic_wind_0_checked";
                    }

                } else if (utils.SportTypes._HIKE == sport
                    || utils.SportTypes._MTB == sport) {
                    switch (condition) {
                        case 0:
                            return "ic_weather_0_checked";
                        case 1:
                            return "ic_weather_1_checked";
                        case 2:
                            return "ic_weather_2_checked";
                        case 3:
                            return "ic_weather_3_checked";
                        default:
                            return "ic_weather_0_checked";
                    }

                } else {
                    return 0;
                }
            };

            return utils;
        }
	);
} )();
