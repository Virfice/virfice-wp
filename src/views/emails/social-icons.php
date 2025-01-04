<?php

use Virfice\API\Settings;

$virfice_social_links = Settings::get_social_links();
$title = $title ? $title : 'Follow us on';
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
        'icon' => 'vimeo-icon'
    ],
    [
        'name' => 'telegram',
        'key' => 'virfice_telegram_url',
        'icon' => 'telegram'
    ],
    [
        'name' => 'vk',
        'key' => 'virfice_vk_url',
        'icon' => 'vk'
    ],
    [
        'name' => 'phone',
        'key' => 'virfice_phone_url',
        'icon' => 'phone'
    ]
];
?>
<div>
    <p style="text-align: center;margin-bottom: 0;color:#616161;"><strong><?php echo esc_html($title); ?></strong></p>

    <table style="width: max-content; margin:auto; text-align: center; ">
        <tr>
            <?php
            foreach ($icons as $key => $value) {
                if (isset($virfice_social_links[$value['key']]) && $virfice_social_links[$value['key']] !== '' && $virfice_social_links[$value['key']] !== false) { ?>
            <td>
                <?php if($value['name'] == 'phone'){ ?>
                <a href="tel:<?php echo $virfice_social_links[$value['key']]; ?>" rel="noopener" target="_blank">
                    <? }else{ ?>
                    <a href="<?php echo esc_url($virfice_social_links[$value['key']]); ?>" target="_blank"
                        rel="noopener">
                        <?php } ?>
                        <img src="<?php echo esc_url(VIRFICE_STATIC_FILES_BASE . '/social-icons/' . $value['icon'] . '.png'); ?>"
                            alt="<?php echo $value['name'];?>" style="object-fit: contain;margin-right: 16px;" />
                    </a>
            </td>
            <?php
                }
            }
            ?>
        </tr>
    </table>

</div>