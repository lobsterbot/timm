/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var Boxlayout = (function() {

	var $el = $( '#bl-main' ),
		$articles = $el.children( 'article' ),
		// works article
		$articleDesktop = $( '#bl-desktop-article' ),
		$articleMobile = $( '#bl-mobile-article' ),
		$articleGraphics = $( '#bl-graphics-article' ),
		$articleOther = $( '#bl-other-article' ),
		// work items
		$desktopItems = $( '#bl-desktop-items > li' ),
		$mobileItems = $( '#bl-mobile-items > li' ),
		$graphicsItems = $( '#bl-graphics-items > li' ),
		$otherItems = $( '#bl-other-items > li' ),
		// work panels
		/*need to replicate for all different work types*/
		$desktopPanelsContainer = $( '#bl-panel-desktop-items' ),
		$desktopPanels = $desktopPanelsContainer.children( 'div' ),
		totalDesktopPanels = $desktopPanels.length,
		// navigating the work panels
		$nextDesktopItem = $desktopPanelsContainer.find( 'nav > span.bl-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeDesktopItem = $desktopPanelsContainer.find( 'nav > span.bl-icon-close' ),

		$mobilePanelsContainer = $( '#bl-panel-mobile-items' ),
		$mobilePanels = $mobilePanelsContainer.children( 'div' ),
		totalMobilePanels = $mobilePanels.length,
		// navigating the work panels
		$nextMobileItem = $mobilePanelsContainer.find( 'nav > span.bl-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeMobileItem = $mobilePanelsContainer.find( 'nav > span.bl-icon-close' ),

		$graphicsPanelsContainer = $( '#bl-panel-graphics-items' ),
		$graphicsPanels = $graphicsPanelsContainer.children( 'div' ),
		totalGraphicsPanels = $graphicsPanels.length,
		// navigating the work panels
		$nextGraphicsItem = $graphicsPanelsContainer.find( 'nav > span.bl-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeGraphicsItem = $graphicsPanelsContainer.find( 'nav > span.bl-icon-close' ),
		
		$otherPanelsContainer = $( '#bl-panel-other-items' ),
		$otherPanels = $otherPanelsContainer.children( 'div' ),
		totalOtherPanels = $otherPanels.length,
		// navigating the work panels
		$nextOtherItem = $otherPanelsContainer.find( 'nav > span.bl-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeOtherItem = $otherPanelsContainer.find( 'nav > span.bl-icon-close' ),
		/*$workPanelsContainer = $( '#bl-panel-work-items' ),
		$workPanels = $workPanelsContainer.children( 'div' ),
		totalWorkPanels = $workPanels.length,
		// navigating the work panels
		$nextWorkItem = $workPanelsContainer.find( 'nav > span.bl-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeWorkItem = $workPanelsContainer.find( 'nav > span.bl-icon-close' ),*/


		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {
		
		$articles.each( function() {
			
			var $article = $( this );

			// expand the clicked article and scale down the others
			$article.on( 'click', function() {

				if( !$article.data( 'open' ) ) {
					$article.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
					$el.addClass( 'bl-expand-item' );	
				}

			} ).find( 'span.bl-icon-close' ).on( 'click', function() {
				
				// close the expanded article and scale up the others
				$article.data( 'open', false ).removeClass( 'bl-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'article' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'bl-expand-top' );
				} );

				if( !supportTransitions ) {
					$article.removeClass( 'bl-expand-top' );
				}

				$el.removeClass( 'bl-expand-item' );
				
				return false;

			} );

		} );

		// clicking on a work item: the current article scales down and the respective work panel slides up
		/*$workItems.on( 'click', function( event ) {

			// scale down main article
			$articleWork.addClass( 'bl-scale-down' );

			// show panel for this work item
			$workPanelsContainer.addClass( 'bl-panel-items-show' );

			var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentWorkPanel = $panel.index();
			$panel.addClass( 'bl-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextWorkItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq( currentWorkPanel );
			currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
			var $nextPanel = $workPanels.eq( currentWorkPanel );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'bl-show-work' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the article scales up again
		$closeWorkItem.on( 'click', function( event ) {

			// scale up main article
			$articleWork.removeClass( 'bl-scale-down' );
			$workPanelsContainer.removeClass( 'bl-panel-items-show' );
			$workPanels.eq( currentWorkPanel ).removeClass( 'bl-show-work' );
			
			return false;

		} );*/

		/*test*/

		$desktopItems.on( 'click', function( event ) {

			// scale down main article
			$articleDesktop.addClass( 'bl-scale-down' );

			// show panel for this work item
			$desktopPanelsContainer.addClass( 'bl-panel-items-show' );

			var $panel = $desktopPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentDesktopPanel = $panel.index();
			$panel.addClass( 'bl-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextDesktopItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $desktopPanels.eq( currentDesktopPanel );
			currentDesktopPanel = currentDesktopPanel < totalDesktopPanels - 1 ? currentDesktopPanel + 1 : 0;
			var $nextPanel = $desktopPanels.eq( currentDesktopPanel );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'bl-show-work' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the article scales up again
		$closeDesktopItem.on( 'click', function( event ) {

			// scale up main article
			$articleDesktop.removeClass( 'bl-scale-down' );
			$desktopPanelsContainer.removeClass( 'bl-panel-items-show' );
			$desktopPanels.eq( currentDesktopPanel ).removeClass( 'bl-show-work' );
			
			return false;

		} );

		//End of desktop items

		$mobileItems.on( 'click', function( event ) {

			// scale down main article
			$articleMobile.addClass( 'bl-scale-down' );

			// show panel for this work item
			$mobilePanelsContainer.addClass( 'bl-panel-items-show' );
				//NEW VAR?
			var $panel = $mobilePanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentMobilePanel = $panel.index();
			$panel.addClass( 'bl-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextMobileItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $mobilePanels.eq( currentMobilePanel );
			currentMobilePanel = currentMobilePanel < totalMobilePanels - 1 ? currentMobilePanel + 1 : 0;
			var $nextPanel = $mobilePanels.eq( currentMobilePanel );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'bl-show-work' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the article scales up again
		$closeMobileItem.on( 'click', function( event ) {

			// scale up main article
			$articleMobile.removeClass( 'bl-scale-down' );
			$mobilePanelsContainer.removeClass( 'bl-panel-items-show' );
			$mobilePanels.eq( currentMobilePanel ).removeClass( 'bl-show-work' );
			
			return false;

		} );

		//End of mobile items

		$graphicsItems.on( 'click', function( event ) {

			// scale down main article
			$articleGraphics.addClass( 'bl-scale-down' );

			// show panel for this work item
			$graphicsPanelsContainer.addClass( 'bl-panel-items-show' );
				//NEW VAR?
			var $panel = $graphicsPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentGraphicsPanel = $panel.index();
			$panel.addClass( 'bl-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextGraphicsItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $graphicsPanels.eq( currentGraphicsPanel );
			currentGraphicsPanel = currentGraphicsPanel < totalGraphicsPanels - 1 ? currentGraphicsPanel + 1 : 0;
			var $nextPanel = $graphicsPanels.eq( currentGraphicsPanel );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'bl-show-work' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the article scales up again
		$closeGraphicsItem.on( 'click', function( event ) {

			// scale up main article
			$articleGraphics.removeClass( 'bl-scale-down' );
			$graphicsPanelsContainer.removeClass( 'bl-panel-items-show' );
			$graphicsPanels.eq( currentGraphicsPanel ).removeClass( 'bl-show-work' );
			
			return false;

		} );

		//End of graphics items

		$otherItems.on( 'click', function( event ) {

			// scale down main article
			$articleOther.addClass( 'bl-scale-down' );

			// show panel for this work item
			$otherPanelsContainer.addClass( 'bl-panel-items-show' );
				//NEW VAR?
			var $panel = $otherPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentOtherPanel = $panel.index();
			$panel.addClass( 'bl-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextOtherItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $otherPanels.eq( currentOtherPanel );
			currentOtherPanel = currentOtherPanel < totalOtherPanels - 1 ? currentOtherPanel + 1 : 0;
			var $nextPanel = $otherPanels.eq( currentOtherPanel );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'bl-show-work' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the article scales up again
		$closeOtherItem.on( 'click', function( event ) {

			// scale up main article
			$articleOther.removeClass( 'bl-scale-down' );
			$otherPanelsContainer.removeClass( 'bl-panel-items-show' );
			$otherPanels.eq( currentOtherPanel ).removeClass( 'bl-show-work' );
			
			return false;

		} );

	}

	return { init : init };

})();