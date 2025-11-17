<?php

function get_template(){
	
	require_once( "core/autoload.php");

	if (is_dir('static') === false){
		$template = Api::get()->my_saas_template();

		if(isset($template['github_folder']) && !empty($template['github_folder']) ){

			$zipUrl = 'https://github.com/expozy-ui/Alpine-Expozy-StoreFront_templates/archive/refs/heads/main.zip';

			shell_exec("wget -q -O repo.zip $zipUrl");

			shell_exec("unzip -q repo.zip -d tmp_repo");

			$repoFolder = 'tmp_repo/Alpine-Expozy-StoreFront_templates-main';

			$folder = escapeshellarg($template['github_folder']);
			shell_exec("cp -r $repoFolder/$folder/static ./");

			shell_exec("rm -rf tmp_repo repo.zip");

		}
	}

	print "1";
	die();
}
get_template();

?>

