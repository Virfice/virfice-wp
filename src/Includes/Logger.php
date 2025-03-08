<?php

namespace Virfice\Includes;

use Exception;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Logger
{

    private $logFile;
    private $rootPath;

    // Constructor to initialize the root path and log file
    public function __construct($fileName = 'error_log.txt', $rootPath = VIRFICE_PLUGIN_ROOT)
    {
        // Ensure the root path ends with a directory separator
        $this->rootPath = rtrim($rootPath, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
        // Set the full log file path
        $this->logFile = $this->rootPath . $fileName;
    }

    // Method to write error to log file
    public function logError($message, $level = '')
    {
        // Set up a timestamp for each log entry
        $timestamp = date("Y-m-d H:i:s");

        // Format the log entry
        $logEntry = "[$timestamp] [$level] - $message" . PHP_EOL;

        // Write the log entry to the file
        if (file_put_contents($this->logFile, $logEntry, FILE_APPEND | LOCK_EX) === false) {
            // If writing fails, throw an exception or handle accordingly
            // throw new Exception("Unable to write to log file: $this->logFile");
        }
    }
}
