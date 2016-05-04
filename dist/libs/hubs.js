"use strict";

System.register([], function (_export, _context) {
    return {
        setters: [],
        execute: function () {
            (function ($, window, undefined) {
                "use strict";

                if (typeof $.signalR !== "function") {
                    throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
                }

                var signalR = $.signalR;

                function makeProxyCallback(hub, callback) {
                    return function () {
                        callback.apply(hub, $.makeArray(arguments));
                    };
                }

                function registerHubProxies(instance, shouldSubscribe) {
                    var key, hub, memberKey, memberValue, subscriptionMethod;

                    for (key in instance) {
                        if (instance.hasOwnProperty(key)) {
                            hub = instance[key];

                            if (!hub.hubName) {
                                continue;
                            }

                            if (shouldSubscribe) {
                                subscriptionMethod = hub.on;
                            } else {
                                subscriptionMethod = hub.off;
                            }

                            for (memberKey in hub.client) {
                                if (hub.client.hasOwnProperty(memberKey)) {
                                    memberValue = hub.client[memberKey];

                                    if (!$.isFunction(memberValue)) {
                                        continue;
                                    }

                                    subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                                }
                            }
                        }
                    }
                }

                $.hubConnection.prototype.createHubProxies = function () {
                    var proxies = {};
                    this.starting(function () {
                        registerHubProxies(proxies, true);

                        this._registerSubscribedHubs();
                    }).disconnected(function () {
                        registerHubProxies(proxies, false);
                    });

                    proxies['echoHub'] = this.createHubProxy('echoHub');
                    proxies['echoHub'].client = {};
                    proxies['echoHub'].server = {
                        changeNickname: function changeNickname(newNickname) {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["ChangeNickname"], $.makeArray(arguments)));
                        },

                        hello: function hello() {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["Hello"], $.makeArray(arguments)));
                        },

                        obiWanMessage: function obiWanMessage() {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["ObiWanMessage"], $.makeArray(arguments)));
                        },

                        sum: function sum(a, b) {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["Sum"], $.makeArray(arguments)));
                        }
                    };

                    return proxies;
                };

                signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
                $.extend(signalR, signalR.hub.createHubProxies());
            })(window.jQuery, window);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvaHVicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFZQyx1QkFBVSxDQUFWLEVBQWEsTUFBYixFQUFxQixTQUFyQixFQUFnQztBQUU3Qjs7QUFFQSxvQkFBSSxPQUFRLEVBQUUsT0FBVixLQUF1QixVQUEzQixFQUF1QztBQUNuQywwQkFBTSxJQUFJLEtBQUosQ0FBVSxzR0FBVixDQUFOO0FBQ0g7O0FBRUQsb0JBQUksVUFBVSxFQUFFLE9BQWhCOztBQUVBLHlCQUFTLGlCQUFULENBQTJCLEdBQTNCLEVBQWdDLFFBQWhDLEVBQTBDO0FBQ3RDLDJCQUFPLFlBQVk7QUFFZixpQ0FBUyxLQUFULENBQWUsR0FBZixFQUFvQixFQUFFLFNBQUYsQ0FBWSxTQUFaLENBQXBCO0FBQ0gscUJBSEQ7QUFJSDs7QUFFRCx5QkFBUyxrQkFBVCxDQUE0QixRQUE1QixFQUFzQyxlQUF0QyxFQUF1RDtBQUNuRCx3QkFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLFNBQWQsRUFBeUIsV0FBekIsRUFBc0Msa0JBQXRDOztBQUVBLHlCQUFLLEdBQUwsSUFBWSxRQUFaLEVBQXNCO0FBQ2xCLDRCQUFJLFNBQVMsY0FBVCxDQUF3QixHQUF4QixDQUFKLEVBQWtDO0FBQzlCLGtDQUFNLFNBQVMsR0FBVCxDQUFOOztBQUVBLGdDQUFJLENBQUUsSUFBSSxPQUFWLEVBQW9CO0FBRWhCO0FBQ0g7O0FBRUQsZ0NBQUksZUFBSixFQUFxQjtBQUVqQixxREFBcUIsSUFBSSxFQUF6QjtBQUNILDZCQUhELE1BR087QUFFSCxxREFBcUIsSUFBSSxHQUF6QjtBQUNIOztBQUdELGlDQUFLLFNBQUwsSUFBa0IsSUFBSSxNQUF0QixFQUE4QjtBQUMxQixvQ0FBSSxJQUFJLE1BQUosQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQUosRUFBMEM7QUFDdEMsa0RBQWMsSUFBSSxNQUFKLENBQVcsU0FBWCxDQUFkOztBQUVBLHdDQUFJLENBQUMsRUFBRSxVQUFGLENBQWEsV0FBYixDQUFMLEVBQWdDO0FBRTVCO0FBQ0g7O0FBRUQsdURBQW1CLElBQW5CLENBQXdCLEdBQXhCLEVBQTZCLFNBQTdCLEVBQXdDLGtCQUFrQixHQUFsQixFQUF1QixXQUF2QixDQUF4QztBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsa0JBQUUsYUFBRixDQUFnQixTQUFoQixDQUEwQixnQkFBMUIsR0FBNkMsWUFBWTtBQUNyRCx3QkFBSSxVQUFVLEVBQWQ7QUFDQSx5QkFBSyxRQUFMLENBQWMsWUFBWTtBQUd0QiwyQ0FBbUIsT0FBbkIsRUFBNEIsSUFBNUI7O0FBRUEsNkJBQUssdUJBQUw7QUFDSCxxQkFORCxFQU1HLFlBTkgsQ0FNZ0IsWUFBWTtBQUd4QiwyQ0FBbUIsT0FBbkIsRUFBNEIsS0FBNUI7QUFDSCxxQkFWRDs7QUFZQSw0QkFBUSxTQUFSLElBQXFCLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUFyQjtBQUNBLDRCQUFRLFNBQVIsRUFBbUIsTUFBbkIsR0FBNEIsRUFBNUI7QUFDQSw0QkFBUSxTQUFSLEVBQW1CLE1BQW5CLEdBQTRCO0FBQ3hCLHdDQUFnQix3QkFBVSxXQUFWLEVBQXVCO0FBR25DLG1DQUFPLFFBQVEsU0FBUixFQUFtQixNQUFuQixDQUEwQixLQUExQixDQUFnQyxRQUFRLFNBQVIsQ0FBaEMsRUFBb0QsRUFBRSxLQUFGLENBQVEsQ0FBQyxnQkFBRCxDQUFSLEVBQTRCLEVBQUUsU0FBRixDQUFZLFNBQVosQ0FBNUIsQ0FBcEQsQ0FBUDtBQUNGLHlCQUxzQjs7QUFPeEIsK0JBQU8saUJBQVk7QUFFZixtQ0FBTyxRQUFRLFNBQVIsRUFBbUIsTUFBbkIsQ0FBMEIsS0FBMUIsQ0FBZ0MsUUFBUSxTQUFSLENBQWhDLEVBQW9ELEVBQUUsS0FBRixDQUFRLENBQUMsT0FBRCxDQUFSLEVBQW1CLEVBQUUsU0FBRixDQUFZLFNBQVosQ0FBbkIsQ0FBcEQsQ0FBUDtBQUNGLHlCQVZzQjs7QUFZeEIsdUNBQWUseUJBQVk7QUFFdkIsbUNBQU8sUUFBUSxTQUFSLEVBQW1CLE1BQW5CLENBQTBCLEtBQTFCLENBQWdDLFFBQVEsU0FBUixDQUFoQyxFQUFvRCxFQUFFLEtBQUYsQ0FBUSxDQUFDLGVBQUQsQ0FBUixFQUEyQixFQUFFLFNBQUYsQ0FBWSxTQUFaLENBQTNCLENBQXBELENBQVA7QUFDRix5QkFmc0I7O0FBaUJ4Qiw2QkFBSyxhQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBSWpCLG1DQUFPLFFBQVEsU0FBUixFQUFtQixNQUFuQixDQUEwQixLQUExQixDQUFnQyxRQUFRLFNBQVIsQ0FBaEMsRUFBb0QsRUFBRSxLQUFGLENBQVEsQ0FBQyxLQUFELENBQVIsRUFBaUIsRUFBRSxTQUFGLENBQVksU0FBWixDQUFqQixDQUFwRCxDQUFQO0FBQ0Y7QUF0QnNCLHFCQUE1Qjs7QUF5QkEsMkJBQU8sT0FBUDtBQUNILGlCQTFDRDs7QUE0Q0Esd0JBQVEsR0FBUixHQUFjLEVBQUUsYUFBRixDQUFnQixVQUFoQixFQUE0QixFQUFFLGdCQUFnQixLQUFsQixFQUE1QixDQUFkO0FBQ0Esa0JBQUUsTUFBRixDQUFTLE9BQVQsRUFBa0IsUUFBUSxHQUFSLENBQVksZ0JBQVosRUFBbEI7QUFFSCxhQXJHQSxFQXFHQyxPQUFPLE1BckdSLEVBcUdnQixNQXJHaEIsQ0FBRCIsImZpbGUiOiJsaWJzL2h1YnMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
