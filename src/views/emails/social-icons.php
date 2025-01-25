<?php

use Virfice\API\Settings;

$virfice_social_links = Settings::get_social_links();
$title = $title !== false ? $title : 'Follow us on';
$icons = [
    [
        'name' => 'facebook',
        'key' => 'virfice_facebook_url',
        'icon' => 'fb'
    ],
    [
        'name' => 'instagram',
        'key' => 'virfice_instagram_url',
        'icon' => 'instagram'
    ],
    [
        'name' => 'youtube',
        'key' => 'virfice_youTube_url',
        'icon' => 'youtube'
    ],
    [
        'name' => 'x',
        'key' => 'virfice_x_url',
        'icon' => 'x'
    ],
    [
        'name' => 'tiktok',
        'key' => 'virfice_tiktok_url',
        'icon' => 'tiktok'
    ],
    [
        'name' => 'snapchat',
        'key' => 'virfice_snapchat_url',
        'icon' => 'snapchat'
    ],
    [
        'name' => 'pinterest',
        'key' => 'virfice_pinterest_url',
        'icon' => 'pinterest'
    ],
    [
        'name' => 'tumblr',
        'key' => 'virfice_tumblr_url',
        'icon' => 'tumblr'
    ],
    [
        'name' => 'vimeo',
        'key' => 'virfice_vimeo_url',
        'icon' => 'vimeo'
    ]
];
?>
<div>
    <?php if ($title) { ?>
        <p style="text-align: center;margin-bottom: 0;color:#616161;"><strong><?php echo esc_html($title); ?></strong></p>
    <?php } ?>
    <table style="width: max-content; margin:auto; text-align: center; ">
        <tr>
            <?php
            foreach ($icons as $key => $value) {
                if (isset($virfice_social_links[$value['key']]) && $virfice_social_links[$value['key']] !== '' && $virfice_social_links[$value['key']] !== false) { ?>
                    <td>
                        <a href="<?php echo esc_url($virfice_social_links[$value['key']]); ?>" target="_blank">
                            <img src="<?php echo esc_url(VIRFICE_STATIC_FILES_BASE . '/social-icons/' . $value['icon'] . '.webp'); ?>"
                                alt="Hello Virfice" style="object-fit: contain;margin-right: 16px;" />
                        </a>
                    </td>
            <?php
                }
            }
            ?>
        </tr>
    </table>

</div>