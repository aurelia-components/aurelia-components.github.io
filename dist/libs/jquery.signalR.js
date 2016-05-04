"use strict";

System.register([], function (_export, _context) {
    var _typeof;

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            (function ($, window, undefined) {

                var resources = {
                    nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",
                    noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",
                    errorOnNegotiate: "Error during negotiation request.",
                    stoppedWhileLoading: "The connection was stopped during page load.",
                    stoppedWhileNegotiating: "The connection was stopped during the negotiate request.",
                    errorParsingNegotiateResponse: "Error parsing negotiate response.",
                    errorDuringStartRequest: "Error during start request. Stopping the connection.",
                    stoppedDuringStartRequest: "The connection was stopped during the start request.",
                    errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.",
                    invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.",
                    protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",
                    sendFailed: "Send failed.",
                    parseFailed: "Failed at parsing response: {0}",
                    longPollFailed: "Long polling request failed.",
                    eventSourceFailedToConnect: "EventSource failed to connect.",
                    eventSourceError: "Error raised by EventSource",
                    webSocketClosed: "WebSocket closed.",
                    pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.",
                    pingServerFailed: "Failed to ping server.",
                    pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.",
                    pingServerFailedParse: "Failed to parse ping server response, stopping the connection.",
                    noConnectionTransport: "Connection is in an invalid state, there is no transport active.",
                    webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.",
                    reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",
                    reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."
                };

                if (typeof $ !== "function") {
                    throw new Error(resources.nojQuery);
                }

                var _signalR,
                    _connection,
                    _pageLoaded = window.document.readyState === "complete",
                    _pageWindow = $(window),
                    _negotiateAbortText = "__Negotiate Aborted__",
                    events = {
                    onStart: "onStart",
                    onStarting: "onStarting",
                    onReceived: "onReceived",
                    onError: "onError",
                    onConnectionSlow: "onConnectionSlow",
                    onReconnecting: "onReconnecting",
                    onReconnect: "onReconnect",
                    onStateChanged: "onStateChanged",
                    onDisconnect: "onDisconnect"
                },
                    ajaxDefaults = {
                    processData: true,
                    timeout: null,
                    async: true,
                    global: false,
                    cache: false
                },
                    _log = function _log(msg, logging) {
                    if (logging === false) {
                        return;
                    }
                    var m;
                    if (typeof window.console === "undefined") {
                        return;
                    }
                    m = "[" + new Date().toTimeString() + "] SignalR: " + msg;
                    if (window.console.debug) {
                        window.console.debug(m);
                    } else if (window.console.log) {
                        window.console.log(m);
                    }
                },
                    changeState = function changeState(connection, expectedState, newState) {
                    if (expectedState === connection.state) {
                        connection.state = newState;

                        $(connection).triggerHandler(events.onStateChanged, [{ oldState: expectedState, newState: newState }]);
                        return true;
                    }

                    return false;
                },
                    isDisconnecting = function isDisconnecting(connection) {
                    return connection.state === _signalR.connectionState.disconnected;
                },
                    supportsKeepAlive = function supportsKeepAlive(connection) {
                    return connection._.keepAliveData.activated && connection.transport.supportsKeepAlive(connection);
                },
                    configureStopReconnectingTimeout = function configureStopReconnectingTimeout(connection) {
                    var stopReconnectingTimeout, onReconnectTimeout;

                    if (!connection._.configuredStopReconnectingTimeout) {
                        onReconnectTimeout = function onReconnectTimeout(connection) {
                            var message = _signalR._.format(_signalR.resources.reconnectTimeout, connection.disconnectTimeout);
                            connection.log(message);
                            $(connection).triggerHandler(events.onError, [_signalR._.error(message, "TimeoutException")]);
                            connection.stop(false, false);
                        };

                        connection.reconnecting(function () {
                            var connection = this;

                            if (connection.state === _signalR.connectionState.reconnecting) {
                                stopReconnectingTimeout = window.setTimeout(function () {
                                    onReconnectTimeout(connection);
                                }, connection.disconnectTimeout);
                            }
                        });

                        connection.stateChanged(function (data) {
                            if (data.oldState === _signalR.connectionState.reconnecting) {
                                window.clearTimeout(stopReconnectingTimeout);
                            }
                        });

                        connection._.configuredStopReconnectingTimeout = true;
                    }
                };

                _signalR = function signalR(url, qs, logging) {

                    return new _signalR.fn.init(url, qs, logging);
                };

                _signalR._ = {
                    defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8",

                    ieVersion: function () {
                        var version, matches;

                        if (window.navigator.appName === 'Microsoft Internet Explorer') {
                            matches = /MSIE ([0-9]+\.[0-9]+)/.exec(window.navigator.userAgent);

                            if (matches) {
                                version = window.parseFloat(matches[1]);
                            }
                        }

                        return version;
                    }(),

                    error: function error(message, source, context) {
                        var e = new Error(message);
                        e.source = source;

                        if (typeof context !== "undefined") {
                            e.context = context;
                        }

                        return e;
                    },

                    transportError: function transportError(message, transport, source, context) {
                        var e = this.error(message, source, context);
                        e.transport = transport ? transport.name : undefined;
                        return e;
                    },

                    format: function format() {
                        var s = arguments[0];
                        for (var i = 0; i < arguments.length - 1; i++) {
                            s = s.replace("{" + i + "}", arguments[i + 1]);
                        }
                        return s;
                    },

                    firefoxMajorVersion: function firefoxMajorVersion(userAgent) {
                        var matches = userAgent.match(/Firefox\/(\d+)/);
                        if (!matches || !matches.length || matches.length < 2) {
                            return 0;
                        }
                        return parseInt(matches[1], 10);
                    },

                    configurePingInterval: function configurePingInterval(connection) {
                        var config = connection._.config,
                            onFail = function onFail(error) {
                            $(connection).triggerHandler(events.onError, [error]);
                        };

                        if (config && !connection._.pingIntervalId && config.pingInterval) {
                            connection._.pingIntervalId = window.setInterval(function () {
                                _signalR.transports._logic.pingServer(connection).fail(onFail);
                            }, config.pingInterval);
                        }
                    }
                };

                _signalR.events = events;

                _signalR.resources = resources;

                _signalR.ajaxDefaults = ajaxDefaults;

                _signalR.changeState = changeState;

                _signalR.isDisconnecting = isDisconnecting;

                _signalR.connectionState = {
                    connecting: 0,
                    connected: 1,
                    reconnecting: 2,
                    disconnected: 4
                };

                _signalR.hub = {
                    start: function start() {
                        throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'></script>.");
                    }
                };

                _pageWindow.load(function () {
                    _pageLoaded = true;
                });

                function validateTransport(requestedTransport, connection) {

                    if ($.isArray(requestedTransport)) {
                        for (var i = requestedTransport.length - 1; i >= 0; i--) {
                            var transport = requestedTransport[i];
                            if ($.type(transport) !== "string" || !_signalR.transports[transport]) {
                                connection.log("Invalid transport: " + transport + ", removing it from the transports list.");
                                requestedTransport.splice(i, 1);
                            }
                        }

                        if (requestedTransport.length === 0) {
                            connection.log("No transports remain within the specified transport array.");
                            requestedTransport = null;
                        }
                    } else if (!_signalR.transports[requestedTransport] && requestedTransport !== "auto") {
                        connection.log("Invalid transport: " + requestedTransport.toString() + ".");
                        requestedTransport = null;
                    } else if (requestedTransport === "auto" && _signalR._.ieVersion <= 8) {
                        return ["longPolling"];
                    }

                    return requestedTransport;
                }

                function getDefaultPort(protocol) {
                    if (protocol === "http:") {
                        return 80;
                    } else if (protocol === "https:") {
                        return 443;
                    }
                }

                function addDefaultPort(protocol, url) {
                    if (url.match(/:\d+$/)) {
                        return url;
                    } else {
                        return url + ":" + getDefaultPort(protocol);
                    }
                }

                function ConnectingMessageBuffer(connection, drainCallback) {
                    var that = this,
                        buffer = [];

                    that.tryBuffer = function (message) {
                        if (connection.state === $.signalR.connectionState.connecting) {
                            buffer.push(message);

                            return true;
                        }

                        return false;
                    };

                    that.drain = function () {
                        if (connection.state === $.signalR.connectionState.connected) {
                            while (buffer.length > 0) {
                                drainCallback(buffer.shift());
                            }
                        }
                    };

                    that.clear = function () {
                        buffer = [];
                    };
                }

                _signalR.fn = _signalR.prototype = {
                    init: function init(url, qs, logging) {
                        var $connection = $(this);

                        this.url = url;
                        this.qs = qs;
                        this.lastError = null;
                        this._ = {
                            keepAliveData: {},
                            connectingMessageBuffer: new ConnectingMessageBuffer(this, function (message) {
                                $connection.triggerHandler(events.onReceived, [message]);
                            }),
                            lastMessageAt: new Date().getTime(),
                            lastActiveAt: new Date().getTime(),
                            beatInterval: 5000,
                            beatHandle: null,
                            totalTransportConnectTimeout: 0 };
                        if (typeof logging === "boolean") {
                            this.logging = logging;
                        }
                    },

                    _parseResponse: function _parseResponse(response) {
                        var that = this;

                        if (!response) {
                            return response;
                        } else if (typeof response === "string") {
                            return that.json.parse(response);
                        } else {
                            return response;
                        }
                    },

                    _originalJson: window.JSON,

                    json: window.JSON,

                    isCrossDomain: function isCrossDomain(url, against) {
                        var link;

                        url = $.trim(url);

                        against = against || window.location;

                        if (url.indexOf("http") !== 0) {
                            return false;
                        }

                        link = window.document.createElement("a");
                        link.href = url;

                        return link.protocol + addDefaultPort(link.protocol, link.host) !== against.protocol + addDefaultPort(against.protocol, against.host);
                    },

                    ajaxDataType: "text",

                    contentType: "application/json; charset=UTF-8",

                    logging: false,

                    state: _signalR.connectionState.disconnected,

                    clientProtocol: "1.5",

                    reconnectDelay: 2000,

                    transportConnectTimeout: 0,

                    disconnectTimeout: 30000,

                    reconnectWindow: 30000,

                    keepAliveWarnAt: 2 / 3,

                    start: function start(options, callback) {
                        var connection = this,
                            config = {
                            pingInterval: 300000,
                            waitForPageLoad: true,
                            transport: "auto",
                            jsonp: false
                        },
                            _initialize,
                            deferred = connection._deferral || $.Deferred(),
                            parser = window.document.createElement("a");

                        connection.lastError = null;

                        connection._deferral = deferred;

                        if (!connection.json) {
                            throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");
                        }

                        if ($.type(options) === "function") {
                            callback = options;
                        } else if ($.type(options) === "object") {
                            $.extend(config, options);
                            if ($.type(config.callback) === "function") {
                                callback = config.callback;
                            }
                        }

                        config.transport = validateTransport(config.transport, connection);

                        if (!config.transport) {
                            throw new Error("SignalR: Invalid transport(s) specified, aborting start.");
                        }

                        connection._.config = config;

                        if (!_pageLoaded && config.waitForPageLoad === true) {
                            connection._.deferredStartHandler = function () {
                                connection.start(options, callback);
                            };
                            _pageWindow.bind("load", connection._.deferredStartHandler);

                            return deferred.promise();
                        }

                        if (connection.state === _signalR.connectionState.connecting) {
                            return deferred.promise();
                        } else if (changeState(connection, _signalR.connectionState.disconnected, _signalR.connectionState.connecting) === false) {

                            deferred.resolve(connection);
                            return deferred.promise();
                        }

                        configureStopReconnectingTimeout(connection);

                        parser.href = connection.url;
                        if (!parser.protocol || parser.protocol === ":") {
                            connection.protocol = window.document.location.protocol;
                            connection.host = parser.host || window.document.location.host;
                        } else {
                            connection.protocol = parser.protocol;
                            connection.host = parser.host;
                        }

                        connection.baseUrl = connection.protocol + "//" + connection.host;

                        connection.wsProtocol = connection.protocol === "https:" ? "wss://" : "ws://";

                        if (config.transport === "auto" && config.jsonp === true) {
                            config.transport = "longPolling";
                        }

                        if (connection.url.indexOf("//") === 0) {
                            connection.url = window.location.protocol + connection.url;
                            connection.log("Protocol relative URL detected, normalizing it to '" + connection.url + "'.");
                        }

                        if (this.isCrossDomain(connection.url)) {
                            connection.log("Auto detected cross domain url.");

                            if (config.transport === "auto") {
                                config.transport = ["webSockets", "serverSentEvents", "longPolling"];
                            }

                            if (typeof config.withCredentials === "undefined") {
                                config.withCredentials = true;
                            }

                            if (!config.jsonp) {
                                config.jsonp = !$.support.cors;

                                if (config.jsonp) {
                                    connection.log("Using jsonp because this browser doesn't support CORS.");
                                }
                            }

                            connection.contentType = _signalR._.defaultContentType;
                        }

                        connection.withCredentials = config.withCredentials;

                        connection.ajaxDataType = config.jsonp ? "jsonp" : "text";

                        $(connection).bind(events.onStart, function (e, data) {
                            if ($.type(callback) === "function") {
                                callback.call(connection);
                            }
                            deferred.resolve(connection);
                        });

                        connection._.initHandler = _signalR.transports._logic.initHandler(connection);

                        _initialize = function initialize(transports, index) {
                            var noTransportError = _signalR._.error(resources.noTransportOnInit);

                            index = index || 0;
                            if (index >= transports.length) {
                                if (index === 0) {
                                    connection.log("No transports supported by the server were selected.");
                                } else if (index === 1) {
                                    connection.log("No fallback transports were selected.");
                                } else {
                                    connection.log("Fallback transports exhausted.");
                                }

                                $(connection).triggerHandler(events.onError, [noTransportError]);
                                deferred.reject(noTransportError);

                                connection.stop();
                                return;
                            }

                            if (connection.state === _signalR.connectionState.disconnected) {
                                return;
                            }

                            var transportName = transports[index],
                                transport = _signalR.transports[transportName],
                                onFallback = function onFallback() {
                                _initialize(transports, index + 1);
                            };

                            connection.transport = transport;

                            try {
                                connection._.initHandler.start(transport, function () {
                                    var isFirefox11OrGreater = _signalR._.firefoxMajorVersion(window.navigator.userAgent) >= 11,
                                        asyncAbort = !!connection.withCredentials && isFirefox11OrGreater;

                                    connection.log("The start request succeeded. Transitioning to the connected state.");

                                    if (supportsKeepAlive(connection)) {
                                        _signalR.transports._logic.monitorKeepAlive(connection);
                                    }

                                    _signalR.transports._logic.startHeartbeat(connection);

                                    _signalR._.configurePingInterval(connection);

                                    if (!changeState(connection, _signalR.connectionState.connecting, _signalR.connectionState.connected)) {
                                        connection.log("WARNING! The connection was not in the connecting state.");
                                    }

                                    connection._.connectingMessageBuffer.drain();

                                    $(connection).triggerHandler(events.onStart);

                                    _pageWindow.bind("unload", function () {
                                        connection.log("Window unloading, stopping the connection.");

                                        connection.stop(asyncAbort);
                                    });

                                    if (isFirefox11OrGreater) {
                                        _pageWindow.bind("beforeunload", function () {
                                            window.setTimeout(function () {
                                                connection.stop(asyncAbort);
                                            }, 0);
                                        });
                                    }
                                }, onFallback);
                            } catch (error) {
                                connection.log(transport.name + " transport threw '" + error.message + "' when attempting to start.");
                                onFallback();
                            }
                        };

                        var url = connection.url + "/negotiate",
                            onFailed = function onFailed(error, connection) {
                            var err = _signalR._.error(resources.errorOnNegotiate, error, connection._.negotiateRequest);

                            $(connection).triggerHandler(events.onError, err);
                            deferred.reject(err);

                            connection.stop();
                        };

                        $(connection).triggerHandler(events.onStarting);

                        url = _signalR.transports._logic.prepareQueryString(connection, url);

                        connection.log("Negotiating with '" + url + "'.");

                        connection._.negotiateRequest = _signalR.transports._logic.ajax(connection, {
                            url: url,
                            error: function error(_error, statusText) {
                                if (statusText !== _negotiateAbortText) {
                                    onFailed(_error, connection);
                                } else {
                                    deferred.reject(_signalR._.error(resources.stoppedWhileNegotiating, null, connection._.negotiateRequest));
                                }
                            },
                            success: function success(result) {
                                var res,
                                    keepAliveData,
                                    protocolError,
                                    transports = [],
                                    supportedTransports = [];

                                try {
                                    res = connection._parseResponse(result);
                                } catch (error) {
                                    onFailed(_signalR._.error(resources.errorParsingNegotiateResponse, error), connection);
                                    return;
                                }

                                keepAliveData = connection._.keepAliveData;
                                connection.appRelativeUrl = res.Url;
                                connection.id = res.ConnectionId;
                                connection.token = res.ConnectionToken;
                                connection.webSocketServerUrl = res.WebSocketServerUrl;

                                connection._.pollTimeout = res.ConnectionTimeout * 1000 + 10000;
                                connection.disconnectTimeout = res.DisconnectTimeout * 1000;
                                connection._.totalTransportConnectTimeout = connection.transportConnectTimeout + res.TransportConnectTimeout * 1000;

                                if (res.KeepAliveTimeout) {
                                    keepAliveData.activated = true;

                                    keepAliveData.timeout = res.KeepAliveTimeout * 1000;

                                    keepAliveData.timeoutWarning = keepAliveData.timeout * connection.keepAliveWarnAt;

                                    connection._.beatInterval = (keepAliveData.timeout - keepAliveData.timeoutWarning) / 3;
                                } else {
                                    keepAliveData.activated = false;
                                }

                                connection.reconnectWindow = connection.disconnectTimeout + (keepAliveData.timeout || 0);

                                if (!res.ProtocolVersion || res.ProtocolVersion !== connection.clientProtocol) {
                                    protocolError = _signalR._.error(_signalR._.format(resources.protocolIncompatible, connection.clientProtocol, res.ProtocolVersion));
                                    $(connection).triggerHandler(events.onError, [protocolError]);
                                    deferred.reject(protocolError);

                                    return;
                                }

                                $.each(_signalR.transports, function (key) {
                                    if (key.indexOf("_") === 0 || key === "webSockets" && !res.TryWebSockets) {
                                        return true;
                                    }
                                    supportedTransports.push(key);
                                });

                                if ($.isArray(config.transport)) {
                                    $.each(config.transport, function (_, transport) {
                                        if ($.inArray(transport, supportedTransports) >= 0) {
                                            transports.push(transport);
                                        }
                                    });
                                } else if (config.transport === "auto") {
                                    transports = supportedTransports;
                                } else if ($.inArray(config.transport, supportedTransports) >= 0) {
                                    transports.push(config.transport);
                                }

                                _initialize(transports);
                            }
                        });

                        return deferred.promise();
                    },

                    starting: function starting(callback) {
                        var connection = this;
                        $(connection).bind(events.onStarting, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    send: function send(data) {
                        var connection = this;

                        if (connection.state === _signalR.connectionState.disconnected) {
                            throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");
                        }

                        if (connection.state === _signalR.connectionState.connecting) {
                            throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");
                        }

                        connection.transport.send(connection, data);

                        return connection;
                    },

                    received: function received(callback) {
                        var connection = this;
                        $(connection).bind(events.onReceived, function (e, data) {
                            callback.call(connection, data);
                        });
                        return connection;
                    },

                    stateChanged: function stateChanged(callback) {
                        var connection = this;
                        $(connection).bind(events.onStateChanged, function (e, data) {
                            callback.call(connection, data);
                        });
                        return connection;
                    },

                    error: function error(callback) {
                        var connection = this;
                        $(connection).bind(events.onError, function (e, errorData, sendData) {
                            connection.lastError = errorData;

                            callback.call(connection, errorData, sendData);
                        });
                        return connection;
                    },

                    disconnected: function disconnected(callback) {
                        var connection = this;
                        $(connection).bind(events.onDisconnect, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    connectionSlow: function connectionSlow(callback) {
                        var connection = this;
                        $(connection).bind(events.onConnectionSlow, function (e, data) {
                            callback.call(connection);
                        });

                        return connection;
                    },

                    reconnecting: function reconnecting(callback) {
                        var connection = this;
                        $(connection).bind(events.onReconnecting, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    reconnected: function reconnected(callback) {
                        var connection = this;
                        $(connection).bind(events.onReconnect, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    stop: function stop(async, notifyServer) {
                        var connection = this,
                            deferral = connection._deferral;

                        if (connection._.deferredStartHandler) {
                            _pageWindow.unbind("load", connection._.deferredStartHandler);
                        }

                        delete connection._.config;
                        delete connection._.deferredStartHandler;

                        if (!_pageLoaded && (!connection._.config || connection._.config.waitForPageLoad === true)) {
                            connection.log("Stopping connection prior to negotiate.");

                            if (deferral) {
                                deferral.reject(_signalR._.error(resources.stoppedWhileLoading));
                            }

                            return;
                        }

                        if (connection.state === _signalR.connectionState.disconnected) {
                            return;
                        }

                        connection.log("Stopping connection.");

                        changeState(connection, connection.state, _signalR.connectionState.disconnected);

                        window.clearTimeout(connection._.beatHandle);
                        window.clearInterval(connection._.pingIntervalId);

                        if (connection.transport) {
                            connection.transport.stop(connection);

                            if (notifyServer !== false) {
                                connection.transport.abort(connection, async);
                            }

                            if (supportsKeepAlive(connection)) {
                                _signalR.transports._logic.stopMonitoringKeepAlive(connection);
                            }

                            connection.transport = null;
                        }

                        if (connection._.negotiateRequest) {
                            connection._.negotiateRequest.abort(_negotiateAbortText);
                            delete connection._.negotiateRequest;
                        }

                        if (connection._.initHandler) {
                            connection._.initHandler.stop();
                        }

                        $(connection).triggerHandler(events.onDisconnect);

                        delete connection._deferral;
                        delete connection.messageId;
                        delete connection.groupsToken;
                        delete connection.id;
                        delete connection._.pingIntervalId;
                        delete connection._.lastMessageAt;
                        delete connection._.lastActiveAt;

                        connection._.connectingMessageBuffer.clear();

                        return connection;
                    },

                    log: function log(msg) {
                        _log(msg, this.logging);
                    }
                };

                _signalR.fn.init.prototype = _signalR.fn;

                _signalR.noConflict = function () {
                    if ($.connection === _signalR) {
                        $.connection = _connection;
                    }
                    return _signalR;
                };

                if ($.connection) {
                    _connection = $.connection;
                }

                $.connection = $.signalR = _signalR;
            })(window.jQuery, window);


            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    startAbortText = "__Start Aborted__",
                    transportLogic;

                signalR.transports = {};

                function beat(connection) {
                    if (connection._.keepAliveData.monitoring) {
                        checkIfAlive(connection);
                    }

                    if (transportLogic.markActive(connection)) {
                        connection._.beatHandle = window.setTimeout(function () {
                            beat(connection);
                        }, connection._.beatInterval);
                    }
                }

                function checkIfAlive(connection) {
                    var keepAliveData = connection._.keepAliveData,
                        timeElapsed;

                    if (connection.state === signalR.connectionState.connected) {
                        timeElapsed = new Date().getTime() - connection._.lastMessageAt;

                        if (timeElapsed >= keepAliveData.timeout) {
                            connection.log("Keep alive timed out.  Notifying transport that connection has been lost.");

                            connection.transport.lostConnection(connection);
                        } else if (timeElapsed >= keepAliveData.timeoutWarning) {
                            if (!keepAliveData.userNotified) {
                                connection.log("Keep alive has been missed, connection may be dead/slow.");
                                $(connection).triggerHandler(events.onConnectionSlow);
                                keepAliveData.userNotified = true;
                            }
                        } else {
                            keepAliveData.userNotified = false;
                        }
                    }
                }

                function getAjaxUrl(connection, path) {
                    var url = connection.url + path;

                    if (connection.transport) {
                        url += "?transport=" + connection.transport.name;
                    }

                    return transportLogic.prepareQueryString(connection, url);
                }

                function InitHandler(connection) {
                    this.connection = connection;

                    this.startRequested = false;
                    this.startCompleted = false;
                    this.connectionStopped = false;
                }

                InitHandler.prototype = {
                    start: function start(transport, onSuccess, onFallback) {
                        var that = this,
                            connection = that.connection,
                            failCalled = false;

                        if (that.startRequested || that.connectionStopped) {
                            connection.log("WARNING! " + transport.name + " transport cannot be started. Initialization ongoing or completed.");
                            return;
                        }

                        connection.log(transport.name + " transport starting.");

                        that.transportTimeoutHandle = window.setTimeout(function () {
                            if (!failCalled) {
                                failCalled = true;
                                connection.log(transport.name + " transport timed out when trying to connect.");
                                that.transportFailed(transport, undefined, onFallback);
                            }
                        }, connection._.totalTransportConnectTimeout);

                        transport.start(connection, function () {
                            if (!failCalled) {
                                that.initReceived(transport, onSuccess);
                            }
                        }, function (error) {
                            if (!failCalled) {
                                failCalled = true;
                                that.transportFailed(transport, error, onFallback);
                            }

                            return !that.startCompleted || that.connectionStopped;
                        });
                    },

                    stop: function stop() {
                        this.connectionStopped = true;
                        window.clearTimeout(this.transportTimeoutHandle);
                        signalR.transports._logic.tryAbortStartRequest(this.connection);
                    },

                    initReceived: function initReceived(transport, onSuccess) {
                        var that = this,
                            connection = that.connection;

                        if (that.startRequested) {
                            connection.log("WARNING! The client received multiple init messages.");
                            return;
                        }

                        if (that.connectionStopped) {
                            return;
                        }

                        that.startRequested = true;
                        window.clearTimeout(that.transportTimeoutHandle);

                        connection.log(transport.name + " transport connected. Initiating start request.");
                        signalR.transports._logic.ajaxStart(connection, function () {
                            that.startCompleted = true;
                            onSuccess();
                        });
                    },

                    transportFailed: function transportFailed(transport, error, onFallback) {
                        var connection = this.connection,
                            deferred = connection._deferral,
                            wrappedError;

                        if (this.connectionStopped) {
                            return;
                        }

                        window.clearTimeout(this.transportTimeoutHandle);

                        if (!this.startRequested) {
                            transport.stop(connection);

                            connection.log(transport.name + " transport failed to connect. Attempting to fall back.");
                            onFallback();
                        } else if (!this.startCompleted) {
                            wrappedError = signalR._.error(signalR.resources.errorDuringStartRequest, error);

                            connection.log(transport.name + " transport failed during the start request. Stopping the connection.");
                            $(connection).triggerHandler(events.onError, [wrappedError]);
                            if (deferred) {
                                deferred.reject(wrappedError);
                            }

                            connection.stop();
                        } else {}
                    }
                };

                transportLogic = signalR.transports._logic = {
                    ajax: function ajax(connection, options) {
                        return $.ajax($.extend(true, {}, $.signalR.ajaxDefaults, {
                            type: "GET",
                            data: {},
                            xhrFields: { withCredentials: connection.withCredentials },
                            contentType: connection.contentType,
                            dataType: connection.ajaxDataType
                        }, options));
                    },

                    pingServer: function pingServer(connection) {
                        var url,
                            xhr,
                            deferral = $.Deferred();

                        if (connection.transport) {
                            url = connection.url + "/ping";

                            url = transportLogic.addQs(url, connection.qs);

                            xhr = transportLogic.ajax(connection, {
                                url: url,
                                success: function success(result) {
                                    var data;

                                    try {
                                        data = connection._parseResponse(result);
                                    } catch (error) {
                                        deferral.reject(signalR._.transportError(signalR.resources.pingServerFailedParse, connection.transport, error, xhr));
                                        connection.stop();
                                        return;
                                    }

                                    if (data.Response === "pong") {
                                        deferral.resolve();
                                    } else {
                                        deferral.reject(signalR._.transportError(signalR._.format(signalR.resources.pingServerFailedInvalidResponse, result), connection.transport, null, xhr));
                                    }
                                },
                                error: function error(_error2) {
                                    if (_error2.status === 401 || _error2.status === 403) {
                                        deferral.reject(signalR._.transportError(signalR._.format(signalR.resources.pingServerFailedStatusCode, _error2.status), connection.transport, _error2, xhr));
                                        connection.stop();
                                    } else {
                                        deferral.reject(signalR._.transportError(signalR.resources.pingServerFailed, connection.transport, _error2, xhr));
                                    }
                                }
                            });
                        } else {
                            deferral.reject(signalR._.transportError(signalR.resources.noConnectionTransport, connection.transport));
                        }

                        return deferral.promise();
                    },

                    prepareQueryString: function prepareQueryString(connection, url) {
                        var preparedUrl;

                        preparedUrl = transportLogic.addQs(url, "clientProtocol=" + connection.clientProtocol);

                        preparedUrl = transportLogic.addQs(preparedUrl, connection.qs);

                        if (connection.token) {
                            preparedUrl += "&connectionToken=" + window.encodeURIComponent(connection.token);
                        }

                        if (connection.data) {
                            preparedUrl += "&connectionData=" + window.encodeURIComponent(connection.data);
                        }

                        return preparedUrl;
                    },

                    addQs: function addQs(url, qs) {
                        var appender = url.indexOf("?") !== -1 ? "&" : "?",
                            firstChar;

                        if (!qs) {
                            return url;
                        }

                        if ((typeof qs === "undefined" ? "undefined" : _typeof(qs)) === "object") {
                            return url + appender + $.param(qs);
                        }

                        if (typeof qs === "string") {
                            firstChar = qs.charAt(0);

                            if (firstChar === "?" || firstChar === "&") {
                                appender = "";
                            }

                            return url + appender + qs;
                        }

                        throw new Error("Query string property must be either a string or object.");
                    },

                    getUrl: function getUrl(connection, transport, reconnecting, poll, ajaxPost) {
                        var baseUrl = transport === "webSockets" ? "" : connection.baseUrl,
                            url = baseUrl + connection.appRelativeUrl,
                            qs = "transport=" + transport;

                        if (!ajaxPost && connection.groupsToken) {
                            qs += "&groupsToken=" + window.encodeURIComponent(connection.groupsToken);
                        }

                        if (!reconnecting) {
                            url += "/connect";
                        } else {
                            if (poll) {
                                url += "/poll";
                            } else {
                                url += "/reconnect";
                            }

                            if (!ajaxPost && connection.messageId) {
                                qs += "&messageId=" + window.encodeURIComponent(connection.messageId);
                            }
                        }
                        url += "?" + qs;
                        url = transportLogic.prepareQueryString(connection, url);

                        if (!ajaxPost) {
                            url += "&tid=" + Math.floor(Math.random() * 11);
                        }

                        return url;
                    },

                    maximizePersistentResponse: function maximizePersistentResponse(minPersistentResponse) {
                        return {
                            MessageId: minPersistentResponse.C,
                            Messages: minPersistentResponse.M,
                            Initialized: typeof minPersistentResponse.S !== "undefined" ? true : false,
                            ShouldReconnect: typeof minPersistentResponse.T !== "undefined" ? true : false,
                            LongPollDelay: minPersistentResponse.L,
                            GroupsToken: minPersistentResponse.G
                        };
                    },

                    updateGroups: function updateGroups(connection, groupsToken) {
                        if (groupsToken) {
                            connection.groupsToken = groupsToken;
                        }
                    },

                    stringifySend: function stringifySend(connection, message) {
                        if (typeof message === "string" || typeof message === "undefined" || message === null) {
                            return message;
                        }
                        return connection.json.stringify(message);
                    },

                    ajaxSend: function ajaxSend(connection, data) {
                        var payload = transportLogic.stringifySend(connection, data),
                            url = getAjaxUrl(connection, "/send"),
                            xhr,
                            onFail = function onFail(error, connection) {
                            $(connection).triggerHandler(events.onError, [signalR._.transportError(signalR.resources.sendFailed, connection.transport, error, xhr), data]);
                        };

                        xhr = transportLogic.ajax(connection, {
                            url: url,
                            type: connection.ajaxDataType === "jsonp" ? "GET" : "POST",
                            contentType: signalR._.defaultContentType,
                            data: {
                                data: payload
                            },
                            success: function success(result) {
                                var res;

                                if (result) {
                                    try {
                                        res = connection._parseResponse(result);
                                    } catch (error) {
                                        onFail(error, connection);
                                        connection.stop();
                                        return;
                                    }

                                    transportLogic.triggerReceived(connection, res);
                                }
                            },
                            error: function error(_error3, textStatus) {
                                if (textStatus === "abort" || textStatus === "parsererror") {
                                    return;
                                }

                                onFail(_error3, connection);
                            }
                        });

                        return xhr;
                    },

                    ajaxAbort: function ajaxAbort(connection, async) {
                        if (typeof connection.transport === "undefined") {
                            return;
                        }

                        async = typeof async === "undefined" ? true : async;

                        var url = getAjaxUrl(connection, "/abort");

                        transportLogic.ajax(connection, {
                            url: url,
                            async: async,
                            timeout: 1000,
                            type: "POST"
                        });

                        connection.log("Fired ajax abort async = " + async + ".");
                    },

                    ajaxStart: function ajaxStart(connection, onSuccess) {
                        var rejectDeferred = function rejectDeferred(error) {
                            var deferred = connection._deferral;
                            if (deferred) {
                                deferred.reject(error);
                            }
                        },
                            triggerStartError = function triggerStartError(error) {
                            connection.log("The start request failed. Stopping the connection.");
                            $(connection).triggerHandler(events.onError, [error]);
                            rejectDeferred(error);
                            connection.stop();
                        };

                        connection._.startRequest = transportLogic.ajax(connection, {
                            url: getAjaxUrl(connection, "/start"),
                            success: function success(result, statusText, xhr) {
                                var data;

                                try {
                                    data = connection._parseResponse(result);
                                } catch (error) {
                                    triggerStartError(signalR._.error(signalR._.format(signalR.resources.errorParsingStartResponse, result), error, xhr));
                                    return;
                                }

                                if (data.Response === "started") {
                                    onSuccess();
                                } else {
                                    triggerStartError(signalR._.error(signalR._.format(signalR.resources.invalidStartResponse, result), null, xhr));
                                }
                            },
                            error: function error(xhr, statusText, _error4) {
                                if (statusText !== startAbortText) {
                                    triggerStartError(signalR._.error(signalR.resources.errorDuringStartRequest, _error4, xhr));
                                } else {
                                    connection.log("The start request aborted because connection.stop() was called.");
                                    rejectDeferred(signalR._.error(signalR.resources.stoppedDuringStartRequest, null, xhr));
                                }
                            }
                        });
                    },

                    tryAbortStartRequest: function tryAbortStartRequest(connection) {
                        if (connection._.startRequest) {
                            connection._.startRequest.abort(startAbortText);
                            delete connection._.startRequest;
                        }
                    },

                    tryInitialize: function tryInitialize(persistentResponse, onInitialized) {
                        if (persistentResponse.Initialized) {
                            onInitialized();
                        }
                    },

                    triggerReceived: function triggerReceived(connection, data) {
                        if (!connection._.connectingMessageBuffer.tryBuffer(data)) {
                            $(connection).triggerHandler(events.onReceived, [data]);
                        }
                    },

                    processMessages: function processMessages(connection, minData, onInitialized) {
                        var data;

                        transportLogic.markLastMessage(connection);

                        if (minData) {
                            data = transportLogic.maximizePersistentResponse(minData);

                            transportLogic.updateGroups(connection, data.GroupsToken);

                            if (data.MessageId) {
                                connection.messageId = data.MessageId;
                            }

                            if (data.Messages) {
                                $.each(data.Messages, function (index, message) {
                                    transportLogic.triggerReceived(connection, message);
                                });

                                transportLogic.tryInitialize(data, onInitialized);
                            }
                        }
                    },

                    monitorKeepAlive: function monitorKeepAlive(connection) {
                        var keepAliveData = connection._.keepAliveData;

                        if (!keepAliveData.monitoring) {
                            keepAliveData.monitoring = true;

                            transportLogic.markLastMessage(connection);

                            connection._.keepAliveData.reconnectKeepAliveUpdate = function () {
                                transportLogic.markLastMessage(connection);
                            };

                            $(connection).bind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);

                            connection.log("Now monitoring keep alive with a warning timeout of " + keepAliveData.timeoutWarning + ", keep alive timeout of " + keepAliveData.timeout + " and disconnecting timeout of " + connection.disconnectTimeout);
                        } else {
                            connection.log("Tried to monitor keep alive but it's already being monitored.");
                        }
                    },

                    stopMonitoringKeepAlive: function stopMonitoringKeepAlive(connection) {
                        var keepAliveData = connection._.keepAliveData;

                        if (keepAliveData.monitoring) {
                            keepAliveData.monitoring = false;

                            $(connection).unbind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);

                            connection._.keepAliveData = {};
                            connection.log("Stopping the monitoring of the keep alive.");
                        }
                    },

                    startHeartbeat: function startHeartbeat(connection) {
                        connection._.lastActiveAt = new Date().getTime();
                        beat(connection);
                    },

                    markLastMessage: function markLastMessage(connection) {
                        connection._.lastMessageAt = new Date().getTime();
                    },

                    markActive: function markActive(connection) {
                        if (transportLogic.verifyLastActive(connection)) {
                            connection._.lastActiveAt = new Date().getTime();
                            return true;
                        }

                        return false;
                    },

                    isConnectedOrReconnecting: function isConnectedOrReconnecting(connection) {
                        return connection.state === signalR.connectionState.connected || connection.state === signalR.connectionState.reconnecting;
                    },

                    ensureReconnectingState: function ensureReconnectingState(connection) {
                        if (changeState(connection, signalR.connectionState.connected, signalR.connectionState.reconnecting) === true) {
                            $(connection).triggerHandler(events.onReconnecting);
                        }
                        return connection.state === signalR.connectionState.reconnecting;
                    },

                    clearReconnectTimeout: function clearReconnectTimeout(connection) {
                        if (connection && connection._.reconnectTimeout) {
                            window.clearTimeout(connection._.reconnectTimeout);
                            delete connection._.reconnectTimeout;
                        }
                    },

                    verifyLastActive: function verifyLastActive(connection) {
                        if (new Date().getTime() - connection._.lastActiveAt >= connection.reconnectWindow) {
                            var message = signalR._.format(signalR.resources.reconnectWindowTimeout, new Date(connection._.lastActiveAt), connection.reconnectWindow);
                            connection.log(message);
                            $(connection).triggerHandler(events.onError, [signalR._.error(message, "TimeoutException")]);
                            connection.stop(false, false);
                            return false;
                        }

                        return true;
                    },

                    reconnect: function reconnect(connection, transportName) {
                        var transport = signalR.transports[transportName];

                        if (transportLogic.isConnectedOrReconnecting(connection) && !connection._.reconnectTimeout) {
                            if (!transportLogic.verifyLastActive(connection)) {
                                return;
                            }

                            connection._.reconnectTimeout = window.setTimeout(function () {
                                if (!transportLogic.verifyLastActive(connection)) {
                                    return;
                                }

                                transport.stop(connection);

                                if (transportLogic.ensureReconnectingState(connection)) {
                                    connection.log(transportName + " reconnecting.");
                                    transport.start(connection);
                                }
                            }, connection.reconnectDelay);
                        }
                    },

                    handleParseFailure: function handleParseFailure(connection, result, error, onFailed, context) {
                        var wrappedError = signalR._.transportError(signalR._.format(signalR.resources.parseFailed, result), connection.transport, error, context);

                        if (onFailed && onFailed(wrappedError)) {
                            connection.log("Failed to parse server response while attempting to connect.");
                        } else {
                            $(connection).triggerHandler(events.onError, [wrappedError]);
                            connection.stop();
                        }
                    },

                    initHandler: function initHandler(connection) {
                        return new InitHandler(connection);
                    },

                    foreverFrame: {
                        count: 0,
                        connections: {}
                    }
                };
            })(window.jQuery, window);


            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    transportLogic = signalR.transports._logic;

                signalR.transports.webSockets = {
                    name: "webSockets",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return true;
                    },

                    send: function send(connection, data) {
                        var payload = transportLogic.stringifySend(connection, data);

                        try {
                            connection.socket.send(payload);
                        } catch (ex) {
                            $(connection).triggerHandler(events.onError, [signalR._.transportError(signalR.resources.webSocketsInvalidState, connection.transport, ex, connection.socket), data]);
                        }
                    },

                    start: function start(connection, onSuccess, onFailed) {
                        var url,
                            opened = false,
                            that = this,
                            reconnecting = !onSuccess,
                            $connection = $(connection);

                        if (!window.WebSocket) {
                            onFailed();
                            return;
                        }

                        if (!connection.socket) {
                            if (connection.webSocketServerUrl) {
                                url = connection.webSocketServerUrl;
                            } else {
                                url = connection.wsProtocol + connection.host;
                            }

                            url += transportLogic.getUrl(connection, this.name, reconnecting);

                            connection.log("Connecting to websocket endpoint '" + url + "'.");
                            connection.socket = new window.WebSocket(url);

                            connection.socket.onopen = function () {
                                opened = true;
                                connection.log("Websocket opened.");

                                transportLogic.clearReconnectTimeout(connection);

                                if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                                    $connection.triggerHandler(events.onReconnect);
                                }
                            };

                            connection.socket.onclose = function (event) {
                                var error;

                                if (this === connection.socket) {
                                    if (opened && typeof event.wasClean !== "undefined" && event.wasClean === false) {
                                        error = signalR._.transportError(signalR.resources.webSocketClosed, connection.transport, event);

                                        connection.log("Unclean disconnect from websocket: " + (event.reason || "[no reason given]."));
                                    } else {
                                        connection.log("Websocket closed.");
                                    }

                                    if (!onFailed || !onFailed(error)) {
                                        if (error) {
                                            $(connection).triggerHandler(events.onError, [error]);
                                        }

                                        that.reconnect(connection);
                                    }
                                }
                            };

                            connection.socket.onmessage = function (event) {
                                var data;

                                try {
                                    data = connection._parseResponse(event.data);
                                } catch (error) {
                                    transportLogic.handleParseFailure(connection, event.data, error, onFailed, event);
                                    return;
                                }

                                if (data) {
                                    if ($.isEmptyObject(data) || data.M) {
                                        transportLogic.processMessages(connection, data, onSuccess);
                                    } else {
                                        transportLogic.triggerReceived(connection, data);
                                    }
                                }
                            };
                        }
                    },

                    reconnect: function reconnect(connection) {
                        transportLogic.reconnect(connection, this.name);
                    },

                    lostConnection: function lostConnection(connection) {
                        this.reconnect(connection);
                    },

                    stop: function stop(connection) {
                        transportLogic.clearReconnectTimeout(connection);

                        if (connection.socket) {
                            connection.log("Closing the Websocket.");
                            connection.socket.close();
                            connection.socket = null;
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    }
                };
            })(window.jQuery, window);


            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    transportLogic = signalR.transports._logic,
                    clearReconnectAttemptTimeout = function clearReconnectAttemptTimeout(connection) {
                    window.clearTimeout(connection._.reconnectAttemptTimeoutHandle);
                    delete connection._.reconnectAttemptTimeoutHandle;
                };

                signalR.transports.serverSentEvents = {
                    name: "serverSentEvents",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return true;
                    },

                    timeOut: 3000,

                    start: function start(connection, onSuccess, onFailed) {
                        var that = this,
                            opened = false,
                            $connection = $(connection),
                            reconnecting = !onSuccess,
                            url;

                        if (connection.eventSource) {
                            connection.log("The connection already has an event source. Stopping it.");
                            connection.stop();
                        }

                        if (!window.EventSource) {
                            if (onFailed) {
                                connection.log("This browser doesn't support SSE.");
                                onFailed();
                            }
                            return;
                        }

                        url = transportLogic.getUrl(connection, this.name, reconnecting);

                        try {
                            connection.log("Attempting to connect to SSE endpoint '" + url + "'.");
                            connection.eventSource = new window.EventSource(url, { withCredentials: connection.withCredentials });
                        } catch (e) {
                            connection.log("EventSource failed trying to connect with error " + e.Message + ".");
                            if (onFailed) {
                                onFailed();
                            } else {
                                $connection.triggerHandler(events.onError, [signalR._.transportError(signalR.resources.eventSourceFailedToConnect, connection.transport, e)]);
                                if (reconnecting) {
                                    that.reconnect(connection);
                                }
                            }
                            return;
                        }

                        if (reconnecting) {
                            connection._.reconnectAttemptTimeoutHandle = window.setTimeout(function () {
                                if (opened === false) {
                                    if (connection.eventSource.readyState !== window.EventSource.OPEN) {
                                        that.reconnect(connection);
                                    }
                                }
                            }, that.timeOut);
                        }

                        connection.eventSource.addEventListener("open", function (e) {
                            connection.log("EventSource connected.");

                            clearReconnectAttemptTimeout(connection);
                            transportLogic.clearReconnectTimeout(connection);

                            if (opened === false) {
                                opened = true;

                                if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                                    $connection.triggerHandler(events.onReconnect);
                                }
                            }
                        }, false);

                        connection.eventSource.addEventListener("message", function (e) {
                            var res;

                            if (e.data === "initialized") {
                                return;
                            }

                            try {
                                res = connection._parseResponse(e.data);
                            } catch (error) {
                                transportLogic.handleParseFailure(connection, e.data, error, onFailed, e);
                                return;
                            }

                            transportLogic.processMessages(connection, res, onSuccess);
                        }, false);

                        connection.eventSource.addEventListener("error", function (e) {
                            var error = signalR._.transportError(signalR.resources.eventSourceError, connection.transport, e);

                            if (this !== connection.eventSource) {
                                return;
                            }

                            if (onFailed && onFailed(error)) {
                                return;
                            }

                            connection.log("EventSource readyState: " + connection.eventSource.readyState + ".");

                            if (e.eventPhase === window.EventSource.CLOSED) {
                                connection.log("EventSource reconnecting due to the server connection ending.");
                                that.reconnect(connection);
                            } else {
                                connection.log("EventSource error.");
                                $connection.triggerHandler(events.onError, [error]);
                            }
                        }, false);
                    },

                    reconnect: function reconnect(connection) {
                        transportLogic.reconnect(connection, this.name);
                    },

                    lostConnection: function lostConnection(connection) {
                        this.reconnect(connection);
                    },

                    send: function send(connection, data) {
                        transportLogic.ajaxSend(connection, data);
                    },

                    stop: function stop(connection) {
                        clearReconnectAttemptTimeout(connection);
                        transportLogic.clearReconnectTimeout(connection);

                        if (connection && connection.eventSource) {
                            connection.log("EventSource calling close().");
                            connection.eventSource.close();
                            connection.eventSource = null;
                            delete connection.eventSource;
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    }
                };
            })(window.jQuery, window);


            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    transportLogic = signalR.transports._logic,
                    createFrame = function createFrame() {
                    var frame = window.document.createElement("iframe");
                    frame.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;");
                    return frame;
                },
                    loadPreventer = function () {
                    var loadingFixIntervalId = null,
                        loadingFixInterval = 1000,
                        attachedTo = 0;

                    return {
                        prevent: function prevent() {
                            if (signalR._.ieVersion <= 8) {
                                if (attachedTo === 0) {
                                    loadingFixIntervalId = window.setInterval(function () {
                                        var tempFrame = createFrame();

                                        window.document.body.appendChild(tempFrame);
                                        window.document.body.removeChild(tempFrame);

                                        tempFrame = null;
                                    }, loadingFixInterval);
                                }

                                attachedTo++;
                            }
                        },
                        cancel: function cancel() {
                            if (attachedTo === 1) {
                                window.clearInterval(loadingFixIntervalId);
                            }

                            if (attachedTo > 0) {
                                attachedTo--;
                            }
                        }
                    };
                }();

                signalR.transports.foreverFrame = {
                    name: "foreverFrame",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return true;
                    },

                    iframeClearThreshold: 50,

                    start: function start(connection, onSuccess, onFailed) {
                        var that = this,
                            frameId = transportLogic.foreverFrame.count += 1,
                            url,
                            frame = createFrame(),
                            frameLoadHandler = function frameLoadHandler() {
                            connection.log("Forever frame iframe finished loading and is no longer receiving messages.");
                            if (!onFailed || !onFailed()) {
                                that.reconnect(connection);
                            }
                        };

                        if (window.EventSource) {
                            if (onFailed) {
                                connection.log("Forever Frame is not supported by SignalR on browsers with SSE support.");
                                onFailed();
                            }
                            return;
                        }

                        frame.setAttribute("data-signalr-connection-id", connection.id);

                        loadPreventer.prevent();

                        url = transportLogic.getUrl(connection, this.name);
                        url += "&frameId=" + frameId;

                        window.document.documentElement.appendChild(frame);

                        connection.log("Binding to iframe's load event.");

                        if (frame.addEventListener) {
                            frame.addEventListener("load", frameLoadHandler, false);
                        } else if (frame.attachEvent) {
                            frame.attachEvent("onload", frameLoadHandler);
                        }

                        frame.src = url;
                        transportLogic.foreverFrame.connections[frameId] = connection;

                        connection.frame = frame;
                        connection.frameId = frameId;

                        if (onSuccess) {
                            connection.onSuccess = function () {
                                connection.log("Iframe transport started.");
                                onSuccess();
                            };
                        }
                    },

                    reconnect: function reconnect(connection) {
                        var that = this;

                        if (transportLogic.isConnectedOrReconnecting(connection) && transportLogic.verifyLastActive(connection)) {
                            window.setTimeout(function () {
                                if (!transportLogic.verifyLastActive(connection)) {
                                    return;
                                }

                                if (connection.frame && transportLogic.ensureReconnectingState(connection)) {
                                    var frame = connection.frame,
                                        src = transportLogic.getUrl(connection, that.name, true) + "&frameId=" + connection.frameId;
                                    connection.log("Updating iframe src to '" + src + "'.");
                                    frame.src = src;
                                }
                            }, connection.reconnectDelay);
                        }
                    },

                    lostConnection: function lostConnection(connection) {
                        this.reconnect(connection);
                    },

                    send: function send(connection, data) {
                        transportLogic.ajaxSend(connection, data);
                    },

                    receive: function receive(connection, data) {
                        var cw, body, response;

                        if (connection.json !== connection._originalJson) {
                            data = connection._originalJson.stringify(data);
                        }

                        response = connection._parseResponse(data);

                        transportLogic.processMessages(connection, response, connection.onSuccess);

                        if (connection.state === $.signalR.connectionState.connected) {
                            connection.frameMessageCount = (connection.frameMessageCount || 0) + 1;
                            if (connection.frameMessageCount > signalR.transports.foreverFrame.iframeClearThreshold) {
                                connection.frameMessageCount = 0;
                                cw = connection.frame.contentWindow || connection.frame.contentDocument;
                                if (cw && cw.document && cw.document.body) {
                                    body = cw.document.body;

                                    while (body.firstChild) {
                                        body.removeChild(body.firstChild);
                                    }
                                }
                            }
                        }
                    },

                    stop: function stop(connection) {
                        var cw = null;

                        loadPreventer.cancel();

                        if (connection.frame) {
                            if (connection.frame.stop) {
                                connection.frame.stop();
                            } else {
                                try {
                                    cw = connection.frame.contentWindow || connection.frame.contentDocument;
                                    if (cw.document && cw.document.execCommand) {
                                        cw.document.execCommand("Stop");
                                    }
                                } catch (e) {
                                    connection.log("Error occured when stopping foreverFrame transport. Message = " + e.message + ".");
                                }
                            }

                            if (connection.frame.parentNode === window.document.body) {
                                window.document.body.removeChild(connection.frame);
                            }

                            delete transportLogic.foreverFrame.connections[connection.frameId];
                            connection.frame = null;
                            connection.frameId = null;
                            delete connection.frame;
                            delete connection.frameId;
                            delete connection.onSuccess;
                            delete connection.frameMessageCount;
                            connection.log("Stopping forever frame.");
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    },

                    getConnection: function getConnection(id) {
                        return transportLogic.foreverFrame.connections[id];
                    },

                    started: function started(connection) {
                        if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {

                            $(connection).triggerHandler(events.onReconnect);
                        }
                    }
                };
            })(window.jQuery, window);


            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    isDisconnecting = $.signalR.isDisconnecting,
                    transportLogic = signalR.transports._logic;

                signalR.transports.longPolling = {
                    name: "longPolling",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return false;
                    },

                    reconnectDelay: 3000,

                    start: function start(connection, onSuccess, onFailed) {
                        var that = this,
                            _fireConnect = function fireConnect() {
                            _fireConnect = $.noop;

                            connection.log("LongPolling connected.");
                            onSuccess();
                        },
                            tryFailConnect = function tryFailConnect(error) {
                            if (onFailed(error)) {
                                connection.log("LongPolling failed to connect.");
                                return true;
                            }

                            return false;
                        },
                            privateData = connection._,
                            reconnectErrors = 0,
                            fireReconnected = function fireReconnected(instance) {
                            window.clearTimeout(privateData.reconnectTimeoutId);
                            privateData.reconnectTimeoutId = null;

                            if (changeState(instance, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                                instance.log("Raising the reconnect event");
                                $(instance).triggerHandler(events.onReconnect);
                            }
                        },
                            maxFireReconnectedTimeout = 3600000;

                        if (connection.pollXhr) {
                            connection.log("Polling xhr requests already exists, aborting.");
                            connection.stop();
                        }

                        connection.messageId = null;

                        privateData.reconnectTimeoutId = null;

                        privateData.pollTimeoutId = window.setTimeout(function () {
                            (function poll(instance, raiseReconnect) {
                                var messageId = instance.messageId,
                                    connect = messageId === null,
                                    reconnecting = !connect,
                                    polling = !raiseReconnect,
                                    url = transportLogic.getUrl(instance, that.name, reconnecting, polling, true),
                                    postData = {};

                                if (instance.messageId) {
                                    postData.messageId = instance.messageId;
                                }

                                if (instance.groupsToken) {
                                    postData.groupsToken = instance.groupsToken;
                                }

                                if (isDisconnecting(instance) === true) {
                                    return;
                                }

                                connection.log("Opening long polling request to '" + url + "'.");
                                instance.pollXhr = transportLogic.ajax(connection, {
                                    xhrFields: {
                                        onprogress: function onprogress() {
                                            transportLogic.markLastMessage(connection);
                                        }
                                    },
                                    url: url,
                                    type: "POST",
                                    contentType: signalR._.defaultContentType,
                                    data: postData,
                                    timeout: connection._.pollTimeout,
                                    success: function success(result) {
                                        var minData,
                                            delay = 0,
                                            data,
                                            shouldReconnect;

                                        connection.log("Long poll complete.");

                                        reconnectErrors = 0;

                                        try {
                                            minData = connection._parseResponse(result);
                                        } catch (error) {
                                            transportLogic.handleParseFailure(instance, result, error, tryFailConnect, instance.pollXhr);
                                            return;
                                        }

                                        if (privateData.reconnectTimeoutId !== null) {
                                            fireReconnected(instance);
                                        }

                                        if (minData) {
                                            data = transportLogic.maximizePersistentResponse(minData);
                                        }

                                        transportLogic.processMessages(instance, minData, _fireConnect);

                                        if (data && $.type(data.LongPollDelay) === "number") {
                                            delay = data.LongPollDelay;
                                        }

                                        if (isDisconnecting(instance) === true) {
                                            return;
                                        }

                                        shouldReconnect = data && data.ShouldReconnect;
                                        if (shouldReconnect) {
                                            if (!transportLogic.ensureReconnectingState(instance)) {
                                                return;
                                            }
                                        }

                                        if (delay > 0) {
                                            privateData.pollTimeoutId = window.setTimeout(function () {
                                                poll(instance, shouldReconnect);
                                            }, delay);
                                        } else {
                                            poll(instance, shouldReconnect);
                                        }
                                    },

                                    error: function error(data, textStatus) {
                                        var error = signalR._.transportError(signalR.resources.longPollFailed, connection.transport, data, instance.pollXhr);

                                        window.clearTimeout(privateData.reconnectTimeoutId);
                                        privateData.reconnectTimeoutId = null;

                                        if (textStatus === "abort") {
                                            connection.log("Aborted xhr request.");
                                            return;
                                        }

                                        if (!tryFailConnect(error)) {
                                            reconnectErrors++;

                                            if (connection.state !== signalR.connectionState.reconnecting) {
                                                connection.log("An error occurred using longPolling. Status = " + textStatus + ".  Response = " + data.responseText + ".");
                                                $(instance).triggerHandler(events.onError, [error]);
                                            }

                                            if ((connection.state === signalR.connectionState.connected || connection.state === signalR.connectionState.reconnecting) && !transportLogic.verifyLastActive(connection)) {
                                                return;
                                            }

                                            if (!transportLogic.ensureReconnectingState(instance)) {
                                                return;
                                            }

                                            privateData.pollTimeoutId = window.setTimeout(function () {
                                                poll(instance, true);
                                            }, that.reconnectDelay);
                                        }
                                    }
                                });

                                if (reconnecting && raiseReconnect === true) {
                                    privateData.reconnectTimeoutId = window.setTimeout(function () {
                                        fireReconnected(instance);
                                    }, Math.min(1000 * (Math.pow(2, reconnectErrors) - 1), maxFireReconnectedTimeout));
                                }
                            })(connection);
                        }, 250);
                    },

                    lostConnection: function lostConnection(connection) {
                        if (connection.pollXhr) {
                            connection.pollXhr.abort("lostConnection");
                        }
                    },

                    send: function send(connection, data) {
                        transportLogic.ajaxSend(connection, data);
                    },

                    stop: function stop(connection) {

                        window.clearTimeout(connection._.pollTimeoutId);
                        window.clearTimeout(connection._.reconnectTimeoutId);

                        delete connection._.pollTimeoutId;
                        delete connection._.reconnectTimeoutId;

                        if (connection.pollXhr) {
                            connection.pollXhr.abort();
                            connection.pollXhr = null;
                            delete connection.pollXhr;
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    }
                };
            })(window.jQuery, window);


            (function ($, window, undefined) {

                var eventNamespace = ".hubProxy",
                    signalR = $.signalR;

                function makeEventName(event) {
                    return event + eventNamespace;
                }

                function map(arr, fun, thisp) {
                    var i,
                        length = arr.length,
                        result = [];
                    for (i = 0; i < length; i += 1) {
                        if (arr.hasOwnProperty(i)) {
                            result[i] = fun.call(thisp, arr[i], i, arr);
                        }
                    }
                    return result;
                }

                function getArgValue(a) {
                    return $.isFunction(a) ? null : $.type(a) === "undefined" ? null : a;
                }

                function hasMembers(obj) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            return true;
                        }
                    }

                    return false;
                }

                function clearInvocationCallbacks(connection, error) {
                    var callbacks = connection._.invocationCallbacks,
                        callback;

                    if (hasMembers(callbacks)) {
                        connection.log("Clearing hub invocation callbacks with error: " + error + ".");
                    }

                    connection._.invocationCallbackId = 0;
                    delete connection._.invocationCallbacks;
                    connection._.invocationCallbacks = {};

                    for (var callbackId in callbacks) {
                        callback = callbacks[callbackId];
                        callback.method.call(callback.scope, { E: error });
                    }
                }

                function hubProxy(hubConnection, hubName) {
                    return new hubProxy.fn.init(hubConnection, hubName);
                }

                hubProxy.fn = hubProxy.prototype = {
                    init: function init(connection, hubName) {
                        this.state = {};
                        this.connection = connection;
                        this.hubName = hubName;
                        this._ = {
                            callbackMap: {}
                        };
                    },

                    constructor: hubProxy,

                    hasSubscriptions: function hasSubscriptions() {
                        return hasMembers(this._.callbackMap);
                    },

                    on: function on(eventName, callback) {
                        var that = this,
                            callbackMap = that._.callbackMap;

                        eventName = eventName.toLowerCase();

                        if (!callbackMap[eventName]) {
                            callbackMap[eventName] = {};
                        }

                        callbackMap[eventName][callback] = function (e, data) {
                            callback.apply(that, data);
                        };

                        $(that).bind(makeEventName(eventName), callbackMap[eventName][callback]);

                        return that;
                    },

                    off: function off(eventName, callback) {
                        var that = this,
                            callbackMap = that._.callbackMap,
                            callbackSpace;

                        eventName = eventName.toLowerCase();

                        callbackSpace = callbackMap[eventName];

                        if (callbackSpace) {
                            if (callbackSpace[callback]) {
                                $(that).unbind(makeEventName(eventName), callbackSpace[callback]);

                                delete callbackSpace[callback];

                                if (!hasMembers(callbackSpace)) {
                                    delete callbackMap[eventName];
                                }
                            } else if (!callback) {
                                $(that).unbind(makeEventName(eventName));

                                delete callbackMap[eventName];
                            }
                        }

                        return that;
                    },

                    invoke: function invoke(methodName) {

                        var that = this,
                            connection = that.connection,
                            args = $.makeArray(arguments).slice(1),
                            argValues = map(args, getArgValue),
                            data = { H: that.hubName, M: methodName, A: argValues, I: connection._.invocationCallbackId },
                            d = $.Deferred(),
                            callback = function callback(minResult) {
                            var result = that._maximizeHubResponse(minResult),
                                source,
                                error;

                            $.extend(that.state, result.State);

                            if (result.Progress) {
                                if (d.notifyWith) {
                                    d.notifyWith(that, [result.Progress.Data]);
                                } else if (!connection._.progressjQueryVersionLogged) {
                                    connection.log("A hub method invocation progress update was received but the version of jQuery in use (" + $.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications.");
                                    connection._.progressjQueryVersionLogged = true;
                                }
                            } else if (result.Error) {
                                if (result.StackTrace) {
                                    connection.log(result.Error + "\n" + result.StackTrace + ".");
                                }

                                source = result.IsHubException ? "HubException" : "Exception";
                                error = signalR._.error(result.Error, source);
                                error.data = result.ErrorData;

                                connection.log(that.hubName + "." + methodName + " failed to execute. Error: " + error.message);
                                d.rejectWith(that, [error]);
                            } else {
                                connection.log("Invoked " + that.hubName + "." + methodName);
                                d.resolveWith(that, [result.Result]);
                            }
                        };

                        connection._.invocationCallbacks[connection._.invocationCallbackId.toString()] = { scope: that, method: callback };
                        connection._.invocationCallbackId += 1;

                        if (!$.isEmptyObject(that.state)) {
                            data.S = that.state;
                        }

                        connection.log("Invoking " + that.hubName + "." + methodName);
                        connection.send(data);

                        return d.promise();
                    },

                    _maximizeHubResponse: function _maximizeHubResponse(minHubResponse) {
                        return {
                            State: minHubResponse.S,
                            Result: minHubResponse.R,
                            Progress: minHubResponse.P ? {
                                Id: minHubResponse.P.I,
                                Data: minHubResponse.P.D
                            } : null,
                            Id: minHubResponse.I,
                            IsHubException: minHubResponse.H,
                            Error: minHubResponse.E,
                            StackTrace: minHubResponse.T,
                            ErrorData: minHubResponse.D
                        };
                    }
                };

                hubProxy.fn.init.prototype = hubProxy.fn;

                function hubConnection(url, options) {
                    var settings = {
                        qs: null,
                        logging: false,
                        useDefaultPath: true
                    };

                    $.extend(settings, options);

                    if (!url || settings.useDefaultPath) {
                        url = (url || "") + "/signalr";
                    }
                    return new hubConnection.fn.init(url, settings);
                }

                hubConnection.fn = hubConnection.prototype = $.connection();

                hubConnection.fn.init = function (url, options) {
                    var settings = {
                        qs: null,
                        logging: false,
                        useDefaultPath: true
                    },
                        connection = this;

                    $.extend(settings, options);

                    $.signalR.fn.init.call(connection, url, settings.qs, settings.logging);

                    connection.proxies = {};

                    connection._.invocationCallbackId = 0;
                    connection._.invocationCallbacks = {};

                    connection.received(function (minData) {
                        var data, proxy, dataCallbackId, callback, hubName, eventName;
                        if (!minData) {
                            return;
                        }

                        if (typeof minData.P !== "undefined") {
                            dataCallbackId = minData.P.I.toString();
                            callback = connection._.invocationCallbacks[dataCallbackId];
                            if (callback) {
                                callback.method.call(callback.scope, minData);
                            }
                        } else if (typeof minData.I !== "undefined") {
                            dataCallbackId = minData.I.toString();
                            callback = connection._.invocationCallbacks[dataCallbackId];
                            if (callback) {
                                connection._.invocationCallbacks[dataCallbackId] = null;
                                delete connection._.invocationCallbacks[dataCallbackId];

                                callback.method.call(callback.scope, minData);
                            }
                        } else {
                            data = this._maximizeClientHubInvocation(minData);

                            connection.log("Triggering client hub event '" + data.Method + "' on hub '" + data.Hub + "'.");

                            hubName = data.Hub.toLowerCase();
                            eventName = data.Method.toLowerCase();

                            proxy = this.proxies[hubName];

                            $.extend(proxy.state, data.State);
                            $(proxy).triggerHandler(makeEventName(eventName), [data.Args]);
                        }
                    });

                    connection.error(function (errData, origData) {
                        var callbackId, callback;

                        if (!origData) {
                            return;
                        }

                        callbackId = origData.I;
                        callback = connection._.invocationCallbacks[callbackId];

                        if (callback) {
                            connection._.invocationCallbacks[callbackId] = null;
                            delete connection._.invocationCallbacks[callbackId];

                            callback.method.call(callback.scope, { E: errData });
                        }
                    });

                    connection.reconnecting(function () {
                        if (connection.transport && connection.transport.name === "webSockets") {
                            clearInvocationCallbacks(connection, "Connection started reconnecting before invocation result was received.");
                        }
                    });

                    connection.disconnected(function () {
                        clearInvocationCallbacks(connection, "Connection was disconnected before invocation result was received.");
                    });
                };

                hubConnection.fn._maximizeClientHubInvocation = function (minClientHubInvocation) {
                    return {
                        Hub: minClientHubInvocation.H,
                        Method: minClientHubInvocation.M,
                        Args: minClientHubInvocation.A,
                        State: minClientHubInvocation.S
                    };
                };

                hubConnection.fn._registerSubscribedHubs = function () {
                    var connection = this;

                    if (!connection._subscribedToHubs) {
                        connection._subscribedToHubs = true;
                        connection.starting(function () {
                            var subscribedHubs = [];

                            $.each(connection.proxies, function (key) {
                                if (this.hasSubscriptions()) {
                                    subscribedHubs.push({ name: key });
                                    connection.log("Client subscribed to hub '" + key + "'.");
                                }
                            });

                            if (subscribedHubs.length === 0) {
                                connection.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");
                            }

                            connection.data = connection.json.stringify(subscribedHubs);
                        });
                    }
                };

                hubConnection.fn.createHubProxy = function (hubName) {
                    hubName = hubName.toLowerCase();

                    var proxy = this.proxies[hubName];
                    if (!proxy) {
                        proxy = hubProxy(this, hubName);
                        this.proxies[hubName] = proxy;
                    }

                    this._registerSubscribedHubs();

                    return proxy;
                };

                hubConnection.fn.init.prototype = hubConnection.fn;

                $.hubConnection = hubConnection;
            })(window.jQuery, window);

            (function ($, undefined) {
                $.signalR.version = "2.2.0";
            })(window.jQuery);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,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
