<?php
    $old_path = getcwd();
    chdir('/home/ariz/cyber_lecture/');
    $username =  htmlspecialchars($_POST["email"]);
    $password =  htmlspecialchars($_POST["pass"]);
    #$connection = ssh2_connect('ihost84', 22);
    $connection = ssh2_connect('192.168.43.160', 22);
    if (!$connection) die('Connection failed');
    ssh2_auth_password($connection, 'root', 'openelec');

    $cmd = 'python led.py '. $username . ' ' . $password;

#    $cmd = 'echo "' . $username . '" > /home/ariz/tmp.txt';
    $stream = ssh2_exec($connection, $cmd);
    if (!$stream) die("failed to execute ssh command");
#    print("$cmd");
#    $output = shell_exec($cmd);
?>
