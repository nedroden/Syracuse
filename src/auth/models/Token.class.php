<?php

/**
 * Syracuse
 *
 * @version     1.0 Beta 1
 * @author      Aeros Development
 * @copyright   2017-2018 Syracuse
 * @since       1.0 Beta 1
 *
 * @license     MIT
 */

namespace Syracuse\src\auth\models;

use Syracuse\src\database\Database;

class Token {

    private $_value;
    private $_userId;

    // If you change this, make sure you update the database as well
    private const LENGTH = 40;

    public function __construct(string $value, int $userId = null) {
        $this->_value = $value;
        $this->_userId = $userId ?? 0;
    }

    public function verify() : bool {
        if (strlen($this->_value) != self::LENGTH)
            return false;

        $result = Database::interact('retrieve', 'token')
            ->fields('value', 'created_at', 'length', 'user_id')
            ->where(['value', ':value'])
            ->placeholders(['value' => $this->_value])
            ->getSingle();

        if (empty($result))
            return false;

        $this->_userId = $result['user_id'];

        if (time() > (int) $result['created_at'] + $result['length'] && $result['length'] != 0)
            return false;

        return true;
    }

    public static function generate(int $userId) : self {
        $token = '';

        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $charLength = strlen($chars);

        for ($i = 0; $i < self::LENGTH; $i++)
            $token .= $chars[rand(0, $charLength - 1)];

        Database::interact('insert', 'token')->placeholders([
                'value' => $token,
                'user_id' => $userId
            ])
            ->insert([
                'value' => ':value',
                'created_at' => time(),
                'user_id' => ':user_id'
        ]);

        return new self($token, $userId);
    }

    public function getValue() : string {
        return $this->_value;
    }

    public function getUserId() : int {
        return $this->_userId;
    }
}