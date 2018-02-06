<?php
/**
 * Created by PhpStorm.
 * User: Jelmer
 * Date: 04-Feb-18
 * Time: 11:43
 */

namespace Syracuse\src\modules\controllers;

use Syracuse\src\core\models\ReturnCode;
use Syracuse\src\headers\{Controller, Module};
use Syracuse\src\modules\models\Login as Model;
use Syracuse\src\DataGetter\DataGetter;

/**
 * Class Update
 * @package Syracuse\src\modules\controllers
 */
class Update extends Controller implements Module {

    private $_moduleName;
    private $_parameters;
    private $_model;
    private $_rainData;

    /**
     * Update constructor.
     * Uses the DataGetter to get the rain dataset
     * @param string $moduleName
     * @param array $parameters
     */
    public function __construct(string $moduleName, array $parameters) {
        $this->_moduleName = $moduleName;
        $this->_parameters = $parameters;

        $dataGetter = new DataGetter();
        $this->_rainData = $dataGetter->getRainDataFiles();

        $this->loadGui();
        $this->loadAuthenticationSystem();

        $this->_model = new Model();
    }

    /**
     * @return int, the return code
     */
    public function execute() : int {
        return ReturnCode::SUCCESS;
    }

    /**
     * echos the json rain data for ajax to pick up
     */
    public function display() : void {
        switch ($this->_parameters['ajax_request'] ?? 'unknown') {
            case 'top10':
                echo json_encode($this->_rainData);
                break;
            default:
                die(translated('unknown_ajax_request'));
        }
    }
}