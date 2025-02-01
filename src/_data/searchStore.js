module.exports = {
  store: `{
    query: '',
    activeCategory: '',
    posts: [],
    init() {
      this.posts = Array.from(document.querySelectorAll('[data-search-item]')).map(el => ({
        element: el,
        title: el.getAttribute('data-title').toLowerCase(),
        description: el.getAttribute('data-description')?.toLowerCase() || '',
        category: el.getAttribute('data-category')?.toLowerCase() || ''
      }));
      this.filterPosts();
    },
    filterPosts() {
      const query = this.query.toLowerCase();
      this.posts.forEach(post => {
        const matchesSearch = !query || 
          post.title.includes(query) || 
          post.description.includes(query);
        const matchesCategory = !this.activeCategory || 
          post.category === this.activeCategory;
        post.element.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
      });
    },
    setCategory(category) {
      this.activeCategory = category;
      this.filterPosts();
    }
  }`
}; 