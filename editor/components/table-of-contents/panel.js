/**
 * External dependencies
 */
import { reduce } from 'lodash';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import WordCount from '../word-count';
import DocumentOutline from '../document-outline';

function TableOfContentsPanel( { headingCount, paragraphCount, numberOfBlocks } ) {
	return (
		<Fragment>
			<div className="table-of-contents__counts">
				<div className="table-of-contents__count">
					{ __( 'Words' ) }
					<WordCount />
				</div>
				<div className="table-of-contents__count">
					{ __( 'Headings' ) }
					<span className="table-of-contents__number">
						{ headingCount }
					</span>
				</div>
				<div className="table-of-contents__count">
					{ __( 'Paragraphs' ) }
					<span className="table-of-contents__number">
						{ paragraphCount }
					</span>
				</div>
				<div className="table-of-contents__count">
					{ __( 'Blocks' ) }
					<span className="table-of-contents__number">
						{ numberOfBlocks }
					</span>
				</div>
			</div>
			{ headingCount > 0 && (
				<Fragment>
					<hr />
					<span className="table-of-contents__title">
						{ __( 'Document Outline' ) }
					</span>
					<DocumentOutline />
				</Fragment>
			) }
		</Fragment>
	);
}

const blockCount = ( blocksArray = [], name ) => reduce(
	blocksArray,
	( count, block ) =>
		count +
		( ! name || block.name === name ? 1 : 0 ) +
		( block.innerBlocks ? blockCount( block.innerBlocks, name ) : 0 ),
	0
);

export default withSelect( ( select ) => {
	const blocks = select( 'core/editor' ).getBlocks();
	return {
		headingCount: blockCount( blocks, 'core/heading' ),
		paragraphCount: blockCount( blocks, 'core/paragraph' ),
		numberOfBlocks: blockCount( blocks ),
	};
} )( TableOfContentsPanel );
