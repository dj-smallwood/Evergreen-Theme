<?php
function evergreen_register_blocks() {
    // Register blocks that are in the blocks folder
    if (file_exists(__DIR__ . '/src/blocks/card/block.json')) {
        register_block_type(__DIR__ . '/src/blocks/card');
    }
    if (file_exists(__DIR__ . '/src/blocks/card-grid/block.json')) {
        register_block_type(__DIR__ . '/src/blocks/card-grid');
    }
}
add_action('init', 'evergreen_register_blocks');

// Enqueue block editor assets
function evergreen_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'evergreen-blocks',
        get_template_directory_uri() . '/build/index.js',
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components')
    );
}
add_action('enqueue_block_editor_assets', 'evergreen_enqueue_block_editor_assets'); 