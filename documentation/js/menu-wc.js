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
                                            'data-bs-target="#components-links-module-AppModule-a769bf305e884341a80b6ad99dffbbe0e2f475a9c559c7466c49daf0bc1993fc5c6702959d2d8ec31e2f61c2920cfdbf41f2c750b3a42a7849470f4a62dcbbc2"' : 'data-bs-target="#xs-components-links-module-AppModule-a769bf305e884341a80b6ad99dffbbe0e2f475a9c559c7466c49daf0bc1993fc5c6702959d2d8ec31e2f61c2920cfdbf41f2c750b3a42a7849470f4a62dcbbc2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a769bf305e884341a80b6ad99dffbbe0e2f475a9c559c7466c49daf0bc1993fc5c6702959d2d8ec31e2f61c2920cfdbf41f2c750b3a42a7849470f4a62dcbbc2"' :
                                            'id="xs-components-links-module-AppModule-a769bf305e884341a80b6ad99dffbbe0e2f475a9c559c7466c49daf0bc1993fc5c6702959d2d8ec31e2f61c2920cfdbf41f2c750b3a42a7849470f4a62dcbbc2"' }>
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