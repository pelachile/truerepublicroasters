/**
 * Moves Atomic Blocks Post Grid dates inside featured images.
 *
 * @package StudioPress\JS
 * @author StudioPress
 * @license GPL-2.0-or-later
 */

( function() {
	'use strict';

	/**
	 * Moves the Atomic Blocks Post Grid date element into the featured image.
	 *
	 * The desired styling can not be achieved without moving the element.
	 *
	 * @since 3.4.0
	 */
	function moveDates() {
		var i, $date, $imageLink;
		var $articles = document.querySelectorAll( '.ab-block-post-grid .is-grid article' );

		for ( i = 0; i < $articles.length; ++i ) {
			$date = $articles[i].querySelector( '.ab-block-post-grid-date' );
			$imageLink = $articles[i].querySelector( '.ab-block-post-grid-image a' );

			if ( $date && $imageLink ) {
				$imageLink.appendChild( $date );
			}
		}
	}

	/**
	 * Tests if the given block list contains an Atomic Blocks Post Grid block.
	 *
	 * @param {array} blockList
	 *
	 * @since 3.4.0
	 */
	function blocksIncludeAtomicBlocksPostGrid( blockList ) {
		return blockList.some(
			function( block ) {
				return 'atomic-blocks/ab-post-grid' === block.name;
			}
		);
	}

	/**
	 * Tests all required JavaScript libraries have loaded in the block editor.
	 *
	 * Also helps to exit early on the front end.
	 *
	 * @since 3.4.0
	 */
	function blockEditorReady() {
		return 'undefined' !== typeof wp &&
				'undefined' !== typeof wp.blocks &&
				'undefined' !== typeof wp.data;
	}

	/**
	 * Triggers date move in admin if Atomic Blocks Post Grid block is in use.
	 *
	 * @since 3.4.0
	 */
	function initAdmin() {
		if ( ! blockEditorReady() ) {
			return;
		}

		wp.data.subscribe( function() {
			var blockList = wp.data.select( 'core/editor' ).getBlocks();
			if ( blocksIncludeAtomicBlocksPostGrid( blockList ) ) {
				moveDates();
			}
		});
	}

	moveDates();
	initAdmin();
}() );
