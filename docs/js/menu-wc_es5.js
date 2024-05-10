'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">SPAPadel documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"' : 'data-bs-target="#xs-components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"' : 'id="xs-components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/JugadoresModule.html\" data-type=\"entity-link\" >JugadoresModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-JugadoresModule-50f2f645b44778857b548a5a7e8fc2594107f4f730d667ee45c83b80c519ac0a44fbb0c73918132115856aad3894e4ae145fce938b09f23dbde2c8204d1292af"' : 'data-bs-target="#xs-components-links-module-JugadoresModule-50f2f645b44778857b548a5a7e8fc2594107f4f730d667ee45c83b80c519ac0a44fbb0c73918132115856aad3894e4ae145fce938b09f23dbde2c8204d1292af"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-JugadoresModule-50f2f645b44778857b548a5a7e8fc2594107f4f730d667ee45c83b80c519ac0a44fbb0c73918132115856aad3894e4ae145fce938b09f23dbde2c8204d1292af"' : 'id="xs-components-links-module-JugadoresModule-50f2f645b44778857b548a5a7e8fc2594107f4f730d667ee45c83b80c519ac0a44fbb0c73918132115856aad3894e4ae145fce938b09f23dbde2c8204d1292af"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/JugadoresComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >JugadoresComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/JugadoresDetailComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >JugadoresDetailComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/OauthModule.html\" data-type=\"entity-link\" >OauthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"' : 'data-bs-target="#xs-components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"' : 'id="xs-components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/LoginComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LoginComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SingUpComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SingUpComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ParejasModule.html\" data-type=\"entity-link\" >ParejasModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"' : 'data-bs-target="#xs-components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"' : 'id="xs-components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ParejasComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ParejasComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ParejasDetailComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ParejasDetailComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/PartidasModule.html\" data-type=\"entity-link\" >PartidasModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"' : 'data-bs-target="#xs-components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"' : 'id="xs-components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/PartidaDetailComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PartidaDetailComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/PartidasComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PartidasComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SharedModule.html\" data-type=\"entity-link\" >SharedModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"' : 'data-bs-target="#xs-components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"' : 'id="xs-components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/FooterComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FooterComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ModalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ModalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/NavbarComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NavbarComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/PerfilUserComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PerfilUserComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UbicacionesModule.html\" data-type=\"entity-link\" >UbicacionesModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"' : 'data-bs-target="#xs-components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"' : 'id="xs-components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/UbicacionComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UbicacionComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/UbicacionesDetailComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UbicacionesDetailComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/JugadorService.html\" data-type=\"entity-link\" >JugadorService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ModalService.html\" data-type=\"entity-link\" >ModalService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/OauthService.html\" data-type=\"entity-link\" >OauthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ParejaService.html\" data-type=\"entity-link\" >ParejaService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/PartidaService.html\" data-type=\"entity-link\" >PartidaService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UbicacionService.html\" data-type=\"entity-link\" >UbicacionService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#guards-links"' : 'data-bs-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/AuthGuard.html\" data-type=\"entity-link\" >AuthGuard</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"guards/LoginGuard.html\" data-type=\"entity-link\" >LoginGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/EstadisticasJugadores.html\" data-type=\"entity-link\" >EstadisticasJugadores</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/EstadisticasParejasJugador.html\" data-type=\"entity-link\" >EstadisticasParejasJugador</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Jugadores.html\" data-type=\"entity-link\" >Jugadores</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/LoginRequest.html\" data-type=\"entity-link\" >LoginRequest</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Pareja.html\" data-type=\"entity-link\" >Pareja</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Pareja-1.html\" data-type=\"entity-link\" >Pareja</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Partida.html\" data-type=\"entity-link\" >Partida</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/PartidaOutDTO.html\" data-type=\"entity-link\" >PartidaOutDTO</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Ubicacion.html\" data-type=\"entity-link\" >Ubicacion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/userProfile.html\" data-type=\"entity-link\" >userProfile</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));