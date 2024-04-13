'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">SPAPadel documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"' : 'data-bs-target="#xs-components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"' :
                                            'id="xs-components-links-module-AppModule-72fc1e9eeae310a5101e06d81329fad1715dc33e34fed8b90e343f361e60a5755fe8028ef3a09cc4560de99f06271462b221e78f9f074bf72ab1af2b1a032ab9"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/JugadoresModule.html" data-type="entity-link" >JugadoresModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-JugadoresModule-8b4f1cc0617343867cf0aa9cd51de61e166226bc30b4aa559e983af0493ea1d04c876fcbf41e0b841d7d7314e3b1954e703d91454d0ead44d0201182a6a6b94c"' : 'data-bs-target="#xs-components-links-module-JugadoresModule-8b4f1cc0617343867cf0aa9cd51de61e166226bc30b4aa559e983af0493ea1d04c876fcbf41e0b841d7d7314e3b1954e703d91454d0ead44d0201182a6a6b94c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-JugadoresModule-8b4f1cc0617343867cf0aa9cd51de61e166226bc30b4aa559e983af0493ea1d04c876fcbf41e0b841d7d7314e3b1954e703d91454d0ead44d0201182a6a6b94c"' :
                                            'id="xs-components-links-module-JugadoresModule-8b4f1cc0617343867cf0aa9cd51de61e166226bc30b4aa559e983af0493ea1d04c876fcbf41e0b841d7d7314e3b1954e703d91454d0ead44d0201182a6a6b94c"' }>
                                            <li class="link">
                                                <a href="components/JugadoresComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JugadoresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JugadoresDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JugadoresDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OauthModule.html" data-type="entity-link" >OauthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"' : 'data-bs-target="#xs-components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"' :
                                            'id="xs-components-links-module-OauthModule-7cca8d24f632e851f020750817f4c469a481bf168ab53be322b7c48a1d00660a835e704dbd7653e8933a280822ff6e3144cf293f1befbd0156c4b2fe55476eba"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SingUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SingUpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParejasModule.html" data-type="entity-link" >ParejasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"' : 'data-bs-target="#xs-components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"' :
                                            'id="xs-components-links-module-ParejasModule-887741255da043a74636a70f2a2a1809f476e5a39361dadf0bc9971a9435817e64c6d7856fb269ab2d37cbd8b309a1f9e6d1af12a2aa0d75612e687025bfb30b"' }>
                                            <li class="link">
                                                <a href="components/ParejasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParejasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParejasDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParejasDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PartidasModule.html" data-type="entity-link" >PartidasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"' : 'data-bs-target="#xs-components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"' :
                                            'id="xs-components-links-module-PartidasModule-fe3a373c87171ef24b325e69f5908c0c73ebce65a1c6b20a7e2765332ef8b74f54454cc1a6cb1ccedfbbb4294217e4b0658ffa22934493daf5abb2bef7fc3f12"' }>
                                            <li class="link">
                                                <a href="components/PartidaDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartidaDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PartidasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartidasComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"' : 'data-bs-target="#xs-components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"' :
                                            'id="xs-components-links-module-SharedModule-f7d97a8e144160846e16817fa5ed194b186d92c327c0f048a7d579da1c5b85aafea3666f7b187337bf7bd8396cb787f2f5987472ddf568ecad0f93a5ca34209d"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilUserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UbicacionesModule.html" data-type="entity-link" >UbicacionesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"' : 'data-bs-target="#xs-components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"' :
                                            'id="xs-components-links-module-UbicacionesModule-555b449b18afa795ec7165adaf85e64caeed8ae49af5849d322ec00709f2a15c0b52585f59f8d5e23bacb3bfb96138daf49ab2e50799836f85f11bece91bf185"' }>
                                            <li class="link">
                                                <a href="components/UbicacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UbicacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UbicacionesDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UbicacionesDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JugadorService.html" data-type="entity-link" >JugadorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalService.html" data-type="entity-link" >ModalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OauthService.html" data-type="entity-link" >OauthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParejaService.html" data-type="entity-link" >ParejaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PartidaService.html" data-type="entity-link" >PartidaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UbicacionService.html" data-type="entity-link" >UbicacionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Jugadores.html" data-type="entity-link" >Jugadores</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pareja.html" data-type="entity-link" >Pareja</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pareja-1.html" data-type="entity-link" >Pareja</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Partida.html" data-type="entity-link" >Partida</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartidaOutDTO.html" data-type="entity-link" >PartidaOutDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ubicacion.html" data-type="entity-link" >Ubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userProfile.html" data-type="entity-link" >userProfile</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});