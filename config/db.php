<?php

	//DB mc static url 等系统配置集合
	$_SYSTEM_CONFIG = [
		//DB配置文件
		'eb_db_config' =>[
			//主库
			'eachbuyer_master' => [			
				'class' => 'yii\db\Connection',
				'dsn' => 'mysql:host=172.16.0.231;dbname=eachbuyer;port=3306 ',
				'username' => 'root',
				'password' => 'db01123456',
				'charset' => 'utf8',
			],
			'eachbuyer_slave' => [
				'class' => 'yii\db\Connection',
				'dsn' => 'mysql:host=172.16.0.231;dbname=eachbuyer;port=3306 ',
				'username' => 'root',
				'password' => 'db01123456',
				'charset' => 'utf8',
			],
			'eachbuyer_eb_master' => [
				'class' => 'yii\db\Connection',
				'dsn' => 'mysql:host=172.16.0.231;dbname=eb_pc_site;port=3306 ',
				'username' => 'root',
				'password' => 'db01123456',
				'charset' => 'utf8',
			],
			'eachbuyer_eb_slave' => [
				'class' => 'yii\db\Connection',
				'dsn' => 'mysql:host=172.16.0.231;dbname=eb_pc_site;port=3306 ',
				'username' => 'root',
				'password' => 'db01123456',
				'charset' => 'utf8',
			],
		],
		//memcache 配置文件
		'memcache_config' => [
				'memcache_web' => [
						'host' => '172.16.0.230' ,
						'port' => 11211 ,
				],
				'memcache_page' => [
						'host' => '172.16.0.230' ,
						'port' => 11311 ,
				],
				'memcache_session' => [
						'host' => '172.16.0.230' ,
						'port' => 11411 ,
				],
		],
		//http://pic.eachbuyer.com/350x350/x9/p100/xx018637_a.jpg  web_path :x9/p100/xx018637_a.jpg
		'url_config' => [
				'static_file_version' => 20141028102610 ,
				'static_type' => 'source' , // ['source'/'compress']静态文件类型( source:源代码,compress: 压缩后)
				'source' => array(
						'img_url' => array(
								'web_path'=>'img6.' . COMMON_DOMAIN .'/',
						 ),
						'img_site_url' => array(
								'img6.' . COMMON_DOMAIN .'/',
						),
						'css' => array(
								'url' => HOME_URL . '/css/',
						),
						'js' => array(
								'url' => HOME_URL . '/js/',
						),
				) ,
				'compress'=> array(
						'img_url' => array(
								'web_path'=>'img6.' . COMMON_DOMAIN .'/',
						),
						'img_site_url' => array(
								'img6.' . COMMON_DOMAIN .'/',
						),
						'css' => array(
								'url' => HOME_URL . '/compress/css/',
						),
						'js' => array(
								'url' => HOME_URL . '/compress/js/',
						),
				) ,
		],
	];

	return $_SYSTEM_CONFIG;