/**
 * @typedef {Object} Category
 * @property {number} id - category id
 * @property {string} name - article question (title)
 * @property {number} parent_id - article slug
 * @property {string} lang - code article language
 * @property {string} author - author full name
 * @property {number} sort_order - number of order category
 * @property {timestamp} created_at
 * @property {timestamp} updated_at
 * @property {string[]} granted_access - user ids who can see this category
 *
 * @property {object} language - language object
 * @property {string} language.code - language code
 * @property {string} language.name - language name
 * @property {Article[]} articles - category articles
 * @property {Category[]} categories - child categories
 * @property {string} type - category type (root|category|subcategory)
 * @property {object} hierarchical - hierarchy of nesting
 * @property {string} hierarchical.lvl0 - level 0 (root)
 * @property {string} hierarchical.lvl1 - level 1 (root > category)
 * @property {string} hierarchical.lvl2 - level 2 (root > category > subcategory)
 */
/**
 * @typedef {Object} CategoryResponse
 * @property {number} id - category id
 * @property {string} name - article question (title)
 * @property {number} parent_id - article slug
 * @property {string} lang - code article language
 * @property {string} author - author full name
 * @property {number} sort_order - number of order category
 * @property {timestamp} created_at
 * @property {timestamp} updated_at
 * @property {string[]} granted_access - user ids who can see this category
 */
/**
 * @typedef {Object} CategoryRequest
 * @property {string} name - article question (title)
 * @property {number} parent_id - article slug
 * @property {string} lang - code article language
 * @property {string} author - author full name
 * @property {number} sort_order - number of order category
 * @property {string} author_href - user stormpath href
 * @property {string[]} granted_access - user ids who can see this category
 */

import {copy} from 'angular'

function CategoryHelper($rootScope) {
  'ngInject';

  /**
   * Prepare category
   * @param {CategoryResponse} category
   * @returns {Category}
   */
  let responseToData = (category) => {
    if(!category) return;
    category.id = +category.id;
    category.sort_order = +category.sort_order;
    category.parent_id = +category.parent_id;
    switch (category.parent_id) {
      case 0:
        category.type = 'root';
        break;
      case 1:
        category.type = 'category';
        break;
      default:
        category.type = 'subcategory';
        break;
    }

    if ($rootScope.settings) {
      category.language = $rootScope.settings.languages.find((l) => l.code == category.lang);
    }

    category.granted_access = category.granted_access || [];
    category.author = category.author || 'Unknown';

    category.hierarchical = {
      lvl0: null,
      lvl1: null,
      lvl2: null,
    };

    return category;
  };

  /**
   * Prepare category to request
   * @param {Category} category
   * @returns {CategoryRequest}
   */
  let dataToRequest = (category) => {
    return {
      name: category.name,
      parent_id: category.parent_id,
      lang: category.lang,
      author: category.author,
      sort_order: category.sort_order,
      author_href: '',
      granted_access: category.granted_access
    };
  };

  /**
   * build tree categories
   * @param {Article[]} articles
   * @param {Category[]} categories
   * @param {Number} currentCategory
   * @returns {Object}
   */
  let buildTree = (articles, categories, currentCategory) => {
    articles = articles.filter((article) => article.status != 'trash');

    let rootId = 1;
    let rootName = categories.find(c => c.id == rootId).name;
    let preparedCategories;

    preparedCategories = categories.map((category) => {
      /** @param {Category} category*/

      if (category.id != rootId) {
        category.parent = copy(categories.find(c => c.id == category.parent_id));
      }

      category.articles = articles.filter(a => a.categories.find(c => c.id == category.id)).sort((a, b) => a.sort_order - b.sort_order);

      category.hierarchical.lvl0 = rootName;

      if(category.parent) {
        switch (category.type) {
          case 'category':
            category.hierarchical.lvl1 = [rootName, category.name].join(' > ');
            break;
          case 'subcategory':
            category.hierarchical.lvl1 = [rootName, category.parent.name].join(' > ');
            category.hierarchical.lvl2 = [rootName, category.parent.name, category.name].join(' > ');
            break;
        }
      }
      return copy(category);
    });

    //copy subcategories to categories
    preparedCategories.filter(c => c.type == 'category').forEach((category) => {
      /** @param {Category} category*/
      category.categories = copy(categories.filter(c => c.parent_id == category.id).sort((a, b) => a.sort_order - b.sort_order));
    });

    //copy categories to root
    let root = preparedCategories.find(c => c.id == rootId);
    root.categories = copy(preparedCategories.filter(c => c.parent_id == rootId).sort((a, b) => a.sort_order - b.sort_order));

    return preparedCategories.find(c => c.id == currentCategory);
  };

  /**
   * return new object of category
   * @param {number} parentCategoryId - parent category id
   * @param {string} author - author
   * @returns {CategoryRequest}
   */
  let newCategory = (parentCategoryId, author) => {
    return {
      name: '',
      parent_id: +parentCategoryId || 1,
      lang: 'en',
      author: author || 'Unknown',
      sort_order: 0,
      author_href: '',
      granted_access: []
    };
  };

  return {
    responseToData,
    dataToRequest,
    buildTree,
    newCategory
  }
}

export default CategoryHelper;
