export const EMAIL_INPUT = 'email-input';
export const PASSWORD_INPUT = 'password-input';
export const LOGIN_SUBMIT_BTN = 'login-submit-btn';
export const VALID_EMAIL = 'admin@admin.com';
export const EXEC_SEARCH_BTN = 'exec-search-btn';
export const SEARCH_TOP_BTN = 'search-top-btn';

export const NO_RECIPE_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';
export const INGREDIENTS_AND_MEASURE = [
  {
    ingredients: 'strIngredient1',
    measure: 'strMeasure1',
  },
  {
    ingredients: 'strIngredient2',
    measure: 'strMeasure2',
  },
  {
    ingredients: 'strIngredient3',
    measure: 'strMeasure3',
  },
  {
    ingredients: 'strIngredient4',
    measure: 'strMeasure4',
  },
  {
    ingredients: 'strIngredient5',
    measure: 'strMeasure5',
  },
  {
    ingredients: 'strIngredient6',
    measure: 'strMeasure6',
  },
  {
    ingredients: 'strIngredient7',
    measure: 'strMeasure7',
  },
  {
    ingredients: 'strIngredient8',
    measure: 'strMeasure8',
  },
  {
    ingredients: 'strIngredient9',
    measure: 'strMeasure9',
  },
  {
    ingredients: 'strIngredient10',
    measure: 'strMeasure10',
  },
  {
    ingredients: 'strIngredient11',
    measure: 'strMeasure11',
  },
  {
    ingredients: 'strIngredient12',
    measure: 'strMeasure12',
  },
  {
    ingredients: 'strIngredient13',
    measure: 'strMeasure13',
  },
  {
    ingredients: 'strIngredient14',
    measure: 'strMeasure14',
  },
  {
    ingredients: 'strIngredient15',
    measure: 'strMeasure15',
  },
  {
    ingredients: 'strIngredient16',
    measure: 'strMeasure16',
  },
  {
    ingredients: 'strIngredient17',
    measure: 'strMeasure17',
  },
  {
    ingredients: 'strIngredient18',
    measure: 'strMeasure18',
  },
  {
    ingredients: 'strIngredient19',
    measure: 'strMeasure19',
  },
  {
    ingredients: 'strIngredient20',
    measure: 'strMeasure20',
  },
];

export const LOCAL_STORAGE_MOCK = () => {
  let storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear() {
      storage = {};
    },
  };
};
