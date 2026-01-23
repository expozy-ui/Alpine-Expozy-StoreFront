<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

class TemplateApi {
    
    public static function create(array $data): array {
        global $lang, $core;
        
		
        $type = 'index';
        $slug = $data['slug'] ?? '';
        $html = $data['html'] ?? '';
		$css = $data['css'] ?? '';
        $language = $data['lang'] ?? $core->lang;
				
		
        if ( empty($slug) || empty($html) || empty($css)) {
            return ['status' => 0,'error' => 'Missing required fields', 'code' => 400];
        }
        
        $lang->language = $language;
        
        if (!self::pageExistsInDatabase($type, $slug)) {
            return ['status' => 0,'error' => 'Page not found', 'code' => 404];
        }
        
        $template = new Template($type, $slug);
        
        if (file_exists($template->get_fileName())) {
            return ['status' => 0,'error' => 'Template already exists', 'code' => 409];
        }
        
        $result = $template->save_html($html);
		$template->save_css($css);
        
        return $result 
            ? ['status' => 1]
            : ['status' => 0, 'error' => 'Failed to save template', 'code' => 500];
    }
    
    private static function pageExistsInDatabase(string $type, string $slug): bool {
        if ($type === 'index') {
            $page = Api::cache(false)->data(['slug' => $slug])->get()->pages();
            return isset($page['id']) && $page['id'] > 0;
        }
        
        if ($type === 'post') {
            $post = Api::cache(false)->data(['slug' => $slug])->get()->blogPosts();
            return isset($post['id']) && $post['id'] > 0;
        }
        
        return in_array($type, ['header', 'footer']);
    }
}