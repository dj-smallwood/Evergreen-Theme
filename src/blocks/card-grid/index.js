import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = ['evergreen/card'];

registerBlockType('evergreen/card-grid', {
    edit: ({ attributes, setAttributes }) => {
        const { columns, gap } = attributes;
        const blockProps = useBlockProps({
            style: {
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`
            }
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Grid Settings', 'evergreen')}>
                        <RangeControl
                            label={__('Columns', 'evergreen')}
                            value={columns}
                            onChange={(value) => setAttributes({ columns: value })}
                            min={1}
                            max={4}
                        />
                        <RangeControl
                            label={__('Gap', 'evergreen')}
                            value={gap}
                            onChange={(value) => setAttributes({ gap: value })}
                            min={0}
                            max={48}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={[
                            ['evergreen/card'],
                            ['evergreen/card'],
                            ['evergreen/card']
                        ]}
                    />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { columns, gap } = attributes;
        const blockProps = useBlockProps.save({
            style: {
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`
            }
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
}); 