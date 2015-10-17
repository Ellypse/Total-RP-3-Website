/**
 * Raneto wiki configuration (see http://docs.raneto.com/usage/configuration)
 *
 * @type {{site_title: string, base_url: string, support_email: string, copyright: string, excerpt_length: number, page_sort_meta: string, category_sort: boolean, image_url: string, content_dir: string, analytics: string}}
 */
module.exports = {
	site_title: 'Total RP 3 Documentation',
	base_url: '/documentation',
	support_email: 'help@totalrp3.info',
	copyright: 'Copyright © ' + new Date().getFullYear() + ' - <a href="http://raneto.com">Powered by Raneto</a>',
	excerpt_length: 400,
	page_sort_meta: 'sort',
	category_sort: true,
	image_url: '/images',
	content_dir: './content/'
};