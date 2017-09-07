"use strict";
var app = angular.module('SLVIApp');

app.controller('BomCtrl',
  [
    '$scope',
    '$uibModalInstance',
    '$http',
    '$timeout',
    'Digits',
    function ($scope, $uibModalInstance, $http, $timeout, Digits) {

      let _this = this;

      _this.pumpDigit = Digits.pump;
      _this.pressureDigit = Digits.pressure;
      _this.hpDigit = Digits.hp;
      _this.topworksDigit = Digits.topworks;
      _this.accumulatorDigit = Digits.accumulator;
      _this.certsDigit = Digits.certs;
      _this.voltageDigit = Digits.voltage;
      _this.efficiencyDigit = Digits.efficiency;
      _this.starterDigit = Digits.starter;
      _this.panelDigit = Digits.panel;
      _this.doorDigit = Digits.door;
      _this.coverDigit = Digits.cover;
      _this.coolingDigit = Digits.cooling;
      _this.transducerDigit = Digits.transducer;
      _this.propVlvDigit = Digits.propVlv;
      _this.plcDigit = Digits.plc;
      _this.oilDigit = Digits.oil;
      _this.pfDigit = Digits.pf;

      _this.digitArray = [_this.pumpDigit, _this.pressureDigit, _this.hpDigit, _this.topworksDigit, _this.accumulatorDigit,
        _this.certsDigit, _this.voltageDigit, _this.efficiencyDigit, _this.starterDigit, _this.panelDigit, _this.doorDigit,
        _this.coverDigit, _this.coolingDigit, _this.transducerDigit, _this.propVlvDigit, _this.plcDigit, _this.oilDigit, _this.pfDigit];

      _this.init = function() {
        _this.items = [];
        _this.ccns = [];
        _this.qtys = [];
        _this.descriptions = [];
        _this.pteDisabled = true;
      };

      /**
       * Generate Bill of Materials
       */
      _this.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };

      _this.genBOM = function () {

        _this.init();

        $http.post('/main/generate', {digits: Digits}, {format: 'js'})
          .then(function(response) {

            if (response.status == 200) {

              let data = response.data;
              let itemCount = 0;
              let bomData = [];

              //add header manualy and digits values

              bomData.push({
                item: 'Configuration',
                ccn: '',
                qty: '',
                description: _this.digitArray.join('')
              });

              bomData.push({
                item: 'Item',
                ccn: 'CCN',
                qty: 'Quantity',
                description: 'Description'
              });

              for (let i=0; i<data.length; i++) {
                itemCount = itemCount + parseInt(data[i].ItemNumber);

                _this.ccns.push(data[i].ItemNumber);
                _this.descriptions.push(data[i].Description);
                _this.qtys.push(data[i].Quantity);
                _this.items.push(data[i].Item);
                
                bomData.push({
                  item: data[i].Item,
                  ccn: data[i].ItemNumber,
                  qty: data[i].Quantity,
                  description: data[i].Description
                });
              }
              
              _this.bomData = bomData;

              // _this.pteDisabled = false;
              if (itemCount == 171) {
                _this.pteDisabled = false;
              }
              else {
                $timeout(function () {
                  alert("PUMP AS CURRENTLY CONFIGURED DOES NOT HAVE A BOM STRUCTURED, PLEASE CONTACT KMT FOR INFORMATION REGARDING THIS OPTION");
                  _this.pteDisabled = true;
                  $uibModalInstance.dismiss('cancel');
                }, 2000);
                
              }
            }
          }, function(err) {
            
          });

       
      };


      _this.init(); // initialize option
    }
  ]
);
