import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, URLInput, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Add block metadata
const blockMetadata = {
    apiVersion: 2,
    name: 'evergreen/card',
    title: 'Card',
    category: 'design',
    icon: 'card',
    description: 'A customizable card component with image, title, and content.',
    supports: {
        html: false,
        anchor: true,
        align: ['wide', 'full']
    }
};

registerBlockType(blockMetadata.name, {
    ...blockMetadata,
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'evergreen-card-wrapper'
        });
        const { title, content, imageUrl, imageAlt, linkUrl, backgroundColor, textColor } = attributes;

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id,
                imageAlt: media.alt
            });
        };

        const style = {
            backgroundColor: backgroundColor || 'transparent',
            color: textColor || 'inherit'
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Card Settings', 'evergreen')}>
                        <div className="components-base-control">
                            <label className="components-base-control__label">
                                {__('Link URL', 'evergreen')}
                            </label>
                            <URLInput
                                value={linkUrl}
                                onChange={(url) => setAttributes({ linkUrl: url })}
                            />
                        </div>
                        <div className="components-base-control">
                            <label className="components-base-control__label">
                                {__('Background Color', 'evergreen')}
                            </label>
                            <ColorPalette
                                value={backgroundColor}
                                onChange={(color) => setAttributes({ backgroundColor: color })}
                            />
                        </div>
                        <div className="components-base-control">
                            <label className="components-base-control__label">
                                {__('Text Color', 'evergreen')}
                            </label>
                            <ColorPalette
                                value={textColor}
                                onChange={(color) => setAttributes({ textColor: color })}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div className="evergreen-card" style={style}>
                        <div className="evergreen-card__media">
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={imageUrl}
                                render={({ open }) => (
                                    <Button onClick={open}>
                                        {!imageUrl ? (
                                            __('Upload Image', 'evergreen')
                                        ) : (
                                            <img src={imageUrl} alt={imageAlt} />
                                        )}
                                    </Button>
                                )}
                            />
                        </div>
                        <div className="evergreen-card__content">
                            <RichText
                                tagName="h3"
                                value={title}
                                onChange={(title) => setAttributes({ title })}
                                placeholder={__('Card Title', 'evergreen')}
                            />
                            <RichText
                                tagName="p"
                                value={content}
                                onChange={(content) => setAttributes({ content })}
                                placeholder={__('Card content...', 'evergreen')}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { title, content, imageUrl, imageAlt, linkUrl, backgroundColor, textColor } = attributes;
        const blockProps = useBlockProps.save({
            className: 'evergreen-card-wrapper'
        });
        const style = {
            backgroundColor: backgroundColor || 'transparent',
            color: textColor || 'inherit'
        };

        const CardContent = () => (
            <div className="evergreen-card" style={style}>
                {imageUrl && (
                    <div className="evergreen-card__media">
                        <img src={imageUrl} alt={imageAlt} />
                    </div>
                )}
                <div className="evergreen-card__content">
                    {linkUrl ? (
                        <a href={linkUrl} className="evergreen-card__title-link">
                            <RichText.Content tagName="h3" value={title} />
                        </a>
                    ) : (
                        <RichText.Content tagName="h3" value={title} />
                    )}
                    <RichText.Content tagName="p" value={content} />
                </div>
            </div>
        );

        return (
            <div {...blockProps}>
                <CardContent />
            </div>
        );
    },
});