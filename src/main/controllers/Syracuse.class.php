<?php

/**
 * Syracuse
 *
 * @version     1.0 Beta 1
 * @author      Team Aeros
 * @copyright   2017, Syracuse
 * @since       1.0 Beta 1
 *
 * @license     MIT
 */

namespace Syracuse\src\main\controllers;

use Syracuse\Config;
use Syracuse\src\core\models\Registry;
use Syracuse\src\database\Connection;
use Syracuse\src\database\Database;

class Syracuse {

    private $_gui;
    private $_config;

    public function __construct() {
        $this->_gui = new GUI();

        $this->_config = Registry::store('config', new Config());
    }

    public function start() : void {
        Database::setConnection(new Connection(
            $this->_config->get('database_server'),
            $this->_config->get('database_username'),
            $this->_config->get('database_password'),
            $this->_config->get('database_name'),
            $this->_config->get('database_prefix')
        ));

        $this->_config->wipeSensitiveData();
    }
}