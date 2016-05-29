<?php
    $old_path = getcwd();
    chdir('/home/ariz/cyber_lecture/');
    $username =  htmlspecialchars($_POST["email"]);
    $password =  htmlspecialchars($_POST["pass"]);
    $connection = ssh2_connect('ihost84', 22);
    if (!$connection) die('Connection failed');
    #$connection = ssh2_connect('192.168.43.160', 22);
    ssh2_auth_password($connection, 'ariz', 'Trustno12345');

#    $cmd = 'sshpass -p "openelec" ssh root@192.168.43.160 "python led.py '. $username . ' ' . $password . '&"';

    $cmd = 'echo "' . $username . '" > /home/ariz/tmp.txt';
    $stream = ssh2_exec($connection, $cmd);
    if (!$stream) die("failed to execute ssh command");
#    print("$cmd");
#    $output = shell_exec($cmd);
?>
