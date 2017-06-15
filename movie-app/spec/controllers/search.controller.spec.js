/*global stubImageConstructor */
(function (global) {
    'use strict';
    global.stubImageConstructor = function (fakeImage) {
        global.Image = function () {
            return fakeImage;
        };
    };
}(this));
describe('Test for best matching employee controller', function () {
    'use strict';

    var vm, scope, _window, controller, createController, logCollector, bmeService,
        channelInfoService, callAnAdvisorService, bmeConstants, timeout,
        messageBus, DeferredObj, _event, httpBackend, fakeImage, rootScope, deviceProfile, dialog, telephone, nativeBridgeReady;

    var responseEarlierDate = {
        'chat': {
            'enabled': true
        },
        'phone': {
            'enabled': true
        }
    };

    beforeEach(module('senses'));
    beforeEach(module('app.best-matching-employee'));

    beforeEach(inject(function ($injector) {
        bmeConstants = $injector.get('bmeConstants');
        logCollector = $injector.get('app.best-matching-employee.logCollector');
        httpBackend = $injector.get('$httpBackend');
        rootScope = $injector.get('$rootScope');
        timeout = $injector.get('$timeout');

        var parentDiv = document.createElement('DIV');
        var childDiv = document.createElement('DIV');
        var childAnchor = document.createElement('A');
        parentDiv.appendChild(childDiv);
        parentDiv.appendChild(childAnchor);
        childAnchor.click = function(){

        };

        // mock nativeBridgeReady event
        nativeBridgeReady = document.createEvent('Event');
        nativeBridgeReady.initEvent('nativeBridgeReady', true, true);

        DeferredObj = function(){
            this.then = function (_successCallback, _errorCallback) {
                this.successCallback = _successCallback;
                this.errorCallback = _errorCallback;
                return this;
            };
            this.catch = function (fun){
                this.catchCallback = fun;
            };
            this.resolve = function (data) {
                this.successCallback(data);
            };
            this.reject = function (data) {
                if (this.errorCallback) {
                    this.errorCallback(data);
                }else if(this.catchCallback){
                    this.catchCallback(data);
                }
            };
        };

        fakeImage = {
            src:'',
            onload: function () {

            },
            onerror: function (){

            }
        };

        _event = {
            preventDefault: function () {

            },
            stopPropagation: function () {

            },
            currentTarget:childDiv
        };

        bmeService = {
            getBestMatchingEmployee: function () {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            },
            remove: function(){

            }
        };

        messageBus = {
            callback: {},
            publish: function (event, message) {
                this.dataSend = {event: event, message: message};
                if(this.callback[event]){
                    this.callback[event](message);
                }
            }, subscribe: function (message, _callback) {
                this.callback[message] = _callback;
            }, unsubscribe: function (message, _callback) {
                this.callback[message] = _callback;
            }
        };


        callAnAdvisorService = {
            getPhoneNumber: function () {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            },
            remove: function(){

            }
        };

        _window = {
            location: function () {

            },
            confirm: function() {
                return true;
            },
            nativeBridge: {
                isPilot: false,
                telephony: {
                    initiatePhonecall: function(){}
                },
                getSupport:function() {return this.isPilot;}
            }
        };

        channelInfoService = {
            getChannelInfo: function () {
                return {
                    chat: {
                        available: false,
                        timeout: '',
                        message: ''
                    },
                    phone: {
                        available: false,
                        timeout: '',
                        message: ''
                    }
                };
            },
            isChatBlackListed: function () {
                return false;
            },
            callChannelInfo: function (){
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            },
            refreshChannelInfo: function (){
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            },
            remove: function () {
                return false;
            }
        };

        deviceProfile = {
            canMakePhoneCalls: function (){
                return true;
            }
        };

        dialog = {
            confirm: function (){
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            }
        };

        telephone = {
            call: function () {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            }
        };

        controller = $injector.get('$controller');

        createController = function () {
            scope = rootScope.$new();
            return controller('best-matching-employee.mainController', {
                '$scope': scope,
                '$timeout': timeout,
                '$window': _window,
                '$http': httpBackend,
                'app.best-matching-employee.logCollector': logCollector,
                'runtime.messageBus': messageBus,
                'runtime.dialog': dialog,
                'bmeConstants': bmeConstants,
                'channelInfoService': channelInfoService,
                'bmeService': bmeService,
                'callAnAdvisorService': callAnAdvisorService,
                'runtime.deviceProfile': deviceProfile,
                'runtime.telephone': telephone
            });
        };

        vm = createController();

    }));

    it('should initialize controller', function () {
        expect(vm).not.toBeNull();
    });

    it('Branch Coverage',function(){
        createController();
        vm.activateMail();
        vm.activateChat();
        vm.activateCall();
    });

    it('should check availability of chat and call',function(){
        createController();
        channelInfoService.deferredObj.resolve(responseEarlierDate);
        expect(vm.channelList[2].show).toEqual(true);
        expect(vm.channelList[3].show).toEqual(true);
    });

    it('should close the channel when page location is changed',function(){
        vm = createController();
        vm.toggleDirectChannels();
        timeout.flush(50);
        messageBus.publish('shell:location.changed');
        expect(vm.isChannelOpen).toBeFalsy();
        expect(vm.channelListFilter.length).toEqual(4);
    });

    it('should clear timeout unsubscribe and remove service call', function(){
        scope.$destroy();
        scope.$digest();
    });

    describe('Should pass analytics information to analytics Factory', function(){
        beforeEach(function(){
            spyOn(logCollector.analytics, 'measure').and.callThrough();
        });
        it('should pass page Information while controller initialize', function(){
            createController();
            expect(logCollector.analytics.measure).toHaveBeenCalledWith({screenType: 0, screenName: bmeConstants.analyticsPageLoadName});
        });
        it('should pass page Information while the avatar is clicked', function(){
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            expect(logCollector.analytics.measure).toHaveBeenCalledWith({interactionType: 'btnClick', interactionDescription: bmeConstants.analyticsEventDescription, interactionDetails: bmeConstants.analyticsEventDetails});
        });
        it('should pass page Information while address icon is clicked', function(){
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateAddress('vestiging');
            expect(logCollector.analytics.measure).toHaveBeenCalledWith({interactionType: 'btnClick', interactionDescription: bmeConstants.analyticsChannelEventDescription, interactionDetails: 'vestiging'});
        });
        it('should pass page Information while chat icon is clicked', function(){
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateChat('chat');
            expect(logCollector.analytics.measure).toHaveBeenCalledWith({interactionType: 'btnClick', interactionDescription: bmeConstants.analyticsChannelEventDescription, interactionDetails: 'chat'});
        });
        it('should pass page Information while mail icon is clicked', function(){
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateMail('bericht', _event);
            expect(logCollector.analytics.measure).toHaveBeenCalledWith({interactionType: 'btnClick', interactionDescription: bmeConstants.analyticsChannelEventDescription, interactionDetails: 'bericht'});
        });
        it('should pass page Information while call icon is clicked', function(){
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateCall('bel');
            expect(logCollector.analytics.measure).toHaveBeenCalledWith({interactionType: 'btnClick', interactionDescription: bmeConstants.analyticsChannelEventDescription, interactionDetails: 'bel'});
        });
    });


    describe('Best Matching Employee service', function(){
        it('should get employee Info from best matching employee service', function () {
            stubImageConstructor(fakeImage);
            createController();
            bmeService.deferredObj.resolve({localBankName: 'Rabobank', employeePhotoUrls: ['/images/advisor.jpg']});
            expect(vm.employee.localBankName).toEqual('Rabobank');
            fakeImage.onload();
            expect(vm.employee.employeePhotoUrl).toEqual('/images/advisor.jpg');
        });

        it('should show fallback photo when the best matching employee service returns empty BME url', function () {
            stubImageConstructor(fakeImage);
            createController();
            bmeService.deferredObj.resolve({localBankName: 'Rabobank', employeePhotoUrls: [], showBMEPhoto:true});
            expect(vm.employee.localBankName).toEqual('Rabobank');
            fakeImage.onerror();
            expect(vm.employee.employeePhotoUrl).toEqual(bmeConstants.employeePhotoFallbackUrl);
        });

        it('Should  loop through BME Urls and show Second Item If First Item is 404', function () {
            stubImageConstructor(fakeImage);
            createController();
            bmeService.deferredObj.resolve({localBankName: 'Rabobank', employeePhotoUrls: ['/images/advisor.jpg', '/images/advisor1.jpg'], showBMEPhoto:true});
            expect(vm.employee.localBankName).toEqual('Rabobank');

            // Make First one 404
            fakeImage.onerror();

            // Make Second one 200
            fakeImage.onload();
            expect(vm.employee.employeePhotoUrl).toEqual('/images/advisor1.jpg');
        });

        it('Should  loop through BME Urls and show Fallback Image If All Images are 404', function () {
            stubImageConstructor(fakeImage);
            createController();
            bmeService.deferredObj.resolve({localBankName: 'Rabobank', employeePhotoUrls: ['/images/advisor.jpg', '/images/advisor1.jpg'], showBMEPhoto:true});
            expect(vm.employee.localBankName).toEqual('Rabobank');

            // Make First one 404
            fakeImage.onerror();

            // Make Second one 404
            fakeImage.onerror();
            expect(vm.employee.employeePhotoUrl).toEqual(bmeConstants.employeePhotoFallbackUrl);
        });

        it('Should show defaultPhoto when showPhoto false', function () {
            vm = createController();
            bmeService.deferredObj.resolve({localBankName: 'Rabobank', employeePhotoUrls: ['/images/advisor.jpg'], showBMEPhoto:false});
            expect(vm.rbStyledIcon).toBeFalsy();
        });

        it('Should Update BME photo on messageBus Event', function () {
            vm = createController();
            messageBus.publish('UserPreferenceView:changeInAvatar', {showBMEPhoto:true});
            expect(vm.rbStyledIcon).toBeTruthy();
        });

        it('Should Update BME photo on messageBus Event', function () {
            vm = createController();
            messageBus.publish('UserPreferenceView:changeInAvatar', {showBMEPhoto:false});
            expect(vm.rbStyledIcon).toBeFalsy();
        });

        it('should have default employee information when best matching employee service fails', function () {
            createController();
            bmeService.deferredObj.reject('error');
            expect(vm.employee).toEqual(bmeConstants.defaultEmployee);
        });

        it('Show logger warning when fallback employee photo (anke.jpg) is 404', function () {
            stubImageConstructor(fakeImage);
            vm = createController();
            bmeService.deferredObj.reject();
            expect(vm.employee.localBankName).toEqual('Rabobank');
            fakeImage.onerror();
        });
    });

    describe('Call An Advisor', function(){

        it('should get call available or not from channel info service', function () {
            spyOn(channelInfoService, 'getChannelInfo').and.returnValue({phone: {
                available: true,
                timeout: '',
                message: ''
            }
            });
            vm = createController();
            expect(vm.channelInfo.phone.available).toEqual(true);
        });

        it('should make call when call icon is triggered', function () {
            createController();
            spyOn(_event, 'preventDefault').and.returnValue(true);
            spyOn(_event, 'stopPropagation').and.returnValue(true);
            vm.makeCall(_event, 'tel:+3112345678');
            expect(_event.preventDefault).toHaveBeenCalled();
            expect(_event.stopPropagation).toHaveBeenCalled();
        });

        it('should make call when call icon is triggered', function () {
            createController();
            vm.makeCall(null, 'tel:+3112345678');
        });

        it('should initiate call when call is triggered', function () {
            createController();
            vm.makelocalCall(null, 'tel:+3112345678');
        });

        it('should return false on localBank phone number not passed',function(){
            createController();
            expect(vm.makeCall(_event)).toEqual(false);
        });

        it('should return register bank phone number',function(){
            createController();
            vm.makeCall(_event, '+31012345678');
            callAnAdvisorService.deferredObj.resolve({number:'+31012345678'});
        });

        it('should return empty on register bank phone number',function(){
            spyOn(_window, 'confirm').and.returnValue(false);
            createController();
            vm.makeCall(_event, '+31012345678');
            callAnAdvisorService.deferredObj.resolve('+31012345678');
        });

        it('should return empty on register bank phone number',function(){
            spyOn(_window, 'confirm').and.returnValue(false);
            createController();
            vm.makeCall(_event, '+31012345678');
            callAnAdvisorService.deferredObj.resolve('');
            callAnAdvisorService.deferredObj.resolve('+31012345678');
        });

        it('should return empty on register bank phone number',function(){
            spyOn(_window, 'confirm').and.returnValue(false);
            createController();
            vm.makeCall(_event, '+31012345678');
            callAnAdvisorService.deferredObj.resolve({number:'+31012345678'});
            dialog.deferredObj.resolve('');
            dialog.deferredObj.reject();
        });

    });

    describe('Channel open', function(){
        it('should open the channel when toggleDirectChannels function is triggered', function () {
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            expect(vm.isChannelOpen).toEqual(true);
            expect(vm.channelMode).toEqual(bmeConstants.NO_MESSAGE);
        });

        it('should get chat available from channel Info service',
            function () {
                spyOn(messageBus, 'publish').and.callThrough();
                spyOn(channelInfoService, 'getChannelInfo').and.returnValue({chat: {
                    available: true,
                    timeout: '',
                    message: ''
                }
                });
                vm = createController();
                channelInfoService.deferredObj.resolve(responseEarlierDate);
                vm.toggleDirectChannels();
                timeout.flush(800);
                vm.activateChat();
                expect(vm.channelInfo.chat.available).toEqual(true);
                expect(messageBus.publish).toHaveBeenCalledWith('cwcmodule.cwc:open','Rabobank');
            });

        it('should not call channel Info service when direct channel is closed', function () {
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.toggleDirectChannels();
            timeout.flush(800);
            expect(vm.isChannelOpen).toEqual(false);
            expect(vm.channelInfo.chat.available).toEqual(false);
        });
    });

    describe('chat icon', function(){
        it('should show chat unavailable message when activateChat is clicked', function () {
            spyOn(channelInfoService, 'getChannelInfo').and.returnValue({chat: {
                available: true,
                timeout: '',
                message: ''
            }
            });
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateChat('chat');
            expect(vm.channelMode).toEqual(bmeConstants.CHAT_MESSAGE);
        });

    });

    describe('Mail icon', function(){
        it('should hide message container when activateMail is clicked', function () {
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateMail('mail',_event);
            expect(vm.channelMode).toEqual(bmeConstants.NO_MESSAGE);
        });

        it('should not trigger anchor when event is undefined activateMail is clicked', function () {
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateMail('mail',{currentTarget:''});
        });

    });


    describe('Call icon', function(){
        it('should get the device call feature availability',function(){
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateCall();
            expect(vm.canMakeCall).toEqual(true);
        });

        it('should get the device call feature availability false',function(){
            spyOn(deviceProfile, 'canMakePhoneCalls').and.returnValue(false);
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateCall();
            expect(vm.canMakeCall).toEqual(false);
        });

        it('should show call unavailable message when call is not available', function () {
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateCall();
            expect(vm.channelMode).toEqual(bmeConstants.CALL_MESSAGE);
            expect(vm.channelInfo.phone.available).toEqual(false);
            expect(vm.phoneNumberList).toEqual(bmeConstants.interHelpLine);
        });

        it('should remove bankname when number return empty from callAnAdvisorService', function () {
            spyOn(channelInfoService, 'getChannelInfo').and.returnValue({phone: {
                available: true,
                timeout: '',
                message: ''
            }});
            spyOn(deviceProfile, 'canMakePhoneCalls').and.returnValue(false);
            vm = createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateCall();
            callAnAdvisorService.deferredObj.resolve('');
            expect(vm.phoneNumberList.length).toEqual(bmeConstants.listOfPhoneNumbers.length);
        });

        it('should get localBank telephone number when call is available', function () {
            spyOn(channelInfoService, 'getChannelInfo').and.returnValue({phone: {
                available: true,
                timeout: '',
                message: ''
            }
            });
            spyOn(deviceProfile, 'canMakePhoneCalls').and.returnValue(false);
            vm = createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateCall();
            expect(vm.channelInfo.phone.available).toEqual(true);
            expect(vm.phoneNumberList).toEqual(bmeConstants.listOfPhoneNumbers);
            callAnAdvisorService.deferredObj.resolve({number: '+31012345678'});
            expect(vm.localBankPhoneNumber.number).toEqual('+31012345678');
        });

        it('should not show any message when activateCall is triggered for second time', function () {
            spyOn(channelInfoService, 'getChannelInfo').and.returnValue({phone: {
                available: true,
                timeout: '',
                message: ''
            }
            });
            spyOn(deviceProfile, 'canMakePhoneCalls').and.returnValue(false);
            vm = createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateCall();
            callAnAdvisorService.deferredObj.resolve({number: '+31012345678'});
            vm.activateCall();
            expect(vm.channelMode).toEqual(bmeConstants.NO_MESSAGE);
        });
    });

    describe('Address icon', function(){
        it('should call address when address icon is clicked',function(){
            createController();
            vm.toggleDirectChannels();

            timeout.flush(50);
            vm.activateAddress('location', _event);
        });

        it('should no open location when channel is not open',function(){
            createController();
            vm.activateAddress('location', _event);
        });
    });

    describe('subscribed function', function(){
        it('should call open bme when subscribed',function(){
            createController();
            messageBus.callback['bmemodule.bme:show']();
            expect(vm.openBme).toEqual(true);
        });

        it('should call hide bme when subscribed',function(){
            vm = createController();
            messageBus.callback['bmemodule.bme:hide']();
            expect(vm.openBme).toEqual(false);
        });
    });

    describe('Chat Minimize', function(){
        it('should minimize object have default status',function(){
            createController();
            expect(vm.chatMinStatus.minimizeChat).toBeFalsy();
            expect(vm.chatMinStatus.agentMessageStatus).toBeFalsy();
            expect(vm.chatMinStatus.agentPhoto).toEqual('');
        });

        it('should call hide bme when subscribed', function() {
            vm = createController();
            messageBus.publish('chat.module:minimized', {
                'minimize': true,
                'agentImageUrl': 'abc/qwerty.jpg',
                'messageStatus': false
            });
            timeout.flush(0);
            expect(vm.chatMinStatus.minimizeChat).toBeTruthy();
            expect(vm.chatMinStatus.agentMessageStatus).toBeFalsy();
            expect(vm.chatMinStatus.agentPhoto).toEqual('abc/qwerty.jpg');
        });

        it('Should hide icon on maximize', function() {
            createController();
            vm.maximizeChat();
            expect(vm.chatMinStatus.minimizeChat).toBeFalsy();
        });
    });

    describe('Pilot URL Change of Contact Vestiging', function() {
        it('Default Momac Application Url Should Be There', function() {
            createController();
            document.dispatchEvent(nativeBridgeReady);
            expect(vm.channelList[3].pageUrl).toEqual('/bankierenplus/nl/contact/vestiging.html');
        });

        it('Find your bank Url Should Be There', function() {
            var temp = angular.copy(_window.nativeBridge);
            _window.nativeBridge = undefined;
            vm = createController();

            _window.nativeBridge = temp;
            _window.nativeBridge.isPilot=true;
            document.dispatchEvent(nativeBridgeReady);
            expect(vm.channelList[3].pageUrl).toEqual('/bankierenplus/nl/contact/vestiging.html');
        });

    });

    describe('Talkback Code Coverage', function() {
        it('Focus the bank title on Toggle Channel', function() {

            // Mock Document
            var rst = document.createElement('div');
            rst.setAttribute('class', 'rs-shell-main');
            rst.className += ' bme-bank-title';
            rst.className += ' bme-overlay';
            document.body.appendChild(rst);

            vm = createController();
            vm.toggleDirectChannels();
            timeout.flush(50);
            timeout.flush(50);
            expect(rst.getAttribute('aria-hidden')).toEqual('true');
        });

        it('Should focus the phone number and heading', function () {

            // Mock Document
            var rst = document.createElement('div');
            rst.setAttribute('class', 'bme-phone-number');
            rst.className += ' bme-bank-name-heading';
            document.body.appendChild(rst);

            spyOn(channelInfoService, 'getChannelInfo').and.returnValue({phone: {
                available: true,
                timeout: '',
                message: ''
            }
            });
            vm = createController();
            vm.toggleDirectChannels();
            timeout.flush(50);
            vm.activateCall();
            timeout.flush(50);

            expect(vm.channelInfo.phone.available).toEqual(true);
        });

        it('Hide channel when Invisible Button Clicked', function () {
            vm = createController();
            vm.toggleDirectChannels();
            timeout.flush(50);
            vm.removeOverlay();
            expect(vm.isChannelOpen).toBeFalsy();
        });
    });
});