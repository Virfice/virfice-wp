<?php
namespace Virfice\API;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

class API{
    public function __construct()
    {
        add_action('rest_api_init', array($this, 'register_api'));
    }

    /**
	 * Register_api
	 *
	 * @return void
	 */
	public function register_api()
	{
		(new WooEmail())->register_routes();
		(new WooOrder())->register_routes();
	}
}