<?php

error_reporting(E_ERROR);

include('./lessc.class.php');

$less = new lessc('./css/less/index.less');
$less->setImportDir(array('./css/less/'));
$less->setFormatter("compressed");
$css = $less->parse();
file_put_contents('./css/index.css',$css);
die('Done');
