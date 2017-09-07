"use strict";
var app = angular.module('SLVIApp');

app.controller('MainCtrl',
  [
    '$scope',
    '$uibModal',
    '$window',
    function ($scope, $uibModal, $window) {

      let _this = this;

      _this.inputMethod = 'pump'; // specifying the value through option click
      _this.inputMethodLbl = 'REVERSE CONFIG';

      _this.slviDisabled = false;
      _this.pressureDisabled = [false, false, false, false];
      _this.hpDisabled = [false, false, false, false, false, false, false, false];
      _this.topworksDisabled = [false, false, false];
      _this.accDisabled = [false, false, false, false, false, false];
      _this.certsDisabled = [false, false, false, false, false];
      _this.voltDisabled = [false, false, false, false, false, false];
      _this.effDisabled = [false, false];
      _this.starterDisabled = [false, false, false, false];
      _this.panelDisabled = [false, false, false];
      _this.doorsDisabled = [false, false];
      _this.topcoverDisabled = [false, false, false];
      _this.coolingDisabled = [false, false, false, false, false];
      _this.tranDisabled = [false, false];
      _this.propDisabled = [false, false];
      _this.plcDisabled = [false, false, false];
      _this.oilDisabled = [false, false];
      _this.pfDisabled = [false, false];

      _this.init = function() {

        _this.reset();

        _this.pumpOpt = 'sl-vi';
        _this.SLVIClick();

        _this.hpDisabled[0] = true;
        _this.hpDisabled[6] = true;
        _this.hpDisabled[7] = true;

        _this.topworksDisabled[2] = true;

        _this.accDisabled[0] = true;
        _this.accDisabled[4] = true;

        _this.certsDisabled[3] = true;

        _this.topcoverDisabled[2] = true;

        _this.plcDisabled[1] = true;
        _this.plcDisabled[2] = true;

        _this.pfDisabled[0] = true;

      };

      /**
       * Update InputMethod
       */
      _this.updateInputMethod = function(){

        if (_this.inputMethod === 'pump') {
          _this.inputMethod = 'reverse';
          _this.inputMethodLbl = 'CONFIG PUMP';

          _this.reset();

          var element = $window.document.getElementById('pressure-digit');
          if(element) {
            element.focus();
          }

          //clear all buttons


        }
        else {
          _this.inputMethod = 'pump';
          _this.inputMethodLbl = 'REVERSE CONFIG';
        }

      };

      /**
       * SLVI Click
       */
      _this.SLVIClick = function() {
        _this.pumpDigit = 6;
        _this.updateOptionForPump();

      };

      // update other options when pump is selected
      _this.updateOptionForPump = function() {
        if ('sl-vi' ===_this.pumpOpt) {
          _this.pressureDisabled[0] = false;
          _this.pressureDisabled[1] = false;
          _this.pressureDisabled[2] = false;
          _this.pressureDisabled[3] = false;

          //ctx.hpDisabled[0] = false;
          _this.hpDisabled[1] = false;
          _this.hpDisabled[2] = false;
          _this.hpDisabled[3] = false;
          _this.hpDisabled[4] = false;
          _this.hpDisabled[5] = false;
          //ctx.hpDisabled[6] = false;
          //ctx.hpDisabled[7] = false;

          _this.topworksDisabled[0] = false;
          _this.topworksDisabled[1] = false;
          //_this.topworksDisabled[2] = false;

          //_this.accDisabled[0] = false;
          _this.accDisabled[1] = false;
          _this.accDisabled[2] = false;
          _this.accDisabled[3] = false;
          // _this.accDisabled[4] = false;
          _this.accDisabled[5] = false;

          _this.certsDisabled[0] = false;
          _this.certsDisabled[1] = false;
          _this.certsDisabled[2] = false;
          //_this.certsDisabled[3] = false;
          _this.certsDisabled[4] = false;

          _this.voltDisabled[0] = false;
          _this.voltDisabled[1] = false;
          _this.voltDisabled[2] = false;
          _this.voltDisabled[3] = false;
          _this.voltDisabled[4] = false;
          _this.voltDisabled[5] = false;

          _this.effDisabled[0] = false;
          _this.effDisabled[1] = false;

          _this.starterDisabled[0] = false;
          _this.starterDisabled[1] = false;
          _this.starterDisabled[2] = false;
          _this.starterDisabled[3] = false;

          _this.panelDisabled[0] = false;
          _this.panelDisabled[1] = false;
          _this.panelDisabled[2] = false;

          _this.doorsDisabled[0] = false;
          _this.doorsDisabled[1] = false;

          _this.topcoverDisabled[0] = false;
          _this.topcoverDisabled[1] = false;
          //_this.topcoverDisabled[2] = false;

          _this.coolingDisabled[0] = false;
          _this.coolingDisabled[1] = false;
          _this.coolingDisabled[2] = false;
          _this.coolingDisabled[3] = false;
          _this.coolingDisabled[4] = false;

          _this.tranDisabled[0] = false;
          _this.tranDisabled[1] = false;

          _this.propDisabled[0] = false;
          _this.propDisabled[1] = false;

          _this.plcDisabled[0] = false;
          //_this.plcDisabled[1] = false;
          //_this.plcDisabled[2] = false;

          _this.oilDisabled[0] = false;
          _this.oilDisabled[1] = false;

          //_this.pfDisabled[0] = false;
          _this.pfDisabled[1] = false;

        }
      };

      // update other options when pressure is selected
      _this.updateOptionForPressure = function() {
        if (35 == _this.pressureOpt) {

          //ctx.hpDisabled[0] = true;
          _this.hpDisabled[1] = true;
          _this.hpDisabled[2] = true;
          _this.hpDisabled[3] = true;
          _this.hpDisabled[4] = true;
          _this.hpDisabled[5] = false;
          //ctx.hpDisabled[6] = true;
          //ctx.hpDisabled[7] = true;

          _this.accDisabled[5] = true;
          if (_this.accumulatorOpt == '1.6') {
            _this.accumulatorOpt = '';
          }

          if (_this.horsepowerOpt) {
            _this.horsepowerOpt = '200';
          }
        }
        else if (55 == _this.pressureOpt) {
          _this.hpDisabled[4] = true;
          if (60 == _this.horsepowerOpt) {
            _this.horsepowerOpt = '';
          }

          if (30 == _this.horsepowerOpt) {
            _this.accDisabled[2] = true;
            _this.accDisabled[3] = true;

            //if (2 == _this.accumulatorOpt || 3 == _this.accumulatorOpt) {
            //  _this.accumulatorOpt = 1;
            //}

            if (2 == _this.accumulatorOpt || 3 == _this.accumulatorOpt) {
              _this.accumulatorOpt = '';
            }
          }
        }
        else if (60 == _this.pressureOpt) {

          _this.hpDisabled[4] = true;
          if (60 == _this.horsepowerOpt) {
            _this.horsepowerOpt = '';
          }
          
          if (30 == _this.horsepowerOpt) {
            _this.accDisabled[1] = false;
            _this.accDisabled[2] = false;
          }

          if (40 == _this.horsepowerOpt) {
            _this.accDisabled[1] = false;
            _this.accDisabled[2] = false;
          }

          if (50 == _this.horsepowerOpt) {
            _this.accDisabled[1] = false;
            _this.accDisabled[2] = false;
          }
        }
        else if (90 == _this.pressureOpt) {
          _this.hpDisabled[1] = true;
          _this.hpDisabled[2] = true;
          _this.hpDisabled[3] = true;
          _this.hpDisabled[5] = true;
          _this.hpDisabled[4] = false;

          _this.accDisabled[1]= true;
          _this.accDisabled[2]= true;
          _this.accDisabled[3]= true;
          _this.accDisabled[5]= false;

          if (1 == _this.accumulatorOpt || 2 == _this.accumulatorOpt || 3 == _this.accumulatorOpt) {
            _this.accumulatorOpt = 1.6;
            _this.accumulatorDigit = 6;
          }

          _this.certsDisabled[0]= true;

          if ('dec' == _this.certsOpt) {
            _this.certsOpt = '';
            _this.certsDigit = '';
          }

          _this.starterDisabled[0]= true;

          if ('none' == _this.starterOpt) {
            _this.starterOpt = '';
            _this.starterDigit = '';
          }

          _this.tranDisabled[0]= false;
          _this.tranDisabled[1]= true;

          if ('no' == _this.transducerOpt) {
            _this.transducerOpt = '';
            _this.transducerDigit = '';
          }

          _this.propDisabled[0]= false;
          _this.propDisabled[1]= true;

          if ('no' == _this.propVlvOpt) {
            _this.propVlvOpt = '';
            _this.propVlvDigit = '';
          }

          _this.plcDisabled[3]= true;

          if ('none' == _this.plcOpt) {
            _this.plcOpt = '';
            _this.plcDigit = '';
          }

        }

        _this.checkNumber();
      };


      /**
       * Pressure Click
       */
      _this.pressureClick = function(value) {
        _this.pressureDigit = value;
        _this.updateOptionForPressure();

      };

      // update other options when pressure is selected
      _this.updateOptionForHp = function() {

        if (30 == _this.horsepowerOpt) {

          _this.pressureDisabled[3] = true;
          _this.accDisabled[3] = true;
          _this.accDisabled[5] = true;

          if (_this.accumulatorOpt == 3 || _this.accumulatorOpt == 1.6) {
            _this.accumulatorOpt = '';
            _this.accumulatorDigit = '';
          }

          _this.hpDisabled[4] = true;

          _this.coolingDisabled[0] = false;
          _this.coolingDisabled[1] = true;
          _this.coolingDisabled[2] = false;
          _this.coolingDisabled[3] = true;
          _this.coolingDisabled[4] = false;

          if (_this.coolingOpt == 'oil-air-internal' || _this.coolingOpt == 'dual-cooling-internal') {
            _this.coolingOpt = '';
            _this.coolingDigit = '';
          }

          if (_this.pressureOpt == 90) {
            _this.pressureOpt = 60;
            _this.pressureDigit = 6;
          }

          if (_this.pressureOpt == 55  && _this.horsepowerOpt == 30) {
            _this.accDisabled[2] = true;
            _this.accDisabled[3] = true;

            if (_this.accumulatorOpt == 2 || _this.accumulatorOpt == 3 ) {
              _this.accumulatorOpt = 1;
              _this.accumulatorDigit = 1;
            }
          }
        }
        else if (40 == _this.horsepowerOpt) {

          _this.pressureDisabled[3] = true;
          _this.accDisabled[3] = true;
          _this.accDisabled[5] = true;

          if (_this.accumulatorOpt == 3 || _this.accumulatorOpt == 1.6 ) {
            _this.accumulatorOpt = 1;
            _this.accumulatorDigit = 1;
          }

          _this.hpDisabled[4] = true;

          _this.coolingDisabled[0] = false;
          _this.coolingDisabled[1] = true;
          _this.coolingDisabled[2] = true;
          _this.coolingDisabled[3] = true;
          _this.coolingDisabled[4] = false;

          if (_this.coolingOpt == 'oil-air-internal' || _this.coolingOpt == 'dual-cooling-internal') {
            _this.coolingOpt = '';
            _this.coolingDigit = '';
          }

          if (_this.pressureOpt == 90) {
            _this.pressureOpt = 60;
            _this.pressureDigit = 6;
          }

          if (_this.pressureOpt == 55  && _this.horsepowerOpt == 30) {
            _this.accDisabled[2] = true;
            _this.accDisabled[3] = true;

            if (_this.accumulatorOpt == 2 || _this.accumulatorOpt == 3 ) {
              _this.accumulatorOpt = 1;
              _this.accumulatorDigit = 1;
            }
          }

        }
        else if (50 == _this.horsepowerOpt) {
          _this.pressureDisabled[3] = true;
          _this.accDisabled[3] = true;
          _this.accDisabled[5] = true;

          if (_this.accumulatorOpt == 3 || _this.accumulatorOpt == 1.6 ) {
            _this.accumulatorOpt = '';
            _this.accumulatorDigit = '';
          }

          _this.hpDisabled[4] = true;

          _this.coolingDisabled[0] = false;
          _this.coolingDisabled[1] = true;
          _this.coolingDisabled[2] = false;
          _this.coolingDisabled[3] = true;
          _this.coolingDisabled[4] = false;

          if (_this.coolingOpt == 'oil-air-internal' || _this.coolingOpt == 'dual-cooling-internal') {
            _this.coolingOpt = '';
            _this.coolingDigit = '';
          }

          if (_this.pressureOpt == 90) {
            _this.pressureOpt = 60;
            _this.pressureDigit = 6;
          }

          if (_this.pressureOpt == 55  && _this.horsepowerOpt == 30) {
            _this.accDisabled[2] = true;
            _this.accDisabled[3] = true;

            if (_this.accumulatorOpt == 2 || _this.accumulatorOpt == 3 ) {
              _this.accumulatorOpt = 1;
              _this.accumulatorDigit = 1;
            }
          }

        }
        else if (60 == _this.horsepowerOpt) {

          _this.coolingDisabled[0] = false;
          _this.coolingDisabled[1] = false;
          _this.coolingDisabled[2] = true;

          if (_this.coolingOpt == 'oil-air-external') {
            _this.coolingOpt = '';
            _this.coolingDigit = '';
          }

          _this.coolingDisabled[4] = false;
          _this.coolingDisabled[5] = false;

          if (_this.horsepowerOpt != 30 && _this.horsepowerOpt != 40 && _this.horsepowerOpt != 50 && _this.horsepowerOpt != 60 && _this.horsepowerOpt != 100) {
            _this.pressureDisabled[3] =false;
          }

        }
        else if (100 == _this.horsepowerOpt) {

          _this.pressureDisabled[3] = true;
          _this.accDisabled[1] = true;
          _this.accDisabled[5] = true;

          if (_this.accumulatorOpt == 1 || _this.accumulatorOpt == 1.6 ) {
            _this.accumulatorOpt = '';
            _this.accumulatorDigit = '';
          }

          _this.pressureDisabled[4] = true;
          _this.voltDisabled[0] = true;
          _this.voltDisabled[1] = true;

          if (_this.voltageOpt == '200-230' || _this.voltageOpt == '208-240' ) {
            _this.voltageOpt = '';
            _this.voltageDigit = '';
          }

          _this.starterDisabled[1] = true;

          if (_this.starterOpt == 'direct') {
            _this.starterDigit = '';
            _this.starterOpt = '';
          }

          _this.coolingDisabled[0] = false;
          _this.coolingDisabled[1] = false;
          _this.coolingDisabled[2] = true;

          if (_this.coolingOpt == 'oil-air-external') {
            _this.coolingOpt = '';
            _this.coolingDigit = '';
          }

          _this.coolingDisabled[3] = false;
          _this.coolingDisabled[4] = false;
        }
        _this.checkNumber();
      };

      /**
       * hp click
       * @param value
       */
      _this.hpClick = function(value) {
        _this.hpDigit= value;
        _this.updateOptionForHp();
      };


      //update other options when topworks is selected
      _this.updateOptionForTopworks = function() {
        _this.checkNumber();
      };

      /**
       * topworks click
       * @param value
       */
      _this.topworksClick = function(value) {
        _this.topworksDigit = value;
        _this.updateOptionForTopworks();
      };

      //update other options when topworks is selected
      _this.updateOptionForAccumulator = function() {
        _this.checkNumber();
      };

      /**
       * Accumulator click
       * @param value
       */
      _this.accumulatorClick = function(value) {
        _this.accumulatorDigit = value;
        _this.updateOptionForAccumulator
      };

      _this.updateOptionForCert = function() {

        if ('dec' == _this.certsOpt) {
          _this.starterDisabled[0] = false;
          _this.starterDisabled[1] = true;
          _this.starterDisabled[2] = true;
          _this.starterDisabled[3] = true;

          if (_this.starterOpt == 'direct') {
            _this.starterOpt = '';
            _this.starterDigit = '';
          }

          _this.efficiencyOpt = 'ie3';
          _this.effDisabled[0] = false;
          _this.effDisabled[1] = true;

          _this.panelDisabled[0] = false;
          _this.panelDisabled[1] = false;
          _this.panelDisabled[2] = false;

          if (_this.pfOpt == 'yes') {
            _this.pfDigit = '';
            _this.pfOpt = '';
          }

          _this.pfDisabled[0] = true;
          _this.pfDisabled[1] = false;

        }
        else if ('csa' == _this.certsOpt) {
          _this.pressureDisabled[1] = true;
          
          if (_this.pressureOpt == 55) {
            _this.pressureOpt = '';
            _this.pressureDigit = '';
          }

          _this.efficiencyOpt = 'nema';
          
          _this.effDisabled[1] = false;
          _this.effDisabled[0] = true;
          _this.voltDisabled[1] = true;
          _this.voltDisabled[2] = true;

          if (_this.voltageOpt == '208-240' || _this.voltageOpt == '380-415-60') {
            _this.voltageOpt = '';
            _this.voltageDigit = '';
          }

          _this.starterDisabled[0] = true;
          _this.starterDisabled[1] = false;
          _this.starterDisabled[2] = false;
          _this.starterDisabled[3] = false;

          _this.panelDisabled[0] = true;

          if (_this.panelOpt == 'without') {
            _this.panelOpt = '';
            _this.panelDigit = '';
          }

          _this.panelDisabled[1] = false;
          _this.panelDisabled[2] = true;

          if (_this.panelOpt == 'terminal') {
            _this.panelOpt = '';
            _this.panelDigit = '';
          }

          _this.starterDisabled[3] = false;

          _this.doorsDisabled[0] = true;

          if (_this.doorOpt == 'yes') {
            _this.doorOpt = '';
            _this.doorDigit = '';
          }

          _this.topcoverDisabled[0] = true;

          if (_this.topcoverOpt == 'yes') {
            _this.topcoverOpt = '';
            _this.coverDigit = '';
          }

          _this.plcDisabled[0] = false;
          _this.plcDisabled[3] = true;

          if (_this.plcOpt == 'none') {
            _this.plcOpt = '';
            _this.plcDigit = '';
          }

          _this.pfOpt = '';
          _this.pfDisabled[1] = false;


        }
        else if ('ce' == _this.certsOpt) {
          _this.effDisabled[0] = false;
          _this.effDisabled[1] = true;

          _this.efficiencyOpt = 'ie3';

          _this.starterDisabled[0] =  true;
          _this.starterDisabled[1] =  true;
          _this.starterDisabled[2] =  false;
          _this.starterDisabled[3] =  false;

          if (_this.starterOpt == 'none' || _this.starterOpt == 'direct') {
            _this.starterOpt = '';
            _this.starterDigit = '';
          }

          _this.panelDisabled[0] =  true;
          _this.panelDisabled[1] =  false;
          _this.panelDisabled[2] =  true;

          if (_this.panelOpt == 'without' || _this.panelOpt == 'terminal') {
            _this.panelOpt = '';
            _this.panelDigit = '';
          }

          _this.doorsDisabled[0] =  true;
          _this.doorsDisabled[1] =  false;

          if (_this.doorOpt == 'no') {
            _this.doorOpt = '';
            _this.doorDigit = '';
          }

          _this.topcoverDisabled[0] =  true;
          _this.topcoverDisabled[1] =  false;

          if (_this.topcoverOpt == 'no') {
            _this.topcoverOpt = '';
          }

          _this.plcDisabled[3] =  true;

          if (_this.plcOpt == 'none') {
            _this.plcOpt = '';
            _this.plcDigt = '';
          }

          _this.pfOpt = '';
          _this.pfDisabled[1] = false;
          
        }
        else if ('usda' == _this.certsOpt) {
          //no code
        }
        else if ('none' == _this.certsOpt) {

          if (_this.horsepowerOpt != 125) {
            _this.voltDisabled[0] = false;
            _this.voltDisabled[1] = false;
          }

          _this.voltDisabled[2] = false;
          _this.voltDisabled[3] = false;
          _this.voltDisabled[4] = false;
          _this.voltDisabled[5] = false;

          if (_this.horsepowerOpt != 90) {
            _this.panelDisabled[0] = false;
          }

          _this.panelDisabled[1] = false;
          _this.panelDisabled[2] = false;

          _this.effDisabled[0] = false;
          _this.effDisabled[1] = false;

          if (_this.efficiencyOpt == 'ie3') {
            _this.voltDisabled[0] = false;
            _this.voltDisabled[1] = true;
            _this.voltDisabled[2] = true;
            _this.voltDisabled[3] = false;
            _this.voltDisabled[4] = true;
            _this.voltDisabled[5] = true;
          }

          _this.starterDisabled[0] = false;
          _this.starterDisabled[1] = false;
          _this.starterDisabled[2] = false;
          _this.starterDisabled[3] = false;

          _this.doorsDisabled[0] = false;

          _this.topcoverDisabled[0] = false;

          _this.plcDisabled[3] = false;

          if (_this.pfOpt == 'yes' || _this.pfOpt == 'no') {
            _this.pfOpt = '';
            _this.pfDigit = '';
          }

          _this.pfDisabled[1] = false;
          
        }
        _this.checkNumber();
      };

      /**
       * Certs Click
       * @param value
       */
      _this.certsClick = function(value) {
        _this.certsDigit = value;
        _this.updateOptionForCert();
      };

      /**
       * Voltage Click
       * @param value
       */
      _this.voltageClick = function(value) {
        _this.voltageDigit = value;
      };

      /**
       * update other options for efficiency
       */
      _this.updateOptionForEff = function() {

        if ('ie3' == _this.efficiencyOpt) {
          _this.voltDisabled[0] = false;
          _this.voltDisabled[1] = true;
          _this.voltDisabled[2] = true;
          _this.voltDisabled[3] = false;
          _this.voltDisabled[4] = true;
          _this.voltDisabled[5] = true;

          if (_this.inputMethod == 'pump') {

            if ('208-240'  == _this.voltageOpt) {
              _this.voltageOpt = '380-415-50';
              _this.voltageDigit = 4;
            }

            if ('380-415-60'  == _this.voltageOpt || '440-480'  == _this.voltageOpt || '575-600'  == _this.voltageOpt) {
              _this.voltageOpt = '200-230';
              _this.voltageDigit = 1;
            }

          }
        }
        else if ('nema' == _this.efficiencyOpt) {

          _this.voltDisabled[0] = true;
          _this.voltDisabled[1] = false;
          _this.voltDisabled[2] = false;
          _this.voltDisabled[3] = true;
          _this.voltDisabled[4] = false;
          _this.voltDisabled[5] = false;

          if (_this.inputMethod == 'pump') {

            if ('200-230'  == _this.voltageOpt) {
              _this.voltageOpt = '208-240';
              _this.voltageDigit = 2;
            }

            if ('380-415-60'  == _this.voltageOpt ) {
              _this.voltageOpt = '380-415-60';
              _this.voltageDigit = 3;
            }

          }

        }
        _this.checkNumber();
      };

      /**
       * Efficiency Click
       * @param value
       */
      _this.efficiencyClick = function(value) {
        _this.efficiencyDigit = value;
        _this.updateOptionForEff();
      };

      /**
       * Update Option For Start
       */
      _this.updateOptionForStarter = function() {

        if ('none' == _this.starterOpt) {
          _this.panelDisabled[0] = false;
          _this.panelDisabled[2] = false;

          _this.plcDisabled[0] = true;
          _this.plcDisabled[3] = false;

          if ('siemens' == _this.plcOpt) {
            _this.plcOpt = '';
          }

        }
        else if ('direct' == _this.starterOpt) {
          if ('without' == _this.panelOpt || 'terminal' == _this.panelOpt) {
            _this.panelOpt = '';
            _this.panelDigit = '';
          }

          _this.panelDisabled[1] = false;
          _this.panelDisabled[0] = true;
          _this.panelDisabled[2] = true;
        }
        else if ('wye' == _this.starterOpt) {
          if ('without' == _this.panelOpt || 'terminal' == _this.panelOpt) {
            _this.panelOpt = '';
            _this.panelDigit = '';
          }

          _this.panelDisabled[1] = false;
          _this.panelDisabled[0] = true;
          _this.panelDisabled[2] = true;
        }
        else if ('soft' == _this.starterOpt) {
          if ('without' == _this.panelOpt || 'terminal' == _this.panelOpt) {
            _this.panelOpt = '';
            _this.panelDigit = '';
          }

          _this.panelDisabled[1] = false;
          _this.panelDisabled[0] = true;
          _this.panelDisabled[2] = true;

        }

        _this.checkNumber();
      };

      /**
       * Starter Digit
       * @param value
       */
      _this.starterClick = function(value) {
        _this.starterDigit = value;

        _this.updateOptionForStarter();
      };

     
      /**
       * Electric Enclosure Click
       */
      _this.electricClick = function(value) {
        _this.panelDigit = value;
      };

      /**
       * Door Click
       */
      _this.doorClick = function(value) {
        _this.doorDigit = value;
      };

      /**
       * Cover Digit Click
       * @param value
       */
      _this.coverClick = function(value) {
        _this.coverDigit = value;
      };


      /**
       * Cooling Click
       * @param value
       */
      _this.coolingClick = function(value) {
        _this.coolingDigit = value;
      };

      /**
       * Transducer Click
       * @param value
       */
      _this.transducerClick = function(value) {
        _this.transducerDigit = value;
      };

      /**
       * Prop Vlv
       * @param value
       */
      _this.propVlvClick = function(value) {
        _this.propVlvDigit = value;
      };

      /**
       * PLC click
       * @param value
       */
      _this.plcClick = function(value) {
        _this.plcDigit = value;
      };

      /**
       * oil Digit
       * @param value
       */
      _this.oilClick = function(value) {
        _this.oilDigit = value;
      };


      /**
       * pf Digit
       * @param value
       */
      _this.pfClick = function(value) {
        _this.pfDigit = value;
      };


      /**
       * Reverse selection on pump digit text
       */
      _this.onPumpDigitChanged = function() {
        if ('reverse' == _this.inputMethod && '6' == _this.pumpDigit ){
          _this.pumpOpt = 'sl-vi';
        }
        _this.updateOptionForPump();
      };


      /**
       * Reverse selection on pressure digit text
       */
      _this.onPressureDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {

          var element = $window.document.getElementById('hp-digit');

          if ('3' == _this.pressureDigit  && !_this.pressureDisabled[0] ) {
            _this.pressureOpt = '35';
            element.focus();
          }
          else if ('5' == _this.pressureDigit  && !_this.pressureDisabled[1]) {
            _this.pressureOpt = '55';
            element.focus();
          }
          else if ('6' == _this.pressureDigit  && !_this.pressureDisabled[2] ) {
            _this.pressureOpt = '60';
            element.focus();
          }
          else if ('9' == _this.pressureDigit && !_this.pressureDisabled[3]) {
            _this.pressureOpt = '90';
            element.focus();
          }
          else {
            _this.pressureDigit = '';
            _this.pressureOpt = '';
          }

          _this.updateOptionForPressure();
        }
      };

      /**
       * Reverse selection on horsepower digit text
       */
      _this.onHorsepowerDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('topworks-digit');

          if ('C' == _this.hpDigit  && !_this.hpDisabled[5]) {
            _this.horsepowerOpt = '100';
            element.focus();
          }
          else if ('3' == _this.hpDigit && !_this.hpDisabled[1] ) {
            _this.horsepowerOpt = '30';
            element.focus();
          }
          else if ('4' == _this.hpDigit && !_this.hpDisabled[2]) {
            _this.horsepowerOpt = '40';
            element.focus();
          }
          else if ('5' == _this.hpDigit && !_this.hpDisabled[3]) {
            _this.horsepowerOpt = '50';
            element.focus();
          }
          else if ('6' == _this.hpDigit && !_this.hpDisabled[4]) {
            _this.horsepowerOpt = '60';
            element.focus();
          }
          else {
            _this.horsepowerOpt = '';
            _this.hpDigit = '';
          }

          _this.updateOptionForHp();
        }
      };

      /**
       * Reverse selection on horsepower digit text
       */
      _this.onTopworksDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('accumulator-digit');

          if ('S' == _this.topworksDigit && !_this.topworksDisabled[0]) {
            _this.topworksOpt = 'single';
            element.focus();
          }
          else if ('R' == _this.topworksDigit && !_this.topworksDisabled[0] ) {
            _this.topworksOpt = 'redundant';
            element.focus();
          }
          else {
            _this.topworksDigit = '';
            _this.topworksOpt = '';
          }

          _this.updateOptionForTopworks();
        }
      };

      /**
       * Reverse selection on horsepower digit text
       */
      _this.onAccumulatorDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('cert-digit');
          
          if ('1' == _this.accumulatorDigit && !_this.accDisabled[1] ) {
            _this.accumulatorOpt = '1';
            element.focus();
          }
          else if ('2' == _this.accumulatorDigit && !_this.accDisabled[2]) {
            _this.accumulatorOpt = '2';
            element.focus();
          }
          else if ('3' == _this.accumulatorDigit && !_this.accDisabled[3] ) {
            _this.accumulatorOpt = '3';
            element.focus();
          }
          else if ('6' == _this.accumulatorDigit && !_this.accDisabled[5]) {
            _this.accumulatorOpt = '1.6';
            element.focus();
          }
          else {
            _this.accumulatorDigit = '';
            _this.accumulatorOpt = '';
          }

          _this.updateOptionForAccumulator();
        }
      };

      /**
       * Reverse selection on certs digit text
       */
      _this.onCertsDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('voltage-digit');
          
          if ('D' == _this.certsDigit && !_this.certsDisabled[0] ) {
            _this.certsOpt = 'dec';
            element.focus();
          }
          else if ('C' == _this.certsDigit && !_this.certsDisabled[1]) {
            _this.certsOpt = 'csa';
            element.focus();
          }
          else if ('E' == _this.certsDigit && !_this.certsDisabled[2] ) {
            _this.certsOpt = 'ce';
            element.focus();
          }
          else if ('0' == _this.certsDigit && !_this.certsDisabled[3] ) {
            _this.certsOpt = 'none';
            element.focus();
          }
          else {
            _this.certsDigit = '';
            _this.certsOpt = '';
          }
          
          _this.updateOptionForCert();
        }
      };

      /**
       * Reverse selection on certs digit text
       */
      _this.onVoltageDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('efficiency-digit');

          if ('1' == _this.voltageDigit && !_this.voltDisabled[0]) {
            _this.voltageOpt = '200-230';
            element.focus();
          }
          else if ('2' == _this.voltageDigit && !_this.voltDisabled[1]) {
            _this.voltageOpt = '208-240';
            element.focus();
          }
          else if ('3' == _this.voltageDigit && !_this.voltDisabled[2]) {
            _this.voltageOpt = '380-415-60';
            element.focus();
          }
          else if ('4' == _this.voltageDigit && !_this.voltDisabled[3]) {
            _this.voltageOpt = '380-415-50';
            element.focus();
          }
          else if ('5' == _this.voltageDigit && !_this.voltDisabled[4]) {
            _this.voltageOpt = '440-480';
            element.focus();
          }
          else if ('6' == _this.voltageDigit && !_this.voltDisabled[5]) {
            _this.voltageOpt = '575-600';
            element.focus();
          }
          else {
            _this.voltageOpt = '';
            _this.voltageDigit = '';
          }
        }
      };

      /**
       * Reverse selection on efficiency digit text
       */
      _this.onEfficiencyDigitChanged = function(reverse) {
        if ('reverse' == 'reverse') {
          var element = $window.document.getElementById('starter-digit');

          if ('E' == _this.efficiencyDigit && !_this.effDisabled[0]) {
            _this.efficiencyOpt = 'ie3';
            element.focus();
          }
          else if ('N' == _this.efficiencyDigit && !_this.effDisabled[1]) {
            _this.efficiencyOpt = 'nema';
            element.focus();
          }
          else {
            _this.efficiencyDigit = '';
            _this.efficiencyOpt = '';
          }
          _this.updateOptionForEff();
        }
      };

      /**
       * Reverse selection on starter digit text
       */
      _this.onStarterDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('panel-digit');

          if ('0' == _this.starterDigit && !_this.starterDisabled[0]) {
            _this.starterOpt = 'none';
            element.focus();
          }
          else if ('D' == _this.starterDigit && !_this.starterDisabled[1]) {
            _this.starterOpt = 'direct';
            element.focus();
          }
          else if ('W' == _this.starterDigit && !_this.starterDisabled[2]) {
            _this.starterOpt = 'wye';
            element.focus();
          }
          else if ('S' == _this.starterDigit && !_this.starterDisabled[3]) {
            _this.starterOpt = 'soft';
            element.focus();
          }
          else {
            _this.starterOpt = '';
            _this.starterDigit = '';
          }

          _this.updateOptionForStarter();
        }
      };

      /**
       * Reverse selection on panel digit text
       */
      _this.onPanelDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('door-digit');

          if ('0' == _this.panelDigit && !_this.panelDisabled[0]) {
            _this.panelOpt = 'without';
            element.focus();
          }
          else if ('1' == _this.panelDigit && !_this.panelDisabled[1]) {
            _this.panelOpt = 'with';
            element.focus();
          }
          else if ('2' == _this.panelDigit && !_this.panelDisabled[2]) {
            _this.panelOpt = 'terminal';
            element.focus();
          }
          else {
            _this.panelDigit = '';
            _this.panelOpt = '';
          }

        }
      };

      /**
       * Reverse selection on panel digit text
       */
      _this.onDoorDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('cover-digit');

          if ('0' == _this.doorDigit && !_this.doorsDisabled[0]) {
            _this.doorOpt = 'no';
            element.focus();
          }
          else if ('1' == _this.doorDigit && !_this.doorsDisabled[1]) {
            _this.doorOpt = 'yes';
            element.focus();
          }
          else {
            _this.doorDigit = '';
            _this.doorOpt = '';
          }
        }
      };

      /**
       * Reverse selection on cover digit text
       */
      _this.onCoverDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('cooling-digit');

          if ('0' == _this.coverDigit && !_this.topcoverDisabled[0]) {
            _this.coverOpt = 'no';
            element.focus();
          }
          else if ('1' == _this.coverDigit && !_this.topcoverDisabled[1]) {
            _this.coverOpt = 'yes';
            element.focus();
          }
          else {
            _this.coolingDigit = '';
            _this.coolingOpt = '';
          }
        }
      };

      /**
       * Reverse selection on panel digit text
       */
      _this.onCoolingDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('transducer-digit');

          if ('A' == _this.coolingDigit && !_this.coolingDisabled[0]) {
            _this.coolingOpt = 'water';
            element.focus();
          }
          else if ('B' == _this.coolingDigit && !_this.coolingDisabled[1]) {
            _this.coolingOpt = 'oil-air-internal';
            element.focus();
          }
          else if ('C' == _this.coolingDigit && !_this.coolingDisabled[2]) {
            _this.coolingOpt = 'oil-air-external';
            element.focus();
          }
          else if ('D' == _this.coolingDigit && !_this.coolingDisabled[3]) {
            _this.coolingOpt = 'dual-cooling-internal';
            element.focus();
          }
          else {
            _this.coolingDigit = '';
            _this.coolingOpt = '';
          }

        }
      };

      /**
       * Reverse selection on transducer digit text
       */
      _this.onTransducerDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('prop-vlv-digit');

          if ('1' == _this.transducerDigit && !_this.tranDisabled[0]) {
            _this.transducerOpt = 'yes';
            element.focus();
          }
          else if ('0' == _this.transducerDigit && !_this.tranDisabled[1]) {
            _this.transducerOpt = 'no';
            element.focus();
          }
          else {
            _this.transducerDigit = '';
            _this.transducerOpt = '';
          }
        }
      };

      /**
       * Reverse selection on transducer digit text
       */
      _this.onPropVlvDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('plc-digit');

          if ('1' == _this.propVlvDigit && !_this.propDisabled[0]) {
            _this.propVlvOpt = 'yes';
            element.focus();
          }
          else if ('0' == _this.propVlvDigit && !_this.propDisabled[1]) {
            _this.propVlvOpt = 'no';
            element.focus();
          }
          else {
            _this.propVlvDigit = '';
            _this.propVlvOpt = '';
          }
        }
      };

      /**
       * Reverse selection on transducer digit text
       */
      _this.onPlcDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('oil-grade-digit');

          if ('S' == _this.plcDigit && !_this.plcDisabled[0]) {
            _this.plcOpt = 'simens';
            element.focus();
          }
          else if ('0' == _this.plcDigit && !_this.plcDisabled[3]) {
            _this.plcOpt = 'none';
            element.focus();
          }
          else {
            _this.plcOpt = '';
            _this.plcDigit = '';
          }
        }
      };

      /**
       * Reverse selection on oil digit text
       */
      _this.onOilDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          var element = $window.document.getElementById('pf-digit');

          if ('1' == _this.oilDigit && !_this.oilDisabled[0]) {
            _this.oilOpt = 'food';
            element.focus();
          }
          else if ('0' == _this.oilDigit && !_this.oilDisabled[1]) {
            _this.oilOpt = 'standard';
            element.focus();
          }
          else {
            _this.oilDigit = '';
            _this.oilDigit = '';
          }
        }
      };

      /**
       * Reverse selection on PF digit text
       */
      _this.onPfDigitChanged = function() {
        if ('reverse' == _this.inputMethod) {
          
          if ('1' == _this.pfDigit && !_this.pfDisabled[0]) {
            _this.pfOpt = 'yes';
          }
          else if ('0' == _this.pfDigit && !_this.pfDisabled[1]) {
            _this.pfOpt = 'no';
          }
          else {
            _this.pfDigit = '';
            _this.pfDigit = '';
          }
        }
      };

      //Used to clear configurator digits in case of no selection

      _this.checkNumber = function() {

        if (!_this.pressureOpt) {
          _this.pressureDigit = '';
        }

        if (15 == _this.horsepowerOpt) {
          _this.hpDigit = '';
        }

        if (!_this.topworksOpt) {
          _this.topworksDigit = '';
        }

        if (!_this.accumulatorOpt) {
          _this.accumulatorDigit = '';
        }

        if (!_this.certsOpt) {
          _this.certsDigit = '';
        }

        if (!_this.voltageOpt) {
          _this.voltageDigit = '';
        }

        if (!_this.efficiencyOpt) {
          _this.efficiencyDigit = '';
        }

        if (true == _this.starterDisabled[0] && true == _this.starterDisabled[1] && true == _this.starterDisabled[2]  && true == _this.starterDisabled[3] ) {
          _this.starterDigit = '';
        }

        if (!_this.panelOpt) {
          _this.panelDigit = '';
        }

        if (!_this.doorOpt) {
          _this.doorDigit = '';
        }

        if (!_this.coverOpt) {
          _this.coverDigit = '';
        }

        if (!_this.coolingOpt) {
          _this.coolingOpt = '';
        }

        if (!_this.transducerOpt) {
          _this.transducerDigit = '';
        }

        if (!_this.propVlvOpt) {
          _this.propVlvDigit = '';
        }

        if (!_this.plcOpt) {
          _this.plcDigit = '';
        }

        if (!_this.oilOpt) {
          _this.oilDigit = '';
        }

        if (!_this.pfOpt) {
          _this.pfDigit = '';
        }

      };

      /**
       * Reset the values
       */
      _this.reset = function() {
        
        _this.slviDisabled = false;

        _this.pressureDisabled[0] = _this.pressureDisabled[1] = _this.pressureDisabled[2] = _this.pressureDisabled[3] = false;
        _this.pressureDisabled[1] = _this.pressureDisabled[2] = _this.pressureDisabled[3] = _this.pressureDisabled[4] = _this.pressureDisabled[5] = false;
        _this.topworksDisabled[0] = _this.topworksDisabled[1] = false;
        _this.accDisabled[1] = _this.accDisabled[2] = _this.accDisabled[3] = _this.accDisabled[5] = false;
        _this.accDisabled[4] = true;

        _this.certsDisabled[0] = _this.certsDisabled[1] = _this.certsDisabled[2] = _this.certsDisabled[4] = false;
        _this.voltDisabled[0] = _this.voltDisabled[1] = _this.voltDisabled[2] = _this.voltDisabled[3] = _this.voltDisabled[4] = _this.voltDisabled[5] = false;
        _this.effDisabled[0] = _this.effDisabled[1] = false;
        _this.starterDisabled[0] = _this.starterDisabled[1] = _this.starterDisabled[2] = _this.starterDisabled[3] = false;
        _this.panelDisabled[0] = _this.panelDisabled[1] = _this.panelDisabled[2] = false;
        _this.doorsDisabled[0] = _this.doorsDisabled[1] = false;
        _this.topcoverDisabled[0] = _this.topcoverDisabled[1] = false;
        _this.coolingDisabled[0] = _this.coolingDisabled[1] = _this.coolingDisabled[2] = _this.coolingDisabled[3] = _this.coolingDisabled[4] =false;
        _this.tranDisabled[0] = _this.tranDisabled[1] = false;
        _this.propDisabled[0] = _this.propDisabled[1] = false;
        _this.plcDisabled[0]  = false;
        _this.oilDisabled[0]  = _this.oilDisabled[1] = false;
        _this.pfDisabled[1]  =  false;

        _this.pressureDigit = '';
        _this.pressureOpt = '';

        _this.hpDigit= '';
        _this.horsepowerOpt = '';

        _this.topworksDigit = '';
        _this.topworksOpt = '';

        _this.accumulatorOpt = '';
        _this.accumulatorDigit = '';

        _this.certsOpt = '';
        _this.certsDigit = '';

        _this.voltageDigit = '';
        _this.voltageOpt = '';

        _this.efficiencyOpt = '';
        _this.efficiencyDigit = '';

        _this.starterOpt = '';
        _this.starterDigit = '';

        _this.panelOpt = '';
        _this.panelDigit = '';

        _this.doorOpt = '';
        _this.doorDigit = '';

        _this.coverDigit = '';
        _this.coverOpt = '';

        _this.coolingOpt = '';
        _this.coolingDigit = '';

        _this.transducerOpt = '';
        _this.transducerDigit = '';

        _this.propVlvOpt = '';
        _this.propVlvDigit = '';

        _this.plcOpt = '';
        _this.plcDigit = '';

        _this.oilOpt = '';
        _this.oilDigit = '';

        _this.pfOpt= '';
        _this.pfDigit = '';

        _this.pumpOpt = 'sl-vi';
        _this.SLVIClick();

      };

      /**
       * Generate Bill of Materials
       */
      _this.genBOM = function() {

        if (!_this.pumpDigit || !_this.pressureDigit || !_this.hpDigit || !_this.topworksDigit || !_this.accumulatorDigit || !_this.certsDigit || !_this.coolingDigit || !_this.transducerDigit || !_this.plcDigit || !_this.propVlvDigit || !_this.oilDigit || !_this.pfDigit  ) {
          alert('PLEASE COMPLETE PUMP CONFIGURATION TO GENERATE BOM');
          return;
        }

        var bomInstance = $uibModal.open({
          animation: true,
          templateUrl: 'assets/templates/bom.html',
          controller: 'BomCtrl',
          controllerAs: 'ctx',
          size: 'lg',
          resolve: {
            Digits: function () {
              return {
                pump: _this.pumpDigit,
                pressure: _this.pressureDigit,
                hp: _this.hpDigit,
                topworks: _this.topworksDigit,
                accumulator: _this.accumulatorDigit,
                certs: _this.certsDigit,
                voltage: _this.voltageDigit,
                efficiency: _this.efficiencyDigit,
                starter: _this.starterDigit,
                panel: _this.panelDigit,
                door: _this.doorDigit,
                cover: _this.coverDigit,
                cooling: _this.coolingDigit,
                transducer: _this.transducerDigit,
                propVlv: _this.propVlvDigit,
                oil: _this.oilDigit,
                pf: _this.pfDigit,
                plc: _this.plcDigit
              };
            }
          }
        });

        bomInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {

        });


      };

      /**
       * pressure field option false
       */

      $scope.$watch(
        function ( scope ) {
          // Return the "result" of the watch expression.
          return( _this.pressureOpt);
        }, function(newValue, oldValue) {

          if (35 == oldValue) {
            // _this.hpDisabled[0] = false;
            _this.hpDisabled[1] = false;
            _this.hpDisabled[2] = false;
            _this.hpDisabled[3] = false;
            _this.hpDisabled[4] = true;
            _this.hpDisabled[5] = false;
            // _this.hpDisabled[6] = true;
            // _this.hpDisabled[7] = false;
          }
          else if ( 90 == oldValue) {

            _this.hpDisabled[1] = false;
            _this.hpDisabled[2] = false;
            _this.hpDisabled[3] = false;
            _this.hpDisabled[5] = false;

            _this.hpDisabled[4] = true;

            if (60 == _this.horsepowerOpt) {
              _this.horsepowerOpt = '';
              _this.hpDigit = '';
            }

            _this.accDisabled[1] = false;
            _this.accDisabled[2] = false;
            _this.accDisabled[3] = false;
            _this.accDisabled[5] = true;

            if (1.6 == _this.accumulatorOpt) {
              _this.accumulatorOpt = 1;
              _this.accumulatorDigit = 1;
            }

            _this.certsDisabled[0] = false;

            if (_this.certsOpt != 'csa' && _this.certsOpt != 'ce') {
              _this.starterDisabled[0]= false;
            }


            _this.tranDisabled[1] = false;

            _this.propDisabled[1] = false;

            if (_this.certsOpt != 'csa' && _this.certsOpt != 'ce') {
              _this.plcDisabled[3]= false;
            }

          }

          _this.checkNumber();
        });

      /**
       * horsepower field option false
       */
      $scope.$watch(
        function ( scope ) {
          // Return the "result" of the watch expression.
          return( _this.horsepowerOpt);
        }, function(newValue, oldValue) {

          if (30 == oldValue || 40 == oldValue || 50 == oldValue) {
            _this.pressureDisabled[3] = false;
            _this.accDisabled[3] = false;
            _this.accDisabled[5] = false;
          }
          else if (100 == oldValue) {

            _this.pressureDisabled[3] = false;
            _this.accDisabled[1] = false;
            _this.accDisabled[5] = false;

            if (_this.efficiencyOpt == 'nema') {
              _this.voltDisabled[0] = true;
            }
            else {
              _this.voltDisabled[0] = false;
            }

            _this.starterDisabled[1] = false;

            if (_this.efficiencyOpt == 'ie3') {
              _this.voltDisabled[1] = true;
            }
            else {
              _this.voltDisabled[1] = false;
            }
            
          }

          _this.checkNumber();
        });


      /**
       * certs field option false
       */
      $scope.$watch(
        function ( scope ) {
          // Return the "result" of the watch expression.
          return( _this.certsOpt);
        }, function(newValue, oldValue) {

          if ('csa' == oldValue ) {
            _this.pressureDisabled[1] = false;
          }

          _this.updateOptionForCert();
          _this.checkNumber();
        });

      /**
       * certs field option
       */
      // $scope.$watch(
      //   function ( scope ) {
      //     // Return the "result" of the watch expression.
      //     return( _this.certsOpt);
      //   }, function(newValue, oldValue) {
      //
      //     if ('none' == oldValue ) {
      //       _this.plcDisabled[0] = false;
      //       _this.plcDisabled[3] = false;
      //
      //       if ('siemens' == _this.plcOpt) {
      //         _this.plcOpt = '';
      //         _this.plcDigit = '';
      //       }
      //
      //     }
      //
      //     _this.updateOptionForCert();
      //     _this.checkNumber();
      //   });


      /**
       * efficiency field watch
       */
      $scope.$watch(
        function ( scope ) {
          // Return the "result" of the watch expression.
          return( _this.efficiencyOpt);
        }, function(newValue, oldValue) {

          if ('ie3' == newValue ) {
            _this.efficiencyClick('E');
          }
          else if ('nema' == newValue ) {
            _this.efficiencyClick('N');
          }

          _this.checkNumber();
        });


      _this.init(); // initialize option
    }
  ]
);